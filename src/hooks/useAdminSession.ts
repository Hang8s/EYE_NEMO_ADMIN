import { useEffect, useState } from "react";
import { request, saveToken, token } from "../api";

async function login(data: FormData) {
  const result = await request<{ token: string }>("/auth/login", {
    username: data.get("username"),
    password: data.get("password"),
  });
  saveToken(result.token);
}

async function logout() {
  try {
    await request("/auth/logout", {});
  } catch {
    /* Local exit still clears the session on a network failure. */
  } finally {
    saveToken(null);
  }
}

async function changePassword(data: FormData) {
  await request("/auth/password", {
    current_password: data.get("current_password"),
    new_password: data.get("new_password"),
  });
  saveToken(null);
}

async function revokeSessions() {
  await request("/auth/revoke-all", {});
  saveToken(null);
}

export function useAdminSession() {
  const [session, setSession] = useState(token);
  useEffect(() => {
    const changed = () => setSession(token());
    window.addEventListener("admin-session", changed);
    return () => window.removeEventListener("admin-session", changed);
  }, []);
  return { session, login, logout, changePassword, revokeSessions };
}
