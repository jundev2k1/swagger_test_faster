// ============================================
// File: ModalContentContainer.js
// Description: Modal content container for the application
// Copyright (c) 2025. Jun Dev
// ============================================

import { t } from '../../i18n/translate.js';
import { actionMode, ApiSettingMode, HttpMethods } from '../../data/constants.js';

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
          <div class="api-list-filter mb-3 grid-4 gap-1">
            <input class="form-input span-4" placeholder="${t('modal.api-list.filter.search')}">
            <select class="form-select">
              <option value="all">${t('modal.api-list.filter-all')}</option>
              ${Object.entries(ApiSettingMode).map(([key]) => `
                <option value="${key}">${t(`modal.api-list.filter.mode-${key.toLowerCase()}`)}</option>
              `).join('')}
            </select>
            <select class="form-select">
              <option value="all">${t('modal.api-list.filter.method')}</option>
              ${Object.entries(HttpMethods).map(([key, value]) => `
                <option value="${value}">${key}</option>
              `).join('')}
            </select>
            <select class="form-select">
              <option value="">${t('modal.api-list.order-by')}</option>
              <option value="name">${t('modal.api-list.order-by.name')}</option>
              <option value="endpoint">${t('modal.api-list.order-by.endpoint')}</option>
              <option value="priority">${t('modal.api-list.order-by.priority')}</option>
              <option value="color">${t('modal.api-list.order-by.color')}</option>
              <option value="mode">${t('modal.api-list.order-by.mode')}</option>
              <option value="method">${t('modal.api-list.order-by.method')}</option>
              <option value="createdAt">${t('modal.api-list.order.by-created')}</option>
              <option value="updatedAt">${t('modal.api-list.order.by-updated')}</option>
            </select>
            <select class="form-select">
              <option value="asc">${t('modal.api-list.order-by.asc')}</option>
              <option value="desc">${t('modal.api-list.order-by.desc')}</option>
            </select>
          </div>
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
