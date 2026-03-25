// VISTA: SuccessScreen
// Pantalla de confirmación tras guardar una tarea.
// Recibe el resumen ya preparado desde App.jsx (vía TaskController).

import { StatusBar } from "../layout/PhoneShell";
import { CATEGORIES } from "../../constants/categories";
import { PRIORITY_STYLES } from "../../constants/theme";

/**
 * @param {{
 *   task:   { title, date, time, category, priority },
 *   onBack: () => void,
 *   onMore: () => void,
 * }} props
 */
export function SuccessScreen({ task, onBack, onMore }) {
  const cat      = CATEGORIES.find(c => c.label === task.category);
  const priStyle = PRIORITY_STYLES[task.priority];

  const timeFmt = task.time
    ? new Date(`2000-01-01T${task.time}`)
        .toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })
    : task.time;

  const dateFmt = new Date(task.date + "T12:00")
    .toLocaleDateString("es-CO", { day: "numeric", month: "long" });

  const rows = [
    ["Tarea",     task.title],
    ["Fecha",     dateFmt],
    ["Hora",      timeFmt],
    ["Categoría", `${cat?.icon ?? "📌"} ${task.category}`],
    ["Prioridad", task.priority],
  ];

  return (
    <>
      <StatusBar light />
      <div className="suc sin">
        <div className="suic">✓</div>
        <div className="suh">¡Tarea creada!</div>
        <div className="susub">Tu actividad fue guardada correctamente.</div>

        <div className="sucard">
          {rows.map(([label, value]) => (
            <div className="surow" key={label}>
              <span className="sulbl">{label}</span>
              <span
                className="suval"
                style={label === "Prioridad" ? { color: priStyle?.text } : {}}
              >
                {value}
              </span>
            </div>
          ))}
        </div>

        <button
          className="btnp"
          style={{ marginTop: 4, width: "100%" }}
          onClick={onBack}
        >
          Volver al inicio
        </button>

        <button className="lnksm" onClick={onMore}>
          Agregar otra tarea
        </button>
      </div>
    </>
  );
}
