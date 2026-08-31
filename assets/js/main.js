/* Wilhelm Global Holdings — home page behaviour (index.html) */


  // ─── RESERVATION STATE ───
  const state = {
    currentStep: 1,
    selectedClass: null,
    selectedDuration: null,
    adults: 1,
    children: 0,
    servants: 0
  };

  const prices = { steerage: 0, second: 600, first: 2000 };
  const classNames = { steerage: '3rd Class (Third Class) — Free', second: '2nd Class (Second Class) — 600 R', first: '1st Class (First Class) — 2,000 R' };

  function openReservation(cls) {
    document.getElementById('reservationModal').classList.add('open');
    document.body.style.overflow = 'hidden';
    if (cls) selectClass(cls);
  }

  function closeReservation() {
    document.getElementById('reservationModal').classList.remove('open');
    document.body.style.overflow = '';
  }

  // Close on backdrop click
  document.getElementById('reservationModal').addEventListener('click', function(e) {
    if (e.target === this) closeReservation();
  });

  function selectClass(cls) {
    state.selectedClass = cls;
    document.querySelectorAll('.cs-card').forEach(c => {
      c.classList.remove('selected', 'selected-steerage', 'selected-second');
    });
    const card = document.querySelector(`.cs-card[data-class="${cls}"]`);
    if (card) {
      card.classList.add('selected');
      if (cls === 'steerage') card.classList.add('selected-steerage');
      if (cls === 'second') card.classList.add('selected-second');
    }
    document.getElementById('pax-servants-row').style.display = cls === 'first' ? 'flex' : 'none';
    if (cls !== 'first') state.servants = 0;
    updateCostPreview();
  }

  function selectDuration(el, dur) {
    state.selectedDuration = dur;
    document.querySelectorAll('.dur-btn').forEach(b => b.classList.remove('selected'));
    el.classList.add('selected');
    updateCostPreview();
  }

  function changePax(type, delta) {
    const min = type === 'adults' ? 1 : 0;
    state[type] = Math.max(min, Math.min(8, state[type] + delta));
    document.getElementById(`pax-${type}`).textContent = state[type];
    updateCostPreview();
  }

  function updateCostPreview() {
    if (!state.selectedClass) {
      document.getElementById('cost-preview').textContent = 'R —';
      return;
    }
    const base = prices[state.selectedClass];
    const total = base * state.adults + base * 0.5 * state.children + base * 0.3 * state.servants;
    if (state.selectedClass === 'steerage') {
      document.getElementById('cost-preview').textContent = 'Free (Roblox Community Required)';
    } else {
      document.getElementById('cost-preview').textContent = 'R ' + Math.round(total).toLocaleString();
    }
  }

  function buildSummary() {
    const base = prices[state.selectedClass];
    const total = base * state.adults + base * 0.5 * state.children + base * 0.3 * state.servants;
    const fname = document.getElementById('p-fname').value;
    const lname = document.getElementById('p-lname').value;
    const title = document.getElementById('p-title').value;
    const station = document.getElementById('boardStation').value;
    const date = document.getElementById('boardDate').value;

    const rows = [
      ['Journey Type', 'One-Way · Final Sale · No Return'],
      ['Class of Travel', classNames[state.selectedClass].split(' — ')[0]],
      ['Lead Passenger', `${title} ${fname} ${lname}`],
      ['Boarding Station', station],
      ['Boarding Date', date ? new Date(date).toLocaleDateString('en-GB', {day:'numeric',month:'long',year:'numeric'}) : '—'],
      ['Adults', state.adults],
      ...(state.children > 0 ? [['Children', state.children]] : []),
      ...(state.servants > 0 ? [['Personal Servants', state.servants]] : []),
    ];

    let totalDisplay = state.selectedClass === 'steerage'
      ? 'Free (Roblox Community Required)'
      : 'R ' + Math.round(total).toLocaleString();

    let html = rows.map(([k,v]) => `<div class="summary-row"><span>${k}</span><span>${v}</span></div>`).join('');
    html += `<div class="summary-row summary-total"><span>Total — Final Sale</span><span>${totalDisplay}</span></div>`;
    document.getElementById('summaryTable').innerHTML = html;
  }

  function generateRef() {
    const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    const rand = () => Math.floor(Math.random() * 9000 + 1000);
    const randL = () => letters[Math.floor(Math.random() * letters.length)];
    return `WGH-1972-${randL()}${randL()}${rand()}`;
  }

  function showStep(n) {
    document.querySelectorAll('.modal-step').forEach(s => s.classList.remove('active'));
    document.getElementById(`step-${n}`).classList.add('active');
    state.currentStep = n;

    // Update step dots
    for (let i = 1; i <= 4; i++) {
      const dot = document.getElementById(`dot-${i}`);
      const lbl = document.getElementById(`lbl-${i}`);
      dot.classList.remove('active','done');
      lbl.classList.remove('active');
      if (i < n) { dot.classList.add('done'); dot.textContent = '✓'; }
      else if (i === n) { dot.classList.add('active'); dot.textContent = i; lbl.classList.add('active'); }
      else { dot.textContent = i; }
    }

    const back = document.getElementById('btn-back');
    const next = document.getElementById('btn-next');
    const footer = document.getElementById('modal-footer');

    if (n === 5) {
      footer.style.display = 'none';
    } else {
      footer.style.display = 'flex';
      back.style.display = n > 1 ? 'inline-block' : 'none';
      next.textContent = n === 4 ? 'Confirm Reservation →' : 'Continue →';
    }
  }

  function nextStep() {
    const n = state.currentStep;
    // Validation
    if (n === 1) {
      if (!state.selectedClass) {
        document.getElementById('err-1').classList.add('show'); return;
      }
      document.getElementById('err-1').classList.remove('show');
    }
    if (n === 3) {
      const fname = document.getElementById('p-fname').value.trim();
      const lname = document.getElementById('p-lname').value.trim();
      const addr = document.getElementById('p-address').value.trim();
      const doc = document.getElementById('p-doc').value.trim();
      if (!fname || !lname || !addr || !doc) {
        document.getElementById('err-3').classList.add('show'); return;
      }
      document.getElementById('err-3').classList.remove('show');
      buildSummary();
    }
    if (n === 4) {
      if (!document.getElementById('terms-check').checked) {
        document.getElementById('err-4').classList.add('show'); return;
      }
      document.getElementById('err-4').classList.remove('show');
      document.getElementById('conf-ref').textContent = generateRef();

      // Inject class-specific purchase block
      const pb = document.getElementById('purchase-block');
      const cls = state.selectedClass;
      if (cls === 'steerage') {
        pb.innerHTML = `<div style="border:0.5px solid rgba(120,100,70,0.4);padding:1.5rem;background:rgba(120,100,70,0.07);max-width:460px;margin:0 auto;">
          <span style="font-family:'Cinzel',serif;font-size:8px;letter-spacing:0.4em;text-transform:uppercase;color:#9E876A;display:block;margin-bottom:0.5rem;">3rd Class — Free</span>
          <p style="font-size:0.85rem;color:var(--ivory-dark);line-height:1.6;margin-bottom:1rem;">Join the Wilhelm Community on Roblox to secure your free 3rd Class passage.</p>
          <a href="https://www.roblox.com/share/g/35167161" target="_blank" style="display:inline-block;font-family:'Cinzel',serif;font-size:9px;letter-spacing:0.25em;text-transform:uppercase;color:#0E0C09;background:#9E876A;border:none;padding:0.8rem 2rem;text-decoration:none;transition:background 0.2s;">Join Roblox Community</a>
        </div>`;
      } else if (cls === 'second') {
        pb.innerHTML = `<div style="border:0.5px solid rgba(139,42,42,0.5);padding:1.5rem;background:rgba(139,42,42,0.07);max-width:460px;margin:0 auto;">
          <span style="font-family:'Cinzel',serif;font-size:8px;letter-spacing:0.4em;text-transform:uppercase;color:#B87070;display:block;margin-bottom:0.5rem;">2<sup>nd</sup> Class — 600 R</span>
          <p style="font-size:0.85rem;color:var(--ivory-dark);line-height:1.6;margin-bottom:1rem;">Purchase your 2nd Class ticket on Roblox to complete your reservation. Present your receipt to the Admissions Office on Discord.</p>
          <a href="https://www.roblox.com/catalog/135637182037066" target="_blank" style="display:inline-block;font-family:'Cinzel',serif;font-size:9px;letter-spacing:0.25em;text-transform:uppercase;color:#0E0C09;background:#B87070;border:none;padding:0.8rem 2rem;text-decoration:none;">Purchase on Roblox — 600 R</a>
        </div>`;
      } else if (cls === 'first') {
        pb.innerHTML = `<div style="border:0.5px solid var(--border-strong);padding:1.5rem;background:rgba(201,168,76,0.07);max-width:460px;margin:0 auto;">
          <span style="font-family:'Cinzel',serif;font-size:8px;letter-spacing:0.4em;text-transform:uppercase;color:var(--gold);display:block;margin-bottom:0.5rem;">1<sup>st</sup> Class — 2,000 R</span>
          <p style="font-size:0.85rem;color:var(--ivory-dark);line-height:1.6;margin-bottom:1rem;">Purchase your 1st Class ticket on Roblox to complete your reservation. Present your receipt to the Admissions Office on Discord.</p>
          <a href="https://www.roblox.com/catalog/76736135522948" target="_blank" style="display:inline-block;font-family:'Cinzel',serif;font-size:9px;letter-spacing:0.25em;text-transform:uppercase;color:#0E0C09;background:var(--gold);border:none;padding:0.8rem 2rem;text-decoration:none;">Purchase on Roblox — 2,000 R</a>
        </div>`;
      }

      showStep(5);
      return;
    }
    if (n === 2) updateCostPreview();
    showStep(n + 1);
  }

  function prevStep() {
    if (state.currentStep > 1) showStep(state.currentStep - 1);
  }



  // ─── PASSENGER RIGHTS ───
  const RIGHTS = [
    {
      icon: '🛡',
      title: 'Right to Safety',
      body: 'Every passenger, regardless of class, has the right to physical safety aboard the Prussian Star. Wilhelm Global Holdings is obligated to maintain structural integrity, heating, food supply, and medical access in all passenger sectors at all times.'
    },
    {
      icon: '🏥',
      title: 'Right to Medical Care',
      body: 'All passengers have the right to access clinic facilities within their class sector. In life-threatening situations, cross-class medical access may be granted at the discretion of the attending physician. No passenger may be denied emergency care on grounds of class or tariff arrears.'
    },
    {
      icon: '🍽',
      title: 'Right to Sustenance',
      body: 'A minimum daily ration is guaranteed to all passengers aboard, including steerage. The composition and quality of this ration is determined by the Hospitality Department and may vary based on supply conditions. No passenger shall be denied food as a disciplinary measure.'
    },
    {
      icon: '🌡',
      title: 'Right to Warmth',
      body: 'All passenger carriages are maintained at a minimum of twelve degrees Celsius. Should heating in any carriage fail, temporary relocation to an adjacent heated carriage shall be arranged within four hours, regardless of class designation.'
    },
    {
      icon: '⚖',
      title: 'Right to Due Process',
      body: 'No passenger may be detained, reassigned, or removed from their berth without a formal process overseen by the Judicial Department. Charges must be stated in writing, and the passenger shall have the opportunity to present their account before the High Magistrate.'
    },
    {
      icon: '📬',
      title: 'Right to Correspondence',
      body: 'All passengers have the right to send and receive correspondence through the Telegraph Office. Outgoing messages may not be withheld or censored except in matters of operational security as determined by the Administration. Incoming messages shall be delivered within 24 hours of receipt.'
    },
    {
      icon: '🧠',
      title: 'Right to Mental Health Support',
      body: 'Passengers in Third Class and above have access to the Mental Health carriage. No passenger experiencing psychological distress shall be refused access to a qualified practitioner on grounds of class, conduct record, or outstanding tariff. Sessions are confidential.'
    },
    {
      icon: '📣',
      title: 'Right to Petition',
      body: 'Any passenger may submit a written petition to the Administration Office regarding their conditions of accommodation, treatment by staff, or decisions made by any departmental authority. All petitions must be acknowledged within 48 hours and resolved within fourteen days.'
    },
    {
      icon: '👨‍👩‍👧',
      title: 'Right to Family Unity',
      body: 'Families who board together shall not be separated into different classes without consent, except in cases of disciplinary action confirmed by the Judicial Department. Children under the age of fourteen shall not be housed in accommodation separate from a guardian.'
    },
    {
      icon: '🔒',
      title: 'Right to Personal Property',
      body: 'Passengers retain ownership of all personal property brought aboard at time of boarding. Confiscation of property may only occur under a formal judicial order. The Administration is not liable for loss or theft of personal items but is obligated to investigate reported theft.'
    },
  ];

  function buildRights() {
    const g = document.getElementById('rights-grid');
    if (!g || g.innerHTML.trim()) return;
    g.innerHTML = RIGHTS.map(r => `
      <div style="background:rgba(255,255,255,0.02);border:0.5px solid var(--border);padding:1.75rem 1.5rem;transition:background 0.2s;" onmouseover="this.style.background='rgba(201,168,76,0.04)'" onmouseout="this.style.background='rgba(255,255,255,0.02)'">
        <div style="font-size:1.4rem;margin-bottom:0.9rem;">${r.icon}</div>
        <h3 style="font-family:'Cinzel',serif;font-size:9px;letter-spacing:0.35em;text-transform:uppercase;color:var(--gold);margin-bottom:0.75rem;">${r.title}</h3>
        <p style="font-size:0.88rem;color:var(--ivory-dark);line-height:1.75;">${r.body}</p>
      </div>`
    ).join('');
  }

  // "The Route" is now a standalone document (route.html) — no interceptor needed.

  // ─── DEPARTMENTS ───
  const DEPARTMENTS = [
    {
      name: 'Hospitality',
      color: '#C9A84C',
      head: 'Margaret B. Sterling',
      handle: '@mertatalar2',
      role: 'Head of Hospitality',
      link: 'https://discord.gg/ZTzF3YK5SR',
      desc: 'Responsible for passenger welfare, cabin service, dining, and all passenger-facing interactions aboard the Prussian Star. The Hospitality Department sets the standard for life on the train.'
    },
    {
      name: 'Entertainment',
      color: '#8B6090',
      head: 'ClauClau',
      handle: '@clauclau.1',
      role: 'Head of Entertainment',
      link: 'https://discord.gg/zDy6pKNugz',
      desc: 'Oversees the Opera, Grand Salon, Cinema, Night Car, and all cultural programming aboard. The Entertainment Department ensures that civilisation endures in motion.'
    },
    {
      name: 'Brakemen',
      color: '#8B4040',
      head: 'Colonel Vejo Vollner',
      handle: '@vejoaudra',
      role: 'Lead Brakemen',
      link: 'https://discord.gg/bnSbRvaaJM',
      desc: 'The Brakemen serve as the regulatory and enforcement authority aboard the Prussian Star — preserving order, enforcing operational law, and responding to disturbances across every sector of the train. A disciplined corps focused on control, authority, and stability.'
    },
    {
      name: 'Security Force',
      color: '#4A6080',
      head: 'Edward Osprey',
      handle: '@bladedpotato',
      role: 'Head Commander',
      link: 'https://discord.gg/JB3GGqyskc',
      desc: 'Responsible for order, border enforcement, and the safety of all passengers across every class. The Security Force operates under direct command of the Administration and answers to no other authority.'
    },
    {
      name: 'Judicial',
      color: '#7A6E5E',
      head: 'AxiomRivxr',
      handle: '@therealrivxr1225',
      role: 'High Magistrate',
      link: 'https://discord.gg/KGGGPgzxRm',
      desc: 'The Judicial Department administers law, adjudicates disputes, and oversees tribunal proceedings in the Judicial Car. The High Magistrate holds final authority on all matters of onboard jurisprudence.',
      full: true
    },
  ];

  (function buildDepts() {
    const grid = document.getElementById('dept-grid');
    if (!grid) return;
    let html = '';
    DEPARTMENTS.forEach(d => {
      const fullClass = d.full ? ' style="grid-column:1/-1;"' : '';
      html += `<div class="dept-card"${fullClass}>
        <div class="dept-color-bar" style="background:${d.color};"></div>
        <span class="dept-name">${d.name} Department</span>
        <div class="dept-head-title">${d.head}</div>
        <div class="dept-role">${d.role}</div>
        <div class="dept-handle">${d.handle} on Discord</div>
        <div class="dept-divider"></div>
        <p class="dept-desc">${d.desc}</p>
        <a href="${d.link}" target="_blank" class="dept-join-btn">Join Department Server →</a>
      </div>`;
    });
    grid.innerHTML = html;
  })();

  // Close dept modal on backdrop click
  document.getElementById('deptModal').addEventListener('click', function(e) {
    if (e.target === this) { this.classList.remove('open'); document.body.style.overflow = ''; }
  });

  // ─── DISCORD CONFIRMATION MODAL ───
  function openDiscordConfirm() {
    document.getElementById('discordConfirmModal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeDiscordConfirm() {
    document.getElementById('discordConfirmModal').classList.remove('open');
    document.body.style.overflow = '';
  }
  document.getElementById('discordConfirmModal').addEventListener('click', function(e) {
    if (e.target === this) closeDiscordConfirm();
  });

  // ─── DISCORD MODAL ───
  const discordMedals = { Bronze: '🥉', Silver: '🥈', Gold: '🥇' };

  const discordTierData = {
    Bronze: {
      medal: '🥉',
      desc: 'The Bronze Class grants a single custom 1st Class quarter with full access to investor carriages and premium amenities. Entry-level investor status, with limited eligibility to upgrade to Silver Class.',
      server: 'Wilhelm Global Holdings — Main Server',
      url: 'discord.gg/m9tag3YE6q',
      link: 'https://discord.gg/m9tag3YE6q',
    },
    Silver: {
      medal: '🥈',
      desc: 'The Silver Class provides a family custom 1st Class suite, personal concierge services, priority booking, and a brakeman security escort. Includes eligibility to upgrade to Gold Class.',
      server: 'Wilhelm Global Holdings — Main Server',
      url: 'discord.gg/m9tag3YE6q',
      link: 'https://discord.gg/m9tag3YE6q',
    },
    Gold: {
      medal: '🥇',
      desc: 'The Gold Class is the pinnacle of investor privilege — a personal carriage, full concierge, maximum priority booking, and a security detail of up to 3 brakemen. Family extension up to 5 members.',
      server: 'Wilhelm Global Holdings — Main Server',
      url: 'discord.gg/m9tag3YE6q',
      link: 'https://discord.gg/m9tag3YE6q',
    },
  };

  function openDiscordModal(tier) {
    const data = discordTierData[tier] || discordTierData['Bronze'];
    document.getElementById('discord-modal-title').innerHTML = tier + ' <em>Class</em>';
    document.getElementById('discord-medal').textContent = data.medal;
    document.getElementById('discord-tier-desc').textContent = data.desc;
    document.getElementById('discord-server-name').textContent = data.server;
    document.getElementById('discord-server-url').textContent = data.url;
    document.getElementById('discord-join-btn').href = data.link;
    document.getElementById('discord-class-hint').textContent = tier;
    document.getElementById('discordModal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeDiscordModal() {
    document.getElementById('discordModal').classList.remove('open');
    document.body.style.overflow = '';
  }
  document.getElementById('discordModal').addEventListener('click', function(e) {
    if (e.target === this) closeDiscordModal();
  });

  // Wire class buttons on cards to open modal
  document.querySelectorAll('.class-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      let cls = 'first';
      if (btn.classList.contains('steerage-btn')) cls = 'steerage';
      if (btn.classList.contains('second-btn')) cls = 'second';
      openReservation(cls);
    });
  });
