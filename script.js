/* ==========================================================================
   CRO.STUDIO — SHARED SITE SCRIPT (cleaned, no duplicates/conflicts)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------------------------------------------------
     1. HEADER SCROLL STATE
  --------------------------------------------------- */
  const header = document.getElementById('siteHeader');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 30);
    });
  }

  /* ---------------------------------------------------
     2. REVEAL ON SCROLL (single observer, single class)
  --------------------------------------------------- */
  const reveals = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  reveals.forEach((el) => revealObserver.observe(el));

  /* ---------------------------------------------------
     3. COUNTERS (Stores Audited, etc.)
  --------------------------------------------------- */
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        let cur = 0;
        const step = Math.max(1, Math.round(target / 50));
        const t = setInterval(() => {
          cur += step;
          if (cur >= target) { cur = target; clearInterval(t); }
          el.textContent = cur;
        }, 25);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  /* ---------------------------------------------------
     4. GAUGE ANIMATION (only runs if gaugeArc/gaugeNum exist)
  --------------------------------------------------- */
  const gaugeArc = document.getElementById('gaugeArc');
  const gaugeNum = document.getElementById('gaugeNum');
  const gaugeCard = document.querySelector('.gauge-card');

  if (gaugeArc && gaugeNum && gaugeCard) {
    const gaugeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = 92, circumference = 251;
          const offset = circumference - (circumference * target / 100);
          gaugeArc.style.transition = 'stroke-dashoffset 1.6s cubic-bezier(.4,0,.2,1)';
          gaugeArc.style.strokeDashoffset = offset;
          let cur = 0;
          const t = setInterval(() => {
            cur += 2;
            if (cur >= target) { cur = target; clearInterval(t); }
            gaugeNum.textContent = cur;
          }, 24);
          gaugeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    gaugeObserver.observe(gaugeCard);
  }

  /* ---------------------------------------------------
     5. VITALS BAR FILL ANIMATION (site-speed-audit.html)
  --------------------------------------------------- */
  const bars = document.querySelectorAll('.bar-fill');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.fill + '%';
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  bars.forEach(b => barObserver.observe(b));

  /* ---------------------------------------------------
     6. FAQ ACCORDION — ONE listener, smooth open/close,
        exact content height, works with #faq .faq-item
  --------------------------------------------------- */
  document.querySelectorAll('#faq .faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');

    q.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      document.querySelectorAll('#faq .faq-item.active').forEach(openItem => {
        if (openItem !== item) {
          const openA = openItem.querySelector('.faq-a');
          openA.style.maxHeight = openA.scrollHeight + 'px';
          requestAnimationFrame(() => { openA.style.maxHeight = '0px'; });
          openItem.classList.remove('active');
        }
      });

      if (isActive) {
        a.style.maxHeight = a.scrollHeight + 'px';
        requestAnimationFrame(() => { a.style.maxHeight = '0px'; });
        item.classList.remove('active');
      } else {
        item.classList.add('active');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  document.querySelectorAll('#faq .faq-item.active .faq-a').forEach(a => {
    a.style.maxHeight = a.scrollHeight + 'px';
  });

});