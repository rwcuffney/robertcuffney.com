/* AI in Prosecution · shared navigation, pager, progress bar, reveal engine */
(function(){
  var PARTS = [
    {n:'', file:'index.html', t:'Home', d:'Why prosecutors should learn AI', short:'Home'},
    {n:'1', file:'other-side.html', t:'The Other Side', d:'What’s already on the defense table', short:'Other Side'},
    {n:'2', file:'landscape.html', t:'The Landscape', d:'Who makes it, what it is, what’s beyond the model', short:'Landscape'},
    {n:'3', file:'what-it-can-do.html', t:'What It Can Do', d:'Connectors, skills, projects, and prosecutor use cases', short:'What It Can Do'},
    {n:'4', file:'what-you-can-do-now.html', t:'What You Can Do Now', d:'With the tools you actually have', short:'Do Now'},
    {n:'5', file:'what-can-go-wrong.html', t:'What Can Go Wrong', d:'Hallucinations, slop, privacy, brain rot', short:'Go Wrong'},
    {n:'6', file:'your-turn.html', t:'Your Turn', d:'Questions, resources, and how to reach me', short:'Your Turn'}
  ];
  var SUB = {'renfer-ai-warning.html':5,'ai-slop.html':5};

  var path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  var idx = -1;
  PARTS.forEach(function(p,i){ if(p.file === path) idx = i; });
  var parentIdx = idx >= 0 ? idx : (SUB[path] != null ? SUB[path] : 0);
  var isSub = idx < 0 && SUB[path] != null;

  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }

  /* ---------- progress bar ---------- */
  if(!document.querySelector('.progress')){
    var pr = document.createElement('div'); pr.className = 'progress'; pr.setAttribute('aria-hidden','true'); pr.innerHTML = '<i></i>';
    document.body.insertBefore(pr, document.body.firstChild);
  }

  /* ---------- nav ---------- */
  var nav = document.createElement('nav');
  nav.className = 'sitenav'; nav.setAttribute('aria-label','Site');
  var links = PARTS.slice(1).map(function(p,i){
    var cur = (i+1) === parentIdx ? ' aria-current="page"' : '';
    return '<li><a href="' + p.file + '"' + cur + '><span class="n">' + p.n + '</span>' + esc(p.short) + '</a></li>';
  }).join('');
  nav.innerHTML =
    '<div class="bar">' +
      '<a class="brand" href="index.html"><span class="sq" aria-hidden="true"></span>AI in Prosecution <small>NCCDA CLE</small></a>' +
      '<ul class="parts">' + links + '</ul>' +
      '<button class="menu-btn" type="button" aria-expanded="false" aria-controls="siteMenu"><b aria-hidden="true"></b>Menu</button>' +
    '</div>';
  document.body.insertBefore(nav, document.body.firstChild);

  var ov = document.createElement('div');
  ov.className = 'overlay'; ov.id = 'siteMenu'; ov.setAttribute('data-open','false');
  ov.innerHTML = '<button class="close" type="button">Close</button>' +
    '<div class="eyebrow" style="margin-bottom:1.2em">Today, in six parts</div>' +
    '<ol>' + PARTS.map(function(p,i){
      var cur = i === parentIdx ? ' aria-current="page"' : '';
      return '<li><a href="' + p.file + '"' + cur + '><span class="n">' + (p.n || '⌂') + '</span><span class="t">' + esc(p.t) + '</span><span class="d">' + esc(p.d) + '</span></a></li>';
    }).join('') + '</ol>';
  document.body.appendChild(ov);
  var mb = nav.querySelector('.menu-btn');
  function setMenu(open){ ov.setAttribute('data-open', open); mb.setAttribute('aria-expanded', open); document.body.style.overflow = open ? 'hidden' : ''; }
  mb.addEventListener('click', function(){ setMenu(ov.getAttribute('data-open') !== 'true'); });
  ov.querySelector('.close').addEventListener('click', function(){ setMenu(false); });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') setMenu(false); });

  /* ---------- pager + footer ---------- */
  var prev = null, next = null;
  if(isSub){
    prev = PARTS[5]; next = PARTS[6];
  } else if(idx >= 0){
    prev = idx > 0 ? PARTS[idx-1] : null;
    next = idx < PARTS.length-1 ? PARTS[idx+1] : null;
  }
  var pagerHost = document.getElementById('pager') || (function(){ var d = document.createElement('div'); document.body.appendChild(d); return d; })();
  var html = '<div class="pager wrap"><div class="row">';
  html += prev ? '<a class="prev" href="' + prev.file + '"><span class="k">← ' + (prev.n ? 'Part ' + prev.n : 'Back to') + '</span><span class="t">' + esc(prev.t) + '</span><span class="d">' + esc(prev.d) + '</span></a>' : '<span></span>';
  html += next ? '<a class="next" href="' + next.file + '"><span class="k">' + (next.n ? 'Part ' + next.n : 'Next') + ' →</span><span class="t">' + esc(next.t) + '</span><span class="d">' + esc(next.d) + '</span></a>' : '<span></span>';
  html += '</div>';
  if(isSub) html += '<div class="home"><a href="what-can-go-wrong.html">← Back to What Can Go Wrong</a></div>';
  else if(idx !== 0) html += '<div class="home"><a href="index.html">All six parts</a></div>';
  html += '<div class="kbd">Tip: use <kbd>←</kbd> and <kbd>→</kbd> to move between parts</div></div>';
  html += '<footer class="sitefoot wrap"><div class="cols"><p>AI in Prosecution · a CLE for the North Carolina Conference of District Attorneys · October 2026 · Robert W. Cuffney</p><p>Nothing here is legal advice, and nothing here is an office policy. Check your own office’s rules before using any AI tool on case material.</p></div></footer>';
  pagerHost.outerHTML = html;

  /* hide nav while scrolling down, show on scroll up */
  var lastY = window.scrollY, navTick = false;
  window.addEventListener('scroll', function(){
    if(navTick) return; navTick = true;
    requestAnimationFrame(function(){
      var y = window.scrollY;
      if(y > lastY + 6 && y > 120) nav.classList.add('hide');
      else if(y < lastY - 6 || y < 120) nav.classList.remove('hide');
      lastY = y; navTick = false;
    });
  }, {passive:true});

  document.addEventListener('keydown', function(e){
    if(e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
    if(e.altKey || e.ctrlKey || e.metaKey) return;
    if(e.key === 'ArrowRight' && next) location.href = next.file;
    if(e.key === 'ArrowLeft' && prev) location.href = prev.file;
  });

  /* ---------- reveal engine (pages without their own) ---------- */
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;
  var own = document.body.hasAttribute('data-own-engine');
  var clamp = function(v){return v<0?0:v>1?1:v};
  var ease = function(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2};
  var selfs = own ? [] : [].slice.call(document.querySelectorAll('[data-self]'));
  function local(el,p){
    if(!el._r) el._r = (el.getAttribute('data-range') || '0,0.3').split(',').map(Number);
    return ease(clamp((p - el._r[0]) / (el._r[1] - el._r[0])));
  }
  var heroEm = document.querySelector('.hero h1 em');
  if(heroEm && !reduce && !own){
    var start = performance.now();
    heroEm.style.setProperty('--mark','0');
    (function heroIntro(now){
      var t = clamp((now - start - 300) / 900);
      heroEm.style.setProperty('--mark', ease(t).toFixed(3));
      if(t < 1) requestAnimationFrame(heroIntro);
    })(start);
  }
  if(reduce || own) return;
  var ticking = false;
  function frame(){
    ticking = false;
    var vh = window.innerHeight;
    var docH = root.scrollHeight - vh;
    root.style.setProperty('--doc', docH > 0 ? (window.scrollY / docH).toFixed(4) : 0);
    selfs.forEach(function(el){
      var rect = el.getBoundingClientRect();
      if(rect.top > vh * 1.2 || rect.bottom < -vh * .2) return;
      el.style.setProperty('--t', local(el, clamp((vh - rect.top) / vh)).toFixed(3));
    });
  }
  function onScroll(){ if(!ticking){ ticking = true; requestAnimationFrame(frame); } }
  window.addEventListener('scroll', onScroll, {passive:true});
  window.addEventListener('resize', onScroll);
  selfs.forEach(function(el){ if(el.getBoundingClientRect().top > window.innerHeight) el.style.setProperty('--t','0'); });
  frame();
})();
