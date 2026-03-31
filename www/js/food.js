const FOOD_DB = [
  // NASI & KARBO
  {name:'Nasi putih 1 piring',kcal:242},{name:'Nasi putih 1/2 piring',kcal:121},
  {name:'Nasi goreng biasa',kcal:337},{name:'Nasi goreng ayam',kcal:380},
  {name:'Nasi goreng seafood',kcal:360},{name:'Nasi goreng kambing',kcal:400},
  {name:'Nasi goreng pete',kcal:350},{name:'Nasi uduk',kcal:267},
  {name:'Nasi kuning',kcal:270},{name:'Nasi lemak',kcal:350},
  {name:'Nasi padang',kcal:450},{name:'Nasi bakar',kcal:310},
  {name:'Nasi kebuli',kcal:420},{name:'Nasi tim',kcal:180},
  {name:'Bubur ayam',kcal:210},{name:'Bubur sumsum',kcal:180},
  {name:'Bubur kacang ijo',kcal:185},{name:'Bubur manado',kcal:200},
  {name:'Lontong',kcal:156},{name:'Ketupat',kcal:148},
  {name:'Ketan putih',kcal:180},{name:'Ketan hitam',kcal:170},
  {name:'Nasi merah',kcal:215},{name:'Nasi jagung',kcal:195},
  {name:'Oatmeal 1 mangkok',kcal:150},
  {name:'Roti tawar 1 lembar',kcal:70},{name:'Roti tawar 2 lembar',kcal:140},
  {name:'Roti gandum 1 lembar',kcal:65},{name:'Roti bakar polos',kcal:150},
  {name:'Roti bakar mentega',kcal:200},{name:'Roti bakar coklat',kcal:280},
  {name:'Croissant',kcal:230},{name:'Roti sobek',kcal:180},
  {name:'Donat glazed',kcal:280},{name:'Donat kentang',kcal:250},
  // MIE & PASTA
  {name:'Mie goreng',kcal:350},{name:'Mie rebus',kcal:290},
  {name:'Mie instan goreng',kcal:387},{name:'Mie instan rebus',kcal:355},
  {name:'Mie ayam',kcal:380},{name:'Mie ayam bakso',kcal:430},
  {name:'Mie ayam pangsit',kcal:420},{name:'Kwetiau goreng',kcal:340},
  {name:'Kwetiau rebus',kcal:290},{name:'Kwetiau siram',kcal:320},
  {name:'Bihun goreng',kcal:300},{name:'Bihun kuah',kcal:240},
  {name:'Soun goreng',kcal:280},{name:'Laksa',kcal:330},
  {name:'Mie bakso',kcal:350},{name:'Mie celor',kcal:380},
  // AYAM
  {name:'Ayam goreng 1 potong',kcal:260},{name:'Ayam goreng tepung',kcal:320},
  {name:'Ayam bakar',kcal:215},{name:'Ayam bakar bumbu rujak',kcal:240},
  {name:'Ayam pop',kcal:200},{name:'Ayam penyet',kcal:280},
  {name:'Ayam geprek',kcal:300},{name:'Ayam rica-rica',kcal:270},
  {name:'Opor ayam',kcal:280},{name:'Ayam kecap',kcal:250},
  {name:'Ayam betutu',kcal:290},{name:'Ayam taliwang',kcal:310},
  {name:'Soto ayam',kcal:170},{name:'Soto ayam lamongan',kcal:200},
  {name:'Gulai ayam',kcal:260},{name:'Rendang ayam',kcal:220},
  {name:'Ayam ungkep',kcal:190},{name:'Pecel ayam',kcal:300},
  {name:'Ayam sambal hijau',kcal:260},
  // DAGING SAPI
  {name:'Rendang sapi',kcal:195},{name:'Semur daging',kcal:230},
  {name:'Rawon',kcal:210},{name:'Soto betawi',kcal:290},
  {name:'Soto daging',kcal:220},{name:'Gulai sapi',kcal:250},
  {name:'Dendeng sapi',kcal:280},{name:'Empal sapi',kcal:260},
  {name:'Tongseng sapi',kcal:270},{name:'Sop iga sapi',kcal:300},
  {name:'Sup buntut',kcal:310},{name:'Steak sapi 100g',kcal:250},
  {name:'Daging sapi tumis',kcal:240},{name:'Krengsengan',kcal:265},
  {name:'Sambal goreng daging',kcal:280},
  {name:'Bakso sapi 5 biji',kcal:150},{name:'Bakso kuah 1 mangkok',kcal:200},
  {name:'Bakso goreng 5 biji',kcal:200},
  // IKAN & SEAFOOD
  {name:'Ikan goreng',kcal:220},{name:'Ikan bakar',kcal:165},
  {name:'Ikan balado',kcal:210},{name:'Ikan bumbu kuning',kcal:200},
  {name:'Ikan asin',kcal:150},{name:'Ikan pindang',kcal:140},
  {name:'Ikan lele goreng',kcal:200},{name:'Pecel lele',kcal:390},
  {name:'Ikan mas goreng',kcal:210},{name:'Ikan nila bakar',kcal:160},
  {name:'Ikan tuna 100g',kcal:130},{name:'Ikan salmon 100g',kcal:208},
  {name:'Ikan kembung goreng',kcal:190},{name:'Udang goreng',kcal:180},
  {name:'Udang bakar',kcal:140},{name:'Udang balado',kcal:170},
  {name:'Cumi goreng tepung',kcal:250},{name:'Cumi bakar',kcal:160},
  {name:'Cumi sambal',kcal:190},{name:'Kerang rebus',kcal:100},
  {name:'Bandeng presto',kcal:180},{name:'Teri goreng',kcal:130},
  {name:'Teri kacang',kcal:200},
  // TAHU & TEMPE
  {name:'Tahu goreng 1 potong',kcal:100},{name:'Tahu bacem',kcal:115},
  {name:'Tahu isi',kcal:130},{name:'Tahu bulat',kcal:90},
  {name:'Tahu sutra',kcal:60},{name:'Perkedel tahu',kcal:140},
  {name:'Tahu telur',kcal:180},{name:'Tahu gejrot',kcal:120},
  {name:'Tempe goreng 1 potong',kcal:160},{name:'Tempe bacem',kcal:175},
  {name:'Tempe mendoan',kcal:190},{name:'Tempe orek',kcal:200},
  {name:'Tempe kering',kcal:220},{name:'Tempe penyet',kcal:200},
  {name:'Oseng tempe',kcal:155},{name:'Sambal goreng tempe',kcal:200},
  {name:'Tumis tahu tempe',kcal:160},
  // TELUR
  {name:'Telur rebus 1 butir',kcal:78},{name:'Telur goreng 1 butir',kcal:110},
  {name:'Telur dadar',kcal:120},{name:'Telur ceplok',kcal:105},
  {name:'Telur balado',kcal:130},{name:'Telur asin',kcal:85},
  {name:'Telur kecap',kcal:120},{name:'Orak-arik telur',kcal:130},
  {name:'Martabak telur',kcal:280},
  // SAYURAN
  {name:'Sayur bening',kcal:30},{name:'Sayur lodeh',kcal:95},
  {name:'Sayur asem',kcal:40},{name:'Sayur sop',kcal:60},
  {name:'Tumis kangkung',kcal:80},{name:'Tumis bayam',kcal:70},
  {name:'Tumis kacang panjang',kcal:90},{name:'Tumis buncis',kcal:80},
  {name:'Cap cay',kcal:110},{name:'Capcay kuah',kcal:90},
  {name:'Terong balado',kcal:120},{name:'Lalapan segar',kcal:30},
  {name:'Urap-urap',kcal:140},{name:'Pecel',kcal:295},
  {name:'Gado-gado',kcal:320},{name:'Lotek',kcal:280},
  {name:'Karedok',kcal:260},{name:'Tumis tauge',kcal:60},
  {name:'Tumis jamur',kcal:80},{name:'Plecing kangkung',kcal:90},
  // MASAKAN BERKUAH
  {name:'Soto kudus',kcal:180},{name:'Soto madura',kcal:200},
  {name:'Soto bandung',kcal:190},{name:'Soto banjar',kcal:210},
  {name:'Bakso malang',kcal:280},{name:'Pempek kapal selam',kcal:280},
  {name:'Pempek lenjer',kcal:200},{name:'Pempek adaan',kcal:220},
  {name:'Siomay',kcal:200},{name:'Batagor',kcal:230},
  {name:'Ketoprak',kcal:320},{name:'Kupat tahu',kcal:310},
  {name:'Lontong sayur',kcal:280},{name:'Lontong balap',kcal:290},
  {name:'Sup jagung',kcal:120},{name:'Sup brokoli',kcal:100},
  // GORENGAN & JAJANAN
  {name:'Pisang goreng',kcal:150},{name:'Pisang molen',kcal:170},
  {name:'Cireng',kcal:180},{name:'Cilok 5 biji',kcal:150},
  {name:'Risoles',kcal:200},{name:'Pastel',kcal:220},
  {name:'Lemper',kcal:160},{name:'Arem-arem',kcal:180},
  {name:'Onde-onde',kcal:170},{name:'Klepon',kcal:120},
  {name:'Putu',kcal:110},{name:'Getuk',kcal:140},
  {name:'Kue cubit',kcal:90},{name:'Martabak manis',kcal:410},
  {name:'Bakwan',kcal:140},{name:'Tahu walik',kcal:170},
  {name:'Kerupuk udang 5 biji',kcal:100},{name:'Kerupuk putih 5 biji',kcal:90},
  {name:'Emping 1 genggam',kcal:95},{name:'Kacang goreng 1 genggam',kcal:160},
  {name:'Kacang bawang',kcal:180},{name:'Kacang rebus',kcal:100},
  // MAKANAN BERAT LAIN
  {name:'Gudeg',kcal:280},{name:'Nasi gudeg',kcal:480},
  {name:'Gulai kambing',kcal:250},{name:'Sate ayam 10 tusuk',kcal:350},
  {name:'Sate kambing 10 tusuk',kcal:380},{name:'Sate sapi 10 tusuk',kcal:370},
  {name:'Sate lilit',kcal:320},{name:'Sate padang',kcal:400},
  {name:'Nasi sate',kcal:650},{name:'Nasi warteg',kcal:500},
  {name:'Nasi campur',kcal:480},{name:'Nasi rames',kcal:460},
  // FAST FOOD
  {name:'Nasi ayam fast food',kcal:450},{name:'Burger biasa',kcal:400},
  {name:'Burger double',kcal:560},{name:'Kentang goreng medium',kcal:340},
  {name:'Kentang goreng kecil',kcal:230},{name:'Pizza 1 slice',kcal:285},
  {name:'Hotdog',kcal:290},{name:'Sandwich ayam',kcal:380},
  {name:'Nugget ayam 6 biji',kcal:280},{name:'Chicken strip 3 biji',kcal:250},
  {name:'Fried chicken 1 potong',kcal:320},{name:'Nasi kotak',kcal:520},
  // BUAH
  {name:'Pisang 1 buah',kcal:89},{name:'Apel 1 buah',kcal:72},
  {name:'Jeruk 1 buah',kcal:47},{name:'Semangka 1 potong',kcal:30},
  {name:'Pepaya 1 potong',kcal:43},{name:'Mangga 1 buah',kcal:135},
  {name:'Alpukat 1/2 buah',kcal:120},{name:'Alpukat 1 buah',kcal:240},
  {name:'Anggur 1 genggam',kcal:70},{name:'Strawberry 5 biji',kcal:25},
  {name:'Melon 1 potong',kcal:35},{name:'Nanas 1 potong',kcal:50},
  {name:'Durian 1 biji',kcal:147},{name:'Rambutan 5 biji',kcal:75},
  {name:'Salak 1 buah',kcal:77},{name:'Jambu biji 1 buah',kcal:55},
  {name:'Buah naga 1/2 buah',kcal:60},{name:'Kiwi 1 buah',kcal:42},
  // MINUMAN
  {name:'Air putih',kcal:0},{name:'Air mineral 600ml',kcal:0},
  {name:'Teh tawar',kcal:2},{name:'Teh manis',kcal:75},
  {name:'Es teh manis',kcal:80},{name:'Teh susu',kcal:120},
  {name:'Teh botol',kcal:150},{name:'Kopi hitam tanpa gula',kcal:5},
  {name:'Kopi susu',kcal:90},{name:'Kopi susu gula aren',kcal:160},
  {name:'Americano',kcal:10},{name:'Latte',kcal:120},
  {name:'Cappuccino',kcal:110},{name:'Kopi instan 1 sachet',kcal:70},
  {name:'Jus jeruk segar',kcal:110},{name:'Jus alpukat',kcal:250},
  {name:'Jus mangga',kcal:140},{name:'Jus tomat',kcal:80},
  {name:'Jus semangka',kcal:70},{name:'Smoothie pisang',kcal:180},
  {name:'Es campur',kcal:200},{name:'Es dawet',kcal:180},
  {name:'Es cendol',kcal:190},{name:'Es kelapa muda',kcal:100},
  {name:'Air kelapa',kcal:45},{name:'Susu full cream 1 gelas',kcal:150},
  {name:'Susu skim 1 gelas',kcal:90},{name:'Susu kedelai',kcal:100},
  {name:'Yogurt plain',kcal:100},{name:'Yogurt rasa',kcal:140},
  {name:'Indomilk kotak',kcal:150},{name:'Milo 1 gelas',kcal:180},
  {name:'Ovaltine 1 gelas',kcal:160},{name:'Pocari Sweat',kcal:115},
  {name:'Minuman energi 250ml',kcal:110},{name:'Soda 250ml',kcal:100},
  // SNACK & DESSERT
  {name:'Coklat bar 50g',kcal:270},{name:'Kit Kat 1 batang',kcal:210},
  {name:'Biskuit Marie 5 biji',kcal:100},{name:'Biskuit Oreo 3 biji',kcal:160},
  {name:'Ritz crackers 5 biji',kcal:80},{name:'Chiki 1 bungkus kecil',kcal:130},
  {name:'Chitato 1 bungkus kecil',kcal:150},{name:'Popcorn 1 mangkok',kcal:110},
  {name:'Es krim 1 scoop',kcal:140},{name:'Es krim magnum',kcal:270},
  {name:'Es krim cone',kcal:200},{name:'Pudding susu',kcal:120},
  {name:'Agar-agar',kcal:50},{name:'Wafer 1 bungkus',kcal:150},
  // BUMBU & SAUS
  {name:'Sambal 1 sendok',kcal:15},{name:'Kecap manis 1 sendok',kcal:30},
  {name:'Mayones 1 sendok',kcal:90},{name:'Mentega 1 sendok',kcal:100},
  {name:'Minyak goreng 1 sendok',kcal:120},{name:'Gula pasir 1 sendok',kcal:30},
  {name:'Santan 100ml',kcal:230},
];

