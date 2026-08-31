/* Wilhelm Global Holdings — Terms & Tariffs (tariffs.html) */

  // ─── TERMS & TARIFFS ───
  const TARIFF_TERMS = [
    ['T.1 — Final Sale', 'All passenger class tickets (1st, 2nd, and 3rd) are a final sale. No refunds, exchanges, credits, or transfers will be issued under any circumstances, including cancellation, illness, or change of circumstance.'],
    ['T.2 — One-Way Passage', 'All tickets issued by Wilhelm Global Holdings are for one-way passage only. No return ticket exists. The Prussian Star operates on a continuous perpetual circuit with no scheduled terminus.'],
    ['T.3 — 3rd Class Community Requirement', 'Third Class passage is provided at no monetary cost subject to the passenger holding an active membership in the Wilhelm Global Holdings community on Roblox. Failure to maintain membership may result in reclassification or removal of boarding privileges.'],
    ['T.4 — Roblox Purchase', 'All paid passage (2nd and 1st Class) must be completed via the official Roblox catalog listings. Wilhelm Global Holdings does not accept payment through any other platform or method. Proof of purchase must be presented to the Admissions Office on Discord to confirm boarding.'],
    ['T.5 — Investor Class Allocation', 'Investor Class (Bronze, Silver, Gold) is allocated by private negotiation through the Wilhelm Global Holdings Discord server. Investor prices are fixed and non-negotiable. All investor passages are subject to admissions review and may be declined at the discretion of the Administration.'],
    ['T.6 — Unit Allocation', 'Unit allocations for each investor tier (Bronze: 6–9, Silver: 4–6, Gold: 2–3) are subject to availability and are awarded on a first-come, first-served basis pending review. Wilhelm Global Holdings does not guarantee a specific unit assignment within an investor tier.'],
    ['T.7 — Children & Servants', 'Children (under 18) are charged at 50% of the base class tariff where applicable. Personal servants travelling with 1st Class passengers are charged at 30% of the base tariff. Investor Class family extension provisions are governed by the individual investor agreement.'],
    ['T.8 — Price Revision', 'Wilhelm Global Holdings reserves the right to revise tariffs at any time without prior notice. Prices at the time of confirmed purchase are honoured. Tariff changes do not affect previously confirmed passages.'],
    ['T.9 — Boarding Confirmation', 'A reservation reference number does not constitute a confirmed boarding. Boarding is confirmed only upon submission of proof of Roblox purchase or community membership to the Admissions Office and written confirmation from the Head Administrator.'],
    ['T.10 — Governing Currency', 'All tariffs are denominated in Roblox (R). No conversion to or from any external currency is offered or implied. The value of Roblox as an external platform currency is not the responsibility of Wilhelm Global Holdings.'],
  ];

  function buildTariffs() {
    const c = document.getElementById('tariffs-list');
    if (!c || c.innerHTML.trim()) return;
    c.innerHTML = TARIFF_TERMS.map(([title, text]) =>
      `<div class="cond-item"><span class="cond-num">${title}</span><p class="cond-text">${text}</p></div>`
    ).join('');
  }

buildTariffs();
observeReveals();
