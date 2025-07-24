// ============================================
// File: EnvSettingForm.js
// Type UI: Form
// Description: Environment Setting Form
// Copyright (c) 2025. Jun Dev
// ============================================


import { t } from '../../i18n/translate.js';


/**
 * @description Environment Setting Form
 * @param {EnvSetting[]} settings - Environment settings array
 * @returns {string} HTML string of the form
 */
const EnvSettingForm = (settings = []) => {
  return `
    <form id="enviroment-setting-form">
      <div class="enviroment-manager mb-2">
        ${settings.map(({ id, value }, index) => `
          <div class="form-group grid-6 gap-1" data-target-id="${id}">
            <label for="tb-env-${index}" class="form-label span-2">${t('modal.env-setting.name')}:</label>
            <div class="form-control span-3">
              <input id="tb-env-${index}" type="text" class="form-input" data-action="input" value="${value}" required />
              <span class="error-message"></span>
            </div>
            <button type="button" class="btn-control icon-badge light" data-action="delete-environment" title="${t('tooltip.delete')}">🗑️</button>
          </div>
        `).join('')}
        <a href="javascript:void" id="btn-add-new-env" class="btn-control light">${t('btn.add-new')}</a>
      </div>
    </form>
  `;
}

export default EnvSettingForm;
