import { useState, useEffect, useRef } from "react";

// ─── PALETA OFICIAL del sistema de diseño documentado ─────────
// Fuente: Guia_Figma_TaskFlow.html — sección "Sistema de Diseño"
const T = {
  // Primarios
  primary:   "#4F46E5",   // índigo principal
  primary2:  "#3730A3",   // índigo oscuro
  primary3:  "#7C3AED",   // violeta secundario
  primaryLt: "#EEF2FF",   // índigo claro (backgrounds)
  primarySoft:"#A5B4FC",  // índigo suave (texto sobre oscuro)

  // Secundario / éxito
  secondary: "#10B981",   // verde
  secondaryLt:"#ECFDF5",  // verde claro
  secondaryDk:"#059669",  // verde oscuro

  // Acento
  accent:    "#F59E0B",   // ámbar
  accentLt:  "#FFFBEB",   // ámbar claro
  accentDk:  "#D97706",   // ámbar oscuro

  // Fondos oscuros (splash / headers)
  dark1:     "#1E1B4B",   // índigo muy oscuro
  dark2:     "#312E81",   // índigo oscuro
  dark3:     "#1E3A5F",   // azul marino oscuro
  darkCard:  "#1A1A2E",   // tarjeta oscura
  darkBg:    "#0F0F1A",   // fondo oscuro general

  // Neutrales
  white:     "#FFFFFF",
  bg:        "#F9FAFB",   // fondo claro documentado como "Fondo"
  gray100:   "#F3F4F6",
  gray200:   "#E5E7EB",
  gray300:   "#D1D5DB",
  gray500:   "#6B7280",
  gray700:   "#374151",
  gray900:   "#111827",

  // Semánticos
  red:       "#EF4444",
  redLt:     "#FEE2E2",
};

// ─── MOCK DATA ────────────────────────────────────────────────
const MOCK_USERS = [
  { email: "juan@taskflow.app", password: "123456", name: "Juan Carlos", avatar: "JC" },
];

const INITIAL_TASKS = [
  { id:1, title:"Reunión con cliente",  time:"10:00 AM", category:"Trabajo",   priority:"Alta",  done:false, color:T.primary   },
  { id:2, title:"Cardio matutino",      time:"7:00 AM",  category:"Ejercicio", priority:"Media", done:true,  color:T.secondary },
  { id:3, title:"Pagar servicios",      time:"2:00 PM",  category:"Hogar",     priority:"Media", done:false, color:T.accent    },
  { id:4, title:"Entregar informe Q2",  time:"4:00 PM",  category:"Trabajo",   priority:"Alta",  done:false, color:T.primary   },
  { id:5, title:"Llamar al médico",     time:"11:00 AM", category:"Personal",  priority:"Baja",  done:false, color:T.primary3  },
];

const CATEGORIES = [
  { label:"Trabajo",   icon:"💼", color:T.primary,   bg:T.primaryLt   },
  { label:"Hogar",     icon:"🏠", color:T.accent,    bg:T.accentLt    },
  { label:"Ejercicio", icon:"🏃", color:T.secondary, bg:T.secondaryLt },
  { label:"Personal",  icon:"👤", color:T.primary3,  bg:"#F5F3FF"     },
];

const PRI = {
  Alta:  { bg:T.redLt,       text:"#991B1B"  },
  Media: { bg:T.accentLt,    text:T.accentDk },
  Baja:  { bg:T.secondaryLt, text:"#166534"  },
};

// ─── GLOBAL CSS ───────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{background:#08081A;display:flex;justify-content:center;align-items:center;min-height:100vh;font-family:'Inter',sans-serif;}

