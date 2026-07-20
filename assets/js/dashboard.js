/* Bloomora customer dashboard — tab switching, live-tracking simulation, reorder toast */
(function(){
  "use strict";

  function initTabs(){
    const links = document.querySelectorAll('[data-tab-link]');
    const panels = document.querySelectorAll('[data-tab-panel]');
    function activate(name){
      panels.forEach(p => p.classList.toggle('hidden', p.dataset.tabPanel !== name));
      links.forEach(l => {
        const active = l.dataset.tabLink === name;
        l.classList.toggle('bg-primary-600', active);
        l.classList.toggle('text-white', active);
        l.classList.toggle('shadow-glow', active);
        l.classList.toggle('text-ink-soft', !active);
      });
      const mobileSelect = document.getElementById('dash-mobile-select');
      if(mobileSelect) mobileSelect.value = name;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const sidebar = document.getElementById('dash-sidebar');
      const overlay = document.getElementById('dash-sidebar-overlay');
      if(sidebar && window.innerWidth < 1024){ sidebar.classList.add('-translate-x-full'); overlay && overlay.classList.add('hidden'); }
    }
    links.forEach(l => l.addEventListener('click', (e)=>{ e.preventDefault(); activate(l.dataset.tabLink); }));
    const mobileSelect = document.getElementById('dash-mobile-select');
    if(mobileSelect) mobileSelect.addEventListener('change', ()=> activate(mobileSelect.value));

    const openBtn = document.getElementById('dash-sidebar-open');
    const closeBtn = document.getElementById('dash-sidebar-close');
    const sidebar = document.getElementById('dash-sidebar');
    const overlay = document.getElementById('dash-sidebar-overlay');
    openBtn && openBtn.addEventListener('click', ()=>{ sidebar.classList.remove('-translate-x-full'); overlay.classList.remove('hidden'); });
    closeBtn && closeBtn.addEventListener('click', ()=>{ sidebar.classList.add('-translate-x-full'); overlay.classList.add('hidden'); });
    overlay && overlay.addEventListener('click', ()=>{ sidebar.classList.add('-translate-x-full'); overlay.classList.add('hidden'); });
  }

  function toast(msg){
    const el = document.createElement('div');
    el.className = 'fixed bottom-6 left-1/2 z-[9999] -translate-x-1/2 rounded-full bg-ink-950 px-5 py-3 text-sm font-medium text-white shadow-soft-dark transition-opacity';
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(()=>{ el.style.opacity = '0'; setTimeout(()=> el.remove(), 400); }, 2200);
  }

  function initReorder(){
    document.querySelectorAll('[data-reorder]').forEach(btn=>{
      btn.addEventListener('click', ()=> toast(`"${btn.dataset.reorder}" added to your cart — reordered in one tap!`));
    });
  }

  /* Simulated live ETA countdown + progress */
  function initLiveTracking(){
    const etaEl = document.getElementById('live-eta-minutes');
    const barEl = document.getElementById('live-progress-bar');
    const pctEl = document.getElementById('live-progress-pct');
    if(!etaEl || !barEl) return;
    let minutes = parseInt(etaEl.textContent, 10) || 12;
    let pct = parseInt(barEl.style.width, 10) || 55;
    setInterval(()=>{
      if(minutes > 1){ minutes -= 1; etaEl.textContent = minutes; }
      if(pct < 92){ pct += 2; barEl.style.width = pct + '%'; if(pctEl) pctEl.textContent = pct + '%'; }
    }, 4000);
  }

  document.addEventListener('bloomora:mounted', function(){
    initTabs();
    initReorder();
    initLiveTracking();
  });
})();
