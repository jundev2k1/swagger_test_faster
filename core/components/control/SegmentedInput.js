// =============================================
// File: PillComboBox.js
// Description: Pill combobox UI component
// Copyright (c) 2025. Jun Dev
// ============================================

import { t } from "../../i18n/translate.js";
import { escapeHTML } from "../../utils/helpers.js";

/**
 * A pill combobox UI component.
 * @param {SegmentedInputProps} props - The properties for the segmented input component.
 * @returns {string} The HTML markup for the segmented input component.
 */
const SegmentedInput = ({ options, name, selectedValue, isCheckbox, isPill }) => {
  const randomId = escapeHTML(crypto.randomUUID());
  const optionsHtml = options.map(({ label, value, disabled }, index) => `
    <div class="segmented-control">
      <input type="${isCheckbox ? 'checkbox' : 'radio'}"
        id="cb_${randomId}_${index}"
        name="${escapeHTML(name)}"
        value="${escapeHTML(value)}"
        ${value === selectedValue ? 'checked' : ''}
        ${disabled ? 'disabled' : ''}
        data-action="form-input">
      <label for="cb_${randomId}_${index}">${escapeHTML(t(label))}</label>
    </div>
  `).join('\n');

  return `
    <div class="segmented-control-group ${isPill ? 'pill' : ''} flex flex-wrap">
      ${optionsHtml}
    </div>
  `;
};

export default SegmentedInput;
