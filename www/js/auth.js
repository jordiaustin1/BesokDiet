// ===== AUTH =====
const SESSION_KEY = 'bd_session';
const SESSION_TTL = 48 * 60 * 60 * 1000; // 48 jam

function saveSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ id: user.id, ts: Date.now() }));
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

function getSession() {
  try {
    const s = JSON.parse(localStorage.getItem(SESSION_KEY));
    if (!s) return null;
    if (Date.now() - s.ts > SESSION_TTL) { clearSession(); return null; }
    return s;
  } catch { return null; }
}

function switchAuth(mode) {
  document.getElementById('loginForm').style.display = mode === 'login' ? 'block' : 'none';
  document.getElementById('registerForm').style.display = mode === 'register' ? 'block' : 'none';
  document.querySelectorAll('.auth-tab').forEach((t, i) =>
    t.classList.toggle('active', (mode === 'login' && i === 0) || (mode === 'register' && i === 1))
  );
  document.getElementById('authErr').textContent = '';
}

async function doLogin() {
  const u = document.getElementById('loginUser').value.trim();
  const p = document.getElementById('loginPass').value;
  if (!u || !p) { setAuthErr('Isi semua field!'); return; }
  setLoading('loginBtn', true);
  const { data, error } = await sb.from('profiles').select('*').eq('username', u).single();
  if (error || !data) { setAuthErr('Username tidak ditemukan'); setLoading('loginBtn', false); return; }
  if (data.password !== btoa(p)) { setAuthErr('Password salah'); setLoading('loginBtn', false); return; }
  currentUser = data;
  setLoading('loginBtn', false);
  saveSession(currentUser);
  enterApp();
}

async function doRegister() {
  const u = document.getElementById('regUser').value.trim();
  const p = document.getElementById('regPass').value;
  if (!u || !p) { setAuthErr('Isi semua field!'); return; }
  if (p.length < 6) { setAuthErr('Password min 6 karakter'); return; }
  setLoading('regBtn', true);
  const { error } = await sb.from('profiles').insert({ username: u, password: btoa(p) });
  if (error) { setAuthErr(error.code === '23505' ? 'Username sudah dipakai!' : 'Error: ' + error.message); setLoading('regBtn', false); return; }
  const { data } = await sb.from('profiles').select('*').eq('username', u).single();
  currentUser = data;
  setLoading('regBtn', false);
  saveSession(currentUser);
  enterApp();
}

async function doLogout() {
  clearSession();
  currentUser = null;
  todayLog = null;
  document.getElementById('app').style.display = 'none';
  document.getElementById('authScreen').style.display = 'flex';
  document.querySelector('.bottom-nav').classList.remove('visible'); 
  closeProfile();
  toast('Sampai jumpa! 👋');
}

function setAuthErr(msg) { document.getElementById('authErr').textContent = msg; }

function setLoading(id, on) {
  const b = document.getElementById(id);
  b.disabled = on;
  b.textContent = on ? '⏳ Loading...' : (id === 'loginBtn' ? 'Masuk →' : 'Daftar Sekarang →');
}

// Auto-login on page load
(async () => {
  const s = getSession();
  if (s) {
    const { data } = await sb.from('profiles').select('*').eq('id', s.id).single();
    if (data) { currentUser = data; enterApp(); return; }
    clearSession();
  }
})();