.shell{width:390px;height:844px;background:${T.dark1};border-radius:44px;overflow:hidden;position:relative;
  box-shadow:0 0 0 1px #2D2A6E,0 0 0 10px #08081A,0 32px 80px rgba(0,0,0,.85),0 0 100px rgba(79,70,229,.13);}
.screen{width:100%;height:100%;overflow:hidden;position:relative;}

.notch{position:absolute;top:0;left:50%;transform:translateX(-50%);width:126px;height:36px;background:${T.dark1};
  border-radius:0 0 22px 22px;z-index:100;display:flex;align-items:center;justify-content:center;gap:7px;}
.nc{width:11px;height:11px;background:#2D2A6E;border-radius:50%;}
.np{width:52px;height:6px;background:#2D2A6E;border-radius:3px;}

.sbar{height:46px;display:flex;align-items:flex-end;justify-content:space-between;
  padding:0 24px 10px;font-size:12px;font-weight:600;position:relative;z-index:10;}
.sbar.dk{color:rgba(255,255,255,.75);}
.sbar.lt{color:${T.gray700};}
.sicons{display:flex;gap:5px;align-items:center;}

@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
@keyframes popIn{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}
@keyframes sIn{from{opacity:0;transform:translateX(16px)}to{opacity:1;transform:translateX(0)}}
@keyframes loadBar{from{width:0%}to{width:100%}}
.fade{animation:fadeIn .22s ease;}
.sin{animation:sIn .22s ease;}

/* ── SPLASH ── */
.splash{height:100%;background:linear-gradient(160deg,${T.dark1} 0%,${T.dark2} 55%,${T.dark3} 100%);
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;position:relative;overflow:hidden;}
.splash::before{content:'';position:absolute;top:-80px;right:-80px;width:260px;height:260px;border-radius:50%;
  background:radial-gradient(circle,${T.primary}30,transparent 70%);}
.splash::after{content:'';position:absolute;bottom:-60px;left:-60px;width:200px;height:200px;border-radius:50%;
  background:radial-gradient(circle,${T.secondary}20,transparent 70%);}
.sp-logo{width:76px;height:76px;background:${T.primary};border-radius:24px;display:flex;align-items:center;
  justify-content:center;font-size:36px;box-shadow:0 12px 36px ${T.primary}66;position:relative;z-index:1;}
.sp-app{font-size:36px;font-weight:800;color:${T.white};letter-spacing:-1px;position:relative;z-index:1;}
.sp-tag{font-size:13px;color:${T.primarySoft};position:relative;z-index:1;}
.sp-bar{width:100px;height:4px;background:rgba(255,255,255,.15);border-radius:2px;overflow:hidden;margin-top:16px;position:relative;z-index:1;}
.sp-fill{height:100%;background:${T.primary};border-radius:2px;animation:loadBar 2.1s cubic-bezier(.4,0,.2,1) forwards;}

/* ── AUTH ── */
.aw{height:100%;overflow-y:auto;scrollbar-width:none;background:${T.dark1};}
.aw::-webkit-scrollbar{display:none;}
.ahero{background:linear-gradient(160deg,${T.dark1} 0%,${T.dark2} 50%,${T.dark3}88 100%);
  padding:56px 28px 44px;position:relative;overflow:hidden;}
.ahero::before{content:'';position:absolute;top:-70px;right:-70px;width:240px;height:240px;border-radius:50%;
  background:radial-gradient(circle,${T.primary}28,transparent 70%);}
.ahero::after{content:'';position:absolute;bottom:-50px;left:-50px;width:180px;height:180px;border-radius:50%;
  background:radial-gradient(circle,${T.secondary}18,transparent 70%);}
.alogo{width:52px;height:52px;background:${T.primary};border-radius:16px;display:flex;align-items:center;
  justify-content:center;font-size:24px;box-shadow:0 8px 24px ${T.primary}55;margin-bottom:18px;position:relative;z-index:1;}
.ah1{font-size:26px;font-weight:800;color:${T.white};line-height:1.2;position:relative;z-index:1;}
.asub{font-size:13px;color:${T.primarySoft};margin-top:5px;position:relative;z-index:1;}
.abody{padding:28px 22px 20px;display:flex;flex-direction:column;gap:14px;}
.afoot{text-align:center;padding:6px 0 16px;font-size:13px;color:${T.gray500};}

.lbl{font-size:11px;font-weight:600;color:${T.gray500};letter-spacing:.6px;text-transform:uppercase;margin-bottom:5px;}
.iw{display:flex;align-items:center;gap:10px;background:#12112A;border:1.5px solid #2D2A6E;
  border-radius:12px;padding:0 14px;transition:border-color .2s,box-shadow .2s;}
.iw:focus-within{border-color:${T.primary};box-shadow:0 0 0 3px ${T.primary}22;}
.iw span{font-size:15px;opacity:.55;flex-shrink:0;}
.iw input{flex:1;padding:13px 0;background:transparent;border:none;outline:none;font-size:14px;
  color:${T.white};font-family:'Inter',sans-serif;}
.iw input::placeholder{color:#4B5A6B;}

.btnp{width:100%;padding:15px;background:${T.primary};border:none;border-radius:12px;font-family:'Inter',sans-serif;
  font-size:15px;font-weight:700;color:${T.white};cursor:pointer;letter-spacing:.2px;
  box-shadow:0 6px 20px ${T.primary}44;transition:opacity .2s,transform .15s;}
.btnp:hover{opacity:.91;}
.btnp:active{transform:scale(.98);}
.btnp:disabled{opacity:.6;cursor:not-allowed;}

.div{display:flex;align-items:center;gap:10px;font-size:12px;color:${T.gray500};}
.div::before,.div::after{content:'';flex:1;height:1px;background:#2D2A6E;}
.srow{display:flex;gap:9px;}
.btns{flex:1;padding:11px;background:#12112A;border:1.5px solid #2D2A6E;border-radius:12px;cursor:pointer;
  font-size:13px;font-weight:500;color:${T.gray500};display:flex;align-items:center;justify-content:center;
  gap:7px;font-family:'Inter',sans-serif;transition:border-color .2s,color .2s;}
.btns:hover{border-color:${T.primary};color:${T.primarySoft};}
.lnk{color:${T.primary};font-weight:600;cursor:pointer;background:none;border:none;
  font-size:13px;font-family:'Inter',sans-serif;}
.lnk:hover{text-decoration:underline;}
.err{background:#1F0F0F;border:1px solid ${T.red}44;border-radius:10px;padding:10px 13px;
  font-size:12px;color:${T.red};display:flex;align-items:flex-start;gap:7px;line-height:1.5;}

/* ── HOME ── */
.home{height:100%;background:${T.bg};display:flex;flex-direction:column;}
.hhdr{background:${T.primary};padding:14px 18px 20px;flex-shrink:0;position:relative;overflow:hidden;}
.hhdr::after{content:'';position:absolute;bottom:-40px;right:-40px;width:130px;height:130px;border-radius:50%;
  background:radial-gradient(circle,rgba(255,255,255,.08),transparent);}
.hrow{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;}
.hgsm{font-size:11px;color:rgba(255,255,255,.7);margin-bottom:2px;}
.hnm{font-size:17px;font-weight:700;color:${T.white};}
.hav{width:38px;height:38px;background:rgba(255,255,255,.2);border:2px solid rgba(255,255,255,.35);
  border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;
  color:${T.white};cursor:pointer;transition:background .2s;}
.hav:hover{background:rgba(255,255,255,.3);}
.dchip{display:inline-flex;align-items:center;gap:5px;background:rgba(255,255,255,.16);border-radius:20px;
  padding:4px 11px;font-size:11px;color:${T.white};margin-bottom:11px;position:relative;z-index:1;}
.plbl{display:flex;justify-content:space-between;font-size:11px;color:rgba(255,255,255,.75);margin-bottom:5px;}
.ppct{color:${T.secondary};font-weight:700;}
.pbar{height:5px;background:rgba(255,255,255,.2);border-radius:3px;overflow:hidden;}
.pfill{height:100%;background:${T.secondary};border-radius:3px;transition:width .7s cubic-bezier(.4,0,.2,1);}

.hbody{flex:1;overflow-y:auto;padding:14px 14px 86px;scrollbar-width:none;}
.hbody::-webkit-scrollbar{display:none;}
.sttl{font-size:11px;font-weight:700;color:${T.gray500};text-transform:uppercase;
  letter-spacing:.8px;margin-bottom:9px;margin-top:16px;}
.sttl:first-child{margin-top:0;}

.cats{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;}
.cat{background:${T.white};border-radius:12px;padding:9px 5px;text-align:center;cursor:pointer;
  box-shadow:0 1px 3px rgba(0,0,0,.06);transition:transform .15s,box-shadow .15s;}
.cat:hover{transform:translateY(-2px);box-shadow:0 4px 10px rgba(0,0,0,.09);}
.cat:active{transform:scale(.95);}
.cic{font-size:19px;margin-bottom:3px;}
.cnm{font-size:9px;font-weight:600;color:${T.gray700};}
.cct{font-size:8px;color:${T.gray500};margin-top:1px;}

.tc{background:${T.white};border-radius:14px;padding:11px 13px;margin-bottom:7px;
  display:flex;align-items:center;gap:9px;box-shadow:0 1px 3px rgba(0,0,0,.05);
  cursor:pointer;position:relative;overflow:hidden;transition:transform .15s,box-shadow .15s;}
.tc:hover{transform:translateY(-1px);box-shadow:0 3px 10px rgba(0,0,0,.07);}
.tc.done{opacity:.52;}
.tcstrip{position:absolute;left:0;top:0;bottom:0;width:4px;border-radius:14px 0 0 14px;}
.tchk{width:21px;height:21px;border-radius:50%;flex-shrink:0;border:2px solid ${T.gray300};
  display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;}
.tchk.on{background:${T.secondary};border-color:${T.secondary};color:white;font-size:11px;font-weight:700;}
.tchk.on::after{content:'✓';}
.tinfo{flex:1;min-width:0;}
.tnm{font-size:13px;font-weight:600;color:${T.gray900};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.tnm.done{text-decoration:line-through;color:${T.gray500};}
.tmeta{font-size:11px;color:${T.gray500};margin-top:2px;display:flex;gap:7px;}
.pri{font-size:10px;font-weight:700;border-radius:6px;padding:2px 8px;flex-shrink:0;}

.fab{position:absolute;bottom:76px;right:18px;width:54px;height:54px;background:${T.primary};
  border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;
  font-size:26px;color:white;line-height:1;box-shadow:0 6px 20px ${T.primary}55;
  z-index:20;transition:transform .2s,box-shadow .2s;}
.fab:hover{transform:scale(1.08);box-shadow:0 8px 26px ${T.primary}66;}
.fab:active{transform:scale(.95);}

.bnav{position:absolute;bottom:0;left:0;right:0;height:70px;background:${T.white};
  border-top:1px solid ${T.gray200};display:flex;align-items:center;padding:0 6px 6px;z-index:10;}
.nv{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;padding:7px 0;
  cursor:pointer;border:none;background:none;font-family:'Inter',sans-serif;transition:opacity .15s;}
.nv:active{opacity:.7;}
.nvic{font-size:19px;line-height:1;}
.nvlbl{font-size:10px;font-weight:600;color:${T.gray500};}
.nv.on .nvlbl{color:${T.primary};}
.nvdot{width:4px;height:4px;border-radius:50%;background:${T.primary};}

/* ── TASKS TAB ── */
.taskscr{height:100%;background:${T.bg};display:flex;flex-direction:column;}
.thdr{background:${T.white};padding:14px 14px 10px;border-bottom:1px solid ${T.gray100};flex-shrink:0;}
.tttl{font-size:20px;font-weight:800;color:${T.gray900};margin-bottom:10px;}
.fchips{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;padding-bottom:2px;}
.fchips::-webkit-scrollbar{display:none;}
.fchip{padding:6px 13px;border-radius:20px;font-size:12px;font-weight:600;white-space:nowrap;
  cursor:pointer;border:none;font-family:'Inter',sans-serif;transition:all .15s;}
.fchip.on{background:${T.primary};color:${T.white};}
.fchip.off{background:${T.gray100};color:${T.gray500};}
.tbody{flex:1;overflow-y:auto;padding:12px 14px 86px;scrollbar-width:none;}
.tbody::-webkit-scrollbar{display:none;}

/* ── PROFILE MENU ── */
.pmenu{position:absolute;top:52px;right:14px;background:${T.white};border-radius:14px;
  box-shadow:0 8px 28px rgba(0,0,0,.14);z-index:30;overflow:hidden;min-width:175px;animation:fadeIn .15s ease;}
.pmi{display:flex;align-items:center;gap:9px;padding:11px 14px;font-size:13px;font-weight:500;
  color:${T.gray700};cursor:pointer;border:none;background:none;width:100%;text-align:left;
  font-family:'Inter',sans-serif;transition:background .1s;}
.pmi:hover{background:${T.gray100};}
.pmi.red{color:${T.red};}
.phr{height:1px;background:${T.gray100};}

/* ── BOTTOM SHEET ── */
.ov{position:absolute;inset:0;background:rgba(15,15,26,.72);z-index:50;backdrop-filter:blur(3px);animation:fadeIn .2s ease;}
.bs{position:absolute;bottom:0;left:0;right:0;background:${T.white};border-radius:26px 26px 0 0;
  z-index:51;animation:slideUp .28s cubic-bezier(.34,1.3,.64,1);max-height:88%;overflow-y:auto;scrollbar-width:none;}
.bs::-webkit-scrollbar{display:none;}
.bh{width:38px;height:4px;background:${T.gray200};border-radius:2px;margin:13px auto 0;}
.bhd{display:flex;align-items:center;justify-content:space-between;padding:14px 18px 10px;}
.bttl{font-size:17px;font-weight:800;color:${T.gray900};}
.bcl{width:28px;height:28px;border-radius:50%;background:${T.gray100};border:none;cursor:pointer;
  font-size:14px;display:flex;align-items:center;justify-content:center;color:${T.gray500};transition:background .15s;}
.bcl:hover{background:${T.gray200};}
.bbody{padding:0 18px;display:flex;flex-direction:column;gap:13px;}
.flbl{font-size:11px;font-weight:700;color:${T.gray500};letter-spacing:.5px;text-transform:uppercase;margin-bottom:5px;}
.finp{width:100%;padding:12px 13px;background:${T.gray100};border:1.5px solid transparent;border-radius:11px;
  font-size:14px;color:${T.gray900};font-family:'Inter',sans-serif;outline:none;
  transition:border-color .2s,box-shadow .2s,background .2s;}
.finp:focus{border-color:${T.primary};background:${T.white};box-shadow:0 0 0 3px ${T.primary}12;}
.finp::placeholder{color:${T.gray300};}
.crow{display:flex;flex-wrap:wrap;gap:6px;}
.chip2{padding:6px 13px;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;
  border:1.5px solid ${T.gray200};background:${T.white};color:${T.gray700};
  font-family:'Inter',sans-serif;transition:all .15s;}
.chip2.sel{border-color:transparent;color:${T.white};}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:9px;}
.btnsv{width:100%;padding:15px;margin-top:5px;margin-bottom:4px;background:${T.primary};border:none;
  border-radius:12px;font-family:'Inter',sans-serif;font-size:15px;font-weight:700;color:${T.white};
  cursor:pointer;box-shadow:0 6px 18px ${T.primary}44;transition:opacity .2s,transform .15s;}
.btnsv:hover{opacity:.91;}
.btnsv:active{transform:scale(.98);}
.btnsv:disabled{opacity:.5;cursor:not-allowed;}

/* ── SUCCESS ── */
.suc{height:100%;background:${T.bg};display:flex;flex-direction:column;align-items:center;
  justify-content:center;padding:28px 24px;gap:14px;text-align:center;}
.suic{width:78px;height:78px;background:linear-gradient(135deg,${T.secondary},${T.secondaryDk});
  border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:34px;
  box-shadow:0 10px 30px ${T.secondary}44;animation:popIn .38s cubic-bezier(.34,1.56,.64,1);}
.suh{font-size:21px;font-weight:800;color:${T.gray900};}
.susub{font-size:13px;color:${T.gray500};line-height:1.5;}
.sucard{width:100%;background:${T.white};border-radius:14px;padding:14px;box-shadow:0 2px 10px rgba(0,0,0,.07);}
.surow{display:flex;justify-content:space-between;padding:7px 0;font-size:13px;border-bottom:1px solid ${T.gray100};}
.surow:last-child{border-bottom:none;}
.sulbl{color:${T.gray500};}
.suval{font-weight:600;color:${T.gray900};}
.lnksm{font-size:13px;color:${T.primary};font-weight:600;cursor:pointer;border:none;background:none;font-family:'Inter',sans-serif;}
.lnksm:hover{text-decoration:underline;}

/* ── PLACEHOLDER TABS ── */
.ph{height:100%;background:${T.bg};display:flex;flex-direction:column;align-items:center;
  justify-content:center;gap:10px;padding:32px;}
.phic{font-size:48px;}
.phttl{font-size:19px;font-weight:800;color:${T.gray900};}
.phsub{font-size:13px;color:${T.gray500};text-align:center;}
.phbdg{background:${T.primaryLt};color:${T.primary};font-size:11px;font-weight:700;
  padding:4px 12px;border-radius:20px;letter-spacing:.5px;}
`;

// ─── STATUS BAR ───────────────────────────────────────────────
function SBar({ light = false }) {
  const t = new Date().toLocaleTimeString("es-CO", { hour:"2-digit", minute:"2-digit" });
  return (
    <div className={`sbar ${light ? "lt" : "dk"}`}>
      <span>{t}</span>
      <div className="sicons">
        <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor">
          <rect x="0" y="5" width="3" height="6" rx="1" opacity=".4"/>
          <rect x="4" y="3" width="3" height="8" rx="1" opacity=".6"/>
          <rect x="8" y="1" width="3" height="10" rx="1" opacity=".85"/>
          <rect x="12" y="0" width="3" height="11" rx="1"/>
        </svg>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor">
          <path d="M7.5 2.8C9.7 2.8 11.7 3.7 13.1 5.1L14.2 4C12.5 2.3 10.1 1.2 7.5 1.2S2.5 2.3.8 4L1.9 5.1C3.3 3.7 5.3 2.8 7.5 2.8Z" opacity=".45"/>
          <path d="M7.5 5.5C9 5.5 10.3 6.1 11.2 7L12.3 5.9C11.1 4.7 9.4 3.9 7.5 3.9S3.9 4.7 2.7 5.9L3.8 7C4.7 6.1 6 5.5 7.5 5.5Z" opacity=".75"/>
          <circle cx="7.5" cy="9.5" r="1.5"/>
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="currentColor">
          <rect x=".5" y=".5" width="21" height="11" rx="3.5" stroke="currentColor" strokeOpacity=".35" fill="none"/>
          <rect x="2" y="2" width="16" height="8" rx="2" fill="currentColor"/>
          <path d="M23 4.5V7.5C23.8 7.2 24.5 6.5 24.5 6S23.8 4.8 23 4.5Z" fill="currentColor" opacity=".4"/>
        </svg>
      </div>
    </div>
  );
}

// ─── TASK CARD ────────────────────────────────────────────────
function TC({ task, onToggle }) {
  const ps  = PRI[task.priority];
  const cat = CATEGORIES.find(c => c.label === task.category);
  return (
    <div className={`tc ${task.done ? "done" : ""}`}>
      <div className="tcstrip" style={{ background: task.color }} />
      <div className={`tchk ${task.done ? "on" : ""}`}
        style={{ borderColor: task.done ? T.secondary : T.gray300 }}
        onClick={e => { e.stopPropagation(); onToggle(task.id); }} />
      <div className="tinfo">
        <div className={`tnm ${task.done ? "done" : ""}`}>{task.title}</div>
        <div className="tmeta">
          <span>🕐 {task.time}</span>
          <span>{cat?.icon} {task.category}</span>
        </div>
      </div>
      <div className="pri" style={{ background: ps.bg, color: ps.text }}>{task.priority}</div>
    </div>
  );
}

// ─── SPLASH ───────────────────────────────────────────────────
function Splash() {
  return (
    <div className="splash">
      <div className="sp-logo">📋</div>
      <div className="sp-app">TaskFlow</div>
      <div className="sp-tag">Organiza tu día, controla tu tiempo</div>
      <div className="sp-bar"><div className="sp-fill" /></div>
    </div>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────
function Login({ onLogin, onReg }) {
  const [email, setEmail] = useState("");
  const [pass, setPass]   = useState("");
  const [show, setShow]   = useState(false);
  const [err, setErr]     = useState("");
  const [busy, setBusy]   = useState(false);

  const submit = () => {
    setErr("");
    if (!email || !pass) { setErr("Completa correo y contraseña."); return; }
    setBusy(true);
    setTimeout(() => {
      const u = MOCK_USERS.find(u => u.email === email && u.password === pass);
      if (u) onLogin(u);
      else { setErr("Credenciales incorrectas.\nPrueba: juan@taskflow.app / 123456"); setBusy(false); }
    }, 800);
  };

  return (
    <div className="aw sin">
      <SBar />
      <div className="ahero">
        <div className="alogo">📋</div>
        <div className="ah1">Bienvenido<br/>de vuelta</div>
        <div className="asub">Inicia sesión para continuar</div>
      </div>
      <div className="abody">
        {err && <div className="err">⚠️ <span style={{whiteSpace:"pre-line"}}>{err}</span></div>}
        <div>
          <div className="lbl">Correo electrónico</div>
          <div className="iw">
            <span>✉️</span>
            <input type="email" placeholder="tu@correo.com" value={email}
              onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} />
          </div>
        </div>
        <div>
          <div className="lbl">Contraseña</div>
          <div className="iw">
            <span>🔒</span>
            <input type={show?"text":"password"} placeholder="••••••••" value={pass}
              onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} />
            <span style={{cursor:"pointer",opacity:.5,fontSize:13}} onClick={()=>setShow(!show)}>
              {show?"🙈":"👁️"}
            </span>
          </div>
        </div>
        <div style={{textAlign:"right"}}>
          <button className="lnk" style={{fontSize:12}}>¿Olvidaste tu contraseña?</button>
        </div>
        <button className="btnp" onClick={submit} disabled={busy}>
          {busy ? "Ingresando..." : "Iniciar Sesión"}
        </button>
        <div className="div">o continúa con</div>
        <div className="srow">
          <button className="btns">🌐 Google</button>
          <button className="btns"> Apple</button>
        </div>
      </div>
      <div className="afoot">
        ¿No tienes cuenta?{" "}
        <button className="lnk" onClick={onReg}>Regístrate</button>
      </div>
    </div>
  );
}

// ─── REGISTER ────────────────────────────────────────────────
function Register({ onDone, onLogin }) {
  const [f, setF]   = useState({ name:"", email:"", pass:"", pass2:"" });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (k,v) => setF(p => ({...p,[k]:v}));

  const submit = () => {
    setErr("");
    if (!f.name||!f.email||!f.pass||!f.pass2) { setErr("Completa todos los campos."); return; }
    if (f.pass !== f.pass2) { setErr("Las contraseñas no coinciden."); return; }
    if (f.pass.length < 6) { setErr("Mínimo 6 caracteres en la contraseña."); return; }
    setBusy(true);
    setTimeout(() => {
      const u = { email:f.email, password:f.pass, name:f.name,
        avatar: f.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase() };
      MOCK_USERS.push(u);
      onDone(u);
    }, 900);
  };

  const fields = [
    { k:"name",  lbl:"Nombre completo",      type:"text",     ic:"👤", ph:"Juan Carlos García" },
    { k:"email", lbl:"Correo electrónico",   type:"email",    ic:"✉️", ph:"tu@correo.com" },
    { k:"pass",  lbl:"Contraseña",           type:"password", ic:"🔒", ph:"Mínimo 6 caracteres" },
    { k:"pass2", lbl:"Confirmar contraseña", type:"password", ic:"🔐", ph:"Repite tu contraseña" },
  ];

  return (
    <div className="aw sin">
      <SBar />
      <div className="ahero" style={{background:`linear-gradient(160deg,${T.dark1} 0%,${T.dark2} 50%,${T.primary3}44 100%)`}}>
        <div className="alogo" style={{background:T.secondary,boxShadow:`0 8px 24px ${T.secondary}55`}}>✨</div>
        <div className="ah1">Crea tu<br/>cuenta</div>
        <div className="asub">Empieza a organizar tu día</div>
      </div>
      <div className="abody">
        {err && <div className="err">⚠️ {err}</div>}
        {fields.map(fi => (
          <div key={fi.k}>
            <div className="lbl">{fi.lbl}</div>
            <div className="iw">
              <span>{fi.ic}</span>
              <input type={fi.type} placeholder={fi.ph} value={f[fi.k]}
                onChange={e=>set(fi.k,e.target.value)} />
            </div>
          </div>
        ))}
        <button className="btnp" onClick={submit} disabled={busy}>
          {busy ? "Creando cuenta..." : "Crear Cuenta"}
        </button>
      </div>
      <div className="afoot">
        ¿Ya tienes cuenta?{" "}
        <button className="lnk" onClick={onLogin}>Inicia sesión</button>
      </div>
    </div>
  );
}

// ─── HOME SCREEN ─────────────────────────────────────────────
function HomeScreen({ user, tasks, onToggle, onFab, onLogout, tab, setTab }) {
  const [menu, setMenu] = useState(false);
  const [fcat, setFcat] = useState("Todas");
  const menuRef = useRef(null);

  const done  = tasks.filter(t=>t.done).length;
  const pct   = Math.round((done/tasks.length)*100);
  const dstr  = new Date().toLocaleDateString("es-CO",{weekday:"short",day:"numeric",month:"short"});
  const pending = tasks.filter(t=>!t.done);
  const completed = tasks.filter(t=>t.done);
  const filtered  = fcat==="Todas" ? tasks : tasks.filter(t=>t.category===fcat);
  const catCounts = CATEGORIES.map(c=>({...c, pend:tasks.filter(t=>t.category===c.label&&!t.done).length}));

  useEffect(() => {
    const h = e => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenu(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const navs = [
    {id:"home",ic:"🏠",lbl:"Home"},
    {id:"tasks",ic:"✅",lbl:"Tareas"},
    {id:"calendar",ic:"📅",lbl:"Calendario"},
    {id:"discover",ic:"⭐",lbl:"Descubrir"},
  ];

  return (
    <div className="home">
      {/* HOME TAB */}
      {tab==="home" && <>
        <SBar />
        <div className="hhdr">
          <div className="hrow">
            <div>
              <div className="hgsm">¡Buenas tardes! 👋</div>
              <div className="hnm">{user.name}</div>
            </div>
            <div style={{position:"relative"}} ref={menuRef}>
              <div className="hav" onClick={()=>setMenu(!menu)}>{user.avatar}</div>
              {menu && (
                <div className="pmenu">
                  <div style={{padding:"11px 14px 8px"}}>
                    <div style={{fontSize:13,fontWeight:700,color:T.gray900}}>{user.name}</div>
                    <div style={{fontSize:11,color:T.gray500}}>{user.email}</div>
                  </div>
                  <div className="phr"/>
                  <button className="pmi">⚙️ Configuración</button>
                  <button className="pmi">🔔 Notificaciones</button>
                  <div className="phr"/>
                  <button className="pmi red" onClick={onLogout}>🚪 Cerrar sesión</button>
                </div>
              )}
            </div>
          </div>
          <div className="dchip">📅 {dstr}</div>
          <div className="plbl">
            <span>{done} de {tasks.length} tareas completadas</span>
            <span className="ppct">{pct}%</span>
          </div>
          <div className="pbar">
            <div className="pfill" style={{width:`${pct}%`}}/>
          </div>
        </div>

        <div className="hbody">
          <div className="sttl">Categorías</div>
          <div className="cats">
            {catCounts.map(c=>(
              <div className="cat" key={c.label}
                style={{borderBottom:`3px solid ${c.color}`}}
                onClick={()=>{setTab("tasks");setFcat(c.label);}}>
                <div className="cic">{c.icon}</div>
                <div className="cnm">{c.label}</div>
                <div className="cct">{c.pend} pend.</div>
              </div>
            ))}
          </div>

          <div className="sttl">Pendientes de hoy</div>
          {pending.length===0
            ? <div style={{textAlign:"center",color:T.gray400,padding:"20px 0",fontSize:13}}>🎉 ¡Sin pendientes!</div>
            : pending.map(t=><TC key={t.id} task={t} onToggle={onToggle}/>)
          }
          {completed.length>0 && <>
            <div className="sttl" style={{marginTop:18}}>Completadas ✓</div>
            {completed.map(t=><TC key={t.id} task={t} onToggle={onToggle}/>)}
          </>}
        </div>
      </>}

      {/* TASKS TAB */}
      {tab==="tasks" && (
        <div className="taskscr sin">
          <SBar light/>
          <div className="thdr">
            <div className="tttl">Mis Tareas</div>
            <div className="fchips">
              {["Todas",...CATEGORIES.map(c=>c.label)].map(f=>(
                <button key={f} className={`fchip ${fcat===f?"on":"off"}`} onClick={()=>setFcat(f)}>{f}</button>
              ))}
            </div>
          </div>
          <div className="tbody">
            {filtered.length===0
              ? <div style={{textAlign:"center",color:T.gray400,padding:"40px 0",fontSize:13}}>Sin tareas aquí</div>
              : filtered.map(t=><TC key={t.id} task={t} onToggle={onToggle}/>)
            }
          </div>
        </div>
      )}

      {/* CALENDAR TAB */}
      {tab==="calendar" && (
        <div className="ph sin">
          <SBar light/>
          <div className="phic">📅</div>
          <div className="phttl">Calendario</div>
          <div className="phsub">Vista de día, semana y mes.<br/>Integración con tus tareas.</div>
          <div className="phbdg">PRÓXIMAMENTE</div>
        </div>
      )}

      {/* DISCOVER TAB */}
      {tab==="discover" && (
        <div className="ph sin">
          <SBar light/>
          <div className="phic">⭐</div>
          <div className="phttl">Descubrir</div>
          <div className="phsub">Recomendaciones personalizadas<br/>basadas en tus hábitos.</div>
          <div className="phbdg">PRÓXIMAMENTE</div>
        </div>
      )}

      {/* FAB */}
      <button className="fab" onClick={onFab}>＋</button>

      {/* BOTTOM NAV */}
      <div className="bnav">
        {navs.map(n=>(
          <button key={n.id} className={`nv ${tab===n.id?"on":""}`} onClick={()=>setTab(n.id)}>
            <span className="nvic">{n.ic}</span>
            <span className="nvlbl">{n.lbl}</span>
            {tab===n.id && <div className="nvdot"/>}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── CREATE MODAL ────────────────────────────────────────────
function CreateModal({ onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [date, setDate]   = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime]   = useState("09:00");
  const [cat, setCat]     = useState("Trabajo");
  const [pri, setPri]     = useState("Media");
  const [desc, setDesc]   = useState("");

  const save = () => {
    if (!title.trim()) return;
    onSave({ title:title.trim(), date, time, category:cat, priority:pri, desc });
  };

  return (
    <>
      <div className="ov" onClick={onClose}/>
      <div className="bs">
        <div className="bh"/>
        <div className="bhd">
          <div className="bttl">Nueva tarea</div>
          <button className="bcl" onClick={onClose}>✕</button>
        </div>
        <div className="bbody">
          <div>
            <div className="flbl">Título *</div>
            <input className="finp" placeholder="¿Qué necesitas hacer?" value={title}
              onChange={e=>setTitle(e.target.value)} autoFocus/>
          </div>
          <div className="g2">
            <div>
              <div className="flbl">Fecha</div>
              <input className="finp" type="date" value={date} onChange={e=>setDate(e.target.value)}/>
            </div>
            <div>
              <div className="flbl">Hora</div>
              <input className="finp" type="time" value={time} onChange={e=>setTime(e.target.value)}/>
            </div>
          </div>
          <div>
            <div className="flbl">Categoría</div>
            <div className="crow">
              {CATEGORIES.map(c=>(
                <button key={c.label}
                  className={`chip2 ${cat===c.label?"sel":""}`}
                  style={cat===c.label?{background:c.color}:{}}
                  onClick={()=>setCat(c.label)}>
                  {c.icon} {c.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="flbl">Prioridad</div>
            <div className="crow">
              {["Alta","Media","Baja"].map(p=>{
                const ps = PRI[p];
                return (
                  <button key={p}
                    className={`chip2 ${pri===p?"sel":""}`}
                    style={pri===p?{background:ps.text}:{}}
                    onClick={()=>setPri(p)}>
                    {p}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <div className="flbl">Descripción (opcional)</div>
            <textarea className="finp" placeholder="Detalles adicionales..."
              rows={2} style={{resize:"none",lineHeight:1.5}}
              value={desc} onChange={e=>setDesc(e.target.value)}/>
          </div>
          <button className="btnsv" onClick={save} disabled={!title.trim()}>
            Guardar tarea
          </button>
        </div>
      </div>
    </>
  );
}

// ─── SUCCESS ─────────────────────────────────────────────────
function SuccessScreen({ task, onBack, onMore }) {
  const cat = CATEGORIES.find(c=>c.label===task.category);
  const timeFmt = task.time
    ? new Date(`2000-01-01T${task.time}`).toLocaleTimeString("es-CO",{hour:"2-digit",minute:"2-digit"})
    : task.time;
  const dateFmt = new Date(task.date+"T12:00").toLocaleDateString("es-CO",{day:"numeric",month:"long"});

  return (
    <div className="suc sin">
      <div className="suic">✓</div>
      <div className="suh">¡Tarea creada!</div>
      <div className="susub">Tu actividad fue guardada correctamente.</div>
      <div className="sucard">
        {[
          ["Tarea",     task.title],
          ["Fecha",     dateFmt],
          ["Hora",      timeFmt],
          ["Categoría", `${cat?.icon||"📌"} ${task.category}`],
          ["Prioridad", task.priority],
        ].map(([l,v])=>(
          <div className="surow" key={l}>
            <span className="sulbl">{l}</span>
            <span className="suval"
              style={l==="Prioridad"?{color:PRI[v]?.text}:{}}>{v}</span>
          </div>
        ))}
      </div>
      <button className="btnp" style={{marginTop:4,width:"100%"}} onClick={onBack}>
        Volver al inicio
      </button>
      <button className="lnksm" onClick={onMore}>Agregar otra tarea</button>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("splash");
  const [user, setUser]     = useState(null);
  const [tasks, setTasks]   = useState(INITIAL_TASKS);
  const [modal, setModal]   = useState(false);
  const [last, setLast]     = useState(null);
  const [tab, setTab]       = useState("home");

  useEffect(() => {
    if (screen === "splash") {
      const id = setTimeout(() => setScreen("login"), 2400);
      return () => clearTimeout(id);
    }
  }, [screen]);

  const login  = u => { setUser(u); setScreen("home"); };
  const logout = () => { setUser(null); setScreen("login"); setTab("home"); };
  const toggle = id => setTasks(ts => ts.map(t => t.id===id ? {...t,done:!t.done} : t));

  const save = data => {
    const cat = CATEGORIES.find(c=>c.label===data.category);
    const timeFmt = data.time
      ? new Date(`2000-01-01T${data.time}`).toLocaleTimeString("es-CO",{hour:"2-digit",minute:"2-digit"})
      : "Sin hora";
    setTasks(ts => [{
      id:Date.now(), ...data, done:false,
      color:cat?.color||T.primary, time:timeFmt
    }, ...ts]);
    setLast(data);
    setModal(false);
    setScreen("success");
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="shell">
        <div className="notch">
          <div className="nc"/>
          <div className="np"/>
        </div>
        <div className="screen">
          {screen==="splash"   && <Splash/>}
          {screen==="login"    && <Login onLogin={login} onReg={()=>setScreen("register")}/>}
          {screen==="register" && <Register onDone={login} onLogin={()=>setScreen("login")}/>}
          {screen==="home" && user && (
            <>
              <HomeScreen user={user} tasks={tasks} onToggle={toggle}
                onFab={()=>setModal(true)} onLogout={logout}
                tab={tab} setTab={setTab}/>
              {modal && <CreateModal onClose={()=>setModal(false)} onSave={save}/>}
            </>
          )}
          {screen==="success" && last && (
            <>
              <SBar light/>
              <SuccessScreen task={last}
                onBack={()=>{ setScreen("home"); setTab("home"); }}
                onMore={()=>{ setScreen("home"); setTab("home"); setModal(true); }}/>
            </>
          )}
        </div>
      </div>
    </>
  );
}
