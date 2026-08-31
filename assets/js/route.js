/* Wilhelm Global Holdings — The Route page (route.html) */


  // ─── ROUTE DATA ───
  const MAINLINE = [
    ['Berlin','Germany','junction'],['Frankfurt','Germany'],['Paris','French State'],['Toulouse','French State'],
    ['Barcelona','Iberian Union'],['Valencia','Iberian Union'],['Malaga','Iberian Union'],['Gibraltar','Germany'],
    ['Casablanca','Iberian Morocco'],['Dakar','Senegal'],['Monrovia','Liberia'],['Abidjan','Côte d\'Ivoire'],
    ['Lagos','RK Westafrika'],['Luanda','Iberian Angola'],['Windhoek','RK Südwestafrika'],['Cape Town','South Africa','junction'],
    ['Durban','South Africa'],['Dar es Salaam','RK Ostafrika'],['Mombasa','Italian East Africa'],
    ['Mogadishu','Italian East Africa'],['Djibouti','Italian East Africa'],['Port Sudan','Kingdom of Egypt'],
    ['Cairo','Kingdom of Egypt','junction'],['Jerusalem','Transjordan State'],['Beirut','Transjordan State'],
    ['Ankara','Republic of Turkey'],['Istanbul','Republic of Turkey','junction'],['Bucharest','Romania'],
    ['Odessa','RK Ukraine'],['Sevastopol','RK Ukraine'],['Krasnodar','RK Kaukasien'],['Baku','RK Kaukasien'],
    ['Tabriz','Persia'],['Tehran','Persia'],['Ashgabat','Turkmenistan'],['Kabul','Afghanistan'],
    ['New Delhi','India','junction'],['Dhaka','India'],['Rangoon','Burma'],['Bangkok','Thailand'],['Saigon','Vietnam'],
    ['Hanoi','Vietnam'],['Hong Kong','Japanese Guangdong'],['Nanjing','Republic of China'],
    ['Qingdao','Republic of China'],['Beijing','Republic of China','junction'],['Seoul','Korea'],
    ['Busan','Korea'],['Fukuoka','State of Japan'],['Osaka','State of Japan'],['Tokyo','State of Japan','junction'],
    ['Sapporo','State of Japan'],['Petropavlovsk-Kamchatsky','U.S. Pacific Fleet'],['Anchorage','USA'],
    ['Vancouver','Canada'],['Portland','USA'],['San Francisco','USA'],['Los Angeles','USA','junction'],['Mexico City','Mexico','junction'],
    ['San Salvador','El Salvador'],['Panama City','Panama'],['Quito','Ecuador'],['Lima','Peru'],
    ['La Paz','Bolivia'],['Santa Cruz de la Sierra','Bolivia'],['São Paulo','Brazil','junction'],['Rio de Janeiro','Brazil'],
    ['Natal','Brazil'],['Caracas','Venezuela'],['Medellín','Colombia'],['Panama City','Panama'],
    ['Mexico City','Mexico'],['Dallas','USA'],['Atlanta','USA'],['Washington D.C.','USA','junction'],['Montreal','Canada'],
    ['Nuuk','USA'],['Murmansk','Finland'],['Sankt Petersburg','RK Moskowien'],['Riga','RK Ostland'],
    ['Kaunas','RK Ostland'],['Königsberg','Germany'],['Danzig','Germany'],['Berlin','Germany','end'],
  ];

  const SECONDARY = [
    ['Berlin','Germany','junction'],['Hannover','Germany'],['Düsseldorf','Germany'],['Brüxelles','Burgundy'],
    ['London','United Kingdom of Britain','junction'],['Bournemouth','United Kingdom of Britain'],['Cherbourg','French State'],
    ['Nantes','French State'],['Bordeaux','French State'],['Bilbao','Iberian Union'],['Madrid','Iberian Union','junction'],
    ['Malaga','Iberian Union'],['Gibraltar','Germany'],['Tetuan','Iberian Morocco'],
    ['Oran','French Algeria'],['Algiers','French Algeria','junction'],['Tunis','Italian Libya'],['Tripoli','Italian Libya'],
    ['Benghazi','Italian Libya'],['Alexandria','Kingdom of Egypt','junction'],['Jerusalem','Transjordan State'],
    ['Beirut','Transjordan State'],['Antalya','Republic of Turkey'],['Izmir','Republic of Turkey'],
    ['Istanbul','Republic of Turkey','junction'],['Varna','Bulgaria'],['Bucharest','Romania','junction'],
    ['Odessa','RK Ukraine'],['Rostov-on-Don','RK Ukraine'],['Tbilisi','RK Kaukasien'],['Baku','RK Kaukasien'],
    ['Tabriz','Persia'],['Tehran','Persia'],['Ashgabat','Turkmenistan'],['Kabul','Afghanistan'],
    ['New Delhi','India','junction'],['Lucknow','India'],['Dhaka','India'],['Rangoon','Burma'],
    ['Kuala Lumpur','Japanese Malaya'],['Singapore','Japanese Malaya','junction'],['Dili','Iberian Timor'],
    ['Darwin','Australia'],['Perth','Australia'],['Adelaide','Australia'],['Melbourne','Australia'],
    ['Sydney','Australia','junction'],['Brisbane','Australia'],['Bandar','Brunei'],
    ['Singapore','Japanese Malaya'],['Bangkok','Thailand'],['Saigon','Vietnam'],['Hanoi','Vietnam'],
    ['Hong Kong','Republic of China'],['Fuzhou','Republic of China'],['Nanjing','Republic of China'],
    ['Beijing','Republic of China','junction'],['Dalian','State of Japan'],['Seoul','Japanese Korea'],
    ['Busan','Japanese Korea'],['Fukuoka','State of Japan'],['Okayama','State of Japan'],
    ['Osaka','State of Japan'],['Tokyo','State of Japan','junction'],['Sapporo','State of Japan'],
    ['Petropavlovsk-Kamchatsky','U.S. Pacific Fleet'],['Anchorage','USA'],['Vancouver','Canada'],
    ['Portland','USA'],['San Francisco','USA','junction'],['Las Vegas','USA'],['Mexico City','Mexico','junction'],
    ['San Salvador','El Salvador'],['Panama City','Panama'],['Quito','Ecuador'],['Lima','Peru'],
    ['La Paz','Bolivia'],['Santa Cruz de la Sierra','Bolivia'],['Asunción','Paraguay'],
    ['Buenos Aires','Argentina','junction'],['Montevideo','Uruguay'],['São Paulo','Brazil'],
    ['Rio de Janeiro','Brazil'],['Natal','Brazil'],['Caracas','Venezuela'],['Medellín','Colombia'],
    ['Panama City','Panama'],['Mexico City','Mexico'],['Houston','USA'],['Jacksonville','USA'],
    ['Washington D.C.','USA','junction'],['New York','USA'],['Montreal','Canada'],['Nuuk','USA'],
    ['Murmansk','Finland'],['Helsinki','Finland'],['Tallinn','RK Ostland'],['Riga','RK Ostland'],
    ['Kaunas','RK Ostland'],['Białystok','Germany'],['Warschau','Germany'],['Breslau','Germany'],
    ['Berlin','Germany','end'],
  ];

  // ─── CITY INFO ──────────────────────────────────────────────────────────
  const CINFO = {
    'Berlin':          {t:'Major Junction · HQ',          c:'gold', i:'Capital of Germany and headquarters of Wilhelm Global Holdings. Start and end of the full circuit. Home of Berlin Terminus and the Admissions Office.'},
    'Frankfurt':       {t:'Station · Mainline',            c:'muted',i:'Major German financial and rail hub. Connects the Rhine-Main corridor to the western European network.'},
    'Paris':           {t:'Station · Mainline',            c:'muted',i:'Capital of the French State. One of the most heavily-boarded stops in Western Europe.'},
    'Toulouse':        {t:'Station · Mainline',            c:'muted',i:'Industrial city of southern France. Gateway to the Pyrenees and the Iberian approach.'},
    'Barcelona':       {t:'Station · Mainline',            c:'muted',i:'Principal port of the Iberian Union on the Mediterranean. High passenger turnover.'},
    'Valencia':        {t:'Station · Mainline',            c:'muted',i:'Third largest city of the Iberian Union. Agricultural and commercial hub on the Spanish Mediterranean coast.'},
    'Malaga':          {t:'Station · Mainline',            c:'muted',i:'Southernmost major city of continental Europe. Coastal port at the entrance to the Strait of Gibraltar.'},
    'Gibraltar':       {t:'Station · Mainline',            c:'muted',i:'German-administered territory controlling the mouth of the Mediterranean. Critical strategic waypoint.'},
    'Casablanca':      {t:'Station · Mainline',            c:'muted',i:'Largest city of Iberian Morocco. Primary commercial and industrial Atlantic port of North Africa.'},
    'Dakar':           {t:'Station · Mainline',            c:'muted',i:'Capital of Senegal. Westernmost city of continental Africa. Key waypoint before the West African coastal run.'},
    'Monrovia':        {t:'Station · Mainline',            c:'muted',i:'Capital of Liberia. West African port with historical ties to the Americas.'},
    'Abidjan':         {t:'Station · Mainline',            c:'muted',i:"Economic capital of Côte d'Ivoire. The dominant commercial port of French West Africa."},
    'Lagos':           {t:'Station · Mainline',            c:'muted',i:'Largest city of RK Westafrika. Sprawling Atlantic port serving the densely populated Niger Delta.'},
    'Luanda':          {t:'Station · Mainline',            c:'muted',i:'Capital of Iberian Angola. Major oil and port city on the Atlantic coast of central Africa.'},
    'Windhoek':        {t:'Station · Mainline',            c:'muted',i:'Administrative capital of RK Südwestafrika. Inland plateau city before the Cape approach.'},
    'Cape Town':       {t:'Major Stop · Mainline',         c:'gold', i:'Southernmost major city of Africa. Gateway between the Atlantic and Indian Ocean legs of the circuit.'},
    'Durban':          {t:'Station · Mainline',            c:'muted',i:'Largest port on the eastern coast of South Africa. Serves the Natal industrial heartland.'},
    'Dar es Salaam':   {t:'Station · Mainline',            c:'muted',i:'Principal port of RK Ostafrika. One of the busiest harbours on the East African coast.'},
    'Mombasa':         {t:'Station · Mainline',            c:'muted',i:'Ancient port of Italian East Africa. One of the oldest trading posts on the African coast.'},
    'Mogadishu':       {t:'Station · Mainline',            c:'muted',i:"Capital of Italian East Africa's Somali region. Hot coastal city at the Horn of Africa."},
    'Djibouti':        {t:'Station · Mainline',            c:'muted',i:'Vital port at the mouth of the Red Sea. Controls access to Bab-el-Mandeb. Critical fuelling waypoint.'},
    'Port Sudan':      {t:'Station · Mainline',            c:'muted',i:'Principal Red Sea port of the Kingdom of Egypt. Main outlet for Sudanese trade.'},
    'Cairo':           {t:'Major Junction · Mainline',     c:'gold', i:'Capital of the Kingdom of Egypt. One of the largest cities in the world. Critical junction between the African and Near Eastern segments.'},
    'Jerusalem':       {t:'Station · Mainline',            c:'muted',i:'Holy city of the Transjordan State. One of the most historically significant stops on the circuit.'},
    'Beirut':          {t:'Station · Mainline',            c:'muted',i:'Capital of the Transjordan State and commercial heart of the Levant. Cosmopolitan Mediterranean port.'},
    'Ankara':          {t:'Station · Mainline',            c:'muted',i:'Capital of the Republic of Turkey. Inland Anatolian city connecting western and eastern halves of the territory.'},
    'Istanbul':        {t:'Major Junction · Mainline & Secondary', c:'gold', i:'Straddles two continents at the Bosphorus. The great junction of East and West. Transfer point between Mainline and Secondary.'},
    'Bucharest':       {t:'Station · Mainline',            c:'muted',i:'Capital of Romania. Balkan crossroads city. Stop before the Black Sea littoral run.'},
    'Odessa':          {t:'Station · Mainline',            c:'muted',i:'Major Black Sea port of RK Ukraine. Historically the most important southern port of the Russian Empire.'},
    'Sevastopol':      {t:'Station · Mainline',            c:'muted',i:'Strategic naval city on the Crimean peninsula. Carefully managed boarding stop.'},
    'Krasnodar':       {t:'Station · Mainline',            c:'muted',i:'Agricultural capital of RK Kaukasien. Gateway to the Northern Caucasus.'},
    'Baku':            {t:'Station · Mainline',            c:'muted',i:'Capital of RK Kaukasien. Heart of Caspian oil production. Crossroads of the Caucasus and Central Asia.'},
    'Tabriz':          {t:'Station · Mainline',            c:'muted',i:'Ancient city of northwestern Persia. Major commercial hub on the historic Silk Road.'},
    'Tehran':          {t:'Station · Mainline',            c:'muted',i:'Capital of Persia. Rapidly modernising city at the foot of the Alborz mountains.'},
    'Ashgabat':        {t:'Station · Mainline',            c:'muted',i:'Capital of Turkmenistan. Desert city at the edge of the Karakum. Waypoint on the trans-Central Asian corridor.'},
    'Kabul':           {t:'Station · Mainline',            c:'muted',i:'Capital of Afghanistan. Mountain city at a strategic crossroads.'},
    'New Delhi':       {t:'Major Junction · Mainline',     c:'gold', i:'Capital of India. Massive boarding hub serving the entire subcontinent. Junction between the Central Asian and Southeast Asian legs.'},
    'Lucknow':         {t:'Station · Secondary',           c:'blue', i:'Major city of the Gangetic Plain. Cultural and administrative centre of the United Provinces.'},
    'Dhaka':           {t:'Station · Mainline',            c:'muted',i:"Capital of eastern India's Bengal region. Sits in the Ganges-Brahmaputra delta."},
    'Rangoon':         {t:'Station · Mainline',            c:'muted',i:'Capital of Burma. Principal port on the Irrawaddy delta. Gateway into Indochina.'},
    'Kuala Lumpur':    {t:'Station · Secondary',           c:'blue', i:'Capital of Japanese Malaya. Rapidly developing city in the heart of the Malay peninsula.'},
    'Singapore':       {t:'Major Junction · Secondary',   c:'blue', i:'Strategic island city under Japanese Malaya. Critical junction connecting Southeast Asia to Australia and East Asia.'},
    'Bangkok':         {t:'Station · Mainline',            c:'muted',i:'Capital of Thailand. River city at the heart of mainland Southeast Asia.'},
    'Saigon':          {t:'Station · Mainline',            c:'muted',i:"Southern capital of Vietnam. French-influenced port city on the Mekong Delta. Heart of French Indochina's successor state."},
    'Hanoi':           {t:'Station · Mainline',            c:'muted',i:'Capital of Vietnam. Administrative hub serving the densely populated Red River Delta.'},
    'Hong Kong':       {t:'Station · Mainline',            c:'muted',i:'Port territory of Japanese Guangdong. One of the busiest natural harbours in Asia.'},
    'Fuzhou':          {t:'Station · Secondary',           c:'blue', i:'Coastal city of the Republic of China on the Fujian coast. Historic port on the Strait of Taiwan.'},
    'Nanjing':         {t:'Station · Mainline',            c:'muted',i:'Historic former capital of the Republic of China on the Yangtze River.'},
    'Qingdao':         {t:'Station · Mainline',            c:'muted',i:'German-legacy port city on the Yellow Sea. Known for its European architecture.'},
    'Beijing':         {t:'Major Junction · Mainline',     c:'gold', i:'Capital of the Republic of China. One of the great historic cities of the world. Junction for onward movement to Korea and Japan.'},
    'Dalian':          {t:'Station · Secondary',           c:'blue', i:'Japanese-administered port on the Liaodong Peninsula. Ice-free deep harbour serving Manchurian trade.'},
    'Seoul':           {t:'Station · Mainline',            c:'muted',i:'Capital of Japanese Korea. Major industrial city. Boarding hub for the Korean peninsula.'},
    'Busan':           {t:'Station · Mainline',            c:'muted',i:'Principal port of Japanese Korea. Main departure point for the crossing to the Japanese islands.'},
    'Fukuoka':         {t:'Station · Mainline',            c:'muted',i:'Northernmost major city of Kyushu. First stop on the Japanese islands.'},
    'Okayama':         {t:'Station · Secondary',           c:'blue', i:'City on the Sanyo coast connecting Kyushu to Honshu. Industrial centre of western Japan.'},
    'Osaka':           {t:'Station · Mainline',            c:'muted',i:'Second city of Japan and its commercial heart. High-volume boarding before Tokyo.'},
    'Tokyo':           {t:'Major Stop · Mainline',         c:'gold', i:'Capital of the State of Japan. Highest-volume boarding station in East Asia. Last stop before the Pacific crossing.'},
    'Sapporo':         {t:'Station · Mainline',            c:'muted',i:"Capital of Hokkaido, Japan's northern island. Last stop before the Pacific crossing to Kamchatka."},
    'Petropavlovsk-Kamchatsky': {t:'Station · Mainline',  c:'muted',i:'Remote city on Kamchatka, U.S. Pacific Fleet territory. The critical crossing point from Asia to North America.'},
    'Anchorage':       {t:'Station · Mainline',            c:'muted',i:'Main city of Alaska. First North American stop after the Pacific crossing.'},
    'Vancouver':       {t:'Station · Mainline',            c:'muted',i:'Largest city of western Canada. Pacific port at the foot of the Coast Mountains.'},
    'Portland':        {t:'Station · Mainline',            c:'muted',i:'Port city of the Pacific northwest USA. Trade hub at the confluence of the Columbia and Willamette rivers.'},
    'San Francisco':   {t:'Major Stop · Mainline & Secondary', c:'gold', i:'One of the great port cities of the western USA. Major boarding hub on both routes.'},
    'Las Vegas':       {t:'Station · Secondary',           c:'blue', i:'Desert city of the American southwest. Major population centre in the Nevada basin.'},
    'Los Angeles':     {t:'Major Stop · Mainline',         c:'gold', i:'Largest city on the Pacific coast of the USA. Primary boarding hub for Southern California.'},
    'Mexico City':     {t:'Major Junction · Mainline',     c:'gold', i:'Capital of Mexico and most populous city in the Americas. Junction connecting the North and South American segments.'},
    'San Salvador':    {t:'Station · Mainline',            c:'muted',i:'Capital of El Salvador. Stop on the Central American isthmus corridor.'},
    'Panama City':     {t:'Station · Mainline',            c:'muted',i:'Capital of Panama. Guards the entrance to the Canal. Strategic transit city.'},
    'Quito':           {t:'Station · Mainline',            c:'muted',i:'Capital of Ecuador, high in the Andes. One of the highest capital cities in the world.'},
    'Lima':            {t:'Station · Mainline',            c:'muted',i:'Capital of Peru. Pacific coastal city and the largest on western South America.'},
    'La Paz':          {t:'Station · Mainline',            c:'muted',i:'Seat of government of Bolivia. High-altitude Andean city.'},
    'Santa Cruz de la Sierra': {t:'Station · Mainline',   c:'muted',i:'Largest city of Bolivia and its economic capital. Gateway between the Andes and the Atlantic basin.'},
    'Asunción':        {t:'Station · Secondary',           c:'blue', i:'Capital of Paraguay. Inland river city. One of the oldest cities in South America.'},
    'Buenos Aires':    {t:'Major Stop · Secondary',        c:'blue', i:'Capital of Argentina. Cultural and economic heart of the southern cone.'},
    'Montevideo':      {t:'Station · Secondary',           c:'blue', i:'Capital of Uruguay. Prosperous river-mouth city before the Brazilian approach.'},
    'São Paulo':       {t:'Major Stop · Mainline',         c:'gold', i:'Largest city in South America. Economic capital of Brazil. Massive boarding hub.'},
    'Rio de Janeiro':  {t:'Station · Mainline',            c:'muted',i:'Former capital of Brazil and its most iconic city. Atlantic port at the foot of the Serra do Mar.'},
    'Natal':           {t:'Station · Mainline',            c:'muted',i:'Easternmost city of the Americas. Key waypoint marking the northward turn along the Atlantic coast.'},
    'Caracas':         {t:'Station · Mainline',            c:'muted',i:'Capital of Venezuela. Caribbean-facing city rich in oil.'},
    'Medellín':        {t:'Station · Mainline',            c:'muted',i:'Second city of Colombia. Industrial mountain city serving the Antioqueño highlands.'},
    'Houston':         {t:'Station · Secondary',           c:'blue', i:'Largest city of Texas. Major Gulf Coast port and oil industry centre.'},
    'Jacksonville':    {t:'Station · Secondary',           c:'blue', i:'Major Atlantic coast city of northern Florida. Naval and logistics hub.'},
    'Dallas':          {t:'Station · Mainline',            c:'muted',i:'Major city of Texas and the southern USA interior.'},
    'Atlanta':         {t:'Station · Mainline',            c:'muted',i:'Transportation hub of the American southeast. Gateway to the eastern seaboard.'},
    'Washington D.C.':{t:'Major Stop · Mainline & Secondary', c:'gold', i:'Capital of the United States of America. One of the final North American stops before the Arctic turn.'},
    'New York':        {t:'Station · Secondary',           c:'blue', i:'Largest city of the USA. The great Atlantic port and commercial capital of the Americas.'},
    'Montreal':        {t:'Station · Mainline',            c:'muted',i:'Largest city of French Canada. Last major city before the Arctic run to Greenland.'},
    'Nuuk':            {t:'Station · Mainline',            c:'muted',i:'Capital of Greenland, administered by the USA. Northernmost stop of the entire circuit.'},
    'Murmansk':        {t:'Station · Mainline',            c:'muted',i:'Arctic port city of Finland. Ice-free year-round. Last stop before the Baltic return.'},
    'Sankt Petersburg':{t:'Station · Mainline',            c:'muted',i:'Former imperial capital of RK Moskowien. Magnificent Baltic city on the Neva delta.'},
    'Helsinki':        {t:'Station · Secondary',           c:'blue', i:'Capital of Finland. Baltic Sea port. Stop before the Estonian approach on the return leg.'},
    'Tallinn':         {t:'Station · Secondary',           c:'blue', i:"Capital of RK Ostland's Estonian district. Medieval Baltic port city."},
    'Riga':            {t:'Station · Mainline & Secondary',c:'muted',i:'Capital of RK Ostland. Major Baltic port. Largest city of the occupied Baltic states.'},
    'Kaunas':          {t:'Station · Mainline & Secondary',c:'muted',i:'Second city of Lithuania within RK Ostland. Commercial hub on the Nemunas River.'},
    'Königsberg':      {t:'Station · Mainline',            c:'muted',i:'Capital of East Prussia. Historic German Baltic port. One of the last waypoints before Berlin.'},
    'Danzig':          {t:'Station · Mainline',            c:'muted',i:'German port city on the Baltic coast. Penultimate stop before Berlin.'},
    'Hannover':        {t:'Station · Secondary',           c:'blue', i:'Major German city and rail hub. First stop south of Berlin on the Secondary Mainline.'},
    'Düsseldorf':      {t:'Station · Secondary',           c:'blue', i:'Industrial heart of the Rhineland. Gateway to Belgium and the Low Countries.'},
    'Brüxelles':       {t:'Station · Secondary',           c:'blue', i:'Capital of Burgundy. Cosmopolitan city at the crossroads of French and Flemish culture.'},
    'London':          {t:'Major Stop · Secondary',        c:'blue', i:"Capital of the United Kingdom of Britain. One of the world's great cities."},
    'Bournemouth':     {t:'Station · Secondary',           c:'blue', i:"Stop on the Secondary Mainline's British leg before the French crossing via Cherbourg."},
    'Cherbourg':       {t:'Station · Secondary',           c:'blue', i:'Major French Atlantic port on the Normandy coast. Gateway between Britain and France.'},
    'Nantes':          {t:'Station · Secondary',           c:'blue', i:'Atlantic port of western France on the Loire estuary.'},
    'Bordeaux':        {t:'Station · Secondary',           c:'blue', i:'Wine capital of France and major Atlantic port. Gateway to the Pyrenees.'},
    'Bilbao':          {t:'Station · Secondary',           c:'blue', i:'Major Basque port city of the Iberian Union. Industrial heartland of northern Spain.'},
    'Madrid':          {t:'Major Stop · Secondary',        c:'blue', i:"Capital of the Iberian Union. Political and cultural heart of Spain."},
    'Tetuan':          {t:'Station · Secondary',           c:'blue', i:'City of Iberian Morocco near the Strait. First North African stop on the Secondary Mainline.'},
    'Oran':            {t:'Station · Secondary',           c:'blue', i:'Major Algerian port city. Second city of French Algeria.'},
    'Algiers':         {t:'Major Stop · Secondary',        c:'blue', i:"Capital of French Algeria. Dominant city of North Africa's French zone."},
    'Tunis':           {t:'Station · Secondary',           c:'blue', i:"Capital of Italian Libya's Tunisian district. Ancient Mediterranean city."},
    'Tripoli':         {t:'Station · Secondary',           c:'blue', i:'Capital of Italian Libya. Major North African coastal city.'},
    'Benghazi':        {t:'Station · Secondary',           c:'blue', i:'Second city of Italian Libya. Eastern Libyan port near the Egyptian border.'},
    'Alexandria':      {t:'Major Stop · Secondary',        c:'blue', i:"Egypt's great Mediterranean port. Ancient city at the mouth of the Nile Delta."},
    'Antalya':         {t:'Station · Secondary',           c:'blue', i:'Turkish Riviera city on the Mediterranean coast. Tourism and trade hub of southern Anatolia.'},
    'Izmir':           {t:'Station · Secondary',           c:'blue', i:'Third city of the Republic of Turkey. Major Aegean port.'},
    'Varna':           {t:'Station · Secondary',           c:'blue', i:'Principal Bulgarian Black Sea port. Gateway to the Bulgarian interior.'},
    'Rostov-on-Don':   {t:'Station · Secondary',           c:'blue', i:'Major city of RK Ukraine at the mouth of the Don River. Gateway to the Caucasus.'},
    'Tbilisi':         {t:'Station · Secondary',           c:'blue', i:"Capital of RK Kaukasien's Georgian district. Ancient Caucasian city on the Kura River."},
    'Dili':            {t:'Station · Secondary',           c:'blue', i:'Capital of Iberian Timor. Small colonial port at the eastern end of the Lesser Sunda Islands.'},
    'Darwin':          {t:'Station · Secondary',           c:'blue', i:'Northern gateway city of Australia. Tropical port facing Indonesia.'},
    'Perth':           {t:'Station · Secondary',           c:'blue', i:'Capital of Western Australia. Remote but prosperous city on the Indian Ocean coast.'},
    'Adelaide':        {t:'Station · Secondary',           c:'blue', i:'Capital of South Australia. Stop on the southern Australian coastal run.'},
    'Melbourne':       {t:'Station · Secondary',           c:'blue', i:'Second city of Australia. Cultural capital of the continent.'},
    'Sydney':          {t:'Major Stop · Secondary',        c:'blue', i:'Largest city in Australia. Major Pacific gateway. Centrepiece of the Australian loop.'},
    'Brisbane':        {t:'Station · Secondary',           c:'blue', i:'Capital of Queensland. Subtropical coastal city. Final stop on the Australian leg.'},
    'Bandar':          {t:'Station · Secondary',           c:'blue', i:'Capital of Brunei. Small but wealthy sultanate on the northern coast of Borneo.'},
    'Białystok':       {t:'Station · Secondary',           c:'blue', i:'Eastern German city near the former Polish border. Administrative centre of the incorporated eastern territories.'},
    'Warschau':        {t:'Station · Secondary',           c:'blue', i:"Former capital of Poland, now Germany's Generalgouvernement."},
    'Breslau':         {t:'Station · Secondary',           c:'blue', i:'Major German city of Silesia on the Oder River. Final stop before the return to Berlin.'},
  };

  const DINFO = {t:'Station',c:'muted',i:"A scheduled stop on the Prussian Star's circuit. Passengers may board or disembark at this waypoint during the allotted window."};
  const TCOLS = {gold:'#C9A84C', blue:'#9090C8', muted:'#7A6E5E'};

  // ─── COORDINATES [lon, lat] ────────────────────────────────────────────────
  const COORDS = {
    'Berlin':[13.4,52.5],'Frankfurt':[8.7,50.1],'Paris':[2.3,48.9],'Toulouse':[1.4,43.6],
    'Barcelona':[2.2,41.4],'Valencia':[-0.4,39.5],'Malaga':[-4.4,36.7],'Gibraltar':[-5.4,36.1],
    'Casablanca':[-7.6,33.6],'Dakar':[-17.4,14.7],'Monrovia':[-10.8,6.3],'Abidjan':[-4.0,5.4],
    'Lagos':[3.4,6.5],'Luanda':[13.2,-8.8],'Windhoek':[17.1,-22.6],'Cape Town':[18.4,-33.9],
    'Durban':[31.0,-29.9],'Dar es Salaam':[39.3,-6.8],'Mombasa':[39.7,-4.1],
    'Mogadishu':[45.3,2.0],'Djibouti':[43.1,11.6],'Port Sudan':[37.2,19.6],
    'Cairo':[31.2,30.1],'Jerusalem':[35.2,31.8],'Beirut':[35.5,33.9],
    'Ankara':[32.9,39.9],'Istanbul':[29.0,41.0],'Bucharest':[26.1,44.4],
    'Odessa':[30.7,46.5],'Sevastopol':[33.5,44.6],'Krasnodar':[39.0,45.0],
    'Baku':[49.9,40.4],'Tabriz':[46.3,38.1],'Tehran':[51.4,35.7],
    'Ashgabat':[58.4,37.9],'Kabul':[69.2,34.5],'New Delhi':[77.2,28.6],
    'Dhaka':[90.4,23.7],'Rangoon':[96.2,16.8],'Bangkok':[100.5,13.8],
    'Saigon':[106.7,10.8],'Hanoi':[105.8,21.0],'Hong Kong':[114.2,22.3],
    'Nanjing':[118.8,32.1],'Qingdao':[120.4,36.1],'Beijing':[116.4,39.9],
    'Seoul':[126.9,37.6],'Busan':[129.1,35.1],'Fukuoka':[130.4,33.6],
    'Osaka':[135.5,34.7],'Tokyo':[139.7,35.7],'Sapporo':[141.4,43.1],
    'Petropavlovsk-Kamchatsky':[158.7,53.0],'Anchorage':[-149.9,61.2],
    'Vancouver':[-123.1,49.3],'Portland':[-122.7,45.5],'San Francisco':[-122.4,37.8],
    'Los Angeles':[-118.2,34.1],'Mexico City':[-99.1,19.4],'San Salvador':[-89.2,13.7],
    'Panama City':[-79.5,8.9],'Quito':[-78.5,-0.2],'Lima':[-77.0,-12.1],
    'La Paz':[-68.1,-16.5],'Santa Cruz de la Sierra':[-63.2,-17.8],
    'São Paulo':[-46.6,-23.5],'Rio de Janeiro':[-43.2,-22.9],'Natal':[-35.2,-5.8],
    'Caracas':[-66.9,10.5],'Medellín':[-75.6,6.2],'Dallas':[-96.8,32.8],
    'Atlanta':[-84.4,33.7],'Washington D.C.':[-77.0,38.9],'Montreal':[-73.6,45.5],
    'Nuuk':[-51.7,64.2],'Murmansk':[33.1,68.9],'Sankt Petersburg':[30.3,59.9],
    'Riga':[24.1,56.9],'Kaunas':[23.9,54.9],'Königsberg':[20.5,54.7],'Danzig':[18.6,54.4],
    'Hannover':[9.7,52.4],'Düsseldorf':[6.8,51.2],'Brüxelles':[4.4,50.8],
    'London':[-0.1,51.5],'Bournemouth':[-1.9,50.7],'Cherbourg':[-1.6,49.6],
    'Nantes':[-1.6,47.2],'Bordeaux':[-0.6,44.8],'Bilbao':[-2.9,43.3],'Madrid':[-3.7,40.4],
    'Tetuan':[-5.4,35.6],'Oran':[-0.6,35.7],'Algiers':[3.1,36.7],'Tunis':[10.2,36.8],
    'Tripoli':[13.2,32.9],'Benghazi':[20.1,32.1],'Alexandria':[29.9,31.2],
    'Antalya':[30.7,36.9],'Izmir':[27.1,38.4],'Varna':[28.0,43.2],
    'Rostov-on-Don':[39.7,47.2],'Tbilisi':[44.8,41.7],'Lucknow':[81.0,26.8],
    'Kuala Lumpur':[101.7,3.1],'Singapore':[103.8,1.3],'Dili':[125.6,-8.6],
    'Darwin':[130.8,-12.5],'Perth':[115.9,-31.9],'Adelaide':[138.6,-34.9],
    'Melbourne':[145.0,-37.8],'Sydney':[151.2,-33.9],'Brisbane':[153.0,-27.5],
    'Bandar':[114.9,4.9],'Fuzhou':[119.3,26.1],'Dalian':[121.6,38.9],
    'Okayama':[133.9,34.7],'Las Vegas':[-115.1,36.2],'Asunción':[-57.6,-25.3],
    'Buenos Aires':[-58.4,-34.6],'Montevideo':[-56.2,-34.9],'Houston':[-95.4,29.8],
    'Jacksonville':[-81.7,30.3],'New York':[-74.0,40.7],'Helsinki':[25.0,60.2],
    'Tallinn':[24.7,59.4],'Białystok':[23.2,53.1],'Warschau':[21.0,52.2],'Breslau':[17.0,51.1],
  };

  // lat range +83 → -57 (140° span) — calibrated for the world map
  function proj(lon, lat, W, H) {
    return [(lon + 180) / 360 * W, (83 - lat) / 140 * H];
  }

  // Continent polygons [lon, lat]
  const LAND = [
    [[-9,36],[-9,44],[-2,44],[0,46],[5,43],[8,44],[15,47],[17,49],[24,56],[27,58],[29,60],[30,65],[28,70],[20,70],[15,69],[10,63],[5,58],[4,52],[3,51],[2,51],[-2,49],[-5,48],[-4,44],[-9,44],[-9,36]],
    [[-6,50],[-6,58],[-2,59],[0,58],[1,52],[0,51],[-3,50],[-6,50]],
    [[-17,15],[-17,5],[-10,5],[-5,5],[3,5],[8,5],[12,4],[14,5],[15,2],[15,-5],[12,-18],[14,-22],[17,-29],[18,-34],[25,-34],[32,-29],[35,-18],[38,-10],[40,-5],[42,0],[43,12],[45,12],[42,15],[38,22],[36,30],[32,32],[35,36],[36,42],[38,41],[44,42],[42,38],[44,36],[38,36],[35,33],[36,30],[32,20],[25,22],[15,22],[10,14],[5,14],[0,14],[-5,14],[-10,14],[-17,15]],
    [[26,42],[29,41],[36,36],[36,32],[35,28],[38,22],[43,12],[48,12],[50,14],[52,13],[58,22],[60,22],[65,22],[70,22],[72,24],[78,8],[80,14],[82,22],[84,28],[88,22],[90,24],[92,28],[94,22],[96,16],[100,6],[103,1],[100,8],[104,10],[108,14],[110,8],[114,4],[117,4],[120,4],[120,8],[116,12],[112,20],[115,22],[114,22],[118,28],[122,30],[120,32],[122,38],[120,40],[121,38],[125,38],[128,40],[130,32],[132,34],[136,34],[140,36],[142,42],[140,46],[134,46],[132,44],[130,34],[128,36],[128,42],[126,38],[122,52],[120,52],[116,52],[110,52],[100,54],[90,56],[80,56],[70,56],[62,56],[60,60],[55,60],[54,56],[50,56],[44,48],[40,48],[38,48],[34,44],[30,46],[26,48],[26,42]],
    [[130,32],[131,33],[133,34],[135,35],[137,36],[140,36],[141,40],[141,42],[140,44],[138,44],[136,36],[134,34],[132,34],[130,33],[130,32]],
    [[-62,46],[-65,44],[-70,42],[-74,40],[-76,36],[-80,32],[-82,30],[-80,24],[-82,22],[-88,16],[-90,14],[-92,16],[-96,20],[-104,20],[-110,24],[-116,28],[-118,34],[-122,36],[-124,40],[-124,46],[-126,50],[-130,56],[-134,58],[-134,60],[-140,60],[-140,68],[-160,68],[-166,68],[-170,60],[-164,60],[-162,62],[-168,62],[-170,54],[-164,54],[-160,58],[-154,58],[-150,60],[-148,60],[-142,58],[-136,56],[-130,54],[-126,50],[-130,48],[-126,48],[-122,46],[-116,48],[-110,48],[-100,48],[-96,48],[-88,48],[-84,46],[-82,46],[-76,44],[-74,44],[-70,46],[-66,44],[-62,46]],
    [[-55,60],[-55,70],[-60,76],[-70,78],[-60,82],[-45,84],[-30,82],[-25,76],[-25,70],[-35,62],[-50,62],[-55,60]],
    [[-68,-55],[-66,-55],[-58,-52],[-52,-50],[-48,-28],[-44,-22],[-40,-20],[-36,-8],[-35,-4],[-34,0],[-38,4],[-44,4],[-50,4],[-54,4],[-58,4],[-62,4],[-62,8],[-70,8],[-72,4],[-76,0],[-80,-2],[-80,-8],[-76,-12],[-74,-18],[-64,-20],[-62,-22],[-60,-22],[-58,-26],[-56,-30],[-60,-36],[-62,-38],[-64,-42],[-66,-46],[-66,-52],[-68,-55]],
    [[114,-22],[115,-32],[118,-34],[122,-34],[126,-34],[130,-32],[132,-32],[136,-36],[138,-36],[140,-36],[144,-38],[148,-38],[152,-28],[154,-26],[154,-22],[150,-22],[146,-18],[144,-14],[140,-14],[136,-12],[132,-12],[128,-14],[122,-22],[120,-24],[118,-24],[116,-22],[114,-22]],
  ];

  function buildMap(stops, W, H, col, id) {
    // Route line — split at Pacific crossing
    let d = '', pv = null;
    stops.forEach(([city]) => {
      const cr = COORDS[city]; if (!cr) return;
      const [x,y] = proj(cr[0],cr[1],W,H);
      if (pv && Math.abs(x-pv[0]) > W*0.38) d += ` M${x.toFixed(1)},${y.toFixed(1)}`;
      else d += pv ? ` L${x.toFixed(1)},${y.toFixed(1)}` : `M${x.toFixed(1)},${y.toFixed(1)}`;
      pv = [x,y];
    });

    // Continents
    let land = '';
    LAND.forEach(poly => {
      const pts = poly.map(([lo,la]) => { const [x,y]=proj(lo,la,W,H); return `${x.toFixed(1)},${y.toFixed(1)}`; }).join(' ');
      land += `<polygon points="${pts}" fill="#1E1A0E" stroke="rgba(201,168,76,0.18)" stroke-width="0.5"/>`;
    });

    // Grid
    let grid = '';
    for (let lo=-150;lo<=180;lo+=30){const[gx]=proj(lo,0,W,H);grid+=`<line x1="${gx.toFixed(0)}" y1="0" x2="${gx.toFixed(0)}" y2="${H}" stroke="rgba(201,168,76,0.05)" stroke-width="0.5"/>`;}
    for (let la=-60;la<=75;la+=30){const[,gy]=proj(0,la,W,H);grid+=`<line x1="0" y1="${gy.toFixed(0)}" x2="${W}" y2="${gy.toFixed(0)}" stroke="rgba(201,168,76,0.05)" stroke-width="0.5"/>`;}
    const [,eq]=proj(0,0,W,H);

    // Dots
    const seen=new Set(); let dots='';
    stops.forEach(([city,country,type])=>{
      const cr=COORDS[city]; if(!cr||seen.has(city)) return; seen.add(city);
      const[x,y]=proj(cr[0],cr[1],W,H);
      const mjr=(type==='junction'||type==='end');
      const cx=x.toFixed(1),cy=y.toFixed(1);
      const lx=(x>W*0.84?x-7:x+7).toFixed(1);
      const anc=x>W*0.84?'end':'start';
      const esc=v=>String(v).replace(/"/g,'&quot;');
      if(mjr){
        dots+=`<g class="ms mj" data-city="${esc(city)}" data-country="${esc(country||'')}">
<circle cx="${cx}" cy="${cy}" r="13" fill="transparent"/>
<circle cx="${cx}" cy="${cy}" r="9" fill="none" stroke="${col}" stroke-width="0.8" opacity="0" class="mr"/>
<circle cx="${cx}" cy="${cy}" r="4.5" fill="${col}" stroke="#0C0A07" stroke-width="1.2" class="md"/>
<text x="${lx}" y="${(+cy+1.5).toFixed(1)}" font-family="Cinzel,serif" font-size="7" fill="${col}" text-anchor="${anc}" opacity="0.9" paint-order="stroke" stroke="#0C0A07" stroke-width="3" class="ml">${city}</text>
</g>`;
      } else {
        const slx=(x>W*0.84?x-4:x+4).toFixed(1);
        const sanc=x>W*0.84?'end':'start';
        dots+=`<g class="ms mn" data-city="${esc(city)}" data-country="${esc(country||'')}">
<circle cx="${cx}" cy="${cy}" r="9" fill="transparent"/>
<circle cx="${cx}" cy="${cy}" r="5" fill="none" stroke="#9E876A" stroke-width="0.8" opacity="0" class="mr"/>
<circle cx="${cx}" cy="${cy}" r="2.2" fill="#7A6E5E" stroke="#0C0A07" stroke-width="0.6" opacity="0.85" class="md"/>
<text x="${slx}" y="${(+cy+2).toFixed(1)}" font-family="Cinzel,serif" font-size="5.5" fill="#B8966A" opacity="0" text-anchor="${sanc}" paint-order="stroke" stroke="#0C0A07" stroke-width="2" class="ml">${city}</text></g>`;
      }
    });

    const oy=H-58;
    return `
<div style="position:relative" id="mc${id}">
  <svg id="sv${id}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block;background:#0A0806">
    <rect width="${W}" height="${H}" fill="#0A0806"/>
    ${grid}
    <line x1="0" y1="${eq.toFixed(0)}" x2="${W}" y2="${eq.toFixed(0)}" stroke="rgba(201,168,76,0.14)" stroke-width="0.8"/>
    ${land}
    <path d="${d}" fill="none" stroke="${col}" stroke-width="6" opacity="0.07" stroke-linecap="round"/>
    <path d="${d}" fill="none" stroke="${col}" stroke-width="1.6" opacity="0.78" stroke-linecap="round" stroke-linejoin="round"/>
    ${dots}
    <rect x="8" y="${H-26}" width="136" height="20" fill="rgba(8,5,2,0.88)" rx="1"/>
    <circle cx="18" cy="${H-16}" r="4" fill="${col}" stroke="#0C0A07" stroke-width="1"/>
    <text x="27" y="${H-12}" font-family="Cinzel,serif" font-size="5" fill="${col}">Major stop · click for info</text>
    <circle cx="136" cy="${H-16}" r="2.2" fill="#7A6E5E" stroke="#0C0A07" stroke-width="0.6"/>
    <text x="142" y="${H-12}" font-family="Cinzel,serif" font-size="5" fill="#7A6E5E">Station</text>
    <rect x="0.5" y="0.5" width="${W-1}" height="${H-1}" fill="none" stroke="rgba(201,168,76,0.3)" stroke-width="1"/>
  </svg>
  <div id="cm${id}" style="display:flex;position:fixed;inset:0;z-index:2500;background:rgba(8,5,2,0.9);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);align-items:center;justify-content:center;padding:1.5rem;visibility:hidden;opacity:0;transition:opacity 0.25s,visibility 0.25s">
    <div style="background:#13100D;border:0.5px solid rgba(201,168,76,0.45);max-width:440px;width:100%">
      <div style="height:1.5px;background:linear-gradient(90deg,transparent,#C9A84C,transparent)"></div>
      <div style="padding:1.75rem 2rem 1.5rem">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;margin-bottom:1rem">
          <div style="display:flex;align-items:center;gap:0.75rem">
            <div id="cd${id}" style="width:8px;height:8px;border-radius:50%;flex-shrink:0;margin-top:4px"></div>
            <div>
              <h3 id="cc${id}" style="font-family:'Cormorant Garamond',serif;font-size:clamp(1.4rem,4vw,1.8rem);font-weight:300;color:#F8F3E8;line-height:1.1;margin-bottom:0.2rem"></h3>
              <p  id="ck${id}" style="font-family:'EB Garamond',serif;font-size:0.9rem;font-style:italic;color:#7A6E5E"></p>
            </div>
          </div>
          <button id="cx${id}" style="background:none;border:none;color:#7A6E5E;font-size:1.1rem;cursor:pointer;padding:0.25rem;line-height:1;flex-shrink:0;transition:color 0.2s" onmouseover="this.style.color='#F8F3E8'" onmouseout="this.style.color='#7A6E5E'">✕</button>
        </div>
        <span id="ct${id}" style="font-family:Cinzel,serif;font-size:7.5px;letter-spacing:0.4em;text-transform:uppercase;padding:0.25rem 0.75rem;border:0.5px solid;display:inline-block;margin-bottom:1rem"></span>
        <div style="height:0.5px;background:linear-gradient(90deg,transparent,rgba(201,168,76,0.25),transparent);margin-bottom:1rem"></div>
        <p id="ci${id}" style="font-family:'EB Garamond',serif;font-size:1rem;color:#C8BCA8;line-height:1.8"></p>
        <p style="font-family:Cinzel,serif;font-size:7px;letter-spacing:0.3em;text-transform:uppercase;color:rgba(122,110,94,0.5);margin-top:1.25rem">Prussian Star · Click outside or ✕ to close</p>
      </div>
      <div style="height:0.5px;background:linear-gradient(90deg,transparent,rgba(201,168,76,0.2),transparent)"></div>
    </div>
  </div>
</div>`;
  }

  function bindMap(id) {
    const sv = document.getElementById('sv'+id);
    const mc = document.getElementById('mc'+id);
    const cm = document.getElementById('cm'+id);
    const cc = document.getElementById('cc'+id);
    const ck = document.getElementById('ck'+id);
    const ct = document.getElementById('ct'+id);
    const ci = document.getElementById('ci'+id);
    const cd = document.getElementById('cd'+id);
    const cx = document.getElementById('cx'+id);
    if (!sv||!mc) return;

    // CSS transitions on dots/rings/labels via style attribute
    sv.querySelectorAll('.ms').forEach(function(g){
      const md=g.querySelector('.md'), mr=g.querySelector('.mr'), ml=g.querySelector('.ml');
      const mj=g.classList.contains('mj');
      ['md','mr','ml'].forEach(function(cls){
        const el=g.querySelector('.'+cls); if(el) el.style.transition='all 0.18s ease';
      });

      g.addEventListener('mouseenter',function(){
        // Dot + ring hover
        if(md) md.setAttribute('r', mj?'6.5':'3.8');
        if(mr){ mr.setAttribute('opacity',mj?'0.55':'0.45'); mr.setAttribute('r',mj?'10':'6'); }
        if(ml){ ml.setAttribute('opacity','1'); ml.setAttribute('font-size',mj?'9':'7'); if(!mj) ml.setAttribute('x',(parseFloat(ml.getAttribute('x'))).toFixed(1)); }
        const city=g.dataset.city||'', ctry=g.dataset.country||'';
        // Cursor
        g.style.cursor = mj ? 'pointer' : 'default';
      });

      g.addEventListener('mouseleave',function(){
        if(md) md.setAttribute('r',mj?'4.5':'2.2');
        if(mr){ mr.setAttribute('opacity','0'); mr.setAttribute('r',mj?'9':'5'); }
        if(ml&&!mj) ml.setAttribute('opacity','0');

        g.style.cursor='default';
      });

      // Click — major only
      if(mj){
        g.addEventListener('click',function(e){
          e.stopPropagation();
          const city=g.dataset.city||'', ctry=g.dataset.country||'';
          const inf=CINFO[city]||DINFO;
          const col=TCOLS[inf.c]||'#7A6E5E';
          cc.textContent=city; ck.textContent=ctry;
          ct.textContent=inf.t; ct.style.color=col; ct.style.borderColor=col;
          ci.textContent=inf.i; cd.style.background=col;
          cm.style.visibility='visible'; cm.style.opacity='1';
          document.body.style.overflow='hidden';
        });
      }
    });

    // Close modal
    function close(){ cm.style.opacity='0'; cm.style.visibility='hidden'; document.body.style.overflow=''; }
    if(cx) cx.addEventListener('click',close);
    cm.addEventListener('click',function(e){ if(e.target===cm) close(); });
  }

  function buildRoute() {
    const c = document.getElementById('route-content');
    if (c.innerHTML.trim()) return;

    function stopList(stops, title, desc) {
      let h=`<div class="route-line"><h2 class="route-line-title">${title}</h2><span class="route-line-sub">${desc}</span><div class="route-stops">`;
      stops.forEach(([city,country,type])=>{
        h+=`<div class="route-stop${(type==='junction'||type==='end')?' junction':''}"><span class="stop-city">${city}</span><span class="stop-country">${country}</span></div>`;
      });
      return h+`</div></div>`;
    }

    const W=1000, H=480;
    c.innerHTML = `
      <div class="route-map-wrap" style="margin-bottom:2.5rem">
        <p style="font-family:'Cinzel',serif;font-size:8px;letter-spacing:0.5em;text-transform:uppercase;color:var(--gold);margin-bottom:0.75rem">Prussian Star — Mainline Route</p>
        <div class="route-map-desktop">
          <div style="border:0.5px solid rgba(201,168,76,0.3);overflow:hidden">${buildMap(MAINLINE,W,H,'#C9A84C','ml')}</div>
        </div>
        <div class="route-map-mobile-msg">
          <span style="font-family:'Cinzel',serif;font-size:8px;letter-spacing:0.4em;text-transform:uppercase;color:var(--muted);">Interactive map available on desktop &amp; tablet</span>
        </div>
      </div>
      <div class="route-map-wrap" style="margin-bottom:3rem">
        <p style="font-family:'Cinzel',serif;font-size:8px;letter-spacing:0.5em;text-transform:uppercase;color:#9090C8;margin-bottom:0.75rem">Prussian Star — Secondary Mainline</p>
        <div class="route-map-desktop">
          <div style="border:0.5px solid rgba(140,140,200,0.25);overflow:hidden">${buildMap(SECONDARY,W,H,'#9090C8','sl')}</div>
        </div>
        <div class="route-map-mobile-msg">
          <span style="font-family:'Cinzel',serif;font-size:8px;letter-spacing:0.4em;text-transform:uppercase;color:var(--muted);">Interactive map available on desktop &amp; tablet</span>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:3rem">
        <div>${stopList(MAINLINE,'Mainline Stop List',MAINLINE.length+' stops · Complete global circuit')}</div>
        <div>${stopList(SECONDARY,'Secondary Mainline Stop List',SECONDARY.length+' stops · Extended global circuit')}</div>
      </div>
      <div style="margin-top:2rem;padding:2rem 2.5rem;border:0.5px solid var(--border);background:rgba(255,255,255,0.01)">
        <span style="font-family:'Cinzel',serif;font-size:8px;letter-spacing:0.4em;text-transform:uppercase;color:var(--gold);display:block;margin-bottom:1rem">Route Notes</span>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:2rem">
          <p style="font-size:0.88rem;color:var(--ivory-dark);line-height:1.85">Gold markers denote junction stops where the Mainline and Secondary Mainline share track. At these shared waypoints, passengers may elect to transfer onto the Secondary Mainline. The Secondary route serves as an official contingency corridor — should any segment of the Mainline suffer damage or obstruction, the Prussian Star will divert at the nearest available junction and continue uninterrupted.</p>
          <p style="font-size:0.88rem;color:var(--ivory-dark);line-height:1.85">The Prussian Star makes a single stop at each designated station. Each waypoint has been selected on the basis of its regional significance — representing the foremost population centre or strategic node within its territory — in order to serve the greatest number of prospective passengers within the shortest operational window.</p>
        </div>
      </div>`;

    bindMap('ml');
    bindMap('sl');
  }

buildRoute();
observeReveals();
