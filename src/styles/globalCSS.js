import { COLORS as C } from "../constants/theme";

export const globalCSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{background:#08081A;display:flex;justify-content:center;align-items:center;min-height:100vh;font-family:'Inter',sans-serif;}

.shell{width:390px;height:844px;background:${C.dark1};border-radius:44px;overflow:hidden;position:relative;
  box-shadow:0 0 0 1px #2D2A6E,0 0 0 10px #08081A,0 32px 80px rgba(0,0,0,.85),0 0 100px rgba(79,70,229,.13);}
.screen{width:100%;height:100%;overflow:hidden;position:relative;}

.notch{position:absolute;top:0;left:50%;transform:translateX(-50%);width:126px;height:36px;background:${C.dark1};
  border-radius:0 0 22px 22px;z-index:100;display:flex;align-items:center;justify-content:center;gap:7px;}
.nc{width:11px;height:11px;background:#2D2A6E;border-radius:50%;}
.np{width:52px;height:6px;background:#2D2A6E;border-radius:3px;}

.sbar{height:46px;display:flex;align-items:flex-end;justify-content:space-between;padding:0 24px 10px;font-size:12px;font-weight:600;position:relative;z-index:10;}
.sbar.dk{color:rgba(255,255,255,.75);}
.sbar.lt{color:${C.gray700};}
.sicons{display:flex;gap:5px;align-items:center;}

@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
@keyframes popIn{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}
@keyframes sIn{from{opacity:0;transform:translateX(16px)}to{opacity:1;transform:translateX(0)}}
@keyframes loadBar{from{width:0%}to{width:100%}}
.sin{animation:sIn .22s ease;}

/* SPLASH */
.splash{height:100%;background:linear-gradient(160deg,${C.dark1} 0%,${C.dark2} 55%,${C.dark3} 100%);
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;position:relative;overflow:hidden;}
.splash::before{content:'';position:absolute;top:-80px;right:-80px;width:260px;height:260px;border-radius:50%;
  background:radial-gradient(circle,${C.primary}30,transparent 70%);}
.splash::after{content:'';position:absolute;bottom:-60px;left:-60px;width:200px;height:200px;border-radius:50%;
  background:radial-gradient(circle,${C.secondary}20,transparent 70%);}
.sp-logo{width:76px;height:76px;background:${C.primary};border-radius:24px;display:flex;align-items:center;
  justify-content:center;font-size:36px;box-shadow:0 12px 36px ${C.primary}66;position:relative;z-index:1;}
.sp-app{font-size:36px;font-weight:800;color:${C.white};letter-spacing:-1px;position:relative;z-index:1;}
.sp-tag{font-size:13px;color:${C.primarySoft};position:relative;z-index:1;}
.sp-bar{width:100px;height:4px;background:rgba(255,255,255,.15);border-radius:2px;overflow:hidden;margin-top:16px;position:relative;z-index:1;}
.sp-fill{height:100%;background:${C.primary};border-radius:2px;animation:loadBar 2.1s cubic-bezier(.4,0,.2,1) forwards;}

/* AUTH */
.aw{height:100%;overflow-y:auto;scrollbar-width:none;background:${C.dark1};}
.aw::-webkit-scrollbar{display:none;}
.ahero{background:linear-gradient(160deg,${C.dark1} 0%,${C.dark2} 50%,${C.dark3}88 100%);
  padding:56px 28px 44px;position:relative;overflow:hidden;}
.ahero::before{content:'';position:absolute;top:-70px;right:-70px;width:240px;height:240px;border-radius:50%;
  background:radial-gradient(circle,${C.primary}28,transparent 70%);}
.ahero::after{content:'';position:absolute;bottom:-50px;left:-50px;width:180px;height:180px;border-radius:50%;
  background:radial-gradient(circle,${C.secondary}18,transparent 70%);}
.alogo{width:52px;height:52px;background:${C.primary};border-radius:16px;display:flex;align-items:center;
  justify-content:center;font-size:24px;box-shadow:0 8px 24px ${C.primary}55;margin-bottom:18px;position:relative;z-index:1;}
.ah1{font-size:26px;font-weight:800;color:${C.white};line-height:1.2;position:relative;z-index:1;}
.asub{font-size:13px;color:${C.primarySoft};margin-top:5px;position:relative;z-index:1;}
.abody{padding:28px 22px 20px;display:flex;flex-direction:column;gap:14px;}
.afoot{text-align:center;padding:6px 0 16px;font-size:13px;color:${C.gray500};}

.lbl{font-size:11px;font-weight:600;color:${C.gray500};letter-spacing:.6px;text-transform:uppercase;margin-bottom:5px;}
.iw{display:flex;align-items:center;gap:10px;background:#12112A;border:1.5px solid #2D2A6E;
  border-radius:12px;padding:0 14px;transition:border-color .2s,box-shadow .2s;}
.iw:focus-within{border-color:${C.primary};box-shadow:0 0 0 3px ${C.primary}22;}
.iw span{font-size:15px;opacity:.55;flex-shrink:0;}
.iw input{flex:1;padding:13px 0;background:transparent;border:none;outline:none;font-size:14px;
  color:${C.white};font-family:'Inter',sans-serif;}
.iw input::placeholder{color:#4B5A6B;}

.btnp{width:100%;padding:15px;background:${C.primary};border:none;border-radius:12px;
  font-family:'Inter',sans-serif;font-size:15px;font-weight:700;color:${C.white};cursor:pointer;
  box-shadow:0 6px 20px ${C.primary}44;transition:opacity .2s,transform .15s;}
.btnp:hover{opacity:.91;}
.btnp:active{transform:scale(.98);}
.btnp:disabled{opacity:.6;cursor:not-allowed;}

.div{display:flex;align-items:center;gap:10px;font-size:12px;color:${C.gray500};}
.div::before,.div::after{content:'';flex:1;height:1px;background:#2D2A6E;}
.srow{display:flex;gap:9px;}
.btns{flex:1;padding:11px;background:#12112A;border:1.5px solid #2D2A6E;border-radius:12px;cursor:pointer;
  font-size:13px;font-weight:500;color:${C.gray500};display:flex;align-items:center;justify-content:center;
  gap:7px;font-family:'Inter',sans-serif;transition:border-color .2s,color .2s;}
.btns:hover{border-color:${C.primary};color:${C.primarySoft};}
.lnk{color:${C.primary};font-weight:600;cursor:pointer;background:none;border:none;font-size:13px;font-family:'Inter',sans-serif;}
.lnk:hover{text-decoration:underline;}
.err{background:#1F0F0F;border:1px solid ${C.red}44;border-radius:10px;padding:10px 13px;
  font-size:12px;color:${C.red};display:flex;align-items:flex-start;gap:7px;line-height:1.5;}

/* HOME */
.home{height:100%;background:${C.bg};display:flex;flex-direction:column;}
.hhdr{background:${C.primary};padding:14px 18px 20px;flex-shrink:0;position:relative;overflow:hidden;}
.hhdr::after{content:'';position:absolute;bottom:-40px;right:-40px;width:130px;height:130px;border-radius:50%;
  background:radial-gradient(circle,rgba(255,255,255,.08),transparent);}
.hrow{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;}
.hgsm{font-size:11px;color:rgba(255,255,255,.7);margin-bottom:2px;}
.hnm{font-size:17px;font-weight:700;color:${C.white};}
.hav{width:38px;height:38px;background:rgba(255,255,255,.2);border:2px solid rgba(255,255,255,.35);
  border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;
  color:${C.white};cursor:pointer;transition:background .2s;}
.hav:hover{background:rgba(255,255,255,.3);}
.dchip{display:inline-flex;align-items:center;gap:5px;background:rgba(255,255,255,.16);border-radius:20px;
  padding:4px 11px;font-size:11px;color:${C.white};margin-bottom:11px;position:relative;z-index:1;}
.plbl{display:flex;justify-content:space-between;font-size:11px;color:rgba(255,255,255,.75);margin-bottom:5px;}
.ppct{color:${C.secondary};font-weight:700;}
.pbar{height:5px;background:rgba(255,255,255,.2);border-radius:3px;overflow:hidden;}
.pfill{height:100%;background:${C.secondary};border-radius:3px;transition:width .7s cubic-bezier(.4,0,.2,1);}

.hbody{flex:1;overflow-y:auto;padding:14px 14px 86px;scrollbar-width:none;}
.hbody::-webkit-scrollbar{display:none;}
.sttl{font-size:11px;font-weight:700;color:${C.gray500};text-transform:uppercase;
  letter-spacing:.8px;margin-bottom:9px;margin-top:16px;}
.sttl:first-child{margin-top:0;}

.cats{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;}
.cat{background:${C.white};border-radius:12px;padding:9px 5px;text-align:center;cursor:pointer;
  box-shadow:0 1px 3px rgba(0,0,0,.06);transition:transform .15s,box-shadow .15s;}
.cat:hover{transform:translateY(-2px);box-shadow:0 4px 10px rgba(0,0,0,.09);}
.cat:active{transform:scale(.95);}
.cic{font-size:19px;margin-bottom:3px;}
.cnm{font-size:9px;font-weight:600;color:${C.gray700};}
.cct{font-size:8px;color:${C.gray500};margin-top:1px;}

.tc{background:${C.white};border-radius:14px;padding:11px 13px;margin-bottom:7px;
  display:flex;align-items:center;gap:9px;box-shadow:0 1px 3px rgba(0,0,0,.05);
  cursor:pointer;position:relative;overflow:hidden;transition:transform .15s,box-shadow .15s;}
.tc:hover{transform:translateY(-1px);box-shadow:0 3px 10px rgba(0,0,0,.07);}
.tc.done{opacity:.52;}
.tcstrip{position:absolute;left:0;top:0;bottom:0;width:4px;border-radius:14px 0 0 14px;}
.tchk{width:21px;height:21px;border-radius:50%;flex-shrink:0;border:2px solid ${C.gray300};
  display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;}
.tchk.on{background:${C.secondary};border-color:${C.secondary};color:white;font-size:11px;font-weight:700;}
.tchk.on::after{content:'✓';}
.tinfo{flex:1;min-width:0;}
.tnm{font-size:13px;font-weight:600;color:${C.gray900};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.tnm.done{text-decoration:line-through;color:${C.gray500};}
.tmeta{font-size:11px;color:${C.gray500};margin-top:2px;display:flex;gap:7px;}
.pri{font-size:10px;font-weight:700;border-radius:6px;padding:2px 8px;flex-shrink:0;}

.fab{position:absolute;bottom:76px;right:18px;width:54px;height:54px;background:${C.primary};
  border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;
  font-size:26px;color:white;line-height:1;box-shadow:0 6px 20px ${C.primary}55;z-index:20;
  transition:transform .2s,box-shadow .2s;}
.fab:hover{transform:scale(1.08);box-shadow:0 8px 26px ${C.primary}66;}
.fab:active{transform:scale(.95);}

.bnav{position:absolute;bottom:0;left:0;right:0;height:70px;background:${C.white};
  border-top:1px solid ${C.gray200};display:flex;align-items:center;padding:0 6px 6px;z-index:10;}
.nv{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;padding:7px 0;
  cursor:pointer;border:none;background:none;font-family:'Inter',sans-serif;transition:opacity .15s;}
.nv:active{opacity:.7;}
.nvic{font-size:19px;line-height:1;}
.nvlbl{font-size:10px;font-weight:600;color:${C.gray500};}
.nv.on .nvlbl{color:${C.primary};}
.nvdot{width:4px;height:4px;border-radius:50%;background:${C.primary};}

/* TASKS TAB */
.taskscr{height:100%;background:${C.bg};display:flex;flex-direction:column;}
.thdr{background:${C.white};padding:14px 14px 10px;border-bottom:1px solid ${C.gray100};flex-shrink:0;}
.tttl{font-size:20px;font-weight:800;color:${C.gray900};margin-bottom:10px;}
.fchips{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;padding-bottom:2px;}
.fchips::-webkit-scrollbar{display:none;}
.fchip{padding:6px 13px;border-radius:20px;font-size:12px;font-weight:600;white-space:nowrap;
  cursor:pointer;border:none;font-family:'Inter',sans-serif;transition:all .15s;}
.fchip.on{background:${C.primary};color:${C.white};}
.fchip.off{background:${C.gray100};color:${C.gray500};}
.tbody{flex:1;overflow-y:auto;padding:12px 14px 86px;scrollbar-width:none;}
.tbody::-webkit-scrollbar{display:none;}

/* PROFILE MENU */
.pmenu{position:absolute;top:52px;right:14px;background:${C.white};border-radius:14px;
  box-shadow:0 8px 28px rgba(0,0,0,.14);z-index:30;overflow:hidden;min-width:175px;animation:fadeIn .15s ease;}
.pmi{display:flex;align-items:center;gap:9px;padding:11px 14px;font-size:13px;font-weight:500;
  color:${C.gray700};cursor:pointer;border:none;background:none;width:100%;text-align:left;
  font-family:'Inter',sans-serif;transition:background .1s;}
.pmi:hover{background:${C.gray100};}
.pmi.red{color:${C.red};}
.phr{height:1px;background:${C.gray100};}

/* BOTTOM SHEET */
.ov{position:absolute;inset:0;background:rgba(15,15,26,.72);z-index:50;backdrop-filter:blur(3px);animation:fadeIn .2s ease;}
.bs{position:absolute;bottom:0;left:0;right:0;background:${C.white};border-radius:26px 26px 0 0;
  z-index:51;animation:slideUp .28s cubic-bezier(.34,1.3,.64,1);max-height:88%;overflow-y:auto;scrollbar-width:none;}
.bs::-webkit-scrollbar{display:none;}
.bh{width:38px;height:4px;background:${C.gray200};border-radius:2px;margin:13px auto 0;}
.bhd{display:flex;align-items:center;justify-content:space-between;padding:14px 18px 10px;}
.bttl{font-size:17px;font-weight:800;color:${C.gray900};}
.bcl{width:28px;height:28px;border-radius:50%;background:${C.gray100};border:none;cursor:pointer;
  font-size:14px;display:flex;align-items:center;justify-content:center;color:${C.gray500};transition:background .15s;}
.bcl:hover{background:${C.gray200};}
.bbody{padding:0 18px;display:flex;flex-direction:column;gap:13px;}
.flbl{font-size:11px;font-weight:700;color:${C.gray500};letter-spacing:.5px;text-transform:uppercase;margin-bottom:5px;}
.finp{width:100%;padding:12px 13px;background:${C.gray100};border:1.5px solid transparent;border-radius:11px;
  font-size:14px;color:${C.gray900};font-family:'Inter',sans-serif;outline:none;
  transition:border-color .2s,box-shadow .2s,background .2s;}
.finp:focus{border-color:${C.primary};background:${C.white};box-shadow:0 0 0 3px ${C.primary}12;}
.finp::placeholder{color:${C.gray300};}
.crow{display:flex;flex-wrap:wrap;gap:6px;}
.chip2{padding:6px 13px;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;
  border:1.5px solid ${C.gray200};background:${C.white};color:${C.gray700};
  font-family:'Inter',sans-serif;transition:all .15s;}
.chip2.sel{border-color:transparent;color:${C.white};}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:9px;}
.btnsv{width:100%;padding:15px;margin-top:5px;margin-bottom:4px;background:${C.primary};border:none;
  border-radius:12px;font-family:'Inter',sans-serif;font-size:15px;font-weight:700;color:${C.white};
  cursor:pointer;box-shadow:0 6px 18px ${C.primary}44;transition:opacity .2s,transform .15s;}
.btnsv:hover{opacity:.91;}
.btnsv:active{transform:scale(.98);}
.btnsv:disabled{opacity:.5;cursor:not-allowed;}

/* SUCCESS */
.suc{height:100%;background:${C.bg};display:flex;flex-direction:column;align-items:center;
  justify-content:center;padding:28px 24px;gap:14px;text-align:center;}
.suic{width:78px;height:78px;background:linear-gradient(135deg,${C.secondary},${C.secondaryDk});
  border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:34px;
  box-shadow:0 10px 30px ${C.secondary}44;animation:popIn .38s cubic-bezier(.34,1.56,.64,1);}
.suh{font-size:21px;font-weight:800;color:${C.gray900};}
.susub{font-size:13px;color:${C.gray500};line-height:1.5;}
.sucard{width:100%;background:${C.white};border-radius:14px;padding:14px;box-shadow:0 2px 10px rgba(0,0,0,.07);}
.surow{display:flex;justify-content:space-between;padding:7px 0;font-size:13px;border-bottom:1px solid ${C.gray100};}
.surow:last-child{border-bottom:none;}
.sulbl{color:${C.gray500};}
.suval{font-weight:600;color:${C.gray900};}
.lnksm{font-size:13px;color:${C.primary};font-weight:600;cursor:pointer;border:none;background:none;font-family:'Inter',sans-serif;}
.lnksm:hover{text-decoration:underline;}

/* PLACEHOLDER TABS */
.ph{height:100%;background:${C.bg};display:flex;flex-direction:column;align-items:center;
  justify-content:center;gap:10px;padding:32px;}
.phic{font-size:48px;}
.phttl{font-size:19px;font-weight:800;color:${C.gray900};}
.phsub{font-size:13px;color:${C.gray500};text-align:center;}
.phbdg{background:${C.primaryLt};color:${C.primary};font-size:11px;font-weight:700;padding:4px 12px;border-radius:20px;letter-spacing:.5px;}
`;
