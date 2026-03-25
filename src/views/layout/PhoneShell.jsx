// VISTA: Layout — PhoneShell + StatusBar
// Componentes puramente presentacionales de estructura.

export function StatusBar({ light = false }) {
  const time = new Date().toLocaleTimeString("es-CO", { hour:"2-digit", minute:"2-digit" });
  return (
    <div className={`sbar ${light ? "lt" : "dk"}`}>
      <span>{time}</span>
      <div className="sicons">
        <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor">
          <rect x="0"  y="5" width="3" height="6"  rx="1" opacity=".4"/>
          <rect x="4"  y="3" width="3" height="8"  rx="1" opacity=".6"/>
          <rect x="8"  y="1" width="3" height="10" rx="1" opacity=".85"/>
          <rect x="12" y="0" width="3" height="11" rx="1"/>
        </svg>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor">
          <path d="M7.5 2.8C9.7 2.8 11.7 3.7 13.1 5.1L14.2 4C12.5 2.3 10.1 1.2 7.5 1.2S2.5 2.3.8 4L1.9 5.1C3.3 3.7 5.3 2.8 7.5 2.8Z" opacity=".45"/>
          <path d="M7.5 5.5C9 5.5 10.3 6.1 11.2 7L12.3 5.9C11.1 4.7 9.4 3.9 7.5 3.9S3.9 4.7 2.7 5.9L3.8 7C4.7 6.1 6 5.5 7.5 5.5Z" opacity=".75"/>
          <circle cx="7.5" cy="9.5" r="1.5"/>
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="currentColor">
          <rect x=".5" y=".5" width="21" height="11" rx="3.5" stroke="currentColor" strokeOpacity=".35" fill="none"/>
          <rect x="2" y="2" width="16" height="8" rx="2"/>
          <path d="M23 4.5V7.5C23.8 7.2 24.5 6.5 24.5 6S23.8 4.8 23 4.5Z" opacity=".4"/>
        </svg>
      </div>
    </div>
  );
}

export function PhoneShell({ children }) {
  return (
    <div className="shell">
      <div className="notch">
        <div className="nc" />
        <div className="np" />
      </div>
      <div className="screen">{children}</div>
    </div>
  );
}
