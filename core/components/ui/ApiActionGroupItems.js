/** 
 * =============================
 * File: ApiActionGroupItems.js (apiActionGroupItems.js)
 * Type UI: Lobby UI (list)
 * Description: Render API action group item list UI
 * Copyright (c) 2025. Jun Dev
 * ============================= 
 */

/**
 * Render API action group item list UI
 * @param {array} [datasource] An array of objects that contain the information of the API action group items
 * @returns {string} The HTML of the API action group item list UI
 */
const ApiActionGroupItems = (datasource = []) => {
  /**
   * A function to generate the HTML of a single API action group item
   * @param {{ id: string, name: string, method: string, endpoint: string, color: string }} object The information of the API action group item
   * @returns {string} The HTML of the API action group item
   */
  const generateApiActionGroupItemHtml = ({ id, name, method, endpoint, color }) => {
    return `
      <li class="api-action-group-item bg-${color} bg-${color}-hover">
        <a href="javascript:void" class="btn-control api-action-control" data-api-id="${id}">
          <span class="api-method badge ${methodColors[method] || methodColors[httpMethods.GET]}">${method}</span>
          ${name}
        </a>
        <p class="font-sm m-0 p-3 pt-0 truncate" title="${endpoint}">${t('modal.api-list-item.endpoint-to')}: ${tryGetUrlPath(endpoint)}</p>
      </li>
    `;
  };

  return datasource.map(generateApiActionGroupItemHtml).join('') || '';
}

export default ApiActionGroupItems;