// =============================
// File: SidebarHubList.js
// Description: Render sidebar hub list content UI
// Copyright (c) 2025. Jun Dev
// =============================

import { t } from "../../i18n/translate.js";

/**
 * Render sidebar hub list page UI
 * @returns {string} Sidebar hub list page UI
 */
const SidebarHubList = () => {
  return `
    <h3>${t('sidebar.hub.title')}</h3>
    <ul className="hub-action-group overflow-scroll-y mh-50vh"></ul>
  `;
}

export default SidebarHubList;
