// ============================================================
// Smart Focus - Firebase REST API Configuration
// ============================================================
// 
// HOW TO SET UP:
// 1. Go to https://console.firebase.google.com/
// 2. Click "Create a project" (or "Add project")
// 3. Name it (e.g. "smart-focus-group")
// 4. Disable Google Analytics (optional) → Create Project
// 5. In the left sidebar, click "Build" → "Realtime Database"
// 6. Click "Create Database"
// 7. Choose a location → Start in TEST MODE → Enable
// 8. Copy the database URL (e.g. https://smart-focus-group-default-rtdb.firebaseio.com)
// 9. Paste it below as FIREBASE_DB_URL
//
// IMPORTANT: For test mode, the database is open for 30 days.
// For production, configure proper security rules.
// ============================================================

const FIREBASE_DB_URL = 'https://smart-focus-group-default-rtdb.asia-southeast1.firebasedatabase.app/';

// ---- Firebase REST API Helper ----
const FirebaseDB = {
  /**
   * Read data from a path
   * @param {string} path - e.g. 'groups/ABC123'
   * @returns {Promise<any>} parsed JSON data or null
   */
  async get(path) {
    try {
      console.log(`[SmartFocus][Firebase] GET ${path}`);
      const res = await fetch(`${FIREBASE_DB_URL}/${path}.json`);
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      const data = await res.json();
      console.log(`[SmartFocus][Firebase] GET ${path} →`, data);
      return data;
    } catch (e) {
      console.error(`[SmartFocus][Firebase] GET ${path} FAILED:`, e);
      return null;
    }
  },

  /**
   * Write (overwrite) data at a path
   * @param {string} path
   * @param {any} data
   * @returns {Promise<any>}
   */
  async set(path, data) {
    try {
      console.log(`[SmartFocus][Firebase] SET ${path}`, data);
      const res = await fetch(`${FIREBASE_DB_URL}/${path}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      const result = await res.json();
      console.log(`[SmartFocus][Firebase] SET ${path} → OK`);
      return result;
    } catch (e) {
      console.error(`[SmartFocus][Firebase] SET ${path} FAILED:`, e);
      return null;
    }
  },

  /**
   * Update (merge) data at a path
   * @param {string} path
   * @param {object} data
   * @returns {Promise<any>}
   */
  async update(path, data) {
    try {
      console.log(`[SmartFocus][Firebase] UPDATE ${path}`, data);
      const res = await fetch(`${FIREBASE_DB_URL}/${path}.json`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      const result = await res.json();
      console.log(`[SmartFocus][Firebase] UPDATE ${path} → OK`);
      return result;
    } catch (e) {
      console.error(`[SmartFocus][Firebase] UPDATE ${path} FAILED:`, e);
      return null;
    }
  },

  /**
   * Delete data at a path
   * @param {string} path
   * @returns {Promise<boolean>}
   */
  async remove(path) {
    try {
      console.log(`[SmartFocus][Firebase] DELETE ${path}`);
      const res = await fetch(`${FIREBASE_DB_URL}/${path}.json`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      console.log(`[SmartFocus][Firebase] DELETE ${path} → OK`);
      return true;
    } catch (e) {
      console.error(`[SmartFocus][Firebase] DELETE ${path} FAILED:`, e);
      return false;
    }
  },

  /**
   * Check if Firebase is configured (not using placeholder URL)
   */
  isConfigured() {
    return FIREBASE_DB_URL && !FIREBASE_DB_URL.includes('YOUR-PROJECT-ID');
  },
};
