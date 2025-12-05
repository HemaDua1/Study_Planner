import { loadData, saveData } from './storage.js';

const SUBJECTS_KEY = 'subjects';

function getSubjects() {
  const s = loadData(SUBJECTS_KEY);
  return s || [];
}

function saveSubjects(subjects) {
  saveData(SUBJECTS_KEY, subjects);
}

export { getSubjects, saveSubjects };
