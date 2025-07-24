// =============================
// File: ModalApiListItem.js (modalApiListItem.js)
// Type UI: Modal UI (list)
// Description: Render API list UI
// Copyright (c) 2025. Jun Dev
// =============================

import { t } from '../../i18n/translate.js';
import { tryGetUrlPath } from '../../utils/helpers.js';
import { HttpMethods, MethodColors } from '../../data/constants.js';

const ModalApiListItem = (datasource = []) => {
  return datasource.map(({ id, name, method, endpoint, color, desc }) => `
    <li class="api-list-item bg-${color || 'primary'} bg-${color || 'primary'}-hover">
      <div class="api-setting-content">
        <a href="javascript:void" data-api-id="${id}">
          <span class="api-method badge ${MethodColors[method] || MethodColors[HttpMethods.GET]}">${method}</span>
          <span class="api-item-title">${name}</span>
        </a>
        <p class="api-item-endpoint truncate" title=${endpoint}>${t('modal.api-list-item.endpoint-to')}: ${tryGetUrlPath(endpoint)}</p>
        <span class="api-item-desc">
          ${desc || ''}
        </span>
      </div>
      <button class="btn-control icon-badge info font-xs" data-action="copy-insert-api" title="${t('tooltip.copy-insert')}">💾</button>
      <button class="btn-control icon-badge dark font-xs" data-action="delete-api" title="${t('tooltip.delete')}">🗑️</button>
    </li>
  `).join('') || '';
};

export default ModalApiListItem;