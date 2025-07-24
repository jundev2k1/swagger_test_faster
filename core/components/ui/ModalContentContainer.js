 // ============================================
 // File: ModalContentContainer.js
 // Description: Modal content container for the application
 // Copyright (c) 2025. Jun Dev
 // ============================================

import { t } from '../../i18n/translate.js';
import { actionMode } from '../../data/constants.js';

/**
 * Render the modal content container based on the current action mode.
 * 
 * @param {ActionMode} [action] - The current action mode of the application.
 * @param {string} [innerHTML] - The HTML content to be inserted within the container.
 * @returns {string} The HTML of the modal content container specific to the given action mode.
 */
const ModalContentContainer = (action = actionMode.LOBBY, innerHTML = '') => {
  switch (action) {
    case actionMode.API_LIST:
      return `
        <div id="api-list-layout">
          <ul class="api-list">${innerHTML}</ul>
          <button class="btn-control light" id="btn-add-new-api">${t('modal.api-list.add-new')}</button>
        </div>
      `;

    case actionMode.API_SETTING:
      return `<div id="api-setting-layout">${innerHTML}</div>`;

    case actionMode.ENVIRONMENT_SETTINGS:
      return `<div id="enviroment-setting-layout">${innerHTML}</div>`;

    case actionMode.ENVIRONMENT_VARIABLES:
      return `<div id="enviroment-setting-layout">${innerHTML}</div>`;

    // Clear content
    default:
      return '';
  }
}

export default ModalContentContainer;
