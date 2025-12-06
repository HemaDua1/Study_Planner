/**
 * Manages the subjects' data by communicating with the backend API.
 */

const API_URL = 'http://localhost:3001/api';

/**
 * Retrieves the list of subjects from the backend.
 * @returns {Promise<Array>} - An array of subject objects.
 */
async function getSubjects() {
  try {
    const response = await fetch(`${API_URL}/subjects`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching subjects:', error);
    return [];
  }
}

/**
 * Adds a new subject to the backend.
 * @param {Object} subject - The subject object to add.
 * @returns {Promise<Object>} - The created subject with ID.
 */
async function addSubject(subject) {
  try {
    const response = await fetch(`${API_URL}/subjects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subject)
    });
    return await response.json();
  } catch (error) {
    console.error('Error adding subject:', error);
    throw error;
  }
}

/**
 * Deletes a subject from the backend.
 * @param {string} id - The ID of the subject to delete.
 * @returns {Promise<Object>} - Success response.
 */
async function deleteSubject(id) {
  try {
    const response = await fetch(`${API_URL}/subjects/${id}`, {
      method: 'DELETE'
    });
    return await response.json();
  } catch (error) {
    console.error('Error deleting subject:', error);
    throw error;
  }
}

/**
 * Saves the entire subjects list to the backend.
 * @param {Array} subjects - The array of subject objects to save.
 */
async function saveSubjects(subjects) {
  // This is no longer needed since we're using individual add/delete endpoints
  console.log('Subjects updated on backend');
}

export { getSubjects, addSubject, deleteSubject, saveSubjects };
