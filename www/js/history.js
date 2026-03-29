// ===== HISTORY =====
async function loadHistory() {
  const { data } = await sb.from('daily_logs')
    .select('*')
    .eq('user_id', currentUser.id)
    .order('log_date', { ascending: false })
    .limit(30);

  const list = document.getElementById('histList');
  if (!data || data.length === 0) {
    list.innerHTML = '<div class="empty-state">Belum ada history 📅</div>';
    return;
  }

  list.innerHTML = data.map((log, i) => {
    const total = (log.foods || []).reduce((s, f) => s + f.kcal, 0);
    const checks = log.checks || [];
    const icons = ['🥗', '🏃', '🚫', '🍬'];
    return `
      <div class="hist-day" onclick="toggleHistDetail(${i})">
        <div class="hist-header">
          <span class="hist-date">${formatDateID(log.log_date)}</span>
          <span class="hist-kcal">${total.toLocaleString('id')} kcal</span>
        </div>
        <div class="hist-checks">
          ${checks.map((c, j) => `<span class="hist-check" style="opacity:${c ? 1 : 0.25}">${icons[j]}</span>`).join('')}
          ${log.weight_today ? `<span style="font-size:12px;color:var(--blue);margin-left:auto;font-family:'DM Mono',monospace">⚖️ ${log.weight_today}kg</span>` : ''}
        </div>
        <div class="hist-detail" id="hd-${i}">
          ${(log.foods || []).length === 0
            ? '<div style="font-size:12px;color:var(--muted)">Tidak ada makanan dicatat</div>'
            : (log.foods || []).map(f => `
                <div class="hist-food-item">
                  <span>${f.name}</span>
                  <span style="color:var(--orange);font-family:'DM Mono',monospace">${f.kcal} kcal</span>
                </div>`).join('')}
        </div>
      </div>`;
  }).join('');
}

function toggleHistDetail(i) {
  const el = document.getElementById('hd-' + i);
  el.style.display = el.style.display === 'block' ? 'none' : 'block';
}

