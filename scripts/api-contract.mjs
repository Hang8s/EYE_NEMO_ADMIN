import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import openapiTS, { astToString } from 'openapi-typescript';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const backend = resolve(root, '../backend');
const schemaPath = resolve(root, 'contracts/openapi.json');
const typesPath = resolve(root, 'src/generated/api.ts');

export async function generatedTypes(schema) {
  return '// Generated from contracts/openapi.json. Do not edit; run npm run contracts:sync.\n'
    + astToString(await openapiTS(schema));
}

export async function checkTypes(schema, current) {
  if (current !== await generatedTypes(schema)) {
    throw new Error('Generated API types are stale. Run npm run contracts:sync (or contracts:generate from the snapshot).');
  }
}

function backendExport(check) {
  const candidates = [resolve(backend, '.venv/Scripts/python.exe'), resolve(backend, '.venv/bin/python')];
  const python = candidates.find(existsSync);
  const args = ['-m', 'scripts.export_openapi', '--frontend-dir', root, ...(check ? ['--check'] : [])];
  const result = spawnSync(python || 'uv', python ? args : ['run', '--frozen', 'python', ...args], {
    cwd: backend, stdio: 'inherit', shell: false,
  });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error('Backend OpenAPI export/check failed.');
}

async function main() {
  const command = process.argv[2];
  if (!['sync', 'generate', 'check'].includes(command)) throw new Error('Use sync, generate or check.');
  const hasBackend = existsSync(resolve(backend, 'scripts/export_openapi.py'));
  if (command === 'sync') {
    if (!hasBackend) throw new Error('contracts:sync requires the backend checkout alongside frontend.');
    backendExport(false);
  }
  if (command === 'check' && hasBackend) backendExport(true);
  const schema = JSON.parse(readFileSync(schemaPath, 'utf8'));
  if (command === 'check') {
    await checkTypes(schema, readFileSync(typesPath, 'utf8'));
    console.log('API contract and generated types are current.');
  } else {
    const { mkdirSync } = await import('node:fs');
    mkdirSync(dirname(typesPath), { recursive: true });
    writeFileSync(typesPath, await generatedTypes(schema), 'utf8');
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { await main(); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
