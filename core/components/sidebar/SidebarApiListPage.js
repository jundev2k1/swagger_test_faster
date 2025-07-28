// =============================
// File: SidebarApiListPage.js (sidebarApiListPage.js)
// Description: Render sidebar api list page UI
// Copyright (c) 2025. Jun Dev
// =============================

import { t } from "../../i18n/translate.js";

/**
 * Render sidebar api list page UI
 * @returns {string} Sidebar api list page UI
 */
const SidebarApiListPage = () => {
  return `
    <h3>${t('sidebar.api.title')}</h3>
    <ul class="api-action-group overflow-scroll-y mh-50vh"></ul>
    <div class="response-result">
      <h3>
        ${t('sidebar.response.title')}
        <button class="btn-control icon-badge light" id="btn-copy-response" title="${t('sidebar.response.copy')}">📃</button>
      </h3>
      <div class="card json-viewer"></div>
    </div>
    <div class="tool-setting">
      <a href="javascript:void" id="btn-open-setting" class="btn-control secondary action-control">${t('btn.setting')}</a>
    </div>
  `;
}

export default SidebarApiListPage;
