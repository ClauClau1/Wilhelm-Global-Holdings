/* Wilhelm Global Holdings — Train Layout page (layout.html) */


  // ─── TRAIN LAYOUT DATA ───
  const LAYOUT = [
    { sector: 'Engine Sector', cls: 'sector-engine', cars: [
      { n:1,  icon:'ENG', name:'Engine', tags:[] },
      { n:2,  icon:'BAT', name:'Battery / Engineer Quarters', tags:[] },
      { n:3,  icon:'RES', name:'Wilhelm Personal Residence', sub:'Staff Only', tags:['access'] },
      { n:4,  icon:'ADM', name:'Administration Car', sub:'TV · Surveillance · Command', tags:[] },
    ]},
    { sector: 'First Class', cls: 'sector-first', cars: [
      { n:5,  icon:'PLT', name:'Platinum Investor Residence', sub:'Unit 1', tags:['investor','subtrain','L1 S1'], indent:true },
      { n:6,  icon:'PLT', name:'Platinum Investor Residence', sub:'Unit 1', tags:['investor'], indent:true },
      { n:7,  icon:'PLT', name:'Platinum Investor Residence', sub:'Unit 1', tags:['investor'], indent:true },
      { n:8,  icon:'GLD', name:'Gold Investor Residence', sub:'Unit 2', tags:['investor'], indent:true },
      { n:9,  icon:'GLD', name:'Gold Investor Residence', sub:'Unit 2', tags:['investor'], indent:true },
      { n:10, icon:'SLV', name:'Silver Investor Residence', sub:'Unit 3', tags:['investor'], indent:true },
      { n:11, icon:'SLV', name:'Silver Investor Residence', sub:'Unit 3', tags:['investor'], indent:true },
      { n:12, icon:'GDN', name:'Garden', tags:[] },
      { n:13, icon:'LNG', name:'Boarding / Sky Lounge', tags:['access','subtrain','L1 S2'] },
      { n:14, icon:'OPR', name:'Opera', tags:[] },
      { n:15, icon:'CBN', name:'Steward Cabins', sub:'Possibly double floors', tags:[] },
      { n:16, icon:'HSP', name:'Hospitality', tags:['access','subtrain','L1 S3'] },
      { n:17, icon:'DIN', name:'1st Class Dining', tags:[] },
      { n:18, icon:'KIT', name:'Kitchen', tags:[] },
      { n:19, icon:'FAM', name:'Family Cabins', sub:'2 units', tags:[] },
      { n:20, icon:'FAM', name:'Family Cabins', sub:'2 units', tags:[] },
      { n:21, icon:'AQU', name:'Aquarium + Sushi Bar', tags:['subtrain','L1 S4'] },
      { n:22, icon:'FAM', name:'Family Cabins', sub:'2 units', tags:[] },
      { n:23, icon:'FAM', name:'Family Cabins', sub:'2 units', tags:[] },
      { n:24, icon:'LIB', name:'Library', tags:['access'] },
      { n:25, icon:'MNT', name:'Battery | Maintenance Hatch / Coldlock / Weather Balloons', tags:['subtrain','L1 S5'] },
      { n:26, icon:'POL', name:'Pool + Jacuzzi + Lounge Area', tags:[] },
      { n:27, icon:'SPA', name:'Spa + Massage Rooms + Sauna', tags:[] },
      { n:28, icon:'SGL', name:'Single Cabins', sub:'3 units', tags:[] },
      { n:29, icon:'SGL', name:'Single Cabins', sub:'3 units', tags:['subtrain','L1 S6'] },
    ]},
    { sector: 'Second Class', cls: 'sector-second', cars: [
      { n:30, icon:'BDR', name:'Border / Battery', tags:['access'] },
      { n:31, icon:'MAL', name:'Luxury Mall', tags:[] },
      { n:32, icon:'MSM', name:'Museum', tags:['subtrain','L2 S1'] },
      { n:33, icon:'HSP', name:'Hospitality + 2nd Class Quarters', sub:'Low rank staff', tags:[] },
      { n:34, icon:'DIN', name:'Dining', tags:['access'] },
      { n:35, icon:'KIT', name:'Kitchen', tags:[] },
      { n:36, icon:'CIN', name:'Cinema', tags:['subtrain','L2 S2'] },
      { n:37, icon:'FAM', name:'Family Cabins', sub:'3 units', tags:[] },
      { n:38, icon:'FAM', name:'Family Cabins', sub:'3 units', tags:[] },
      { n:39, icon:'MNT', name:'Battery | Maintenance Hatch', tags:[] },
      { n:40, icon:'GYM', name:'Thermae / Gym', sub:'Combined carriage', tags:[] },
      { n:41, icon:'LIB', name:'Library', tags:['subtrain','L2 S3'] },
      { n:42, icon:'CAF', name:'Tropical Café', tags:['access'] },
      { n:43, icon:'SGL', name:'Single Cabins', sub:'4 units', tags:[] },
      { n:44, icon:'SGL', name:'Single Cabins', sub:'4 units', tags:[] },
      { n:45, icon:'SGL', name:'Single Cabins', sub:'4 units', tags:[] },
      { n:46, icon:'LNG', name:'Salon / Boarding Lounge', tags:['access','subtrain','L2 S4'] },
      { n:47, icon:'JUD', name:'Judicial Car', sub:'Tribunal room included', tags:[] },
      { n:48, icon:'ARC', name:'Archives / Drawers', tags:[] },
      { n:49, icon:'MED', name:'Clinic', sub:'4 rooms · 2 recovery · 1 consultation · 1 operating/dental', tags:[] },
      { n:50, icon:'NGT', name:'Night Car', tags:['subtrain','L2 S5'] },
    ]},
    { sector: 'Third Class', cls: 'sector-third', cars: [
      { n:51, icon:'BDR', name:'Border / Battery', tags:['access'] },
      { n:52, icon:'CBN', name:'Cabins', sub:'4 units + shower room at end', tags:['subtrain','L3 S1'] },
      { n:53, icon:'CBN', name:'Cabins', sub:'4 units + shower room at end', tags:[] },
      { n:54, icon:'CBN', name:'Cabins', sub:'4 units + shower room at end', tags:[] },
      { n:55, icon:'MSS', name:'Mess Hall', tags:['access'] },
      { n:56, icon:'CBN', name:'Cabins', sub:'4 units + shower room at end', tags:[] },
      { n:57, icon:'MED', name:'Clinic', sub:'Same layout as 2nd Class', tags:['subtrain','L3 S2'] },
      { n:58, icon:'PSY', name:'Mental Health', sub:'1 therapy room + max additional rooms', tags:[] },
      { n:59, icon:'EDU', name:'Education', sub:'Up to 2 floors · 1 classroom per floor', tags:[] },
      { n:60, icon:'MNT', name:'Battery | Maintenance Hatch + Maintenance Garrison', tags:['access'] },
      { n:61, icon:'CHN', name:'Tail Residential', tags:['subtrain','L3 S3'] },
      { n:62, icon:'MKT', name:'Tail Market', tags:[] },
      { n:63, icon:'CGO', name:'Heavy Cargo', tags:['access','cargo'] },
      { n:64, icon:'CGO', name:'Heavy Cargo / Autoracks', tags:['access','cargo'] },
      { n:65, icon:'BAT', name:'Battery', tags:['subtrain','L3 S4'] },
    ]},
    { sector: 'Agriculture Sector', cls: 'sector-agri', cars: [
      { n:66, icon:'ACU', name:'Aquaculture', tags:[] },
      { n:67, icon:'GRN', name:'Greenhouse', tags:[] },
      { n:68, icon:'GRN', name:'Greenhouse', tags:[] },
      { n:69, icon:'SPC', name:'Spice Car', tags:['subtrain','L3 S5'] },
      { n:70, icon:'SED', name:'Seed Bank', tags:[] },
      { n:71, icon:'CMP', name:'Compost', tags:[] },
    ]},
    { sector: 'Livestock Sector', cls: 'sector-live', cars: [
      { n:72, icon:'BUT', name:'Butcher and Meat Locker', tags:[] },
      { n:73, icon:'PLT', name:'Poultry Section', tags:[] },
      { n:74, icon:'SML', name:'Lamb and Small Animals', tags:[] },
      { n:75, icon:'LRG', name:'Cows and Big Animals', tags:[] },
    ]},
    { sector: 'Restricted Area', cls: 'sector-rest', cars: [
      { n:76, icon:'BRK', name:'Brakeman Garrison', tags:[] },
      { n:77, icon:'UTL', name:'Utility', tags:['subtrain','L3 S6'] },
      { n:78, icon:'SEC', name:'Security Garrison', tags:[] },
      { n:79, icon:'BIO', name:'Bio Security / Tail Border', tags:[] },
      { n:80, icon:'TIL', name:'Tail', sub:'Cargo', tags:['access','cargo'] },
      { n:81, icon:'TIL', name:'Tail', sub:'Cargo', tags:['access','cargo'] },
      { n:82, icon:'DCK', name:'Tail Docking', tags:[] },
    ]},
  ];

  // Icon colour map by code
  const ICON_COLORS = {
    ENG:'#E8593C',BAT:'#6688CC',ADM:'#9E876A',RES:'#C9A84C',
    PLT:'#D0C8F0',GLD:'#E8C97A',SLV:'#C8C8D8',
    GDN:'#6aaa6a',LNG:'#88AABB',OPR:'#CC8855',CBN:'#7A8899',
    HSP:'#C9A84C',DIN:'#BB6644',KIT:'#AA7744',FAM:'#8899AA',
    AQU:'#4499CC',LIB:'#AA9966',MNT:'#556677',POL:'#4488AA',
    SPA:'#88AAAA',SGL:'#7A8899',BDR:'#CC4444',MAL:'#AA88BB',
    MSM:'#8899BB',CIN:'#885588',GYM:'#668877',CAF:'#77AA66',
    JUD:'#BB7744',ARC:'#887766',MED:'#CC4444',NGT:'#334466',
    MSS:'#AA7755',PSY:'#8877AA',EDU:'#6688AA',CHN:'#777755',
    MKT:'#888844',CGO:'#AA8855',ACU:'#3388AA',GRN:'#558844',
    SPC:'#AA6633',SED:'#779944',CMP:'#668833',BUT:'#994433',
    SML:'#AA8855',LRG:'#997744',BRK:'#BB4444',UTL:'#557788',
    SEC:'#AA3333',BIO:'#669944',TIL:'#885533',DCK:'#776655',PLT2:'#AA88CC',
  };

  function buildLayout() {
    const c = document.getElementById('layout-content');
    if (c.innerHTML.trim()) return;
    let html = '';
    LAYOUT.forEach(sector => {
      html += `<div class="sector-block">
        <div class="sector-title ${sector.cls}">${sector.sector} <span style="opacity:0.5;font-size:8px;">(${sector.cars.length} carriages)</span></div>`;
      sector.cars.forEach(car => {
        const badges = [];
        if (car.tags.includes('access')) badges.push(`<span class="car-badge badge-access">DOOR</span>`);
        if (car.tags.includes('cargo')) badges.push(`<span class="car-badge badge-cargo">CARGO</span>`);
        const stTag = car.tags.find(t => t.startsWith('L'));
        if (stTag) badges.push(`<span class="car-badge badge-subtrain">SUB ${stTag}</span>`);
        const indent = car.indent ? ' investor-indent' : '';
        const col = ICON_COLORS[car.icon] || '#9E876A';
        const iconHtml = `<div style="width:32px;height:22px;background:${col}18;border:0.5px solid ${col}55;border-radius:3px;display:flex;align-items:center;justify-content:center;font-family:'Cinzel',serif;font-size:6.5px;letter-spacing:0.05em;color:${col};font-weight:600;">${car.icon}</div>`;
        html += `<div class="carriage-row${indent}">
          <div class="car-num">${car.n}</div>
          <div class="car-icon">${iconHtml}</div>
          <div class="car-name">${car.name}${car.sub ? `<span class="car-sub">${car.sub}</span>` : ''}</div>
          <div style="display:flex;align-items:center;flex-wrap:wrap;">${badges.join('')}</div>
        </div>`;
      });
      html += `</div>`;
    });
    c.innerHTML = html;
  }

buildLayout();
observeReveals();
