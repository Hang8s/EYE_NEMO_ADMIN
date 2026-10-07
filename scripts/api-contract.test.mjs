import { strict as assert } from 'node:assert';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { generatedTypes, checkTypes } from './api-contract.mjs';

const schema = JSON.parse(readFileSync(new URL('../contracts/openapi.json', import.meta.url), 'utf8'));

test('detects schema drift even when the generated file was not updated', async () => {
  const original = await generatedTypes(schema);
  const changed = structuredClone(schema);
  changed.components.schemas.MiniChatResponse.properties.contract_test_field = { type: 'string' };
  await assert.rejects(checkTypes(changed, original), /stale/);
});

test('detects manual edits to generated types and accepts a current contract', async () => {
  const original = await generatedTypes(schema);
  await checkTypes(schema, original);
  await assert.rejects(checkTypes(schema, original + '\n// manual change\n'), /stale/);
});
