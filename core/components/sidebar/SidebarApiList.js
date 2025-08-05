// =============================
// File: SidebarApiList.js
// Description: Render sidebar api list content UI
// Copyright (c) 2025. Jun Dev
// =============================

import { Store } from "../../data/store.js";
import { t } from "../../i18n/translate.js";
import { resolveObjectVars } from "../../utils/helpers.js";
import ApiActionGroupItems from "../ui/ApiActionGroupItems.js";

/**
 * Render sidebar api list page UI
 * @returns {string} Sidebar api list page UI
 */
const SidebarApiList = () => {
  return `
    <h3>${t('sidebar.api.title')}</h3>
    <ul class="api-action-group overflow-scroll-y mh-50vh">
      ${ApiActionGroupItems(resolveObjectVars(Store.apiSettings))}
    </ul>
    <div class="response-result">
      <h3>
        ${t('sidebar.response.title')}
        <button class="btn-control icon-badge light" id="btn-copy-response" title="${t('sidebar.response.copy')}">📃</button>
      </h3>
      <div class="card json-viewer"></div>
    </div>
  `;
}

export default SidebarApiList;