// ===== MONTHLY SUMMARY =====
async function loadMonthly() {
  const val = document.getElementById('monthPicker').value;
  if (!val) return;
  const [yr, mo] = val.split('-');
  const start = `${yr}-${mo}-01`;
  const end = `${yr}-${mo}-${new Date(yr, mo, 0).getDate()}`;

  const { data } = await sb.from('daily_logs')
    .select('*')
    .eq('user_id', currentUser.id)
    .gte('log_date', start)
    .lte('log_date', end)
    .order('log_date');

  const container = document.getElementById('monthlyContent');
  if (!data || data.length === 0) {
    container.innerHTML = '<div class="empty-state">Belum ada data bulan ini 📈</div>';
    return;
  }

  const TARGET = 2000;
  const totalDays = data.length;
  const daysUnder = data.filter(l => (l.foods || []).reduce((s, f) => s + f.kcal, 0) < TARGET).length;
  const daysEx = data.filter(l => (l.checks || [])[1]).length;
  const daysSnack = data.filter(l => (l.checks || [])[2]).length;
  const daysSweet = data.filter(l => (l.checks || [])[3]).length;
  const avgKcal = Math.round(data.reduce((s, l) => (l.foods || []).reduce((a, f) => a + f.kcal, 0) + s, 0) / totalDays);
  const weights = data.filter(l => l.weight_today).map(l => ({ date: l.log_date, w: l.weight_today }));
  const firstW = weights[0]?.w;
  const lastW = weights[weights.length - 1]?.w;
  const weightChange = firstW && lastW ? (lastW - firstW).toFixed(1) : null;
  const monthName = MONTHS_ID[parseInt(mo) - 1] + ' ' + yr;

  container.innerHTML = `
    <div class="month-card">
      <div style="font-size:16px;font-weight:800;margin-bottom:14px">Summary ${monthName}</div>
      <div class="month-stat"><span class="month-stat-lbl">Hari tercatat</span><span class="month-stat-val" style="color:var(--blue)">${totalDays} hari</span></div>
      <div class="month-stat"><span class="month-stat-lbl">Hari kalori aman (&lt;2000)</span><span class="month-stat-val" style="color:var(--green)">${daysUnder} hari</span></div>
      <div class="month-stat"><span class="month-stat-lbl">Rata-rata kalori/hari</span><span class="month-stat-val" style="color:var(--orange)">${avgKcal.toLocaleString('id')} kcal</span></div>
      <div class="month-stat"><span class="month-stat-lbl">Hari olahraga</span><span class="month-stat-val" style="color:var(--green)">${daysEx} / ${totalDays} hari</span></div>
      <div class="month-stat"><span class="month-stat-lbl">Hari tanpa ngemil</span><span class="month-stat-val" style="color:var(--green)">${daysSnack} / ${totalDays} hari</span></div>
      <div class="month-stat"><span class="month-stat-lbl">Hari tanpa manis</span><span class="month-stat-val" style="color:var(--green)">${daysSweet} / ${totalDays} hari</span></div>
      ${weightChange !== null ? `
        <div class="month-stat">
          <span class="month-stat-lbl">Perubahan berat</span>
          <span class="month-stat-val" style="color:${parseFloat(weightChange) < 0 ? 'var(--green)' : 'var(--red)'}">
            ${parseFloat(weightChange) < 0 ? '' : '+'} ${weightChange} kg
          </span>
        </div>
        <div class="month-stat">
          <span class="month-stat-lbl">${firstW} kg → ${lastW} kg</span>
          <span class="month-stat-val" style="color:var(--muted)">Progress</span>
        </div>` : ''}
    </div>
    <button class="dl-btn" onclick="downloadSummary('${monthName}',${totalDays},${daysUnder},${daysEx},${daysSnack},${daysSweet},${avgKcal},'${weightChange}','${firstW}','${lastW}')">
      Download Summary
    </button>`;
}

function downloadSummary(monthName, totalDays, daysUnder, daysEx, daysSnack, daysSweet, avgKcal, wChange, firstW, lastW) {
  const lines = [
    `====================================`,
    `   BESOKDIET — MONTHLY SUMMARY`,
    `   ${monthName}`,
    `   User: ${currentUser.username}`,
    `====================================`,
    ``,
    `📅 STATISTIK BULAN INI`,
    `Hari tercatat       : ${totalDays} hari`,
    `Kalori aman (<2000) : ${daysUnder} hari`,
    `Rata-rata kalori    : ${avgKcal.toLocaleString('id')} kcal/hari`,
    ``,
    `✅ CHECKLIST ACHIEVEMENT`,
    `Hari olahraga       : ${daysEx} / ${totalDays} hari`,
    `Hari tanpa ngemil   : ${daysSnack} / ${totalDays} hari`,
    `Hari tanpa manis    : ${daysSweet} / ${totalDays} hari`,
    ``,
    `⚖️ PROGRESS BERAT BADAN`,
    firstW !== 'undefined' ? `Berat awal bulan    : ${firstW} kg` : 'Tidak ada data berat',
    lastW !== 'undefined' ? `Berat akhir bulan   : ${lastW} kg` : '',
    wChange !== 'null' ? `Perubahan           : ${parseFloat(wChange) < 0 ? '' : '+'} ${wChange} kg ${parseFloat(wChange) < 0 ? '🎉 Turun!' : '📈 Naik'}` : '',
    ``,
    `====================================`,
    `Keep it up! Consistency is key 💪`,
    `Generated by BesokDiet`,
    `====================================`,
  ].join('\n');

  const blob = new Blob([lines], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `BesokDiet_Summary_${monthName.replace(' ', '_')}.txt`;
  a.click();
  toast('Summary didownload!');
}
