// VISTA: TaskCard — tarjeta reutilizable de tarea
import { CATEGORIES } from "../../constants/categories";
import { PRIORITY_STYLES } from "../../constants/theme";

export function TaskCard({ task, onToggle }) {
  const ps  = PRIORITY_STYLES[task.priority];
  const cat = CATEGORIES.find(c => c.label === task.category);
  return (
    <div className={`tc ${task.done ? "done" : ""}`}>
      <div className="tcstrip" style={{ background: task.color }} />
      <div
        className={`tchk ${task.done ? "on" : ""}`}
        style={{ borderColor: task.done ? "#10B981" : "#D1D5DB" }}
        onClick={e => { e.stopPropagation(); onToggle(task.id); }}
      />
      <div className="tinfo">
        <div className={`tnm ${task.done ? "done" : ""}`}>{task.title}</div>
        <div className="tmeta">
          <span>🕐 {task.time}</span>
          <span>{cat?.icon} {task.category}</span>
        </div>
      </div>
      <div className="pri" style={{ background: ps.bg, color: ps.text }}>
        {task.priority}
      </div>
    </div>
  );
}
