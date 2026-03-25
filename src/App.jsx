// RAÍZ: App.jsx — Controlador raíz
//
// Responsabilidades:
//   • Mantiene el estado global (pantalla activa, usuario, tareas)
//   • Llama a AuthController y TaskController según la acción del usuario
//   • Pasa datos y callbacks a las vistas mediante props
//   • Decide qué pantalla renderizar
//
// Regla de oro del MVC aplicado aquí:
//   Vistas  → nunca importan modelos ni controladores
//   Modelos → nunca importan vistas
//   App.jsx → único punto de conexión entre las tres capas

import { useState, useEffect } from "react";

// ── Estilos ────────────────────────────────────────────────
import { globalCSS } from "./styles/globalCSS";

// ── Layout ─────────────────────────────────────────────────
import { PhoneShell } from "./views/layout/PhoneShell";

// ── Vistas ─────────────────────────────────────────────────
import { SplashScreen    } from "./views/screens/SplashScreen";
import { LoginScreen     } from "./views/screens/LoginScreen";
import { RegisterScreen  } from "./views/screens/RegisterScreen";
import { HomeScreen      } from "./views/screens/HomeScreen";
import { CreateTaskModal } from "./views/screens/CreateTaskModal";
import { SuccessScreen   } from "./views/screens/SuccessScreen";

// ── Controladores ───────────────────────────────────────────
import { loginUser, registerUser } from "./controllers/AuthController";
import {
  fetchTasks,
  completeTask,
  saveTask,
  getDayProgress,
  getCategoryCounts,
} from "./controllers/TaskController";

// ────────────────────────────────────────────────────────────
export default function App() {

  // ── Estado de navegación ─────────────────────────────────
  // "splash" | "login" | "register" | "home" | "success"
  const [screen, setScreen] = useState("splash");
  // "home" | "tasks" | "calendar" | "discover"
  const [tab,    setTab]    = useState("home");

  // ── Estado de dominio ────────────────────────────────────
  const [user,     setUser]     = useState(null);
  const [tasks,    setTasks]    = useState(fetchTasks());
  const [lastTask, setLastTask] = useState(null); // resumen para SuccessScreen

  // ── Estado de UI ─────────────────────────────────────────
  const [showModal, setShowModal] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authBusy,  setAuthBusy]  = useState(false);

  // ── Splash: avanza automáticamente al login ───────────────
  useEffect(() => {
    if (screen !== "splash") return;
    const id = setTimeout(() => setScreen("login"), 2400);
    return () => clearTimeout(id);
  }, [screen]);

  // ═══════════════════════════════════════════════════════════
  // HANDLERS DE AUTENTICACIÓN
  // ═══════════════════════════════════════════════════════════

  const handleLogin = (email, password) => {
    setAuthError("");
    setAuthBusy(true);
    // Latencia simulada para feedback visual realista
    setTimeout(() => {
      const result = loginUser(email, password);
      if (result.ok) {
        setUser(result.user);
        setScreen("home");
      } else {
        setAuthError(result.error);
      }
      setAuthBusy(false);
    }, 800);
  };

  const handleRegister = (fields) => {
    setAuthError("");
    const result = registerUser(fields);
    if (!result.ok) { setAuthError(result.error); return; }
    setAuthBusy(true);
    setTimeout(() => {
      setUser(result.user);
      setScreen("home");
      setAuthBusy(false);
    }, 900);
  };

  const handleLogout = () => {
    setUser(null);
    setTasks(fetchTasks()); // resetea al estado inicial del modelo
    setScreen("login");
    setTab("home");
    setAuthError("");
  };

  const goToRegister = () => { setAuthError(""); setScreen("register"); };
  const goToLogin    = () => { setAuthError(""); setScreen("login");    };

  // ═══════════════════════════════════════════════════════════
  // HANDLERS DE TAREAS
  // ═══════════════════════════════════════════════════════════

  const handleToggleTask = (id) => {
    setTasks(completeTask(id));
  };

  const handleSaveTask = (formData) => {
    const { tasks: updated, savedTask } = saveTask(formData);
    setTasks(updated);
    setLastTask(savedTask);
    setShowModal(false);
    setScreen("success");
  };

  // Al pulsar una categoría en el Home → navega a Tareas con ese filtro
  const handleCategoryClick = () => {
    setTab("tasks");
  };

  // ═══════════════════════════════════════════════════════════
  // DATOS DERIVADOS (delegados a los controladores)
  // ═══════════════════════════════════════════════════════════
  const progress       = getDayProgress(tasks);
  const categoryCounts = getCategoryCounts(tasks);

  // ═══════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════
  return (
    <>
      <style>{globalCSS}</style>

      <PhoneShell>

        {/* ── SPLASH ── */}
        {screen === "splash" && <SplashScreen />}

        {/* ── LOGIN ── */}
        {screen === "login" && (
          <LoginScreen
            onSubmit={handleLogin}
            onGoRegister={goToRegister}
            error={authError}
            loading={authBusy}
          />
        )}

        {/* ── REGISTRO ── */}
        {screen === "register" && (
          <RegisterScreen
            onSubmit={handleRegister}
            onGoLogin={goToLogin}
            error={authError}
            loading={authBusy}
          />
        )}

        {/* ── HOME (+ modal de nueva tarea) ── */}
        {screen === "home" && user && (
          <>
            <HomeScreen
              user={user}
              tasks={tasks}
              progress={progress}
              categoryCounts={categoryCounts}
              onToggleTask={handleToggleTask}
              onOpenCreate={() => setShowModal(true)}
              onLogout={handleLogout}
              onCategoryClick={handleCategoryClick}
              tab={tab}
              setTab={setTab}
            />
            {showModal && (
              <CreateTaskModal
                onClose={() => setShowModal(false)}
                onSave={handleSaveTask}
              />
            )}
          </>
        )}

        {/* ── CONFIRMACIÓN ── */}
        {screen === "success" && lastTask && (
          <SuccessScreen
            task={lastTask}
            onBack={() => { setScreen("home"); setTab("home"); }}
            onMore={() => { setScreen("home"); setTab("home"); setShowModal(true); }}
          />
        )}

      </PhoneShell>
    </>
  );
}
