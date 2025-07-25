// ============================================
// File: EnvDropdownOptions.js
// Type UI: Control
// Description: Environment dropdown options
// Copyright (c) 2025. Jun Dev
// ============================================

import { Store } from '../../data/store.js';
import { t } from '../../i18n/translate.js';

/**
 * Render Environment dropdown options as HTML.
 * @param {EnvSetting[]} [datasource=[]] - An array of objects that contain the information of the Environment dropdown options.
 * @returns {string} The HTML string for the Environment dropdown options, including a default option, environment options, and an "add-new" option.
 */
const EnvDropdownItems = (datasource = []) => {
  const defaultOption = `
    <option value="" disabled ${!datasource || datasource.length == 0 ? 'selected' : ''}>
      ${t('ddl.select-environment')}
    </option>`;
  const options = datasource.map(({ id, value }) => `
    <option value="${id}" ${id === Store.currentEnv ? 'selected' : ''}>
      ${value}
    </option>
  `);
  const btnAddNew = `
    <option value="add-new" command="add-new-env">
      ${t('btn.add-new') + '...'}
    </option>
  `;
  return [defaultOption, ...options, btnAddNew].join('');
}

export default EnvDropdownItems;
