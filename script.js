// BioHub Hosting - JavaScript (বাংলা)

(function () {
  'use strict';

  // ১) মোবাইল নেভিগেশন টগল
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('open');
      const expanded = navMenu.classList.contains('open');
      navToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });

    // মেনুতে ক্লিক করলে মোবাইলে মেনু বন্ধ হবে
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ২) প্রাইসিং টগল (মাসিক / বার্ষিক)
  const billingSpans = document.querySelectorAll('.billing-toggle span');
  const priceValueEls = document.querySelectorAll('.price [data-monthly]');
  const priceUnitEls = document.querySelectorAll('.price em[data-monthly]');
  const yearlyNoteEls = document.querySelectorAll('[data-yearly-note]');

  function setBilling(mode) {
    billingSpans.forEach(function (s) {
      s.classList.toggle('active', s.dataset.billing === mode);
    });
    // দামের সংখ্যা বদলানো
    priceValueEls.forEach(function (el) {
      const v = mode === 'yearly' ? el.getAttribute('data-yearly') : el.getAttribute('data-monthly');
      if (v) el.textContent = v;
    });
    // একক (/মাস / /বছর) বদলানো
    priceUnitEls.forEach(function (el) {
      const u = mode === 'yearly' ? el.getAttribute('data-yearly') : el.getAttribute('data-monthly');
      if (u) el.textContent = u;
    });
    // “২ মাস ফ্রি” নোট শুধু বার্ষিকে
    yearlyNoteEls.forEach(function (el) {
      el.style.display = (mode === 'yearly') ? '' : 'none';
    });
  }

  billingSpans.forEach(function (span) {
    span.addEventListener('click', function () {
      setBilling(span.dataset.billing);
    });
  });

  // ডিফল্ট: মাসিক
  setBilling('monthly');

  // ৩) ডোমেইন সার্চ (ডেমো)
  const domainForm = document.getElementById('domainForm');
  const domainInput = document.getElementById('domainInput');
  const domainResult = document.getElementById('domainResult');

  function checkDomain(name) {
    const exts = ['.com', '.net', '.org', '.info', '.com.bd'];
    const prices = {
      '.com': 1200,
      '.net': 1300,
      '.org': 1100,
      '.info': 900,
      '.com.bd': 5500
    };
    // ডেমো: যদি "taken" থাকে তাহলে .com নেওয়া
    const isTaken = /taken|busy|used/i.test(name);
    return exts.map(function (ext) {
      const available = !(isTaken && ext === '.com');
      return {
        ext: ext,
        available: available,
        price: prices[ext]
      };
    });
  }

  if (domainForm && domainInput && domainResult) {
    domainForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const raw = (domainInput.value || '').trim().toLowerCase().replace(/\s+/g, '');
      if (!raw) {
        domainResult.innerHTML = '<p class="hint">⚠️ একটি ডোমেইন নাম লিখুন।</p>';
        domainResult.hidden = false;
        return;
      }
      // এক্সটেনশন বাদ দিয়ে শুধু নাম রাখা
      const nameOnly = raw.replace(/\.[a-z.]+$/, '');
      const results = checkDomain(nameOnly);

      const rows = results.map(function (r) {
        const status = r.available
          ? '<span class="badge ok">✅ খালি আছে</span>'
          : '<span class="badge no">❌ নেওয়া হয়েছে</span>';
        const action = r.available
          ? '<button class="btn small" type="button" data-add="' + nameOnly + r.ext + '">অর্ডার করুন</button>'
          : '<button class="btn small ghost" type="button" disabled>অপ্রাপ্য</button>';
        return (
          '<div class="domain-row">' +
            '<div class="d-left"><strong>' + nameOnly + '<span class="ext">' + r.ext + '</span></strong></div>' +
            '<div class="d-mid">' + status + '</div>' +
            '<div class="d-right">৳ ' + r.price.toLocaleString('bn-BD') + '/বছর ' + action + '</div>' +
          '</div>'
        );
      }).join('');

      domainResult.innerHTML =
        '<h4>“' + nameOnly + '” এর জন্য ফলাফল:</h4>' +
        '<div class="domain-list">' + rows + '</div>';
      domainResult.hidden = false;

      // অর্ডার বাটন
      domainResult.querySelectorAll('[data-add]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          const d = btn.getAttribute('data-add');
          domainResult.insertAdjacentHTML(
            'beforeend',
            '<p class="hint ok-msg">🛒 ' + d + ' কার্টে যোগ হয়েছে (ডেমো)।</p>'
          );
        });
      });
    });
  }

  // ৪) যোগাযোগ ফর্ম (ডেমো)
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  if (contactForm && formNote) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = (contactForm.querySelector('[name="name"]') || {}).value || '';
      const email = (contactForm.querySelector('[name="email"]') || {}).value || '';
      const msg = (contactForm.querySelector('[name="message"]') || {}).value || '';

      if (!name.trim() || !email.trim() || !msg.trim()) {
        formNote.textContent = '⚠️ অনুগ্রহ করে সব ঘর পূরণ করুন।';
        formNote.className = 'form-note error';
        formNote.hidden = false;
        return;
      }

      formNote.textContent = '✅ ধন্যবাদ ' + name + '! আপনার বার্তা পৌঁছে গেছে। শীঘ্রই আমরা যোগাযোগ করবো।';
      formNote.className = 'form-note success';
      formNote.hidden = false;
      contactForm.reset();
    });
  }

  // ৫) ফ্যাক্ট সেকশনে সংখ্যা অ্যানিমেশন
  const counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10) || 0;
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1200;
        const start = performance.now();
        function tick(now) {
          const p = Math.min(1, (now - start) / duration);
          const val = Math.floor(target * p);
          el.textContent = val.toLocaleString('bn-BD') + suffix;
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = target.toLocaleString('bn-BD') + suffix;
        }
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (c) { io.observe(c); });
  }

  // ৬) বছর অটো-আপডেট
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
