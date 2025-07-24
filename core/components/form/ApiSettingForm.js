// ============================================
// File: ApiSettingForm.js
// Type UI: Form
// Description: API Setting Form
// Copyright (c) 2025. Jun Dev
// ============================================

import { t } from '../../i18n/translate.js';
import { escapeHTML } from '../../utils/helpers.js';
import { HttpMethods, ColorEnums } from '../../data/constants.js';

/**
 * Render the API Setting Form.
 * @param {ApiSetting} [option] The options for the API Setting Form.
 * @returns {string} The HTML of the API Setting Form.
 */
const ApiSettingForm = ({ name, desc, method, endpoint, request, color, isAuth }) => {
  return `
    <form id="api-setting-form">
      <div class="form-group">
        <label for="api-name" class="form-label">${t('modal.api-setting.name')}</label>
        <div class="form-control">
          <input id="api-name" name="name" class="form-input" value="${name || ''}" data-action="form-input" required />
          <div class="error-message"></div>
        </div>
      </div>
      <div class="form-group">
        <label for="api-description" class="form-label">${t('modal.api-setting.desc')}</label>
        <textarea class="resize-none" id="api-description" name="desc" data-action="form-input">${escapeHTML(desc || '')}</textarea>
      </div>
      <div class="grid grid-2">
        <div class="form-group">
          <label for="api-setting-method" class="form-label">${t('modal.api-setting.http-method')}</label>
          <select class="form-select" id="api-setting-method" name="method" data-action="form-input">
            ${Object.entries(HttpMethods).map(([key, val]) => `
              <option value="${val}" ${method === val ? 'selected' : ''}>
                ${key}
              </option>
            `).join('')}
          </select>
        </div>
        <div class="form-group">
          <label for="api-setting-color" class="form-label">${t('modal.api-setting.color')}</label>
          <select class="form-select" id="api-setting-color" name="color" data-action="form-input">
            ${Object.entries(ColorEnums).map(([key, val]) => `
              <option value="${val}" ${color === val ? 'selected' : ''}>
                ${t(`color.${val}`, key)}
              </option>
            `).join('')}
          </select>
        </div>
      </div>
      <div class="form-group">
        <label for="api-setting-endpoint" class="form-label">${t('modal.api-setting.endpoint')}</label>
        <div class="form-control">
          <input id="api-setting-endpoint" name="endpoint" class="form-input" value="${escapeHTML(endpoint || '')}" data-action="form-input" required />
          <span class="error-message"></span>
        </div>
      </div>
      <div class="form-group">
        <label for="api-setting-request" class="form-label">${t('modal.api-setting.request')}</label>
        <div class="form-control">
          <textarea id="api-setting-request" name="request" class="resize-none" data-action="form-input" required>${escapeHTML(request || '')}</textarea>
          <span class="error-message"></span>
        </div>
      </div>
      <div class="form-group">
        <input type="checkbox" id="api-setting-is-auth" class="form-checkbox" name="isAuth" ${isAuth ? 'checked' : ''} data-action="form-input" />
        <label for="api-setting-is-auth">${t('modal.api-setting.is-auth-api')}</label>
      </div>
    </form>
  `;
}

export default ApiSettingForm;
