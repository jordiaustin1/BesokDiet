// ===== DATABASE MAKANAN INDONESIA =====
const FOOD_DB = [
  { name: 'Nasi putih 1 piring', kcal: 242 }, { name: 'Nasi goreng', kcal: 337 },
  { name: 'Nasi uduk', kcal: 267 }, { name: 'Nasi kuning', kcal: 270 },
  { name: 'Lontong', kcal: 156 }, { name: 'Ketupat', kcal: 148 },
  { name: 'Ayam goreng', kcal: 260 }, { name: 'Ayam bakar', kcal: 215 },
  { name: 'Opor ayam', kcal: 280 }, { name: 'Rendang sapi', kcal: 195 },
  { name: 'Soto ayam', kcal: 170 }, { name: 'Bakso kuah', kcal: 200 },
  { name: 'Mie goreng', kcal: 350 }, { name: 'Mie rebus', kcal: 290 },
  { name: 'Mie instan goreng', kcal: 387 }, { name: 'Mie instan rebus', kcal: 355 },
  { name: 'Gado-gado', kcal: 320 }, { name: 'Pecel lele', kcal: 390 },
  { name: 'Ikan goreng', kcal: 220 }, { name: 'Ikan bakar', kcal: 165 },
  { name: 'Tempe goreng', kcal: 160 }, { name: 'Tahu goreng', kcal: 100 },
  { name: 'Tahu bacem', kcal: 115 }, { name: 'Tempe bacem', kcal: 175 },
  { name: 'Sayur bening', kcal: 30 }, { name: 'Sayur lodeh', kcal: 95 },
  { name: 'Tumis kangkung', kcal: 80 }, { name: 'Cap cay', kcal: 110 },
  { name: 'Oseng tempe', kcal: 155 }, { name: 'Capcay kuah', kcal: 90 },
  { name: 'Telur rebus', kcal: 78 }, { name: 'Telur goreng', kcal: 110 },
  { name: 'Telur dadar', kcal: 120 }, { name: 'Telur balado', kcal: 130 },
  { name: 'Pecel', kcal: 295 }, { name: 'Ketoprak', kcal: 320 },
  { name: 'Bubur ayam', kcal: 210 }, { name: 'Bubur kacang ijo', kcal: 185 },
  { name: 'Kupat tahu', kcal: 310 }, { name: 'Pempek', kcal: 220 },
  { name: 'Siomay', kcal: 200 }, { name: 'Batagor', kcal: 230 },
  { name: 'Martabak telur', kcal: 280 }, { name: 'Martabak manis', kcal: 410 },
  { name: 'Pisang goreng', kcal: 150 }, { name: 'Roti bakar', kcal: 180 },
  { name: 'Roti tawar 2 lembar', kcal: 140 }, { name: 'Croissant', kcal: 230 },
  { name: 'Donat', kcal: 280 }, { name: 'Pisang', kcal: 89 },
  { name: 'Apel', kcal: 72 }, { name: 'Jeruk', kcal: 47 },
  { name: 'Semangka', kcal: 30 }, { name: 'Pepaya', kcal: 43 },
  { name: 'Mangga', kcal: 65 }, { name: 'Air putih 1 gelas', kcal: 0 },
  { name: 'Teh manis', kcal: 75 }, { name: 'Teh tawar', kcal: 2 },
  { name: 'Kopi susu', kcal: 90 }, { name: 'Kopi hitam', kcal: 5 },
  { name: 'Jus jeruk', kcal: 110 }, { name: 'Es teh manis', kcal: 80 },
  { name: 'Susu full cream 1 gelas', kcal: 150 }, { name: 'Yogurt', kcal: 100 },
  { name: 'Indomilk 1 kotak', kcal: 150 }, { name: 'Es krim 1 scoop', kcal: 140 },
  { name: 'Coklat bar', kcal: 235 }, { name: 'Kerupuk 5 biji', kcal: 90 },
  { name: 'Kacang goreng', kcal: 160 }, { name: 'Emping', kcal: 95 },
  { name: 'Semur daging', kcal: 230 }, { name: 'Rawon', kcal: 210 },
  { name: 'Soto betawi', kcal: 290 }, { name: 'Gulai kambing', kcal: 250 },
  { name: 'Sup buntut', kcal: 310 }, { name: 'Nasi lemak', kcal: 350 },
  { name: 'Kwetiau goreng', kcal: 340 }, { name: 'Bihun goreng', kcal: 300 },
  { name: 'Laksa', kcal: 330 },
];

const QUICK_FOODS = [
  { name: 'Nasi putih', kcal: 242 }, { name: 'Ayam goreng', kcal: 260 },
  { name: 'Telur rebus', kcal: 78 }, { name: 'Tempe goreng', kcal: 160 },
  { name: 'Tahu goreng', kcal: 100 }, { name: 'Sayur bening', kcal: 30 },
  { name: 'Mie goreng', kcal: 350 }, { name: 'Pisang', kcal: 89 },
  { name: 'Air putih', kcal: 0 }, { name: 'Teh manis', kcal: 75 },
  { name: 'Nasi goreng', kcal: 337 }, { name: 'Bakso', kcal: 200 },
];

function searchFoodDB(query) {
  const q = query.toLowerCase();
  const matches = FOOD_DB.filter(f => f.name.toLowerCase().includes(q));
  if (matches.length > 0) {
    return { ...matches[0], fromDB: true, total: matches.length };
  }
  // Estimasi by keyword
  let est = 200;
  if (q.includes('goreng')) est = 280;
  else if (q.includes('bakar') || q.includes('grill')) est = 200;
  else if (q.includes('sayur') || q.includes('salad')) est = 60;
  else if (q.includes('nasi') || q.includes('rice')) est = 250;
  else if (q.includes('mie') || q.includes('pasta')) est = 330;
  else if (q.includes('buah') || q.includes('fruit')) est = 70;
  else if (q.includes('minuman') || q.includes('jus')) est = 100;
  else if (q.includes('kue') || q.includes('cake')) est = 300;
  return { name: query, kcal: est, fromDB: false };
}
