// ---- Footwear brands: shared data for the Footwear hub, Luxury & Handmade page and winter boots ----
// Brand buttons: live affiliate links where approved; everything else stays data-pending ("Coming soon")
// until the program approves the site. To turn a brand on, set live:true and paste its tracking link in url.
(function(){
  var TAG = 'thefootcare00-20';
  function amazon(q){ return 'https://www.amazon.com/s?k=' + encodeURIComponent(q).replace(/%20/g,'+') + '&tag=' + TAG; }
  var RETAILERS = {
    zappos:    { name:'Zappos',     url:function(b){ return 'https://www.zappos.com/search?term=' + encodeURIComponent(b); } },
    nordstrom: { name:'Nordstrom',  url:function(b){ return 'https://www.nordstrom.com/sr?keyword=' + encodeURIComponent(b); } },
    dsw:       { name:'DSW',        url:function(b){ return 'https://www.dsw.com/search?searchText=' + encodeURIComponent(b); } },
    bootbarn:  { name:'Boot Barn',  url:function(b){ return 'https://www.bootbarn.com/search?q=' + encodeURIComponent(b); } }
  };

  var NEEDS = {
    orthotics: { label:'Room for orthotics', text:'Look for a removable factory insole and enough depth that a custom or over-the-counter orthotic fits without crowding the toes or lifting the heel out of the shoe.' },
    toebox:    { label:'Roomy toe box', text:'A wide, rounded toe box and soft upper reduce pressure on bunions, hammertoes, corns and neuromas. The widest part of the foot should sit at the widest part of the shoe.' },
    rocker:    { label:'Rocker sole', text:'A curved (rocker) sole lets the foot roll forward without bending the big-toe joint as much, which can ease big-toe arthritis and ball-of-foot pain.' },
    depth:     { label:'Extra depth', text:'Extra-depth shoes add room top to bottom for swelling, toe deformities, braces or diabetic inserts. Seam-free linings lower the risk of rubbing on sensitive feet.' },
    stability: { label:'Firm heel & stability', text:'A firm heel counter and a sole that resists twisting help control flat feet, overpronation and heel pain. Press the back of the heel: it should not collapse.' },
    widths:    { label:'Wide widths', text:'Brands that make true widths (2E and 4E for men, D and 2E for women) fit wide feet without sizing up in length, which keeps the arch support in the right place.' },
    standing:  { label:'Long shifts standing', text:'For nurses, retail and trades: cushioning that holds up over a shift, a supportive midsole, and slip-resistant soles where the job calls for them.' },
    resole:    { label:'Built to be resoled', text:'Welted and stitchdown construction can be resoled many times. The upper and leather insole, already molded to the foot, stay in service for years.' }
  };

  // who: m = men's, w = women's, k = children's · style: athletic | dress | casual | boots
  var BRANDS = [
    { key:'hoka', name:'HOKA', who:'mw', style:['athletic','casual'], needs:['rocker','standing','widths','orthotics'], tag:'Running & walking',
      blurb:'Max-cushioned shoes with a rocker-shaped sole. Many styles come in wide widths, and insoles lift out for orthotics.',
      amazonQ:'hoka shoes', brandUrl:'https://click.linksynergy.com/deeplink?id=FeBQBOTajKw&mid=43729&murl=https%3A%2F%2Fwww.hoka.com%2Fen%2Fus%2F&u1=footwear-hub&LSNSUBSITE=LSNSUBSITE', live:true, retailers:['zappos','dsw'] },
    { key:'aetrex', name:'Aetrex', who:'mw', style:['casual','athletic'], needs:['orthotics','depth','stability'], tag:'Orthotic comfort',
      blurb:'Comfort shoes built around a supportive footbed, with removable insoles and extra room in many styles.',
      amazonQ:'aetrex shoes', brandUrl:'https://www.awin1.com/cread.php?awinmid=42935&awinaffid=3069269&ued=https%3A%2F%2Fwww.aetrex.com%2F', live:true, retailers:['zappos','nordstrom'] },
    { key:'newbalance', name:'New Balance', who:'mwk', style:['athletic','casual'], needs:['widths','depth','stability','orthotics'], tag:'Running & walking',
      blurb:'One of the widest width ranges in athletic shoes, plus walking models with extra depth and removable insoles.',
      amazonQ:'new balance walking shoes', brandUrl:'https://www.newbalance.com/', retailers:['zappos','dsw'] },
    { key:'brooks', name:'Brooks', who:'mw', style:['athletic'], needs:['stability','widths','orthotics','standing'], tag:'Running & walking',
      blurb:'Stability and cushioned running shoes, many offered in wide and extra-wide widths.',
      amazonQ:'brooks running shoes', brandUrl:'https://www.brooksrunning.com/', retailers:['zappos','dsw'] },
    { key:'asics', name:'ASICS', who:'mwk', style:['athletic'], needs:['stability','widths','orthotics'], tag:'Running & court',
      blurb:'Stability running shoes and court shoes, with wide versions of popular models.',
      amazonQ:'asics stability shoes', brandUrl:'https://www.asics.com/us/en-us/', retailers:['zappos','dsw'] },
    { key:'saucony', name:'Saucony', who:'mwk', style:['athletic'], needs:['stability','widths'], tag:'Running',
      blurb:'Neutral and stability running shoes with wide options in core models.',
      amazonQ:'saucony running shoes', brandUrl:'https://www.saucony.com/', retailers:['zappos','dsw'] },
    { key:'skechers', name:'Skechers', who:'mwk', style:['athletic','casual'], needs:['widths','standing'], tag:'Comfort walking',
      blurb:'Lightweight walking and work shoes, with relaxed and wide fits and hands-free slip-in styles.',
      amazonQ:'skechers wide walking shoes', brandUrl:'https://www.skechers.com/', retailers:['zappos','dsw'] },
    { key:'orthofeet', name:'Orthofeet', who:'mw', style:['casual','athletic'], needs:['depth','toebox','widths','orthotics'], tag:'Extra depth',
      blurb:'Extra-depth, seam-free shoes with roomy toe boxes, designed for sensitive and diabetic feet.',
      amazonQ:'orthofeet shoes', brandUrl:'https://www.orthofeet.com/', retailers:['zappos'] },
    { key:'vionic', name:'Vionic', who:'wm', style:['casual','dress'], needs:['stability'], tag:'Arch support',
      blurb:'Casual and dress shoes and sandals with a contoured, supportive footbed built in.',
      amazonQ:'vionic shoes', brandUrl:'https://www.vionicshoes.com/', retailers:['zappos','dsw'] },
    { key:'dansko', name:'Dansko', who:'wm', style:['casual'], needs:['rocker','stability','standing'], tag:'Clogs for long shifts',
      blurb:'Clogs with a firm heel and a rocker bottom, common in hospitals and kitchens.',
      amazonQ:'dansko clogs', brandUrl:'https://www.dansko.com/', retailers:['zappos','nordstrom'] },
    { key:'birkenstock', name:'Birkenstock', who:'mwk', style:['casual'], needs:['toebox'], tag:'Sandals & clogs',
      blurb:'Contoured cork footbeds with plenty of room for the toes to spread.',
      amazonQ:'birkenstock', brandUrl:'https://www.birkenstock.com/us/', retailers:['zappos','nordstrom'] },
    { key:'clarks', name:'Clarks', who:'mwk', style:['dress','casual'], needs:['widths'], tag:'Dress & casual',
      blurb:'Dress and casual shoes, including children\'s school shoes, with wide widths in many styles.',
      amazonQ:'clarks shoes', brandUrl:'https://www.clarks.com/', retailers:['zappos','dsw'] },
    { key:'ecco', name:'ECCO', who:'mw', style:['dress','casual'], needs:['toebox','standing'], tag:'European comfort',
      blurb:'Leather dress and casual shoes on an anatomical last with a roomier forefoot than most dress shoes.',
      amazonQ:'ecco shoes', brandUrl:'https://www.ecco.com/', retailers:['zappos','nordstrom'] },
    { key:'colehaan', name:'Cole Haan', who:'mw', style:['dress','casual'], needs:[], tag:'Hybrid dress',
      blurb:'Dress shoes with sneaker-style cushioning for long days in office attire.',
      amazonQ:'cole haan shoes', brandUrl:'https://www.colehaan.com/', retailers:['nordstrom','zappos'] },
    { key:'allenedmonds', name:'Allen Edmonds', who:'m', style:['dress'], needs:['widths','resole'], tag:'Handcrafted dress',
      blurb:'Goodyear-welted dress shoes in a wide range of widths, with a factory recrafting service.',
      amazonQ:'allen edmonds shoes', brandUrl:'https://www.allenedmonds.com/', retailers:['nordstrom','zappos'] },
    { key:'johnstonmurphy', name:'Johnston & Murphy', who:'m', style:['dress','casual'], needs:['widths'], tag:'Classic dress',
      blurb:'Classic dress and casual shoes, with wide widths in many styles.',
      amazonQ:'johnston and murphy shoes', brandUrl:'https://www.johnstonmurphy.com/', retailers:['zappos'] },
    { key:'naturalizer', name:'Naturalizer', who:'w', style:['dress','casual','boots'], needs:['widths'], tag:'Women\'s comfort',
      blurb:'Women\'s dress shoes and boots with lower heels and wide and extra-wide widths.',
      amazonQ:'naturalizer shoes', brandUrl:'https://www.naturalizer.com/', retailers:['zappos','dsw'] },
    { key:'striderite', name:'Stride Rite', who:'k', style:['casual','athletic','dress'], needs:['widths','stability'], tag:'Children',
      blurb:'Children\'s shoes from first walkers up, with firm heels and wide widths.',
      amazonQ:'stride rite kids shoes', brandUrl:'https://www.striderite.com/', retailers:['zappos'] },
    { key:'timberland', name:'Timberland', who:'mwk', style:['boots'], needs:['standing'], tag:'Work & everyday boots',
      blurb:'Everyday and Timberland PRO work boots, with anti-fatigue footbeds in the PRO line.',
      amazonQ:'timberland boots', brandUrl:'https://www.timberland.com/', retailers:['zappos'], winter:true },
    { key:'wolverine', name:'Wolverine', who:'mw', style:['boots'], needs:['standing','widths'], tag:'Work boots',
      blurb:'Work boots with cushioned midsoles, many offered in wide and extra-wide.',
      amazonQ:'wolverine work boots', brandUrl:'https://www.wolverine.com/', retailers:['bootbarn','zappos'] },
    { key:'keen', name:'KEEN', who:'mwk', style:['boots'], needs:['toebox','widths','standing'], tag:'Work & hiking boots',
      blurb:'Work and hiking boots known for a roomy toe box, with wide widths in many models.',
      amazonQ:'keen boots', brandUrl:'https://www.keenfootwear.com/', retailers:['zappos'], winter:true },
    { key:'merrell', name:'Merrell', who:'mwk', style:['boots','athletic'], needs:['widths'], tag:'Hiking',
      blurb:'Hiking boots and trail shoes, with wide versions of core models.',
      amazonQ:'merrell hiking boots', brandUrl:'https://www.merrell.com/', retailers:['zappos'] },
    { key:'ariat', name:'Ariat', who:'mwk', style:['boots'], needs:['stability','widths','standing'], tag:'Western & work',
      blurb:'Western, work and riding boots with stabilizing shanks and wide widths.',
      amazonQ:'ariat boots', brandUrl:'https://www.ariat.com/', retailers:['bootbarn','zappos'] },
    { key:'tecovas', name:'Tecovas', who:'mwk', style:['boots'], needs:['widths'], tag:'Western boots',
      blurb:'Handmade western boots sold direct, in standard and wide widths.',
      amazonQ:'', brandUrl:'https://www.tecovas.com/', retailers:[] },
    { key:'sorel', name:'Sorel', who:'mwk', style:['boots'], needs:[], tag:'Winter boots',
      blurb:'Insulated, waterproof winter boots for snow, slush and cold commutes.',
      amazonQ:'sorel winter boots', brandUrl:'https://www.sorel.com/', retailers:['zappos','nordstrom'], winter:true },
    { key:'ugg', name:'UGG', who:'mwk', style:['boots','casual'], needs:[], tag:'Sheepskin boots',
      blurb:'Sheepskin boots and slippers. Warm, but with little arch support, so best for short wear.',
      amazonQ:'ugg boots', brandUrl:'https://www.ugg.com/', retailers:['zappos','nordstrom'], winter:true },
    { key:'lucchese', name:'Lucchese', who:'mw', style:['boots'], needs:['widths'], tag:'Handmade western', luxury:true,
      blurb:'Handmade western boots, in production since 1883, with leather lining and a molded leather insole.',
      amazonQ:'', brandUrl:'https://www.lucchese.com/', retailers:['bootbarn'] },
    { key:'nicks', name:'Nicks Handmade Boots', who:'m', style:['boots'], needs:['resole','widths'], tag:'Handmade work boots', luxury:true,
      blurb:'Hand-sewn work and dress boots with a high arch last, resoleable and offered in custom sizing.',
      amazonQ:'', brandUrl:'https://nicksboots.com/', retailers:[] },
    { key:'grantstone', name:'Grant Stone', who:'m', style:['boots','dress'], needs:['resole'], tag:'Goodyear-welted',
      blurb:'Goodyear-welted boots and shoes made in small batches, resoleable for years of wear.', luxury:true,
      amazonQ:'', brandUrl:'https://www.grantstoneboot.com/', retailers:[] },
    { key:'beckett', name:'Beckett Simonon', who:'m', style:['dress','boots'], needs:[], tag:'Made to order', luxury:true,
      blurb:'Made-to-order dress shoes and boots in full-grain leather, produced in small batches after you order.',
      amazonQ:'', brandUrl:'https://www.beckettsimonon.com/', retailers:[] },
    { key:'ferragamo', name:'Ferragamo', who:'mw', style:['dress'], needs:[], tag:'Italian luxury', luxury:true,
      blurb:'Italian-made dress shoes, loafers and low heels in leather.',
      amazonQ:'', brandUrl:'https://www.ferragamo.com/', retailers:['nordstrom'] },
    { key:'stuartweitzman', name:'Stuart Weitzman', who:'w', style:['boots','dress'], needs:[], tag:'Luxury women\'s boots', luxury:true,
      blurb:'Women\'s leather boots and low block heels. Look for the flat and low-heel styles for daily wear.',
      amazonQ:'', brandUrl:'https://www.stuartweitzman.com/', retailers:['nordstrom'] },
    { key:'redwing', name:'Red Wing', who:'m', style:['boots'], needs:['resole','standing'], tag:'Heritage work boots',
      blurb:'Goodyear-welted work and heritage boots, resoleable through Red Wing stores.',
      amazonQ:'red wing boots', brandUrl:'https://www.redwingshoes.com/', retailers:['zappos'] }
  ];
  // Allen Edmonds also belongs on the Luxury & Handmade page (custom shoe builder)
  BRANDS.forEach(function(b){ if (b.key==='allenedmonds') b.luxury = true; });

  var WHO = { m:'Men', w:'Women', k:'Children' };
  function esc(s){ return String(s).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
  function btn(cls, href, label, pending, retailer, brand){
    return '<a class="btn-buy ' + cls + '" href="' + esc(href) + '" rel="nofollow sponsored noopener" target="_blank"' +
      (pending ? ' data-pending="true"' : '') + ' data-retailer="' + esc(retailer) + '" data-brand="' + esc(brand) + '">' + esc(label) + ' →</a>';
  }
  function card(b, idPrefix){
    var who = b.who.split('').map(function(c){ return WHO[c]; }).join(', ');
    var feats = b.needs.map(function(n){ return NEEDS[n].label.toLowerCase(); });
    var links = [];
    if (b.amazonQ) links.push(btn('amazon', amazon(b.amazonQ), 'Amazon', false, 'amazon', b.name));
    links.push(btn('brand', b.brandUrl, b.name, !b.live, b.key, b.name));
    b.retailers.forEach(function(r){ links.push(btn('brand', RETAILERS[r].url(b.name), RETAILERS[r].name, true, r, b.name)); });
    return '<div class="card" id="' + idPrefix + '-' + b.key + '">' +
      '<div class="tag">' + esc(b.tag) + '</div><h3>' + esc(b.name) + '</h3>' +
      '<p>' + esc(b.blurb) + '</p>' +
      '<p>For: ' + esc(who) + (feats.length ? '. Look for: ' + esc(feats.join(', ')) : '') + '.</p>' +
      '<div class="buy-links">' + links.join('') + '</div></div>';
  }

  // Static lists: <div class="grid" data-fw-list="luxury|winter"> or data-fw-keys="a,b,c"
  Array.prototype.forEach.call(document.querySelectorAll('[data-fw-list],[data-fw-keys]'), function(el){
    var list = el.getAttribute('data-fw-list'), keys = el.getAttribute('data-fw-keys');
    var pick = BRANDS.filter(function(b){
      if (keys) return keys.split(',').indexOf(b.key) !== -1;
      return list === 'luxury' ? b.luxury : list === 'winter' ? b.winter : false;
    });
    el.innerHTML = pick.map(function(b){ return card(b, el.id || 'fw'); }).join('');
  });

  // Hub filter
  var grid = document.getElementById('brand-grid');
  if (!grid) return;
  var state = { who:'all', style:'all', need:'all' };
  var explain = document.getElementById('need-explain');
  var count = document.getElementById('need-count');

  function render(){
    var shown = BRANDS.filter(function(b){
      return (state.who === 'all' || b.who.indexOf(state.who) !== -1) &&
             (state.style === 'all' || b.style.indexOf(state.style) !== -1) &&
             (state.need === 'all' || b.needs.indexOf(state.need) !== -1);
    });
    grid.innerHTML = shown.length ? shown.map(function(b){ return card(b, 'brand'); }).join('')
      : '<p class="cat-note">No brands match all three filters. Try “Everyone” or “Any style”.</p>';
    explain.textContent = state.need === 'all' ? '' : NEEDS[state.need].text;
    count.textContent = shown.length + (shown.length === 1 ? ' brand' : ' brands') + ' shown';
  }
  function press(group, value){
    state[group] = value;
    Array.prototype.forEach.call(document.querySelectorAll('[data-' + group + ']'), function(b){
      var on = b.getAttribute('data-' + group) === value;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    render();
  }
  ['who','style','need'].forEach(function(group){
    Array.prototype.forEach.call(document.querySelectorAll('button[data-' + group + ']'), function(b){
      b.addEventListener('click', function(){ press(group, b.getAttribute('data-' + group)); });
    });
  });
  // Deep links for condition pages, QR cards and the newsletter: /footwear/#need-toebox, #for-children
  function fromHash(){
    var h = location.hash.replace('#','');
    if (h.indexOf('need-') === 0 && NEEDS[h.slice(5)]) { press('need', h.slice(5)); }
    else if (h === 'for-children') { press('who', 'k'); }
    else if (h === 'for-men') { press('who', 'm'); }
    else if (h === 'for-women') { press('who', 'w'); }
    else { render(); return; }
    var target = document.getElementById('shop-by-foot-need');
    if (target) target.scrollIntoView();
  }
  window.addEventListener('hashchange', fromHash);
  fromHash();
})();
