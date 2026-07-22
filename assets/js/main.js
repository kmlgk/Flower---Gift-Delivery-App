/* Bloomora — animation & interaction engine. Defensive: checks each lib exists before use,
   so any page can include only the CDN scripts it actually needs. */
window.Bloomora = window.Bloomora || {};

(function(){
  "use strict";

  /* ---------- Theme (dark/light) ---------- */
  function applyTheme(t){
    document.documentElement.classList.toggle('dark', t === 'dark');
    localStorage.setItem('bloomora-theme', t);
  }
  window.Bloomora.toggleTheme = function(){
    const next = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(next);
  };

  /* ---------- RTL ---------- */
  window.Bloomora.toggleDir = function(){
    const html = document.documentElement;
    const next = html.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
    html.setAttribute('dir', next);
    localStorage.setItem('bloomora-dir', next);
  };

  /* ---------- Preloader ---------- */
  window.addEventListener('load', function(){
    const pre = document.getElementById('preloader');
    if(pre){ setTimeout(()=> pre.classList.add('is-hidden'), 350); }
    document.querySelectorAll('img[loading="lazy"]').forEach(img=>{
      if(img.complete) img.classList.add('is-loaded');
      else img.addEventListener('load', ()=> img.classList.add('is-loaded'));
    });
    /* Lazy images finishing after ScrollTrigger's initial measurement shift page
       height, which throws off trigger positions (can strand reveal content at
       opacity:0). Recompute once everything has settled. */
    if(window.ScrollTrigger) ScrollTrigger.refresh();
  });

  /* ---------- Scroll progress bar ---------- */
  const progress = document.getElementById('scroll-progress');
  function onScroll(){
    if(!progress) return;
    const h = document.documentElement;
    const pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progress.style.width = pct + '%';
  }
  document.addEventListener('scroll', onScroll, { passive:true });

  /* ---------- Lenis smooth scroll ---------- */
  let lenis;
  if(window.Lenis){
    lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on('scroll', onScroll);
    if(window.gsap){
      /* Drive Lenis exclusively via gsap.ticker when GSAP is present — running a
         second native rAF loop alongside it double-updates Lenis and desyncs
         ScrollTrigger's scroll position, which can leave scroll-reveal content
         stuck at opacity:0. */
      if(window.ScrollTrigger) lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time)=> lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      (function raf(time){ lenis.raf(time); requestAnimationFrame(raf); })();
    }
  }
  window.Bloomora.lenis = lenis;

  /* ---------- AOS ---------- */
  if(window.AOS){ AOS.init({ duration: 700, once: true, offset: 60, easing: 'ease-out-cubic' }); }

  /* ---------- GSAP hero / reveal ---------- */
  if(window.gsap){
    if(window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

    if(window.SplitType){
      document.querySelectorAll('[data-split-text]').forEach(el=>{
        const split = new SplitType(el, { types: 'words,chars' });
        gsap.from(split.chars, { opacity:0, y: 24, rotateX: -40, stagger: 0.02, duration: 0.8, ease:'power3.out', delay:0.15 });
      });
    }

    document.querySelectorAll('[data-parallax]').forEach(el=>{
      const speed = parseFloat(el.dataset.parallax) || 0.3;
      gsap.to(el, { yPercent: speed*100, ease:'none', scrollTrigger: { trigger: el.parentElement || el, start:'top bottom', end:'bottom top', scrub: true } });
    });

    document.querySelectorAll('.blob-shape').forEach((el,i)=>{
      gsap.to(el, { y: i%2? 20:-20, x: i%2? -14:14, duration: 5+i, repeat:-1, yoyo:true, ease:'sine.inOut' });
    });

    /* SVG path draw-on-scroll (connecting lines, signature strokes) */
    if(window.ScrollTrigger){
      document.querySelectorAll('[data-draw-path]').forEach(path=>{
        const len = path.getTotalLength ? path.getTotalLength() : 1000;
        path.style.strokeDasharray = len;
        path.style.strokeDashoffset = len;
        gsap.to(path, { strokeDashoffset:0, ease:'none', scrollTrigger:{ trigger: path.closest('svg') || path, start:'top 80%', end:'bottom 40%', scrub:1 } });
      });
    }

    /* Scroll-driven 3D rotate reveal for images/cards */
    document.querySelectorAll('[data-scroll-rotate]').forEach(el=>{
      gsap.fromTo(el, { rotateY: -25, opacity:0, transformPerspective: 1000 }, {
        rotateY:0, opacity:1, duration:1, ease:'power3.out',
        scrollTrigger:{ trigger: el, start:'top 85%' }
      });
    });
  }

  /* ---------- CountUp ---------- */
  if(window.countUp || window.CountUp){
    const CU = window.CountUp ? window.CountUp.CountUp : window.countUp.CountUp;
    document.querySelectorAll('[data-countup]').forEach(el=>{
      const end = parseFloat(el.dataset.countup);
      const dec = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
      const inst = new CU(el, end, { duration: 2.2, decimalPlaces: dec, suffix: el.dataset.suffix || '' });
      if(window.IntersectionObserver){
        const io = new IntersectionObserver((entries)=>{ entries.forEach(en=>{ if(en.isIntersecting){ inst.start(); io.unobserve(el);} }); }, { threshold:0.5 });
        io.observe(el);
      } else inst.start();
    });
  }

  /* ---------- Typed.js ---------- */
  if(window.Typed){
    document.querySelectorAll('[data-typed]').forEach(el=>{
      const strings = JSON.parse(el.dataset.typed);
      new Typed(el, { strings, typeSpeed:55, backSpeed:30, backDelay:1400, loop:true, smartBackspace:true });
    });
  }

  /* ---------- Swiper ---------- */
  if(window.Swiper){
    document.querySelectorAll('[data-swiper]').forEach(el=>{
      const cfg = JSON.parse(el.dataset.swiper || '{}');
      new Swiper(el, Object.assign({
        loop:true, spaceBetween:24, autoplay:{ delay:3800, disableOnInteraction:false },
        pagination: el.querySelector('.swiper-pagination') ? { el: el.querySelector('.swiper-pagination'), clickable:true } : false,
        navigation: (el.querySelector('.swiper-button-next')) ? { nextEl: el.querySelector('.swiper-button-next'), prevEl: el.querySelector('.swiper-button-prev') } : false,
        slidesPerView:1
      }, cfg));
    });
  }

  /* ---------- Testimonial rotator (dependency-free, avoids Swiper fade stacking issues) ---------- */
  document.querySelectorAll('[data-testimonial-rotator]').forEach(root=>{
    const slides = Array.from(root.querySelectorAll('[data-testimonial-slide]'));
    const dots = Array.from(root.querySelectorAll('[data-testimonial-dot]'));
    if(!slides.length) return;
    let idx = 0, timer;
    function show(i){
      idx = (i + slides.length) % slides.length;
      slides.forEach((s,si)=> s.classList.toggle('hidden', si!==idx));
      dots.forEach((d,di)=> d.classList.toggle('is-active', di===idx));
    }
    function restart(){ clearInterval(timer); timer = setInterval(()=> show(idx+1), 6000); }
    dots.forEach((d,di)=> d.addEventListener('click', ()=>{ show(di); restart(); }));
    show(0); restart();
  });

  /* ---------- GLightbox ---------- */
  if(window.GLightbox){ GLightbox({ selector: '.glightbox' }); }

  /* ---------- VanillaTilt 3D card hover ---------- */
  if(window.VanillaTilt){
    VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
      max: 12, speed: 400, glare: true, 'max-glare': 0.25, scale: 1.03, gyroscope: true
    });
  }

  /* ---------- 3D layered hero parallax (mousemove + device tilt) ---------- */
  document.querySelectorAll('[data-3d-hero]').forEach(hero=>{
    const layers = hero.querySelectorAll('[data-depth]');
    function apply(px, py){
      layers.forEach(layer=>{
        const depth = parseFloat(layer.dataset.depth) || 0;
        const x = px * 30 * depth, y = py * 30 * depth;
        const rot = px * 8 * depth;
        layer.style.transform = `translate3d(${x}px, ${y}px, 0) rotateZ(${rot * 0.4}deg)`;
      });
      const photo = hero.querySelector('.hero-3d-photo');
      if(photo) photo.style.transform = `rotateY(${px*10}deg) rotateX(${-py*10}deg)`;
    }
    hero.addEventListener('mousemove', (e)=>{
      const r = hero.getBoundingClientRect();
      const px = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const py = ((e.clientY - r.top) / r.height - 0.5) * 2;
      apply(px, py);
    });
    hero.addEventListener('mouseleave', ()=> apply(0,0));
    if(window.DeviceOrientationEvent){
      window.addEventListener('deviceorientation', (e)=>{
        if(e.beta==null || e.gamma==null) return;
        apply(Math.max(-1, Math.min(1, e.gamma/30)), Math.max(-1, Math.min(1, (e.beta-45)/30)));
      });
    }
  });

  /* ---------- Flip cards (tap to flip on touch devices) ---------- */
  document.querySelectorAll('.flip-card').forEach(card=>{
    card.addEventListener('click', ()=>{
      if(window.matchMedia('(hover: none)').matches) card.classList.toggle('is-flipped');
    });
  });

  /* ---------- Isotope filter ---------- */
  if(window.Isotope){
    document.querySelectorAll('[data-isotope-grid]').forEach(grid=>{
      const iso = new Isotope(grid, { itemSelector:'.iso-item', layoutMode:'fitRows' });
      const filterRoot = document.querySelector(grid.dataset.isotopeGrid);
      if(filterRoot){
        const activeCls = ['is-active','border-primary-700','text-primary-700'];
        filterRoot.addEventListener('click', (e)=>{
          const btn = e.target.closest('[data-filter]');
          if(!btn) return;
          filterRoot.querySelectorAll('[data-filter]').forEach(b=>{ b.classList.remove(...activeCls); b.classList.add('border-transparent','text-ink-soft'); });
          btn.classList.remove('border-transparent','text-ink-soft');
          btn.classList.add(...activeCls);
          iso.arrange({ filter: btn.dataset.filter });
        });
      }
    });
  }

  /* ---------- Simple reveal fallback ---------- */
  if(!window.AOS && window.IntersectionObserver){
    const io = new IntersectionObserver(entries=>{
      entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('is-visible'); io.unobserve(en.target);} });
    }, { threshold:0.15 });
    document.querySelectorAll('.reveal-up').forEach(el=>io.observe(el));
  }

  /* ---------- Stagger reveal for section headers / bento groups ----------
     Uses IntersectionObserver (not ScrollTrigger) to decide *when* to reveal —
     this is immune to Lenis/ScrollTrigger scroll-position sync issues, which
     could otherwise leave content stranded at opacity:0. GSAP is only used
     for the tween itself, when available. */
  if(window.IntersectionObserver){
    const revealIO = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting) return;
        const items = entry.target.querySelectorAll('[data-reveal-item]');
        if(window.gsap) gsap.to(items, { opacity:1, y:0, duration:.8, ease:'power3.out', stagger:0.12 });
        else items.forEach(el=>{ el.style.opacity = 1; el.style.transform = 'none'; });
        revealIO.unobserve(entry.target);
      });
    }, { threshold:0.1, rootMargin:'0px 0px -8% 0px' });
    document.querySelectorAll('[data-reveal-group]').forEach(group=>{
      if(group.querySelectorAll('[data-reveal-item]').length) revealIO.observe(group);
    });
  } else {
    document.querySelectorAll('[data-reveal-item]').forEach(el=>{ el.style.opacity = 1; el.style.transform = 'none'; });
  }

  /* ---------- Generic chip/segmented selectors (size, delivery slot pickers) ---------- */
  document.querySelectorAll('[data-chip-group]').forEach(group=>{
    const chips = group.querySelectorAll('[data-chip]');
    const activeCls = ['border-primary-600','bg-primary-50','text-primary-700','dark:bg-primary-950'];
    chips.forEach(chip=>{
      chip.addEventListener('click', ()=>{
        chips.forEach(c=>{ c.classList.remove(...activeCls); c.classList.add('border-subtle'); });
        chip.classList.remove('border-subtle');
        chip.classList.add(...activeCls);
      });
    });
  });

  /* ---------- Quantity stepper ---------- */
  document.querySelectorAll('[data-qty]').forEach(wrap=>{
    const valueEl = wrap.querySelector('[data-qty-value]');
    if(!valueEl) return;
    let qty = parseInt(valueEl.textContent, 10) || 1;
    const dec = wrap.querySelector('[data-qty-decrease]'), inc = wrap.querySelector('[data-qty-increase]');
    dec && dec.addEventListener('click', ()=>{ qty = Math.max(1, qty-1); valueEl.textContent = qty; });
    inc && inc.addEventListener('click', ()=>{ qty += 1; valueEl.textContent = qty; });
  });

  /* ---------- Back to top ---------- */
  const toTop = document.getElementById('back-to-top');
  if(toTop){
    window.addEventListener('scroll', ()=>{ toTop.classList.toggle('opacity-0', window.scrollY < 400); toTop.classList.toggle('pointer-events-none', window.scrollY < 400); }, { passive:true });
    toTop.addEventListener('click', ()=>{ if(lenis) lenis.scrollTo(0); else window.scrollTo({top:0, behavior:'smooth'}); });
  }
})();
