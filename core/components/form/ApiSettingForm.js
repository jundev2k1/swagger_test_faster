// ============================================
// File: ApiSettingForm.js
// Type UI: Form
// Description: API Setting Form
// Copyright (c) 2025. Jun Dev
// ============================================

import { t } from '../../i18n/translate.js';
import { escapeHTML } from '../../utils/helpers.js';
import { HttpMethods, ColorEnums, ApiSettingModeOptions, ApiSettingMode } from '../../data/constants.js';
import SegmentedInput from '../control/SegmentedInput.js';
import { Store } from '../../data/store.js';

const displayOrHide = (isDisplay, innerHTML) => isDisplay ? innerHTML : '';

/**
 * Render the API Setting Form.
 * @param {ApiSetting} [option] The options for the API Setting Form.
 * @returns {string} The HTML of the API Setting Form.
 */
const ApiSettingForm = ({ id, name, desc, method, endpoint, request, color, isAuth, mode, refTo, callAfter, successEvent }) => {
  const getApiRefOptions = () => {
    const settings = Store.apiSettings
      .filter(s => s.id !== id)
      .map(s => ({ value: s.id, label: s.name }));
    return [{ value: '', label: 'None' }, ...settings];
  }
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
      <div class="form-group">
        <label for="api-setting-mode" class="form-label">${t('modal.api-setting.mode')}</label>
        ${SegmentedInput({ options: ApiSettingModeOptions, name: 'mode', selectedValue: mode, isCheckbox: false })}
      </div>
      <div class="grid grid-2">
      ${displayOrHide([ApiSettingMode.API].includes(mode), `
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
        `)}
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
      ${displayOrHide([ApiSettingMode.API].includes(mode), `
        <div class="form-group">
          <label for="api-setting-ref" class="form-label">${t('modal.api-setting.ref')}</label>
          <div class="form-control">
            <select class="form-select" id="api-setting-ref" name="refTo" data-action="form-input">
              ${getApiRefOptions().map(({ label, value }) => `
                <option value="${escapeHTML(value)}" ${refTo === value ? 'selected' : ''}>
                  ${value
                    ? t('modal.api-setting.ref.prefix') + ':' + label + '(#' + value + ')'
                    : t('modal.api-setting.ref.none')}
                </option>
              `).join('')}
            </select>
            <span class="error-message"></span>
          </div>
        </div>
      `)}
      ${displayOrHide([ApiSettingMode.API].includes(mode), `
        <div class="form-group">
          <label for="api-setting-call" class="form-label">${t('modal.api-setting.call-after')}</label>
          <div class="form-control">
            <input id="api-setting-call" name="callAfter" class="form-input" value="${refTo ? callAfter || 0 : 0}" data-action="form-input" ${refTo ? '' : 'disabled'} />
            <div class="error-message"></div>
          </div>
        </div>
      `)}
      <div class="form-group">
        <label for="api-setting-success-event" class="form-label">${t('modal.api-setting.response')}</label>
        <div class="form-control">
          <textarea id="api-setting-success-event" name="successEvent" class="resize-none" data-action="form-input" required>${escapeHTML(successEvent || '')}</textarea>
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
