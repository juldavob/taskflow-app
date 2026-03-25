// MODEL: Usuario
// Define la forma del dato User y su repositorio en memoria.
// Cuando exista backend, sólo este archivo cambia.

const _users = [
  { email: "juan@taskflow.app", password: "123456", name: "Juan Carlos", avatar: "JC" },
];

/**
 * Busca un usuario por credenciales.
 * @param {string} email
 * @param {string} password
 * @returns {{ email:string, password:string, name:string, avatar:string }|null}
 */
export function findUserByCredentials(email, password) {
  return _users.find(u => u.email === email && u.password === password) ?? null;
}

/**
 * Registra un nuevo usuario.
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @returns {{ email:string, password:string, name:string, avatar:string }}
 */
export function createUser(name, email, password) {
  const avatar = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const user = { name, email, password, avatar };
  _users.push(user);
  return user;
}
