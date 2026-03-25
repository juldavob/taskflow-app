// VISTA: HomeScreen
// Dashboard completo con cuatro tabs (Home, Tareas, Calendario,
// Descubrir). Recibe estado y callbacks desde App.jsx;
// no importa ningún controlador ni modelo directamente.

import { useState, useRef, useEffect } from "react";
import { StatusBar } from "../layout/PhoneShell";
import { TaskCard  } from "../components/TaskCard";

const NAV = [
  { id: "home",     ic: "🏠", lbl: "Home"       },
  { id: "tasks",    ic: "✅", lbl: "Tareas"     },
  { id: "calendar", ic: "📅", lbl: "Calendario" },
  { id: "discover", ic: "⭐", lbl: "Descubrir"  },
];

const ALL_FILTERS = ["Todas", "Trabajo", "Hogar", "Ejercicio", "Personal"];

/**
 * @param {{
 *   user:            object,
 *   tasks:           object[],
 *   progress:        { done:number, total:number, pct:number },
 *   categoryCounts:  object[],
 *   onToggleTask:    (id:number) => void,
 *   onOpenCreate:    () => void,
 *   onLogout:        () => void,
 *   onCategoryClick: (cat:string) => void,
 *   tab:             string,
 *   setTab:          (t:string) => void,
 * }} props
 */
export function HomeScreen({
  user, tasks, progress, categoryCounts,
  onToggleTask, onOpenCreate, onLogout,
  onCategoryClick, tab, setTab,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [filterCat, setFilterCat] = useState("Todas");
  const menuRef = useRef(null);

  const dateStr = new Date().toLocaleDateString("es-CO", {
    weekday: "short", day: "numeric", month: "short",
  });

  const pending   = tasks.filter(t => !t.done);
  const completed = tasks.filter(t =>  t.done);
  const filtered  = filterCat === "Todas"
    ? tasks
    : tasks.filter(t => t.category === filterCat);

  /* Cierra el menú de perfil al clic exterior */
  useEffect(() => {
    const close = e => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setShowMenu(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  /* Navegar a Tareas con filtro desde las categorías del Home */
  const handleCatClick = cat => {
    setFilterCat(cat);
    onCategoryClick(cat);   // App.jsx cambia tab a "tasks"
  };

  return (
    <div className="home">

      {/* ════════════════ TAB: HOME ════════════════ */}
      {tab === "home" && (
        <>
          <StatusBar />

          {/* Header */}
          <div className="hhdr">
            <div className="hrow">
              {/* Saludo */}
              <div>
                <div className="hgsm">¡Buenas tardes! 👋</div>
                <div className="hnm">{user.name}</div>
              </div>

              {/* Avatar + menú de perfil */}
              <div style={{ position: "relative" }} ref={menuRef}>
                <div className="hav" onClick={() => setShowMenu(m => !m)}>
                  {user.avatar}
                </div>

                {showMenu && (
                  <div className="pmenu">
                    <div style={{ padding: "11px 14px 8px" }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>
                        {user.name}
                      </div>
                      <div style={{ fontSize: 11, color: "#6B7280" }}>{user.email}</div>
                    </div>
                    <div className="phr" />
                    <button className="pmi">⚙️ Configuración</button>
                    <button className="pmi">🔔 Notificaciones</button>
                    <div className="phr" />
                    <button className="pmi red" onClick={onLogout}>
                      🚪 Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Fecha y progreso */}
            <div className="dchip">📅 {dateStr}</div>
            <div className="plbl">
              <span>{progress.done} de {progress.total} tareas completadas</span>
              <span className="ppct">{progress.pct}%</span>
            </div>
            <div className="pbar">
              <div className="pfill" style={{ width: `${progress.pct}%` }} />
            </div>
          </div>

          {/* Cuerpo */}
          <div className="hbody">
            <div className="sttl">Categorías</div>
            <div className="cats">
              {categoryCounts.map(c => (
                <div
                  key={c.label}
                  className="cat"
                  style={{ borderBottom: `3px solid ${c.color}` }}
                  onClick={() => handleCatClick(c.label)}
                >
                  <div className="cic">{c.icon}</div>
                  <div className="cnm">{c.label}</div>
                  <div className="cct">{c.pend} pend.</div>
                </div>
              ))}
            </div>

            <div className="sttl">Pendientes de hoy</div>
            {pending.length === 0 ? (
              <div style={{ textAlign: "center", color: "#6B7280", padding: "20px 0", fontSize: 13 }}>
                🎉 ¡Sin pendientes!
              </div>
            ) : (
              pending.map(t => <TaskCard key={t.id} task={t} onToggle={onToggleTask} />)
            )}

            {completed.length > 0 && (
              <>
                <div className="sttl" style={{ marginTop: 18 }}>Completadas ✓</div>
                {completed.map(t => <TaskCard key={t.id} task={t} onToggle={onToggleTask} />)}
              </>
            )}
          </div>
        </>
      )}

      {/* ════════════════ TAB: TAREAS ════════════════ */}
      {tab === "tasks" && (
        <div className="taskscr sin">
          <StatusBar light />
          <div className="thdr">
            <div className="tttl">Mis Tareas</div>
            <div className="fchips">
              {ALL_FILTERS.map(f => (
                <button
                  key={f}
                  className={`fchip ${filterCat === f ? "on" : "off"}`}
                  onClick={() => setFilterCat(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="tbody">
            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", color: "#6B7280", padding: "40px 0", fontSize: 13 }}>
                Sin tareas en esta categoría
              </div>
            ) : (
              filtered.map(t => <TaskCard key={t.id} task={t} onToggle={onToggleTask} />)
            )}
          </div>
        </div>
      )}

      {/* ════════════════ TAB: CALENDARIO ════════════════ */}
      {tab === "calendar" && (
        <div className="ph sin">
          <StatusBar light />
          <div className="phic">📅</div>
          <div className="phttl">Calendario</div>
          <div className="phsub">Vista de día, semana y mes.<br />Integración con tus tareas.</div>
          <div className="phbdg">PRÓXIMAMENTE</div>
        </div>
      )}

      {/* ════════════════ TAB: DESCUBRIR ════════════════ */}
      {tab === "discover" && (
        <div className="ph sin">
          <StatusBar light />
          <div className="phic">⭐</div>
          <div className="phttl">Descubrir</div>
          <div className="phsub">Recomendaciones personalizadas<br />basadas en tus hábitos.</div>
          <div className="phbdg">PRÓXIMAMENTE</div>
        </div>
      )}

      {/* ── FAB ── */}
      <button className="fab" onClick={onOpenCreate}>＋</button>

      {/* ── Bottom nav ── */}
      <div className="bnav">
        {NAV.map(n => (
          <button
            key={n.id}
            className={`nv ${tab === n.id ? "on" : ""}`}
            onClick={() => setTab(n.id)}
          >
            <span className="nvic">{n.ic}</span>
            <span className="nvlbl">{n.lbl}</span>
            {tab === n.id && <div className="nvdot" />}
          </button>
        ))}
      </div>
    </div>
  );
}
