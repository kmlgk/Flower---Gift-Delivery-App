/* Bloomora — shared UI components (header, mega menu, mobile menu, footer, CTA, breadcrumb)
   Injected client-side so markup lives in ONE place across every page (no build tools needed). */
(function(){
  "use strict";

  const NAV = [
    { label:'Home', page:'home', mega:'home', href:'index.html' },
    { label:'About', page:'about', href:'about.html' },
    { label:'Services', page:'services', mega:'services', href:'services.html' },
    { label:'Blog', page:'blog', dropdown:[
        {label:'Blog Grid', href:'blog.html'}, {label:'Blog Details', href:'blog-details.html'}
      ]},
    { label:'Pages', page:'pages', dropdown:[
        {label:'Pricing', href:'pricing.html'},
        {label:'Login', href:'login.html'}, {label:'Register', href:'register.html'},
        {label:'Dashboard', href:'dashboard.html'}, {label:'404 Error', href:'404.html'},
        {label:'Coming Soon', href:'coming-soon.html'}
      ]},
    { label:'Contact', page:'contact', href:'contact.html' }
  ];

  function icon(name, cls){ return `<i class="ri-${name} ${cls||''}"></i>`; }

  function megaHome(){
    return `<div class="mega-panel absolute left-1/2 top-full z-40 mt-3 w-[520px] -translate-x-1/2 rounded-2xl border border-subtle surface shadow-soft dark:shadow-soft-dark p-5 grid grid-cols-2 gap-4">
      <a href="index.html" class="group/item rounded-xl overflow-hidden border border-subtle hover:border-primary-400 transition">
        <div class="h-24 bg-petal-gradient relative overflow-hidden"><img src="assets/images/hero-bouquet.svg" alt="Home 1 preview" class="absolute -bottom-6 right-2 h-28 w-28 object-contain group-hover/item:scale-105 transition"/></div>
        <div class="p-3"><p class="font-semibold text-sm">Home — Bouquet Edition</p><p class="text-xs text-ink-soft">Classic petal storefront</p></div>
      </a>
      <a href="home-2.html" class="group/item rounded-xl overflow-hidden border border-subtle hover:border-primary-400 transition">
        <div class="h-24 bg-leaf-gradient relative overflow-hidden"><img src="assets/images/hero-giftbox.svg" alt="Home 2 preview" class="absolute -bottom-6 right-2 h-28 w-28 object-contain group-hover/item:scale-105 transition"/></div>
        <div class="p-3"><p class="font-semibold text-sm">Home — Gift Edition</p><p class="text-xs text-ink-soft">Bold gifting showcase</p></div>
      </a>
    </div>`;
  }

  function megaServices(){
    const items = [
      ['flower-line','Flower Bouquets','Fresh cut daily'],
      ['gift-2-line','Curated Gift Boxes','Themed hampers'],
      ['plant-line','Plants & Succulents','Low-maintenance green'],
      ['cake-3-line','Celebration Cakes','Same-day bakes'],
      ['bear-smile-line','Soft Toys & Add-ons','Perfect combo gifts'],
      ['takeaway-line','Corporate Gifting','Bulk & branded orders']
    ];
    const rows = items.map(([ic,t,d])=>`
      <a href="service-details.html" class="flex items-start gap-3 rounded-xl p-3 hover:bg-primary-50 dark:hover:bg-white/5 transition group/s">
        <span class="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary-50 dark:bg-white/5 text-primary-600 group-hover/s:bg-primary-600 group-hover/s:text-white transition">${icon(ic,'text-lg')}</span>
        <span><span class="block text-sm font-semibold">${t}</span><span class="block text-xs text-ink-soft">${d}</span></span>
      </a>`).join('');
    return `<div class="mega-panel absolute left-1/2 top-full z-40 mt-3 w-[640px] -translate-x-1/2 rounded-2xl border border-subtle surface shadow-soft dark:shadow-soft-dark p-5">
      <div class="grid grid-cols-2 gap-1">${rows}</div>
      <div class="mt-3 flex items-center justify-between rounded-xl bg-petal-gradient p-4 text-white">
        <div><p class="font-display text-lg">Same-day delivery</p><p class="text-xs text-white/85">Order before 4 PM for today's slot</p></div>
        <a href="services.html" class="rounded-full bg-white/15 px-4 py-2 text-xs font-semibold backdrop-blur hover:bg-white/25 transition">View all →</a>
      </div>
    </div>`;
  }

  function dropdown(items){
    return `<div class="mega-panel absolute left-0 top-full z-40 mt-3 w-56 rounded-2xl border border-subtle surface shadow-soft dark:shadow-soft-dark p-2">
      ${items.map(i=>`<a href="${i.href}" class="block rounded-lg px-4 py-2.5 text-sm font-medium text-ink hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-white/5 transition">${i.label}</a>`).join('')}
    </div>`;
  }

  function navLinkHTML(item, currentPage){
    const active = item.page === currentPage;
    const hasPanel = item.mega || item.dropdown;
    const chevron = hasPanel ? '<i class="ri-arrow-down-s-line text-sm transition group-hover:rotate-180"></i>' : '';
    const base = `flex items-center gap-1 px-4 py-2 text-[15px] font-medium rounded-full transition ${active ? 'text-primary-600' : 'text-ink hover:text-primary-600'}`;
    let panel = '';
    if(item.mega === 'home') panel = megaHome();
    else if(item.mega === 'services') panel = megaServices();
    else if(item.dropdown) panel = dropdown(item.dropdown);
    return `<li class="relative group">
      <a href="${item.href||'#'}" class="${base}">${item.label}${chevron}</a>
      ${panel}
    </li>`;
  }

  function headerHTML(currentPage){
    const links = NAV.map(i=>navLinkHTML(i,currentPage)).join('');
    return `
    <a href="#main-content" class="skip-link rounded bg-primary-600 px-4 py-2 text-white">Skip to content</a>
    <header class="glass-header fixed inset-x-0 top-0 z-50">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="index.html" class="flex items-center gap-2.5 shrink-0">
          <img src="assets/images/logo-icon.svg" alt="Bloomora logo" width="40" height="40" class="h-10 w-10" />
          <span class="font-display text-2xl font-semibold tracking-tight">Bloomora</span>
        </a>
        <nav class="hidden lg:block">
          <ul class="flex items-center gap-0.5">${links}</ul>
        </nav>
        <div class="flex items-center gap-1.5 sm:gap-2">
          <button id="theme-toggle" aria-label="Toggle dark mode" class="magnetic grid h-10 w-10 place-items-center rounded-full border border-subtle hover:border-primary-400 hover:text-primary-600 transition">
            <i class="ri-sun-line text-lg dark:hidden"></i><i class="ri-moon-line text-lg hidden dark:inline"></i>
          </button>
          <button id="rtl-toggle" aria-label="Toggle RTL layout" class="magnetic hidden sm:grid h-10 w-10 place-items-center rounded-full border border-subtle hover:border-primary-400 hover:text-primary-600 transition">
            <i class="ri-text-direction-r text-lg"></i>
          </button>
          <a href="login.html" class="magnetic hidden md:grid h-10 w-10 place-items-center rounded-full border border-subtle hover:border-primary-400 hover:text-primary-600 transition" aria-label="Login">
            <i class="ri-user-3-line text-lg"></i>
          </a>
          <a href="services.html" class="magnetic hidden sm:inline-flex items-center gap-1.5 rounded-full bg-petal-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-glow hover:brightness-110 transition">
            ${icon('flower-line')} Order Now
          </a>
          <button id="mobile-menu-btn" aria-label="Open menu" class="grid h-10 w-10 place-items-center rounded-full border border-subtle lg:hidden">
            <i class="ri-menu-3-line text-xl"></i>
          </button>
        </div>
      </div>
    </header>`;
  }

  function mobileMenuHTML(currentPage){
    function acc(item){
      const kids = item.mega === 'home' ? [{label:'Home — Bouquet Edition',href:'index.html'},{label:'Home — Gift Edition',href:'home-2.html'}]
        : item.mega === 'services' ? [{label:'All Services',href:'services.html'},{label:'Service Details',href:'service-details.html'}]
        : item.dropdown;
      if(!kids) return `<li><a href="${item.href}" class="block py-3 text-base font-medium ${item.page===currentPage?'text-primary-600':'text-ink'}">${item.label}</a></li>`;
      return `<li class="acc-item border-b border-subtle/60">
        <button class="acc-trigger flex w-full items-center justify-between py-3 text-base font-medium text-ink">${item.label}<i class="ri-add-line acc-chevron"></i></button>
        <div class="acc-panel"><ul class="pb-2 pl-3">${kids.map(k=>`<li><a href="${k.href}" class="block py-2 text-sm text-ink-soft hover:text-primary-600">${k.label}</a></li>`).join('')}</ul></div>
      </li>`;
    }
    return `
    <div id="mobile-menu-overlay" class="fixed inset-0 z-50 hidden bg-ink-950/40 backdrop-blur-sm lg:hidden"></div>
    <aside id="mobile-menu" class="fixed inset-y-0 right-0 z-50 w-[86%] max-w-sm translate-x-full surface shadow-soft-dark transition-transform duration-300 lg:hidden overflow-y-auto" dir-ignore>
      <div class="flex items-center justify-between border-b border-subtle p-5">
        <span class="font-display text-xl font-semibold">Menu</span>
        <button id="mobile-menu-close" aria-label="Close menu" class="grid h-9 w-9 place-items-center rounded-full border border-subtle"><i class="ri-close-line text-lg"></i></button>
      </div>
      <ul class="px-5">${NAV.map(acc).join('')}</ul>
      <div class="flex items-center gap-3 px-5 py-4">
        <button id="theme-toggle-mobile" class="flex flex-1 items-center justify-center gap-2 rounded-full border border-subtle py-2.5 text-sm font-medium"><i class="ri-sun-line dark:hidden"></i><i class="ri-moon-line hidden dark:inline"></i> Theme</button>
        <button id="rtl-toggle-mobile" class="flex flex-1 items-center justify-center gap-2 rounded-full border border-subtle py-2.5 text-sm font-medium"><i class="ri-text-direction-r"></i> RTL</button>
      </div>
      <div class="px-5 pb-8">
        <a href="services.html" class="flex items-center justify-center gap-2 rounded-full bg-petal-gradient py-3 text-sm font-semibold text-white shadow-glow">${icon('flower-line')} Order Now</a>
      </div>
    </aside>`;
  }

  function footerHTML(){
    return `
    <footer class="relative overflow-hidden border-t border-subtle bg-ink-950 text-white/80">
      <img src="assets/images/pattern-petals.svg" alt="" aria-hidden="true" class="pointer-events-none absolute inset-0 h-full w-full text-white" />
      <div class="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div class="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="index.html" class="flex items-center gap-2.5"><img src="assets/images/logo-icon.svg" class="h-10 w-10" alt="Bloomora logo"/><span class="font-display text-2xl font-semibold text-white">Bloomora</span></a>
            <p class="mt-4 text-sm leading-relaxed text-white/60">Fresh flowers and curated gifts, hand-delivered same day — with live rider tracking so you always know when love arrives.</p>
            <div class="mt-5 flex gap-3">
              ${['facebook-fill','instagram-line','twitter-x-fill','pinterest-fill'].map(s=>`<a href="#" aria-label="${s}" class="magnetic grid h-9 w-9 place-items-center rounded-full border border-white/15 hover:bg-primary-600 hover:border-primary-600 transition"><i class="ri-${s}"></i></a>`).join('')}
            </div>
          </div>
          <div>
            <h3 class="font-display text-lg font-semibold text-white">Explore</h3>
            <ul class="mt-4 space-y-2.5 text-sm">
              <li><a href="about.html" class="hover:text-primary-400 transition">About Us</a></li>
              <li><a href="services.html" class="hover:text-primary-400 transition">Our Services</a></li>
              <li><a href="pricing.html" class="hover:text-primary-400 transition">Pricing Plans</a></li>
              <li><a href="blog.html" class="hover:text-primary-400 transition">Journal</a></li>
              <li><a href="contact.html" class="hover:text-primary-400 transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-display text-lg font-semibold text-white">Services</h3>
            <ul class="mt-4 space-y-2.5 text-sm">
              <li><a href="service-details.html" class="hover:text-primary-400 transition">Flower Bouquets</a></li>
              <li><a href="service-details.html" class="hover:text-primary-400 transition">Gift Hampers</a></li>
              <li><a href="service-details.html" class="hover:text-primary-400 transition">Plants &amp; Succulents</a></li>
              <li><a href="service-details.html" class="hover:text-primary-400 transition">Celebration Cakes</a></li>
              <li><a href="dashboard.html" class="hover:text-primary-400 transition">Track My Order</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-display text-lg font-semibold text-white">Stay in bloom</h3>
            <p class="mt-4 text-sm text-white/60">Subscribe for seasonal offers and gifting ideas.</p>
            <form class="mt-4 flex gap-2" onsubmit="return false">
              <input type="email" required placeholder="Your email" class="w-full min-w-0 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-primary-400" />
              <button class="magnetic grid h-11 w-11 shrink-0 place-items-center rounded-full bg-petal-gradient"><i class="ri-send-plane-2-line"></i></button>
            </form>
            <p class="mt-4 flex items-center gap-2 text-sm text-white/60">${icon('map-pin-2-line')} 21 Rosewood Lane, Bengaluru, IN</p>
            <p class="mt-2 flex items-center gap-2 text-sm text-white/60">${icon('phone-line')} +91 98450 12345</p>
          </div>
        </div>
        <div class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <p>© <span id="footer-year"></span> Bloomora. All rights reserved.</p>
          <div class="flex gap-5"><a href="#" class="hover:text-primary-400">Privacy Policy</a><a href="#" class="hover:text-primary-400">Terms of Service</a></div>
        </div>
      </div>
    </footer>`;
  }

  function ctaHTML(el){
    const title = el.dataset.title || 'Send flowers that feel unforgettable';
    const sub = el.dataset.sub || 'Order in under 60 seconds and track your bouquet live, door to door.';
    const btn = el.dataset.btn || 'Start Your Order';
    const href = el.dataset.href || 'services.html';
    el.innerHTML = `
    <section class="noise-overlay relative mx-4 my-4 overflow-hidden rounded-4xl bg-petal-gradient sm:mx-6 lg:mx-8">
      <img src="assets/images/pattern-dots.svg" alt="" aria-hidden="true" class="pointer-events-none absolute inset-0 h-full w-full text-white opacity-30" />
      <div class="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10 blob-shape"></div>
      <div class="absolute -right-10 -bottom-10 h-52 w-52 rounded-full bg-white/10 blob-shape"></div>
      <div class="relative mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-14 text-center sm:py-16" data-reveal-group>
        <h2 data-reveal-item class="font-display text-3xl font-semibold text-white sm:text-4xl">${title}</h2>
        <p data-reveal-item class="max-w-xl text-white/85">${sub}</p>
        <a data-reveal-item href="${href}" class="magnetic inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-primary-700 shadow-lg hover:shadow-xl transition">${btn} <i class="ri-arrow-right-line"></i></a>
        <div data-reveal-item class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 text-xs font-medium text-white/75">
          <span class="flex items-center gap-1.5"><i class="ri-shield-check-line"></i> Freshness guaranteed</span>
          <span class="flex items-center gap-1.5"><i class="ri-map-pin-time-line"></i> 90+ cities</span>
          <span class="flex items-center gap-1.5"><i class="ri-star-smile-line"></i> 4.9/5 rated</span>
        </div>
      </div>
    </section>`;
  }

  function breadcrumbHTML(el){
    const title = el.dataset.title || 'Page Title';
    const parent = el.dataset.parent || 'Home';
    const parentHref = el.dataset.parentHref || 'index.html';
    el.innerHTML = `
    <section class="noise-overlay relative overflow-hidden border-b border-subtle pt-32 pb-14 sm:pt-36 sm:pb-16">
      <img src="assets/images/pattern-dots.svg" alt="" aria-hidden="true" class="pointer-events-none absolute inset-0 h-full w-full text-primary-500/30" />
      <div class="absolute right-6 top-10 h-24 w-24 rounded-full bg-accent-200/30 blob-shape hidden sm:block animate-float"></div>
      <div class="absolute left-8 bottom-6 h-14 w-14 rounded-full bg-primary-200/20 blob-shape hidden sm:block animate-float-slow"></div>
      <div class="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8" data-reveal-group>
        <h1 data-reveal-item class="font-display text-4xl font-semibold sm:text-5xl">${title}</h1>
        <div data-reveal-item class="mt-4 flex items-center justify-center gap-2 text-sm text-ink-soft">
          <a href="${parentHref}" class="hover:text-primary-600">${parent}</a>
          <i class="ri-arrow-right-s-line rtl-flip"></i>
          <span class="text-primary-600 font-medium">${title}</span>
        </div>
      </div>
    </section>`;
  }

  function initHeaderInteractions(){
    const themeBtns = [document.getElementById('theme-toggle'), document.getElementById('theme-toggle-mobile')].filter(Boolean);
    themeBtns.forEach(b=>b.addEventListener('click', ()=>window.Bloomora.toggleTheme()));
    const rtlBtns = [document.getElementById('rtl-toggle'), document.getElementById('rtl-toggle-mobile')].filter(Boolean);
    rtlBtns.forEach(b=>b.addEventListener('click', ()=>window.Bloomora.toggleDir()));

    const menuBtn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-menu-overlay');
    const closeBtn = document.getElementById('mobile-menu-close');
    function open(){ menu.classList.remove('translate-x-full'); overlay.classList.remove('hidden'); document.body.style.overflow='hidden'; }
    function close(){ menu.classList.add('translate-x-full'); overlay.classList.add('hidden'); document.body.style.overflow=''; }
    menuBtn && menuBtn.addEventListener('click', open);
    closeBtn && closeBtn.addEventListener('click', close);
    overlay && overlay.addEventListener('click', close);

    document.querySelectorAll('.acc-trigger').forEach(t=>{
      t.addEventListener('click', ()=>{
        const item = t.closest('.acc-item');
        const isOpen = item.classList.contains('is-open');
        item.parentElement.querySelectorAll(':scope > .acc-item').forEach(i=>i.classList.remove('is-open'));
        if(!isOpen) item.classList.add('is-open');
      });
    });

    const yearEl = document.getElementById('footer-year');
    if(yearEl) yearEl.textContent = new Date().getFullYear();

    // Magnetic buttons
    document.querySelectorAll('.magnetic').forEach(m=>{
      m.addEventListener('mousemove', (e)=>{
        const r = m.getBoundingClientRect();
        const x = e.clientX - r.left - r.width/2, y = e.clientY - r.top - r.height/2;
        m.style.transform = `translate(${x*0.25}px, ${y*0.3}px)`;
      });
      m.addEventListener('mouseleave', ()=>{ m.style.transform=''; });
    });
  }

  function mount(){
    const headerRoot = document.getElementById('site-header');
    if(headerRoot){
      const page = document.body.dataset.page || '';
      headerRoot.innerHTML = headerHTML(page) + mobileMenuHTML(page);
    }
    const footerRoot = document.getElementById('site-footer');
    if(footerRoot) footerRoot.innerHTML = footerHTML();

    document.querySelectorAll('[data-cta]').forEach(ctaHTML);
    document.querySelectorAll('[data-breadcrumb]').forEach(breadcrumbHTML);

    initHeaderInteractions();
    document.dispatchEvent(new CustomEvent('bloomora:mounted'));
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
