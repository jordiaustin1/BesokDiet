// ===== GLOBAL STATE =====
let currentUser = null;
let todayLog = null;
let aiLastResult = null;
let TARGET_KCAL = parseInt(localStorage.getItem('bd_target') || '2000');

const TODAY = new Date().toISOString().split('T')[0];
const DAYS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
const MONTHS_ID = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];

function formatDateID(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return `${d.getDate()} ${MONTHS_ID[d.getMonth()]} ${d.getFullYear()}`;
}
function todayFormatted() {
  const d = new Date();
  return `${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS_ID[d.getMonth()]} ${d.getFullYear()}`;
}

async function enterApp() {
  document.getElementById('authScreen').style.display = 'none';
  document.getElementById('app').style.display = 'block';
  document.querySelector('.bottom-nav').classList.add('visible');
  document.getElementById('topDate').textContent = todayFormatted();
  document.getElementById('calDate').textContent = TODAY;
  document.getElementById('profileNameDisp').textContent = currentUser.username;
  document.getElementById('profileInfoDisp').textContent = 'Member BesokDiet';
  TARGET_KCAL = parseInt(localStorage.getItem('bd_target') || '2000');
  document.getElementById('targetInput').value = TARGET_KCAL;
  updateTargetDisplay();
  buildQuickAdd();
  await loadTodayLog();
  await buildStreak();
  const now = new Date();
  document.getElementById('monthPicker').value = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
}

function updateTargetDisplay() {
  const formatted = TARGET_KCAL.toLocaleString('id');
  document.getElementById('targetDisplay').textContent = formatted;
  document.getElementById('statTarget').textContent = formatted;
}

function saveTarget() {
  const val = parseInt(document.getElementById('targetInput').value);
  if (!val || val < 500 || val > 9999) { toast('⚠️ Target harus antara 500–9999 kcal!'); return; }
  TARGET_KCAL = val;
  localStorage.setItem('bd_target', val);
  updateTargetDisplay();
  updateCals();
  toast(`🎯 Target diubah ke ${val.toLocaleString('id')} kcal!`);
}

async function loadTodayLog() {
  const { data } = await sb.from('daily_logs').select('*')
    .eq('user_id', currentUser.id).eq('log_date', TODAY).single();
  if (data) {
    todayLog = data;
    const checks = todayLog.checks || [false,false,false,false];
    document.querySelectorAll('.check-item').forEach((el, i) => {
      if (checks[i]) el.classList.add('done');
    });
    if (todayLog.weight_today) document.getElementById('weightToday').value = todayLog.weight_today;
  } else {
    todayLog = { user_id: currentUser.id, log_date: TODAY, foods: [], checks: [false,false,false,false], weight_today: null };
    await sb.from('daily_logs').insert(todayLog);
  }
  renderFoods(); updateCals(); updateCheckCount();
}

async function saveLog() {
  if (!todayLog) return;
  await sb.from('daily_logs').upsert(
    { ...todayLog, log_date: TODAY, user_id: currentUser.id },
    { onConflict: 'user_id,log_date' }
  );
}

async function toggleCheck(idx, el) {
  el.classList.toggle('done');
  todayLog.checks[idx] = el.classList.contains('done');
  updateCheckCount();
  await saveLog();
  toast(todayLog.checks[idx] ? '✅ Keren! Terus semangat!' : '↩️ Oke, semangat ya!');
}

function updateCheckCount() {
  const done = todayLog?.checks?.filter(Boolean).length || 0;
  document.getElementById('checkCnt').textContent = done + '/4';
  if (done === 4) toast('🏆 Semua checklist selesai!');
}

function buildQuickAdd() {
  document.getElementById('quickGrid').innerHTML = QUICK_FOODS.map(f => `
    <button class="q-btn" onclick="quickAdd('${f.name.replace(/'/g,"\\'")}',${f.kcal})">
      ${f.name} <span class="q-kcal">${f.kcal}</span>
    </button>`).join('');
}

async function addFood() {
  const name = document.getElementById('foodName').value.trim();
  const kcal = parseInt(document.getElementById('foodKcal').value);
  if (!name || isNaN(kcal)) { toast('⚠️ Isi nama & kalori!'); return; }
  todayLog.foods.push({ name, kcal });
  document.getElementById('foodName').value = '';
  document.getElementById('foodKcal').value = '';
  await saveLog(); renderFoods(); updateCals();
  toast(`🍽️ ${name} (${kcal} kcal) dicatat!`);
}

