// ===== EXERCISE (manual input) =====
function renderExercises() {
  if (!todayLog) return;
  const exercises = todayLog.exercises || [];
  const total = exercises.reduce((s, e) => s + e.kcal, 0);

  document.getElementById('exBurnTotal').textContent = total.toLocaleString('id');

  const list = document.getElementById('exList');
  if (!exercises.length) {
    list.innerHTML = '<li class="empty-state">Belum ada olahraga hari ini <i class="bi bi-person-walking"></i></li>';
    return;
  }
  list.innerHTML = exercises.map((e, i) => `
    <li class="food-item">
      <span class="food-name">🏃 ${e.name}</span>
      <span class="food-kcal" style="color:var(--blue)">-${e.kcal} kcal</span>
      <button class="food-del" onclick="deleteExercise(${i})"><i class="bi bi-x"></i></button>
    </li>`).join('');
}

async function addExercise() {
  const name = document.getElementById('exName').value.trim();
  const kcal = parseInt(document.getElementById('exKcal').value);
  if (!name || isNaN(kcal) || kcal < 1) { toast('⚠️ Isi nama olahraga & kalori!'); return; }
  todayLog.exercises = todayLog.exercises || [];
  todayLog.exercises.push({ name, kcal });
  document.getElementById('exName').value = '';
  document.getElementById('exKcal').value = '';
  await saveLog();
  renderExercises();
  updateCals();
  toast(`🔥 ${name} (${kcal} kcal) dicatat!`);
}

async function deleteExercise(i) {
  todayLog.exercises = todayLog.exercises || [];
  todayLog.exercises.splice(i, 1);
  await saveLog();
  renderExercises();
  updateCals();
}

function buildQuickExercise() {} // tidak dipakai