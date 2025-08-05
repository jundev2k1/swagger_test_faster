// =============================
// File: ApiActionGroupItems.js (apiActionGroupItems.js)
// Type UI: Lobby UI (list)
// Description: Render API action group item list UI
// Copyright (c) 2025. Jun Dev
// ============================= 

import { t } from "../../i18n/translate.js";
import { escapeHTML, tryGetUrlPath } from "../../utils/helpers.js";
import { ApiSettingMode, HttpMethods, MethodColors } from "../../data/constants.js";

/**
 * Render HUB action group item list UI
 * @param {ApiSetting[]} [dataSource] An array of objects that contain the information of the HUB action group items
 * @returns {string} The HTML of the API action group item list UI
 */
const HubActionGroupItems = (dataSource = []) => {
  /**
   * A function to generate the HTML of a single HUB action group item
   * @param {ApiSetting} object The information of the API action group item
   * @returns {string} The HTML of the API action group item
   */
  const generateHubActionGroupItemHtml = ({ id, name, endpoint, color, desc }) => {
    return `
      <div class="api-action-group-item bg-${color} bg-${color}-hover">
        <div href="javascript:void" class="btn-control hub-action-control" data-hub-id="${id}">
          <div class="">
            <span class="api-method badge ${MethodColors[HttpMethods.GET]}">${HttpMethods.GET}</span>
            ${name}
            <p class="font-sm m-0 p-3 pb-0 pt-0 truncate" title="${escapeHTML(endpoint)}">${t('modal.api-list-item.endpoint-to')}: ${tryGetUrlPath(endpoint)}</p>
            <p class="font-xs m-0 p-3 pt-1 italic truncate">
              ${escapeHTML(desc || '')}
            </p>
          </div>
          <div class="hub-connect-status">
            <div class="hub-connect-status-icon"></div>
            <div class="hub-connect-status-text">${t('hub.connect')}</div>
          </div>
          <div class="hub-connect-control">
            <button class="btn-control icon-badge light" id="btn-connect-hub">${t('btn.connect')}</button>
            <button class="btn-control icon-badge light" id="btn-disconnect-hub">${t('btn.disconnect')}</button>
          </div>
        </div>
        <ul class="hub-action-group overflow-scroll-y mh-50vh">
          <li class="api-action-group-item bg-${color} bg-${color}-hover">
            <a href="javascript:void" class="btn-control api-action-control" data-api-id="${id}">
              <span class="api-method badge ${MethodColors[method] || MethodColors[HttpMethods.GET]}">${method}</span>
              ${name}
            </a>
            <p class="font-sm m-0 p-3 pb-0 pt-0 truncate" title="${escapeHTML(endpoint)}">${t('modal.api-list-item.endpoint-to')}: ${tryGetUrlPath(endpoint)}</p>
            <p class="font-xs m-0 p-3 pt-1 italic truncate">
              ${escapeHTML(desc || '')}
            </p>
          </li>
        </ul>
      </div>
    `;
  };

  return dataSource
    .filter(s => s[0] === ApiSettingMode.HUB)
    .sort((a, b) => {
      if (a.priority < b.priority) return -1;
      if (a.priority > b.priority) return 1;

      const aDate = new Date(a.modifiedAt);
      const bDate = new Date(b.modifiedAt);
      if (aDate > bDate) return -1;
      if (aDate < bDate) return 1;
      
      return 0;
    }).map(generateHubActionGroupItemHtml).join('') || '';
}

export default HubActionGroupItems;