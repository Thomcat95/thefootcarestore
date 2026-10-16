// ---- Suggest-a-product form (Formspree) ----
(function(){
  var form = document.getElementById('suggest-form');
  var successMsg = document.getElementById('suggest-success');
  var errorMsg = document.getElementById('suggest-error');
  var submitBtn = document.getElementById('suggest-submit-btn');

  if (form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      successMsg.hidden = true;
      errorMsg.hidden = true;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function(response){
        if (response.ok){
          form.reset();
          successMsg.hidden = false;
        } else {
          errorMsg.hidden = false;
        }
      }).catch(function(){
        errorMsg.hidden = false;
      }).finally(function(){
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send suggestion';
      });
    });
  }
})();

// ---- Chipbar active-state (only relevant on the homepage, harmless elsewhere) ----
(function(){
  var chips = Array.prototype.slice.call(document.querySelectorAll('.chip[href^="#"]'));
  var sections = chips.map(function(chip){
    return document.getElementById(chip.getAttribute('href').slice(1));
  });

  function setActive(id){
    chips.forEach(function(chip){
      chip.classList.toggle('active', chip.getAttribute('href') === '#' + id);
    });
  }

  chips.forEach(function(chip){
    chip.addEventListener('click', function(){
      setActive(chip.getAttribute('href').slice(1));
    });
  });

  if ('IntersectionObserver' in window){
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          setActive(entry.target.id);
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function(section){
      if (section) observer.observe(section);
    });
  }
})();

// ---- Outbound affiliate/product link click tracking (GA4) ----
(function(){
  function retailerFromHref(href){
    try{
      var host = new URL(href).hostname.replace('www.','');
      return host;
    }catch(e){ return 'unknown'; }
  }

  function trackClick(link){
    var card = link.closest('.card');
    var section = link.closest('section[id]');
    var productName = card ? (card.querySelector('h3') ? card.querySelector('h3').textContent.trim() : 'unknown') : 'unknown';
    var categoryId = section ? section.id : 'unknown';
    var retailer = link.getAttribute('data-retailer') || retailerFromHref(link.href);
    var linkType = link.classList.contains('amazon') || link.classList.contains('btn-amazon') ? 'amazon' : 'brand';

    if (typeof gtag === 'function'){
      gtag('event', 'affiliate_click', {
        product_name: productName,
        category: categoryId,
        retailer: retailer,
        link_type: linkType,
        destination_url: link.href
      });
    }
  }

  document.addEventListener('click', function(e){
    var link = e.target.closest('a.btn-amazon, a.btn-buy');
    // Skip "Coming soon" buttons and links to other pages on this site (only outbound partner clicks count)
    if (link && link.getAttribute('data-pending') !== 'true' && link.hostname !== location.hostname) trackClick(link);
  }, true);
})();

// ---- "Coming soon" toast for pending brand links ----
document.addEventListener('click', function(e) {
  var link = e.target.closest('[data-pending="true"]');
  if (!link) return;
  e.preventDefault();
  var msg = document.createElement('div');
  msg.textContent = 'Coming soon — check back shortly!';
  msg.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:var(--teal-deep);color:var(--paper);padding:10px 18px;border-radius:8px;font-size:14px;z-index:9999;';
  document.body.appendChild(msg);
  setTimeout(function() { msg.remove(); }, 2500);
});

// ---- Mobile nav + site-wide search (now backed by /assets/products.json) ----
(function(){
  var hamburger = document.getElementById('nav-hamburger');
  var navlinks = document.getElementById('navlinks');

  function closeMobileNav(){
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    navlinks.classList.remove('open');
  }

  hamburger.addEventListener('click', function(){
    var isOpen = navlinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  navlinks.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', closeMobileNav);
  });

  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') closeMobileNav();
  });

  document.addEventListener('click', function(e){
    if (navlinks.classList.contains('open') && !navlinks.contains(e.target) && !hamburger.contains(e.target)) {
      closeMobileNav();
    }
  });
})();

(function(){
  var toggle = document.getElementById('nav-search-toggle');
  var overlay = document.getElementById('search-overlay');
  var navlinksEl = document.getElementById('navlinks');
  var hamburgerEl = document.getElementById('nav-hamburger');
  var input = document.getElementById('search-input');
  var results = document.getElementById('search-results');
  var productIndex = null; // lazy-loaded, site-wide, shared across every page

  function fetchIndex(){
    if (productIndex) return Promise.resolve(productIndex);
    return fetch('/assets/products.json?v=20261016')
      .then(function(r){ return r.json(); })
      .then(function(data){ productIndex = data; return data; })
      .catch(function(){ productIndex = []; return []; });
  }

  function openOverlay(){
    overlay.classList.add('open');
    input.value = '';
    results.innerHTML = '';
    fetchIndex();
    setTimeout(function(){ input.focus(); }, 50);
  }

  function closeOverlay(){
    overlay.classList.remove('open');
  }

  toggle.addEventListener('click', function(){
    navlinksEl.classList.remove('open');
    hamburgerEl.classList.remove('open');
    hamburgerEl.setAttribute('aria-expanded', 'false');
    if (overlay.classList.contains('open')) { closeOverlay(); } else { openOverlay(); }
  });

  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') closeOverlay();
  });

  document.addEventListener('click', function(e){
    if (overlay.classList.contains('open') && !overlay.contains(e.target) && e.target !== toggle) {
      closeOverlay();
    }
  });

  input.addEventListener('input', function(){
    var q = input.value.trim().toLowerCase();
    results.innerHTML = '';
    if (!q) return;
    fetchIndex().then(function(index){
      var matches = index.filter(function(item){
        return item.title.toLowerCase().indexOf(q) !== -1;
      }).slice(0, 12);
      if (!matches.length){
        var none = document.createElement('div');
        none.className = 'no-results';
        none.textContent = 'No products found for "' + input.value + '"';
        results.appendChild(none);
        return;
      }
      matches.forEach(function(item){
        var a = document.createElement('a');
        a.href = item.page + '#' + item.anchor;
        a.textContent = item.title + (item.section ? ' — ' + item.section : '');
        results.appendChild(a);
      });
    });
  });
})();

// ---- Deep-link highlight: if the URL hash matches a product card, scroll to and flash it ----
(function(){
  if (!location.hash) return;
  var target = document.getElementById(location.hash.slice(1));
  if (!target) return;
  window.addEventListener('load', function(){
    target.scrollIntoView({behavior:'smooth', block:'center'});
    target.classList.add('search-highlight');
    setTimeout(function(){ target.classList.remove('search-highlight'); }, 2000);
  });
})();
