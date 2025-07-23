// ============================================
// File: EnvVariableForm.js
// Type UI: Form
// Description: Environment Variable Form
// Copyright (c) 2025. Jun Dev
// ============================================

import { Store } from '../../data/store.js';
import { t } from '../../i18n/translate.js';
import { escapeHTML } from '../../utils/helpers.js';

/**
 * Render the Environment Variable Form.
 * @param {EnvVariableItem[]} variables The options for the Environment Variable Form.
 * @returns {string} The HTML of the Environment Variable Form.
 */
const EnvVariableForm = (variables = []) => {
  const hardSettings = variables.filter(item => item.isHardSetting);
  const hostSetting = hardSettings.find(item => item.name === 'host')?.value || '';
  const softSettings = variables.filter(item => !item.isHardSetting);
  return `
    <form id="enviroment-variable-form">
      <div class="form-group grid-3 mb-2">
        <label for="ddl-select-environment" class="form-label">${t('sidebar.env.title')}:</label>
        <select id="ddl-select-environment" class="form-select span-2" control="ddl-select-environment" required>
        </select>
      </div>
      <h3>${t('modal.title.env-var')}</h3>
      <div class="list-wrapper" data-env-type="hard-setting">
        <div class="form-group grid-3 gap-1">
          <label for="tb-env-host" class="form-label">${t('modal.env-var.hard-setting.host')}:</label>
          <div class="form-control span-2">
            <input id="tb-env-host" name="host" class="form-input" value="${escapeHTML(hostSetting)}" data-env-input-type="value" required ${!Store.currentEnv ? 'disabled' : ''}>
            <span class="error-message"></span>
          </div>
        </div>
      </div>
      <h3>${t('modal.title.your-env-var')}</h3>
      <div class="list-wrapper mb-2" data-env-type="soft-setting">
        ${!Store.currentEnv ? '' : softSettings.map(({ id, name, value }) => `
            <div class="form-group grid-6 gap-1" data-target-id="${id}">
              <div class="form-control span-2">
                <input class="form-input" data-env-input-type="name" value="${name}" required>
                <span class="error-message"></span>
              </div>
              <div class="form-control span-3">
                <input class="form-input" data-env-input-type="value" value="${escapeHTML(value)}" required>
                <span class="error-message"></span>
              </div>
              <button class="btn-control icon-badge light" data-action="delete-variable" title="${t('tooltip.delete')}">🗑️</button>
            </div>
          `).join('')}
        ${Store.currentEnv ? `<a href="javascript:void" id="btn-add-new-var" class="btn-control light">${t('btn.add-new')}</a>` : ''}
      </div>
    </form>
  `;
}

export default EnvVariableForm;
