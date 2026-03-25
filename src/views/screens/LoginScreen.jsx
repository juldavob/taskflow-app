// VISTA: LoginScreen
// Captura email y contraseña y los pasa a onSubmit.
// Validación y autenticación viven en AuthController — esta
// vista no toca ningún modelo ni controlador directamente.

import { useState } from "react";
import { StatusBar } from "../layout/PhoneShell";

/**
 * @param {{
 *   onSubmit:     (email:string, password:string) => void,
 *   onGoRegister: () => void,
 *   error:        string,
 *   loading:      boolean,
 * }} props
 */
export function LoginScreen({ onSubmit, onGoRegister, error, loading }) {
  const [email,    setEmail]   = useState("");
  const [pass,     setPass]    = useState("");
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="aw sin">
      <StatusBar />

      {/* ── Hero ── */}
      <div className="ahero">
        <div className="alogo">📋</div>
        <div className="ah1">Bienvenido<br />de vuelta</div>
        <div className="asub">Inicia sesión para continuar</div>
      </div>

      {/* ── Formulario ── */}
      <div className="abody">
        {error && (
          <div className="err">
            ⚠️ <span style={{ whiteSpace: "pre-line" }}>{error}</span>
          </div>
        )}

        <div>
          <div className="lbl">Correo electrónico</div>
          <div className="iw">
            <span>✉️</span>
            <input
              type="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === "Enter" && onSubmit(email, pass)}
            />
          </div>
        </div>

        <div>
          <div className="lbl">Contraseña</div>
          <div className="iw">
            <span>🔒</span>
            <input
              type={showPass ? "text" : "password"}
              placeholder="••••••••"
              value={pass}
              onChange={e => setPass(e.target.value)}
              onKeyDown={e => e.key === "Enter" && onSubmit(email, pass)}
            />
            <span
              style={{ cursor: "pointer", opacity: 0.5, fontSize: 13 }}
              onClick={() => setShowPass(p => !p)}
            >
              {showPass ? "🙈" : "👁️"}
            </span>
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <button className="lnk" style={{ fontSize: 12 }}>
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <button
          className="btnp"
          onClick={() => onSubmit(email, pass)}
          disabled={loading}
        >
          {loading ? "Ingresando..." : "Iniciar Sesión"}
        </button>

        <div className="div">o continúa con</div>

        <div className="srow">
          <button className="btns">🌐 Google</button>
          <button className="btns"> Apple</button>
        </div>
      </div>

      <div className="afoot">
        ¿No tienes cuenta?{" "}
        <button className="lnk" onClick={onGoRegister}>
          Regístrate
        </button>
      </div>
    </div>
  );
}
