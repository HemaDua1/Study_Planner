import { getSubjects } from './subjects.js';
import { saveData, loadData } from './storage.js';

const SCHEDULE_KEY = 'schedule';

export function handleGenerate() {
  const subjects = getSubjects();
  if (subjects.length === 0) {
    alert('Please add subjects first!');
    return;
  }

  const schedule = generateSchedule(subjects);
  saveData(SCHEDULE_KEY, schedule);
  renderSchedule(schedule);
}

function generateSchedule(subjects) {
    const schedule = {};
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    days.forEach(day => {
        schedule[day] = [];
    });

    subjects.forEach(subject => {
        let hours = subject.weeklyHours;
        while (hours > 0) {
            const day = days[Math.floor(Math.random() * days.length)];
            schedule[day].push(subject.name);
            hours--;
        }
    });
    return schedule;
}

function renderSchedule(schedule) {
  const scheduleEl = document.getElementById('scheduleView');
  scheduleEl.innerHTML = '';
  for (const day in schedule) {
    const dayEl = document.createElement('div');
    dayEl.className = 'day-row';
    dayEl.innerHTML = `<div class="day-title">${day}</div>`;
    const subjectsEl = document.createElement('div');
    subjectsEl.className = 'sessions-container';

    if (schedule[day].length === 0) {
      const sessionEl = document.createElement('div');
      sessionEl.className = 'session';
      sessionEl.textContent = 'Rest Day';
      subjectsEl.appendChild(sessionEl);
    } else {
      const dailySummary = {};
      schedule[day].forEach(subjectName => {
        dailySummary[subjectName] = (dailySummary[subjectName] || 0) + 1;
      });

      for (const subjectName in dailySummary) {
        const hours = dailySummary[subjectName];
        const sessionEl = document.createElement('div');
        sessionEl.className = 'session';
        sessionEl.innerHTML = `
          <div class="session-subject">${subjectName}</div>
          <div class="session-time">${hours} hour${hours > 1 ? 's' : ''}</div>
        `;
        subjectsEl.appendChild(sessionEl);
      }
    }
    dayEl.appendChild(subjectsEl);
    scheduleEl.appendChild(dayEl);
  }
}

export function renderScheduleView() {
    const schedule = loadData(SCHEDULE_KEY);
    if (schedule) {
        renderSchedule(schedule);
    }
}
