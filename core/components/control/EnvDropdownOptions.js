/**
 * ============================================
 * File: EnvDropdownOptions.js
 * Type UI: Control
 * Description: Environment dropdown options
 * Copyright (c) 2025. Jun Dev
 * ============================================
 */
import { t } from '../../i18n';

const createEnvDropdownItems = (datasource = [], selectedValue = '') => {
  const defaultOption = `
    <option value="" disabled ${!datasource || datasource.length == 0 ? 'selected' : ''}>
      ${t('ddl.select-environment')}
    </option>`;
  const options = datasource.map(({ id, value }) => `
    <option value="${id}" ${id === selectedValue ? 'selected' : ''}>
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