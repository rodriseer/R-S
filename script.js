/* R&S Cleaning Services homepage */

// Quote requests go to Formspree (form mqpqzpaa). The address is the form's
// action in index.html; to switch forms, change it there.

(function () {
  const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const FREQ_LABELS = {
    weekly: 'Weekly',
    biweekly: 'Every 2 weeks',
    monthly: 'Monthly'
  };
  const SERVICE_LABELS = {
    recurring: 'Recurring cleaning',
    deep: 'First deep clean',
    move: 'Move-in or move-out'
  };

  const state = {
    freq: 'biweekly',     // schedule picker in the hero
    formFreq: 'biweekly', // "How often" in the quote form
    day: 4,               // 1 = Monday ... 5 = Friday
    clean: 'standard',
    service: 'recurring'  // what the quote is for
  };

  /* ---------- Calendar: always shows next month ---------- */

  const today = new Date();
  const month = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  const monthName = month.toLocaleString('en-US', { month: 'long' });
  const firstWeekday = month.getDay();
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();

  const grid = document.getElementById('cal-grid');
  const monthEl = document.getElementById('cal-month');
  const countEl = document.getElementById('cal-count');
  const summaryEl = document.getElementById('cal-summary');

  monthEl.textContent = monthName + ' ' + month.getFullYear();

  const dayCells = []; // index = day of month - 1
  const totalCells = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;
  for (let i = 0; i < totalCells; i++) {
    const date = i - firstWeekday + 1;
    const cell = document.createElement('div');
    cell.className = 'cal__day';
    if (date >= 1 && date <= daysInMonth) {
      cell.innerHTML = '<span class="cal__dot"></span><span class="cal__num">' + date + '</span><span class="cal__star"></span>';
      dayCells.push(cell);
    }
    grid.appendChild(cell);
  }

  function visitDates() {
    const first = 1 + ((state.day - firstWeekday + 7) % 7);
    const step = state.freq === 'weekly' ? 7 : state.freq === 'biweekly' ? 14 : 99;
    const dates = [];
    for (let d = first; d <= daysInMonth; d += step) dates.push(d);
    return dates;
  }

  function joinList(items) {
    if (items.length === 1) return items[0];
    return items.slice(0, -1).join(', ') + ' and ' + items[items.length - 1];
  }

  function renderCalendar() {
    const dates = visitDates();
    dayCells.forEach(function (cell, i) {
      const order = dates.indexOf(i + 1);
      cell.classList.toggle('is-visit', order >= 0);
      const delay = order >= 0 ? order * 70 + 'ms' : '0ms';
      cell.querySelectorAll('span').forEach(function (s) { s.style.transitionDelay = delay; });
    });

    const dayName = DAY_NAMES[state.day];
    let lead;
    if (state.freq === 'weekly') lead = 'Every ' + dayName;
    else if (state.freq === 'biweekly') lead = 'Every other ' + dayName;
    else lead = 'The first ' + dayName + ' of each month';

    summaryEl.textContent = lead + ': ' + monthName + ' ' + joinList(dates.map(String)) + '.';
    countEl.textContent = dates.length + (dates.length === 1 ? ' visit' : ' visits');
  }

  /* ---------- Chip groups ---------- */

  function syncGroup(name, value) {
    document.querySelectorAll('[data-group="' + name + '"]').forEach(function (group) {
      group.querySelectorAll('[data-value]').forEach(function (btn) {
        btn.setAttribute('aria-pressed', String(btn.dataset.value === String(value)));
      });
    });
  }

  document.querySelectorAll('[data-group]').forEach(function (group) {
    group.addEventListener('click', function (event) {
      const btn = event.target.closest('[data-value]');
      if (!btn) return;
      const name = group.dataset.group;
      const value = btn.dataset.value;

      if (name === 'freq') {
        state.freq = value;
        state.formFreq = value;
        syncGroup('freq', value);
        syncGroup('formFreq', value);
        renderCalendar();
      } else if (name === 'day') {
        state.day = Number(value);
        syncGroup('day', value);
        renderCalendar();
      } else if (name === 'formFreq') {
        state.formFreq = value;
        syncGroup('formFreq', value);
      } else if (name === 'service') {
        setService(value);
      } else if (name === 'clean') {
        state.clean = value;
        syncGroup('clean', value);
        document.getElementById('includes').classList.toggle('includes--deep', value === 'deep');
      }
    });
  });

  /* ---------- Quote form ---------- */

  const freqGroup = document.getElementById('freq-group');
  function setService(value) {
    state.service = value;
    syncGroup('service', value);
    // "How often" only matters for recurring cleaning
    freqGroup.hidden = value !== 'recurring';
  }

  // "Get a quote" buttons in Ways to book pick the matching service
  document.querySelectorAll('[data-service]').forEach(function (link) {
    link.addEventListener('click', function () { setService(link.dataset.service); });
  });
  // "Request this schedule" in the hero means recurring cleaning
  document.getElementById('request-schedule').addEventListener('click', function () { setService('recurring'); });

  const form = document.getElementById('quote-form');
  const done = document.getElementById('form-done');
  const errorEl = document.getElementById('form-error');

  function showError(message) {
    errorEl.textContent = message;
    errorEl.hidden = false;
  }

  const submitBtn = document.getElementById('quote-submit');
  const doneTitle = document.getElementById('done-title');
  const doneText = document.getElementById('done-text');

  function showDone(title, text) {
    doneTitle.textContent = title;
    doneText.textContent = text;
    form.hidden = true;
    done.hidden = false;
    done.focus();
  }

  function quoteDetails() {
    const f = form.elements;
    const details = {
      'Service': SERVICE_LABELS[state.service],
      'How often': state.service === 'recurring' ? FREQ_LABELS[state.formFreq] : 'One time',
      'Preferred day': DAY_NAMES[state.day],
      'ZIP code': f.zip.value.trim(),
      'Bedrooms': f.bedrooms.value,
      'Bathrooms': f.bathrooms.value,
      'Notes': f.notes.value.trim() || 'none',
      'Name': f.name.value.trim(),
      'Phone': f.phone.value.trim()
    };
    if (f.email.value.trim()) details.email = f.email.value.trim(); // lets you hit Reply in Formspree emails
    return details;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    errorEl.hidden = true;

    // Required: ZIP (to check we cover the area), name and phone
    const required = [
      { input: form.elements.zip, label: 'ZIP code' },
      { input: form.elements.name, label: 'name' },
      { input: form.elements.phone, label: 'phone number' }
    ];
    const missing = [];
    let firstBad = null;
    required.forEach(function (field) {
      const bad = !field.input.value.trim();
      field.input.setAttribute('aria-invalid', String(bad));
      if (bad) {
        missing.push(field.label);
        if (!firstBad) firstBad = field.input;
      }
    });
    if (firstBad) {
      const list = missing.length === 1 ? missing[0]
        : missing.slice(0, -1).join(', ') + ' and ' + missing[missing.length - 1];
      showError('Add your ' + list + ' so we can text you a quote.');
      firstBad.focus();
      return;
    }

    const zip = form.elements.zip;
    if (!/^[0-9]{5}$/.test(zip.value.trim())) {
      zip.setAttribute('aria-invalid', 'true');
      showError('Enter a 5-digit ZIP code.');
      zip.focus();
      return;
    }

    const email = form.elements.email;
    if (email.value.trim() && !email.checkValidity()) {
      email.setAttribute('aria-invalid', 'true');
      showError('That email doesn’t look right. Fix it or leave it empty.');
      email.focus();
      return;
    }
    email.setAttribute('aria-invalid', 'false');

    const details = quoteDetails();
    const firstName = details.Name.split(' ')[0];
    const payload = Object.assign({
      _subject: 'Quote request from ' + details.Name,
      _gotcha: form.elements._gotcha.value
    }, details);

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    fetch(form.getAttribute('action'), {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(function (response) {
      return response.json().catch(function () { return {}; }).then(function (data) {
        if (response.ok) {
          showDone('Quote request sent', 'Thanks, ' + firstName + '. We’ll text your quote to ' + details.Phone + '.');
          return;
        }
        // Formspree explains what's wrong, e.g. a bad email address
        const message = data && data.errors && data.errors.length
          ? data.errors.map(function (err) { return err.message; }).join(' ')
          : 'That didn’t go through.';
        showError(message + ' Try again, or call or text us at (301) 525-1949.');
      });
    }).catch(function () {
      showError('That didn’t go through. Check your connection and try again, or call or text us at (301) 525-1949.');
    }).finally(function () {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Get my free quote';
    });
  });

  document.getElementById('form-reset').addEventListener('click', function () {
    form.reset();
    form.hidden = false;
    done.hidden = true;
    form.elements.zip.focus();
  });

  /* ---------- Phone menu ---------- */

  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.getElementById('main-nav');
  function setMenu(open) {
    menuBtn.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('nav--open', open);
  }
  menuBtn.addEventListener('click', function () {
    setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
  });
  nav.addEventListener('click', function (event) {
    if (event.target.closest('a')) setMenu(false);
  });

  /* ---------- Room checklists: folded on phones, always open on wider screens ---------- */

  const phoneQuery = window.matchMedia('(max-width: 560px)');
  const rooms = Array.prototype.slice.call(document.querySelectorAll('.room'));
  function setupRooms() {
    rooms.forEach(function (room, i) {
      const summary = room.querySelector('summary');
      if (phoneQuery.matches) {
        room.open = i === 0;
        summary.removeAttribute('tabindex');
      } else {
        room.open = true;
        summary.setAttribute('tabindex', '-1');
      }
    });
  }
  rooms.forEach(function (room) {
    room.querySelector('summary').addEventListener('click', function (event) {
      if (!phoneQuery.matches) event.preventDefault();
    });
  });
  if (phoneQuery.addEventListener) phoneQuery.addEventListener('change', setupRooms);
  setupRooms();

  /* ---------- Contact bar: get out of the way while someone is typing ---------- */

  const actionBar = document.querySelector('.action-bar');
  document.addEventListener('focusin', function (event) {
    if (event.target.matches('input, select, textarea')) actionBar.classList.add('action-bar--hidden');
  });
  document.addEventListener('focusout', function (event) {
    if (event.target.matches('input, select, textarea')) actionBar.classList.remove('action-bar--hidden');
  });

  /* ---------- Illustrations: reveal, scroll motion, vacuum, spray, tilt ---------- */

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasIO = 'IntersectionObserver' in window;

  // Illustrations pop in the first time they scroll into view
  const revealEls = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
  if (hasIO) {
    const revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        revealIO.unobserve(entry.target);
      });
    }, { threshold: 0.25 });
    revealEls.forEach(function (el) { revealIO.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  // Scroll motion. Inside a [data-fx-scene], anything with data-fx-y / data-fx-x (distance)
  // or data-fx-rot (degrees) drifts or turns by that much while the scene crosses the screen.
  const scenes = Array.prototype.slice.call(document.querySelectorAll('[data-fx-scene]')).map(function (host) {
    const parts = Array.prototype.slice.call(host.querySelectorAll('[data-fx-y], [data-fx-x], [data-fx-rot]')).map(function (el) {
      return {
        el: el,
        x: Number(el.dataset.fxX) || 0,
        y: Number(el.dataset.fxY) || 0,
        rot: Number(el.dataset.fxRot) || 0,
        inSvg: !!el.ownerSVGElement
      };
    });
    return { host: host, parts: parts, visible: !hasIO };
  });

  // Vacuum band: the vacuum crosses as the band moves up the screen. Dust it has passed stays gone.
  const track = document.querySelector('.sweep__track');
  const vac = document.querySelector('.sweep__vac');
  const readX = function (el) { return parseFloat(el.style.getPropertyValue('--x')) / 100; };
  const dust = Array.prototype.slice.call(document.querySelectorAll('.sweep__dust')).map(function (el) { return { el: el, x: readX(el) }; });
  const sparkles = Array.prototype.slice.call(document.querySelectorAll('.sweep__star')).map(function (el) { return { el: el, x: readX(el) }; });
  let sweepVisible = !hasIO;
  let cleaned = 0; // furthest the vacuum has reached, 0 to 1

  function updateSweep(viewportHeight, progressOverride) {
    const box = track.getBoundingClientRect();
    const vacWidth = vac.getBoundingClientRect().width;
    const travel = box.width - vacWidth;
    const progress = progressOverride !== undefined ? progressOverride
      : Math.min(1, Math.max(0, (viewportHeight * 0.92 - box.top) / (viewportHeight * 0.55)));
    cleaned = Math.max(cleaned, progress);
    vac.style.transform = 'translate3d(' + (travel * progress).toFixed(1) + 'px, 0, 0)';
    const head = (travel * cleaned + vacWidth * 0.9) / box.width;
    const tail = (travel * cleaned + vacWidth * 0.25) / box.width;
    dust.forEach(function (d) { d.el.classList.toggle('is-gone', d.x < head); });
    sparkles.forEach(function (sp) { sp.el.classList.toggle('is-on', sp.x < tail); });
  }

  const phoneWidth = window.matchMedia('(max-width: 560px)');
  let ticking = false;
  function frame() {
    ticking = false;
    const viewportHeight = window.innerHeight;
    scenes.forEach(function (scene) {
      if (!scene.visible) return;
      const box = scene.host.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (viewportHeight - box.top) / (viewportHeight + box.height))) - 0.5;
      scene.parts.forEach(function (part) {
        // Parts inside an SVG already shrink with the drawing; plain elements move less on phones
        const k = part.inSvg ? 1 : (phoneWidth.matches ? 0.6 : 1);
        part.el.style.transform = 'translate(' + (part.x * p * k).toFixed(1) + 'px, ' + (part.y * p * k).toFixed(1) + 'px) rotate(' + (part.rot * p).toFixed(1) + 'deg)';
      });
    });
    if (sweepVisible) updateSweep(viewportHeight);
  }
  function requestFrame() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(frame);
  }

  if (reduceMotion) {
    // No movement: show the floor already vacuumed, with the vacuum parked at the end
    updateSweep(window.innerHeight, 1);
    window.addEventListener('resize', function () { updateSweep(window.innerHeight, 1); });
  } else {
    if (hasIO) {
      const sceneIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.target === track) { sweepVisible = entry.isIntersecting; return; }
          scenes.forEach(function (scene) { if (scene.host === entry.target) scene.visible = entry.isIntersecting; });
        });
        requestFrame();
      }, { rootMargin: '80px 0px' });
      scenes.forEach(function (scene) { sceneIO.observe(scene.host); });
      sceneIO.observe(track);
    }
    window.addEventListener('scroll', requestFrame, { passive: true });
    window.addEventListener('resize', requestFrame);
    requestFrame();
  }

  // Spray bottle on the schedule card: one puff when the card first shows, and one for every pick
  const sprayEl = document.querySelector('.spray');
  const scheduler = document.querySelector('.scheduler');
  function spray() {
    if (reduceMotion) return;
    sprayEl.classList.remove('is-spraying');
    void sprayEl.offsetWidth; // restarts the animation
    sprayEl.classList.add('is-spraying');
  }
  scheduler.addEventListener('click', function (event) {
    if (event.target.closest('.chip')) spray();
  });
  if (hasIO) {
    const sprayIO = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      spray();
      sprayIO.disconnect();
    }, { threshold: 0.4 });
    sprayIO.observe(scheduler);
  }

  // Desktop only: service illustrations tilt toward the mouse
  if (!reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    Array.prototype.forEach.call(document.querySelectorAll('.service'), function (card) {
      const art = card.querySelector('.service__art');
      card.addEventListener('pointermove', function (event) {
        const box = art.getBoundingClientRect();
        const dx = Math.max(-0.5, Math.min(0.5, (event.clientX - box.left) / box.width - 0.5));
        const dy = Math.max(-0.5, Math.min(0.5, (event.clientY - box.top) / box.height - 0.5));
        art.style.setProperty('--ry', (dx * 12).toFixed(1) + 'deg');
        art.style.setProperty('--rx', (dy * -12).toFixed(1) + 'deg');
      });
      card.addEventListener('pointerleave', function () {
        art.style.removeProperty('--rx');
        art.style.removeProperty('--ry');
      });
    });
  }

  /* ---------- Small things ---------- */

  document.getElementById('year').textContent = String(today.getFullYear());
  renderCalendar();
})();