const QUICK_FOODS = [
  {name:'Nasi putih',kcal:242},{name:'Ayam goreng',kcal:260},
  {name:'Telur rebus',kcal:78},{name:'Tempe goreng',kcal:160},
  {name:'Tahu goreng',kcal:100},{name:'Sayur bening',kcal:30},
  {name:'Mie goreng',kcal:350},{name:'Pisang',kcal:89},
  {name:'Air putih',kcal:0},{name:'Teh manis',kcal:75},
  {name:'Nasi goreng',kcal:337},{name:'Bakso kuah',kcal:200},
];

function searchFoodDB(query) {
  const q = query.toLowerCase().trim();
  const matches = FOOD_DB.filter(f => f.name.toLowerCase().includes(q));
  if (matches.length > 0) return { ...matches[0], fromDB: true, total: matches.length };
  let est = 200;
  if (q.includes('goreng')) est = 280;
  else if (q.includes('bakar') || q.includes('panggang')) est = 200;
  else if (q.includes('rebus') || q.includes('kukus')) est = 150;
  else if (q.includes('sayur') || q.includes('salad')) est = 60;
  else if (q.includes('nasi')) est = 250;
  else if (q.includes('mie') || q.includes('pasta')) est = 330;
  else if (q.includes('buah') || q.includes('fruit')) est = 70;
  else if (q.includes('jus') || q.includes('juice')) est = 110;
  else if (q.includes('kue') || q.includes('cake')) est = 300;
  else if (q.includes('susu') || q.includes('milk')) est = 150;
  else if (q.includes('roti') || q.includes('bread')) est = 160;
  else if (q.includes('daging') || q.includes('meat')) est = 250;
  else if (q.includes('ikan') || q.includes('fish')) est = 180;
  return { name: query, kcal: est, fromDB: false };
}