import { getSubjects, saveSubjects } from './subjects.js';
import { handleGenerate } from './schedule.js';

function initTabs() {
  document.querySelectorAll('.tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const t = btn.dataset.tab;
      document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
      document.getElementById(t).classList.add('active');
    });
  });
}

function initAddForm() {
  const form = document.getElementById('addForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('subjectName').value.trim();
    const difficulty = document.getElementById('difficulty').value;
    const weeklyHours = parseInt(document.getElementById('weeklyHours').value, 10);

    if (!name || !weeklyHours || weeklyHours <= 0) {
      showAddMsg('Please enter valid values', true);
      return;
    }

    const subjects = getSubjects();
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    subjects.push({ id, name, difficulty, weeklyHours });
    saveSubjects(subjects);
    showAddMsg('Subject added ✔️');
    form.reset();
    renderSubjectsList();
  });
}

function showAddMsg(msg, isError = false) {
  const el = document.getElementById('addMsg');
  el.textContent = msg;
  el.style.color = isError ? 'red' : 'green';
  setTimeout(() => el.textContent = '', 3000);
}

function renderSubjectsList() {
  const subjects = getSubjects();
  const listEl = document.getElementById('subjectsList');
  listEl.innerHTML = '';
  if (subjects.length === 0) {
    listEl.innerHTML = '<p>No subjects added yet.</p>';
    return;
  }
  subjects.forEach(s => {
    const el = document.createElement('div');
    el.className = 'subject-item';
    el.innerHTML = `
      <span>${s.name} (${s.difficulty}, ${s.weeklyHours}h/w)</span>
      <button data-id="${s.id}" class="delete-btn">Delete</button>
    `;
    listEl.appendChild(el);
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      let subjects = getSubjects();
      subjects = subjects.filter(s => s.id !== id);
      saveSubjects(subjects);
      renderSubjectsList();
    });
  });
}

function renderScheduleView() {
    // Implementation for renderScheduleView
}

export function initializeUI() {
    initTabs();
    initAddForm();
    renderSubjectsList();
    renderScheduleView();
    document.getElementById('generateBtn').addEventListener('click', handleGenerate);
}
