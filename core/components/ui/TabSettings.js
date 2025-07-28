 // ============================================
 // File: TabSettings.js
 // Description: Tab settings for the application
 // Copyright (c) 2025. Jun Dev
 // ============================================

import { t } from '../../i18n/translate.js';
import { actionMode } from '../../data/constants.js';

/**
 * Tab settings for the application
 * @param {ActionMode} action - The current action
 * @returns {string} The tab setting HTML
 */
const TabSettings = (action = actionMode.SIDEBAR_API) => {
  const isApiSetting = action === actionMode.MODAL_API_SETTING
    || action === actionMode.MODAL_API_LIST;
  const isEnvSetting = action === actionMode.MODAL_ENVIRONMENT_SETTINGS
    || action === actionMode.MODAL_ENVIRONMENT_VARIABLES;

  return `
    <button class="tab-button ${isApiSetting ? 'active' : ''}" data-modal-tab="api">
      ${t('modal.tab.api')}
    </button>
    <button class="tab-button ${isEnvSetting ? 'active' : ''}" data-modal-tab="environment">
      ${t('modal.tab.env')}
    </button>
  `;
}

export default TabSettings;
