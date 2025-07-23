/**
 * ============================================
 * File: ModalContentContainer.js
 * Description: Modal content container for the application
 * Copyright (c) 2025. Jun Dev
 * ============================================
 */

import { t } from '../../i18n/translate.js';
import { actionMode } from '../../data/constants.js';

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
