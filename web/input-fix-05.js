(()=>{
  if(window.__animeBreakInputFix05)return;
  window.__animeBreakInputFix05=true;

  const nativeGetGamepads=navigator.getGamepads?navigator.getGamepads.bind(navigator):()=>[];
  const touchAxes=[0,0,0,0];
  const touchButtons=Array.from({length:18},()=>false);
  let touchStickActive=false;

  function buttonObj(pressed){return {pressed:!!pressed,touched:!!pressed,value:pressed?1:0}}
  function firstPhysicalPad(){
    const pads=nativeGetGamepads()||[];
    for(const p of pads){if(p&&p.connected)return p}
    return null;
  }
  function physPressed(p,i){return !!(p&&p.buttons&&p.buttons[i]&&p.buttons[i].pressed)}

  function mergedPad(){
    const p=firstPhysicalPad();
    const axes=[0,0,0,0];
    if(p&&p.axes){for(let i=0;i<Math.min(4,p.axes.length);i++)axes[i]=p.axes[i]||0}
    if(touchStickActive){axes[0]=touchAxes[0];axes[1]=touchAxes[1]}

    const b=Array.from({length:18},()=>buttonObj(false));
    // Remapeamento para o esquema que a build 0.4 espera internamente.
    // DualSense/Xbox: Quadrado/X=ataque, Triângulo/Y=skill, X/A=dash,
    // Círculo/B ou L1=defesa, R2/RT=ultimate, R3=lock-on.
    b[0]=buttonObj(touchButtons[0]||physPressed(p,2));
    b[2]=buttonObj(touchButtons[2]||physPressed(p,3));
    b[1]=buttonObj(touchButtons[1]||physPressed(p,0));
    b[3]=buttonObj(touchButtons[3]||physPressed(p,7));
    b[4]=buttonObj(touchButtons[4]||physPressed(p,1)||physPressed(p,4));
    b[10]=buttonObj(touchButtons[10]||physPressed(p,11));

    return {
      id:'Anime Break Input Bridge 0.5',
      index:0,
      connected:true,
      mapping:'standard',
      timestamp:performance.now(),
      axes,
      buttons:b,
      vibrationActuator:p&&p.vibrationActuator?p.vibrationActuator:null
    };
  }

  try{
    Object.defineProperty(navigator,'getGamepads',{configurable:true,value:()=>[mergedPad(),null,null,null]});
  }catch(_){
    try{Navigator.prototype.getGamepads=()=>[mergedPad(),null,null,null]}catch(__){}
  }

  const oldJoy=document.getElementById('joy');
  if(oldJoy){
    const joy=oldJoy.cloneNode(true);
    oldJoy.replaceWith(joy);
    const knob=joy.querySelector('#knob')||joy.querySelector('.knob');
    let activeId=null,cx=0,cy=0;
    function reset(id){
      if(id!=null&&id!==activeId)return;
      activeId=null;touchStickActive=false;touchAxes[0]=0;touchAxes[1]=0;
      if(knob)knob.style.transform='translate(0,0)';
    }
    function move(e){
      let dx=e.clientX-cx,dy=e.clientY-cy;
      const max=Math.max(38,Math.min(52,joy.clientWidth*.36));
      const d=Math.hypot(dx,dy)||1;
      if(d>max){dx*=max/d;dy*=max/d}
      let x=dx/max,y=dy/max;
      if(Math.hypot(x,y)<.075){x=0;y=0;dx=0;dy=0}
      touchAxes[0]=x;touchAxes[1]=y;touchStickActive=true;
      if(knob)knob.style.transform=`translate(${dx}px,${dy}px)`;
    }
    joy.addEventListener('pointerdown',e=>{
      e.preventDefault();e.stopPropagation();activeId=e.pointerId;
      const r=joy.getBoundingClientRect();cx=r.left+r.width/2;cy=r.top+r.height/2;
      try{joy.setPointerCapture(e.pointerId)}catch(_){}
      move(e);
    },{passive:false});
    joy.addEventListener('pointermove',e=>{if(e.pointerId===activeId){e.preventDefault();move(e)}},{passive:false});
    ['pointerup','pointercancel','lostpointercapture'].forEach(ev=>joy.addEventListener(ev,e=>reset(e.pointerId)));
  }

  const oldGuard=document.getElementById('guard');
  if(oldGuard){
    const guard=oldGuard.cloneNode(true);oldGuard.replaceWith(guard);
    let guardId=null;
    const off=()=>{touchButtons[4]=false;guardId=null};
    guard.addEventListener('pointerdown',e=>{
      e.preventDefault();e.stopPropagation();guardId=e.pointerId;touchButtons[4]=true;
      try{guard.setPointerCapture(e.pointerId)}catch(_){}
    },{passive:false});
    ['pointerup','pointercancel','lostpointercapture'].forEach(ev=>guard.addEventListener(ev,e=>{if(guardId===e.pointerId)off()}));
  }

  // Evita toques presos após minimizar o app, trocar de janela ou perder foco.
  function resetAll(){
    touchStickActive=false;touchAxes[0]=touchAxes[1]=touchAxes[2]=touchAxes[3]=0;
    for(let i=0;i<touchButtons.length;i++)touchButtons[i]=false;
  }
  addEventListener('blur',resetAll);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)resetAll()});
  addEventListener('pointercancel',e=>{if(e.pointerType==='touch')touchButtons[4]=false},true);

  // Pequeno ajuste de responsividade geral: limita picos grandes de frame-time sem
  // alterar o ritmo normal quando o jogo está estável.
  if(window.THREE&&THREE.Clock&&!THREE.Clock.prototype.__ab05Patched){
    const original=THREE.Clock.prototype.getDelta;
    THREE.Clock.prototype.getDelta=function(){
      const d=original.call(this);
      return Math.min(d,0.028);
    };
    THREE.Clock.prototype.__ab05Patched=true;
  }

  console.log('[Anime Break] Input Fix 0.5 carregado');
})();
