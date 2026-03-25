// VISTA: RegisterScreen
// Captura los datos del nuevo usuario y los pasa a onSubmit.
// Toda la validación vive en AuthController.

import { useState } from "react";
import { StatusBar } from "../layout/PhoneShell";
import { COLORS } from "../../constants/theme";

const FIELDS = [
  { key: "name",  label: "Nombre completo",      type: "text",     icon: "👤", ph: "Juan Carlos García"   },
  { key: "email", label: "Correo electrónico",   type: "email",    icon: "✉️", ph: "tu@correo.com"        },
  { key: "pass",  label: "Contraseña",           type: "password", icon: "🔒", ph: "Mínimo 6 caracteres"  },
  { key: "pass2", label: "Confirmar contraseña", type: "password", icon: "🔐", ph: "Repite tu contraseña" },
];

/**
 * @param {{
 *   onSubmit:  (fields: { name, email, pass, pass2 }) => void,
 *   onGoLogin: () => void,
 *   error:     string,
 *   loading:   boolean,
 * }} props
 */
export function RegisterScreen({ onSubmit, onGoLogin, error, loading }) {
  const [fields, setFields] = useState({ name: "", email: "", pass: "", pass2: "" });
  const set = (key, val) => setFields(prev => ({ ...prev, [key]: val }));

  return (
    <div className="aw sin">
      <StatusBar />

      {/* ── Hero ── */}
      <div
        className="ahero"
        style={{
          background: `linear-gradient(160deg, ${COLORS.dark1} 0%, ${COLORS.dark2} 50%, ${COLORS.primary3}44 100%)`,
        }}
      >
        <div
          className="alogo"
          style={{ background: COLORS.secondary, boxShadow: `0 8px 24px ${COLORS.secondary}55` }}
        >
          ✨
        </div>
        <div className="ah1">Crea tu<br />cuenta</div>
        <div className="asub">Empieza a organizar tu día</div>
      </div>

      {/* ── Formulario ── */}
      <div className="abody">
        {error && <div className="err">⚠️ {error}</div>}

        {FIELDS.map(f => (
          <div key={f.key}>
            <div className="lbl">{f.label}</div>
            <div className="iw">
              <span>{f.icon}</span>
              <input
                type={f.type}
                placeholder={f.ph}
                value={fields[f.key]}
                onChange={e => set(f.key, e.target.value)}
              />
            </div>
          </div>
        ))}

        <button
          className="btnp"
          onClick={() => onSubmit(fields)}
          disabled={loading}
        >
          {loading ? "Creando cuenta..." : "Crear Cuenta"}
        </button>
      </div>

      <div className="afoot">
        ¿Ya tienes cuenta?{" "}
        <button className="lnk" onClick={onGoLogin}>
          Inicia sesión
        </button>
      </div>
    </div>
  );
}
