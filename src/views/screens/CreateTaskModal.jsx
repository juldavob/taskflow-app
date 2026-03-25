// VISTA: CreateTaskModal
// Bottom sheet para crear una tarea. Solo captura los valores
// del formulario y los entrega a onSave — sin lógica propia.
// La creación real (formateo, enriquecimiento) vive en
// TaskController → TaskModel.

import { useState } from "react";
import { CATEGORIES, PRIORITIES } from "../../constants/categories";
import { PRIORITY_STYLES } from "../../constants/theme";

/**
 * @param {{
 *   onClose: () => void,
 *   onSave:  (data: object) => void,
 * }} props
 */
export function CreateTaskModal({ onClose, onSave }) {
  const today = new Date().toISOString().split("T")[0];

  const [title, setTitle] = useState("");
  const [date,  setDate]  = useState(today);
  const [time,  setTime]  = useState("09:00");
  const [cat,   setCat]   = useState("Trabajo");
  const [pri,   setPri]   = useState("Media");
  const [desc,  setDesc]  = useState("");

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({ title, date, time, category: cat, priority: pri, desc });
  };

  return (
    <>
      {/* Overlay oscuro */}
      <div className="ov" onClick={onClose} />

      {/* Sheet */}
      <div className="bs">
        <div className="bh" />

        <div className="bhd">
          <div className="bttl">Nueva tarea</div>
          <button className="bcl" onClick={onClose}>✕</button>
        </div>

        <div className="bbody">

          {/* Título — obligatorio */}
          <div>
            <div className="flbl">Título *</div>
            <input
              className="finp"
              autoFocus
              placeholder="¿Qué necesitas hacer?"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>

          {/* Fecha + Hora */}
          <div className="g2">
            <div>
              <div className="flbl">Fecha</div>
              <input
                className="finp"
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
              />
            </div>
            <div>
              <div className="flbl">Hora</div>
              <input
                className="finp"
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
              />
            </div>
          </div>

          {/* Categoría */}
          <div>
            <div className="flbl">Categoría</div>
            <div className="crow">
              {CATEGORIES.map(c => (
                <button
                  key={c.label}
                  className={`chip2 ${cat === c.label ? "sel" : ""}`}
                  style={cat === c.label ? { background: c.color } : {}}
                  onClick={() => setCat(c.label)}
                >
                  {c.icon} {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Prioridad */}
          <div>
            <div className="flbl">Prioridad</div>
            <div className="crow">
              {PRIORITIES.map(p => {
                const ps = PRIORITY_STYLES[p];
                return (
                  <button
                    key={p}
                    className={`chip2 ${pri === p ? "sel" : ""}`}
                    style={pri === p ? { background: ps.text } : {}}
                    onClick={() => setPri(p)}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Descripción — opcional */}
          <div>
            <div className="flbl">Descripción (opcional)</div>
            <textarea
              className="finp"
              rows={2}
              style={{ resize: "none", lineHeight: 1.5 }}
              placeholder="Detalles adicionales..."
              value={desc}
              onChange={e => setDesc(e.target.value)}
            />
          </div>

          <button
            className="btnsv"
            onClick={handleSave}
            disabled={!title.trim()}
          >
            Guardar tarea
          </button>

        </div>
      </div>
    </>
  );
}
