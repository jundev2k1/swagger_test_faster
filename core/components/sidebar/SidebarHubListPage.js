// =============================
// File: SidebarHubListPage.js (sidebarHubListPage.js)
// Description: Render sidebar hub list page UI
// Copyright (c) 2025. Jun Dev
// =============================

import { t } from "../../i18n/translate.js";

/**
 * Render sidebar hub list page UI
 * @returns {string} Sidebar hub list page UI
 */
const SidebarHubListPage = () => {
  return `
    <div className="sidebar-api-list-page">
      <h3>${t('sidebar.hub.title')}</h3>
      <ul className="api-action-group overflow-scroll-y mh-50vh"></ul>
      <div className="response-result">
        <h3>
          ${t('sidebar.response.title')}
          <button className="btn-control icon-badge light" id="btn-copy-response" title="${t('sidebar.response.copy')}">📃</button>
        </h3>
        <div className="card json-viewer"></div>
      </div>
      <div className="tool-setting">
        <a href="javascript:void" id="btn-open-setting" className="btn-control secondary action-control">${t('btn.setting')}</a>
      </div>
    </div>
  `;
}

export default SidebarHubListPage;
