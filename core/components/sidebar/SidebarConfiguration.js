// =============================
// File: SidebarConfiguration.js
// Description: Render sidebar configuration content UI
// Copyright (c) 2025. Jun Dev
// =============================

import { t } from "../../i18n/translate.js";

/**
 * Render sidebar setting page UI
 * @returns {string} Sidebar setting page UI
 */
const SidebarConfiguration = () => {
  return `
    <h3>${t('sidebar.env.title')}</h3>
    <div class="form-group">
      <select name="environment" class="form-select" control="ddl-select-environment"></select>
    </div>
  `;
}

export default SidebarConfiguration;
