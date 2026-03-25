// VISTA: SplashScreen — pantalla de carga inicial
// Puramente presentacional. El temporizador de avance vive en App.jsx.
export function SplashScreen() {
  return (
    <div className="splash">
      <div className="sp-logo">📋</div>
      <div className="sp-app">TaskFlow</div>
      <div className="sp-tag">Organiza tu día, controla tu tiempo</div>
      <div className="sp-bar"><div className="sp-fill" /></div>
    </div>
  );
}
