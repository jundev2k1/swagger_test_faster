// ============================================
// File: ModalContentContainer.js
// Description: Modal content container for the application
// Copyright (c) 2025. Jun Dev
// ============================================

import { t } from '../../i18n/translate.js';
import { actionMode, ApiSettingMode, HttpMethods } from '../../data/constants.js';
import { Store } from '../../data/store.js';
import { escapeHTML } from '../../utils/helpers.js';

/**
 * Render the modal content container based on the current action mode.
 * 
 * @param {ActionMode} [action] - The current action mode of the application.
 * @param {string} [innerHTML] - The HTML content to be inserted within the container.
 * @returns {string} The HTML of the modal content container specific to the given action mode.
 */
const ModalContentContainer = (action = actionMode.LOBBY, innerHTML = '') => {
  const getSortOptions = () => {
    const selectedField = Store.apiListFilter.sort;
    const sortFields = ['name', 'endpoint', 'priority', 'color', 'mode', 'method', 'createdAt', 'updatedAt'];
    return sortFields.map((field) => `
        <option value="${field}" ${selectedField === field ? 'selected' : ''}>
          ${t(`modal.api-list.order-by.${field}`)}
        </option>
      `).join('');
  }
  const getSortDirectionOptions = () => {
    const selectedDirection = Store.apiListFilter.sortDirection;
    const sortDirections = ['asc', 'desc'];
    return sortDirections.map((direction) => `
        <option value="${direction}" ${selectedDirection === direction ? 'selected' : ''}>
          ${t(`modal.api-list.order-by.${direction}`)}
        </option>
      `).join('');
  }
  switch (action) {
    case actionMode.API_LIST:
      return `
        <div id="api-list-layout">
          <div class="api-list-filter mb-3 grid-4 gap-1">
            <input id="api-list-filter-search" class="form-input span-4" value="${escapeHTML(Store.apiListFilter.search)}" placeholder="${t('modal.api-list.filter.search')}">
            <select id="api-list-filter-mode" class="form-select">
              <option value="">${t('modal.api-list.filter-all')}</option>
              ${Object.entries(ApiSettingMode).map(([key, value]) => `
                <option value="${value}" ${value === Store.apiListFilter.mode ? 'selected' : ''}>
                  ${t(`modal.api-list.filter.mode-${key.toLowerCase()}`)}
                </option>
              `).join('')}
            </select>
            <select id="api-list-filter-method" class="form-select">
              <option value="">${t('modal.api-list.filter.method')}</option>
              ${Object.entries(HttpMethods).map(([key, value]) => `
                <option value="${value}" ${value === Store.apiListFilter.method ? 'selected' : ''}>${key}</option>
              `).join('')}
            </select>
            <select id="api-list-order-by-key" class="form-select">
              ${getSortOptions()}
            </select>
            <select id="api-list-order-by-direction" class="form-select">
              ${getSortDirectionOptions()}
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
