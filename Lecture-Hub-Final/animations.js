const Motion = (() => {
  const touch = matchMedia('(pointer: coarse)').matches;
  function init() {
    document.querySelectorAll('.reveal').forEach(el => new IntersectionObserver(([e]) => e.isIntersecting && el.classList.add('visible'), { threshold:.12 }).observe(el));
    document.querySelectorAll('.ripple').forEach(el => el.addEventListener('click', e => { const r = document.createElement('i'); r.className='ink'; const b=el.getBoundingClientRect(); r.style.cssText=`left:${e.clientX-b.left}px;top:${e.clientY-b.top}px`; el.append(r); setTimeout(()=>r.remove(),650); }));
    if (!touch) { const dot=document.createElement('i'), ring=document.createElement('i'); dot.className='cursor-dot'; ring.className='cursor-ring'; document.body.append(dot,ring); let x=0,y=0,rx=0,ry=0; addEventListener('pointermove', e=>{x=e.clientX;y=e.clientY; dot.style.transform=`translate(${x}px,${y}px)`; document.documentElement.style.setProperty('--mx',`${x}px`);document.documentElement.style.setProperty('--my',`${y}px`);}); (function loop(){rx+=(x-rx)*.16;ry+=(y-ry)*.16;ring.style.transform=`translate(${rx}px,${ry}px)`;requestAnimationFrame(loop)})(); document.querySelectorAll('a,button,input,select').forEach(x=>x.onmouseenter=()=>document.body.classList.add('cursor-hover')); document.querySelectorAll('.tilt').forEach(el=>el.addEventListener('pointermove',e=>{let b=el.getBoundingClientRect(),X=(e.clientX-b.left)/b.width-.5,Y=(e.clientY-b.top)/b.height-.5;el.style.transform=`perspective(900px) rotateX(${-Y*6}deg) rotateY(${X*7}deg) translateY(-7px)`;})); document.querySelectorAll('.tilt').forEach(el=>el.addEventListener('pointerleave',()=>el.style.transform='')); }
  }
  return { init };
})();
