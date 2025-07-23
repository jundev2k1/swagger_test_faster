/**
 * ============================================
 * File: TabSettings.js
 * Description: Tab settings for the application
 * Copyright (c) 2025. Jun Dev
 * ============================================
 */

import { t } from '../utils/translate.js';
import { actionMode } from '../../data/constants.js';

/**
 * Tab settings for the application
 * @param {actionMode} action - The current action
 * @returns {string} The tab setting HTML
 */
const TabSettings = (action = actionMode.LOBBY) => {
  const isApiSetting = action === actionMode.API_SETTING
    || action === actionMode.API_LIST;
  const isEnvSetting = action === actionMode.ENVIRONMENT_SETTINGS
    || action === actionMode.ENVIRONMENT_VARIABLES;

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
