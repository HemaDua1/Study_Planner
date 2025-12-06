/**
 * Handles schedule generation and display.
 * Communicates with the backend API to save schedules.
 */

import { getSubjects } from './subjects.js';

const API_URL = 'http://localhost:3001/api';

/**
 * Generates and saves a new weekly schedule based on subjects.
 */
export async function handleGenerate() {
  try {
    const subjects = await getSubjects();
    if (subjects.length === 0) {
      alert('Please add subjects first!');
      return;
    }

    const schedule = generateSchedule(subjects);
    
    // Save schedule to backend
    const response = await fetch(`${API_URL}/schedule`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ schedule })
    });
    
    if (response.ok) {
      renderSchedule(schedule);
    }
  } catch (error) {
    console.error('Error generating schedule:', error);
    alert('Error generating schedule');
  }
}

/**
 * Generates a weekly schedule based on subject hours.
 * @param {Array} subjects - The list of subjects to schedule.
 * @returns {Object} - A schedule object with days as keys.
 */
function generateSchedule(subjects) {
    const schedule = {};
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
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

/**
 * Renders the schedule on the page.
 * @param {Object} schedule - The schedule object to render.
 */
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

/**
 * Renders the saved schedule from the backend.
 */
export async function renderScheduleView() {
  try {
    const response = await fetch(`${API_URL}/schedule`);
    const schedule = await response.json();
    if (schedule) {
      renderSchedule(schedule);
    }
  } catch (error) {
    console.error('Error loading schedule:', error);
  }
}
