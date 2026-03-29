// ===== BMI CALCULATOR =====
function calcBMI() {
  const w = parseFloat(document.getElementById('bW').value);
  const hcm = parseFloat(document.getElementById('bH').value);
  const a = parseInt(document.getElementById('bA').value);
  const g = document.getElementById('bG').value;
  if (!w || !hcm || !a) { toast('Isi semua data!'); return; }

  const h = hcm / 100;
  const bmi = w / (h * h);
  const ideal = 22 * (h * h);
  const diff = w - ideal;

  let cat, col;
  if (bmi < 18.5)      { cat = 'Kurus';       col = 'var(--blue)'; }
  else if (bmi < 25)   { cat = 'Normal';        col = 'var(--green)'; }
  else if (bmi < 30)   { cat = 'Gemuk';         col = 'var(--yellow)'; }
  else if (bmi < 35)   { cat = 'Obesitas I';    col = 'var(--orange)'; }
  else                 { cat = 'Obesitas II';   col = 'var(--red)'; }

  // BMR Mifflin-St Jeor
  const bmr = g === 'male'
    ? 10 * w + 6.25 * hcm - 5 * a + 5
    : 10 * w + 6.25 * hcm - 5 * a - 161;
  const defCal = Math.round(bmr * 1.375 - 500);

  // Estimated time (0.75kg/week)
  const weeks = Math.round(Math.max(0, diff) / 0.75);
  const mo = Math.floor(weeks / 4.3);
  const wk = Math.round(weeks % 4.3);
  const timeStr = mo > 0 ? `${mo} bln ${wk} mgg` : `${weeks} mgg`;

  document.getElementById('bmiNum').textContent = bmi.toFixed(1);
  document.getElementById('bmiNum').style.color = col;
  document.getElementById('bmiCat').textContent = cat;
  document.getElementById('bmiCat').style.color = col;
  document.getElementById('bIdeal').textContent = ideal.toFixed(1) + ' kg';
  document.getElementById('bTarget').textContent = diff > 0 ? '-' + diff.toFixed(1) + ' kg' : 'Sudah ideal!';
  document.getElementById('bTarget').style.color = diff > 0 ? 'var(--orange)' : 'var(--green)';
  document.getElementById('bCal').textContent = defCal.toLocaleString('id');
  document.getElementById('bTime').textContent = diff > 0 ? timeStr : '–';
  document.getElementById('bmiResult').style.display = 'block';

  toast('BMI kamu: ' + bmi.toFixed(1));
}
