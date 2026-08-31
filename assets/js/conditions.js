/* Wilhelm Global Holdings — Conditions of Carriage (conditions.html) */

  // ─── CONDITIONS ───
  const CONDITIONS = [
    ['Article I — Final Sale', 'All tickets issued by Wilhelm Global Holdings are a final sale. No refunds, exchanges, or transfers will be made under any circumstances, including acts of God, governmental action, or passenger incapacity.'],
    ['Article II — One-Way Passage', 'All passage is one-way. The Prussian Star operates on a continuous circuit. There is no return ticket, no disembarkation on demand, and no scheduled terminus. Passengers remain aboard until an approved exchange waypoint is reached and a valid external arrangement has been confirmed with the Admissions Office.'],
    ['Article III — Class Restrictions', 'Passengers may not access carriages beyond their designated class without written authorisation from the Administration Office. Unauthorised movement between class sectors is a violation subject to escalation to the Judicial Car.'],
    ['Article IV — Investor Class', 'Investor class passengers hold rights as specified in their individual agreements with Wilhelm Global Holdings. Investor status is non-transferable and subject to review at the discretion of the Head Administrator.'],
    ['Article V — Conduct', 'Passengers are expected to conduct themselves in accordance with the standards appropriate to their class. Disorderly conduct, damage to carriage property, or interference with staff duties are offences subject to the jurisdiction of the onboard Judicial Car.'],
    ['Article VI — Medical', 'Wilhelm Global Holdings operates clinic facilities in each class sector. Medical access is provided as a courtesy and does not constitute a warranty of health outcomes. The Company accepts no liability for illness, injury, or deterioration of condition occurring aboard the train.'],
    ['Article VII — Cargo', 'Cargo carried in designated cargo carriages is the sole responsibility of the consignor. Wilhelm Global Holdings accepts no liability for loss, damage, or deterioration of cargo in transit.'],
    ['Article VIII — Administration Authority', 'The Head Administrator holds full executive authority over all matters aboard the Prussian Star. Administrative decisions are binding and not subject to civilian appeal. The Administrator may alter class arrangements, restrict access, or alter passenger status at any time.'],
    ['Article IX — The Tail', 'Carriages 61–62 (Tail Residential and Tail Market) operate under a distinct internal governance structure. Passengers assigned to or entering these carriages do so subject to the additional regulations posted therein.'],
    ['Article X — Governing Law', 'In the absence of a recognised sovereign territory, all matters aboard the Prussian Star are governed by the Conditions of Carriage as published by Wilhelm Global Holdings, Berlin, 1972. These Conditions supersede all external legal instruments for the duration of passage.'],
  ];

  function buildConditions() {
    const c = document.getElementById('conditions-list');
    if (c.innerHTML.trim()) return;
    c.innerHTML = CONDITIONS.map(([title, text]) =>
      `<div class="cond-item"><span class="cond-num">${title}</span><p class="cond-text">${text}</p></div>`
    ).join('');
  }

buildConditions();
observeReveals();
