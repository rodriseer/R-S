/* R&S Cleaning Services homepage */

// Where quote requests go (see README, "Connect the quote form").
// FORMSPREE_ID: the code at the end of your Formspree form link, e.g. 'xyzabcd'.
//   Requests then arrive in your inbox with no extra step for the customer.
// QUOTE_EMAIL: backup only. If FORMSPREE_ID is empty, the form opens the
//   customer's email app with the request filled in, addressed to this email.
// While both are empty, the form asks people to call or text instead.
const FORMSPREE_ID = '';
const QUOTE_EMAIL = '';

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
      'ZIP code': f.zip.value.trim() || 'not given',
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

    const name = form.elements.name;
    const phone = form.elements.phone;
    let firstBad = null;
    [name, phone].forEach(function (input) {
      const bad = !input.value.trim();
      input.setAttribute('aria-invalid', String(bad));
      if (bad && !firstBad) firstBad = input;
    });
    if (firstBad) {
      showError('Add your name and phone number so we can text you a price.');
      firstBad.focus();
      return;
    }

    const details = quoteDetails();
    const firstName = details.Name.split(' ')[0];
    const subject = 'Quote request from ' + details.Name;

    if (FORMSPREE_ID) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
      const payload = Object.assign({ _subject: subject, _gotcha: form.elements._gotcha.value }, details);
      fetch('https://formspree.io/f/' + FORMSPREE_ID, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).then(function (response) {
        if (!response.ok) throw new Error('Formspree returned ' + response.status);
        showDone('Quote request sent', 'Thanks, ' + firstName + '. We’ll text your price to ' + details.Phone + '.');
      }).catch(function () {
        showError('That didn’t go through. Check your connection and try again, or call or text us.');
      }).finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Get my free quote';
      });
      return;
    }

    if (QUOTE_EMAIL) {
      const body = Object.keys(details).map(function (key) {
        return (key === 'email' ? 'Email' : key) + ': ' + details[key];
      }).join('\n');
      window.location.href = 'mailto:' + QUOTE_EMAIL +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
      showDone('Almost done', 'Your email app opened with your request filled in. Hit send, and we’ll text you a price.');
      return;
    }

    showError('Online quote requests aren’t connected yet. Please call or text us for a price.');
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

  /* ---------- Small things ---------- */

  document.getElementById('year').textContent = String(today.getFullYear());
  renderCalendar();
})();
