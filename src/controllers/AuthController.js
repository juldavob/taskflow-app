// CONTROLLER: Autenticación
// Orquesta login y registro. Llama al modelo, aplica reglas
// de negocio y devuelve resultados — sin JSX.

import { findUserByCredentials, createUser } from "../models/UserModel";

/**
 * @param {string} email
 * @param {string} password
 * @returns {{ ok:boolean, user?:object, error?:string }}
 */
export function loginUser(email, password) {
  if (!email.trim() || !password.trim())
    return { ok: false, error: "Completa correo y contraseña." };

  const user = findUserByCredentials(email.trim(), password);
  if (!user)
    return { ok: false, error: "Credenciales incorrectas.\nPrueba: juan@taskflow.app / 123456" };

  return { ok: true, user };
}

/**
 * @param {{ name:string, email:string, pass:string, pass2:string }} fields
 * @returns {{ ok:boolean, user?:object, error?:string }}
 */
export function registerUser({ name, email, pass, pass2 }) {
  if (!name.trim() || !email.trim() || !pass || !pass2)
    return { ok: false, error: "Completa todos los campos." };
  if (pass !== pass2)
    return { ok: false, error: "Las contraseñas no coinciden." };
  if (pass.length < 6)
    return { ok: false, error: "Mínimo 6 caracteres en la contraseña." };

  return { ok: true, user: createUser(name.trim(), email.trim(), pass) };
}