async function quickAdd(name, kcal) {
  todayLog.foods.push({ name, kcal });
  await saveLog(); renderFoods(); updateCals();
  toast(`✅ ${name} ditambahkan!`);
}

async function deleteFood(i) {
  todayLog.foods.splice(i, 1);
  await saveLog(); renderFoods(); updateCals();
}

function renderFoods() {
  const list = document.getElementById('foodList');
  if (!todayLog?.foods?.length) {
    list.innerHTML = '<li class="empty-state">Belum ada makanan hari ini <i class="bi bi-egg-fried"></i></li>';
    return;
  }
  list.innerHTML = todayLog.foods.map((f, i) => `
    <li class="food-item">
      <span class="food-name">${f.name}</span>
      <span class="food-kcal">${f.kcal} kcal</span>
      <button class="food-del" onclick="deleteFood(${i})"><i class="bi bi-x"></i></button>
    </li>`).join('');
}

function updateCals() {
  const total = (todayLog?.foods || []).reduce((s, f) => s + f.kcal, 0);
  const rem = Math.max(0, TARGET_KCAL - total);
  const pct = Math.min(100, (total / TARGET_KCAL) * 100);
  const color = pct > 100 ? 'var(--red)' : pct > 80 ? 'var(--orange)' : 'var(--accent)';
  document.getElementById('ringNum').textContent = total.toLocaleString('id');
  document.getElementById('statCons').textContent = total.toLocaleString('id') + ' kcal';
  document.getElementById('statRem').textContent = rem.toLocaleString('id') + ' kcal';
  document.getElementById('statRem').style.color = rem > 0 ? 'var(--accent)' : 'var(--red)';
  document.getElementById('ring1').style.strokeDashoffset = 264 - (pct / 100) * 264;
  document.getElementById('ring1').style.stroke = color;
  document.getElementById('calProg').style.width = pct + '%';
  document.getElementById('calProg').style.background = color;
}

function searchFood() {
  const q = document.getElementById('aiSearch').value.trim();
  if (!q) { toast('⚠️ Ketik nama makanan dulu!'); return; }
  const result = searchFoodDB(q);
  aiLastResult = result;
  document.getElementById('aiName').textContent = result.name;
  document.getElementById('aiKcalEst').textContent = result.kcal;
  document.getElementById('aiSub').textContent = result.fromDB
    ? `📦 Dari database · ${result.total} hasil ditemukan`
    : '⚠️ Estimasi — tidak ada di database. Edit kcal jika perlu.';
  document.getElementById('aiResult').style.display = 'block';
}

async function addFromAI() {
  if (!aiLastResult) return;
  todayLog.foods.push({ name: aiLastResult.name, kcal: aiLastResult.kcal });
  await saveLog(); renderFoods(); updateCals();
  document.getElementById('aiResult').style.display = 'none';
  document.getElementById('aiSearch').value = '';
  toast(`✅ ${aiLastResult.name} ditambahkan!`);
}

async function saveWeight() {
  const w = parseFloat(document.getElementById('weightToday').value);
  if (!w) { toast('⚠️ Masukkan berat badan!'); return; }
  todayLog.weight_today = w;
  await saveLog();
  toast(`⚖️ Berat ${w} kg disimpan!`);
}

async function buildStreak() {
  const dates = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    dates.push(d.toISOString().split('T')[0]);
  }
  const { data } = await sb.from('daily_logs').select('log_date,checks')
    .eq('user_id', currentUser.id).in('log_date', dates);
  const logMap = {}; (data || []).forEach(l => logMap[l.log_date] = l);
  document.getElementById('streakGrid').innerHTML = dates.map(date => {
    const log = logMap[date];
    const done = (log?.checks || []).filter(Boolean).length >= 2;
    const isToday = date === TODAY;
    const d = new Date(date + 'T00:00:00');
    return `<div class="s-dot ${done?'done':''} ${isToday&&!done?'today':''}">
      <span class="s-day">${DAYS[d.getDay()]}</span>
      <span class="s-date">${d.getDate()}</span>
    </div>`;
  }).join('');
}

function switchTab(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById('sec-' + id).classList.add('active');
  document.querySelectorAll('.bnav-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === id));
  if (id === 'history') loadHistory();
  if (id === 'monthly') loadMonthly();
}

function openProfile() { document.getElementById('profileMenu').classList.add('open'); }
function closeProfile(e) {
  if (!e || e.target === document.getElementById('profileMenu'))
    document.getElementById('profileMenu').classList.remove('open');
}

function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove('show'), 2400);
}