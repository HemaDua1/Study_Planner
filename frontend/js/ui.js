import { getSubjects, addSubject, deleteSubject } from './subjects.js';
import { handleGenerate, renderScheduleView } from './schedule.js';

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
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('subjectName').value.trim();
    const difficulty = document.getElementById('difficulty').value;
    const weeklyHours = parseInt(document.getElementById('weeklyHours').value, 10);

    if (!name || !weeklyHours || weeklyHours <= 0) {
      showAddMsg('Please enter valid values', true);
      return;
    }

    try {
      await addSubject({ name, difficulty, weeklyHours });
      showAddMsg('Subject added ✔️');
      form.reset();
      renderSubjectsList();
    } catch (error) {
      showAddMsg('Error adding subject', true);
    }
  });
}

function showAddMsg(msg, isError = false) {
  const el = document.getElementById('addMsg');
  el.textContent = msg;
  el.style.color = isError ? 'red' : 'green';
  setTimeout(() => el.textContent = '', 3000);
}

async function renderSubjectsList() {
  const subjects = await getSubjects();
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
    btn.addEventListener('click', async (e) => {
      const id = e.target.dataset.id;
      try {
        await deleteSubject(id);
        renderSubjectsList();
      } catch (error) {
        console.error('Error deleting subject:', error);
      }
    });
  });
}

export async function initializeUI() {
    initTabs();
    initAddForm();
    await renderSubjectsList();
    await renderScheduleView();
    document.getElementById('generateBtn').addEventListener('click', handleGenerate);
}
