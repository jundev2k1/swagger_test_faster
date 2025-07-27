// =============================
// File: ModalApiListItem.js (modalApiListItem.js)
// Type UI: Modal UI (list)
// Description: Render API list UI
// Copyright (c) 2025. Jun Dev
// =============================

import { t } from '../../i18n/translate.js';
import { escapeHTML, tryGetUrlPath } from '../../utils/helpers.js';
import { HttpMethods, MethodColors } from '../../data/constants.js';
import { Store } from '../../data/store.js';

/**
 * Sort API list
 * @param {ApiSetting[]} apiList - API list
 * @param {string} orderByField - Sort field
 * @param {'asc' | 'desc'} direction - Direction (default: asc)
 * @returns {ApiSetting[]} Sorted API list
 */
function sortApiList(apiList, orderByField = 'createdAt', direction = 'desc') {
  if (!orderByField) return apiList;

  const multiplier = direction === 'desc' ? -1 : 1;

  return [...apiList].sort((a, b) => {
    const aVal = a[orderByField];
    const bVal = b[orderByField];

    if (aVal == null) return 1 * multiplier;
    if (bVal == null) return -1 * multiplier;

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return (aVal - bVal) * multiplier;
    }

    if (isDateField(orderByField)) {
      return (new Date(aVal) - new Date(bVal)) * multiplier;
    }

    return aVal.toString().localeCompare(bVal.toString(), undefined, { sensitivity: 'base' }) * multiplier;
  });
}

/**
 * Check if the field is a date field
 * @param {string} field - Field
 * @returns {boolean} True if the field is a date field
 */
function isDateField(field) {
  return ['createdAt', 'updatedAt'].includes(field);
}

/**
 * Get API items by filter
 * @param { ApiSetting[] } [dataSource] An array of objects that contain the information of the API items
 * @returns {ApiSetting[]} An array of objects that contain the information of the API items
 */
const getsByFilter = (dataSource) => {
  const filter = {...Store.apiListFilter};
  const filteredDataSource = dataSource
    .filter(s =>
      (s.name.toLowerCase().includes(filter.search.toLowerCase())
        || s.endpoint.toLowerCase().startsWith(filter.search.toLowerCase())
        || s.desc.toLowerCase().includes(filter.search.toLowerCase()))
      && (filter.mode === '' || s.mode === filter.mode)
      && (filter.method === '' || s.method === filter.method));
  return sortApiList(filteredDataSource, filter.sort, filter.sortDirection);
};

/**
 * Render API list UI
 * @param { ApiSetting[] } [datasource] An array of objects that contain the information of the API items
 * @returns {string} The HTML of the API list UI
 */
const ModalApiListItem = (datasource = []) => {
  const filteredDataSource = getsByFilter(datasource);
  return filteredDataSource.map(({ id, name, mode, method, endpoint, color, desc }) => `
    <li class="api-list-item bg-${color || 'primary'} bg-${color || 'primary'}-hover">
      <div class="api-setting-icon">
        <span class="api-setting-mode">${t(`modal.api-list-item.mode.${mode}`) || mode}</span>
      </div>
      <div class="api-setting-content">
        <a href="javascript:void" data-api-id="${id}">
          <span class="api-method badge ${MethodColors[method] || MethodColors[HttpMethods.GET]}">${method}</span>
          <span class="api-item-title">${name}</span>
        </a>
        <p class="api-item-endpoint truncate" title=${escapeHTML(endpoint)}>${t('modal.api-list-item.endpoint-to')}: ${escapeHTML(tryGetUrlPath(endpoint))}</p>
        <span class="api-item-desc">
          ${escapeHTML(desc || '')}
        </span>
      </div>
      <button class="btn-control icon-badge info font-xs" data-action="copy-insert-api" title="${t('tooltip.copy-insert')}">💾</button>
      <button class="btn-control icon-badge dark font-xs" data-action="delete-api" title="${t('tooltip.delete')}">🗑️</button>
    </li>
  `).join('') || '';
};

export default ModalApiListItem;