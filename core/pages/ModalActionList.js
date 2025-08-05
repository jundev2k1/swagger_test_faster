import { $ } from "../utils/helpers.js";
import { t } from "../i18n/translate.js";
import { ApiSettingMode, HttpMethods, Store } from "../data/index.js";
import { ModalApiListItem } from "../components/index.js";

export class ModalActionListPage {
  constructor({ onRefresh }) {
    this.dataSource = [...Store.apiSettings] || [];
    this.onRefresh = onRefresh;
  }

  get wContainer() { return $('#jun-tool .modal-container .modal-content'); }

  setEvent() {

  }

  getSortOptions = () => {
    const selectedField = Store.apiListFilter.sort;
    const sortFields = ['name', 'endpoint', 'priority', 'color', 'mode', 'method', 'createdAt', 'updatedAt'];
    return sortFields.map((field) => `
        <option value="${field}" ${selectedField === field ? 'selected' : ''}>
          ${t(`modal.api-list.order-by.${field}`)}
        </option>
      `).join('');
  }
  getSortDirectionOptions = () => {
    const selectedDirection = Store.apiListFilter.sortDirection;
    const sortDirections = ['asc', 'desc'];
    return sortDirections.map((direction) => `
        <option value="${direction}" ${selectedDirection === direction ? 'selected' : ''}>
          ${t(`modal.api-list.order-by.${direction}`)}
        </option>
      `).join('');
  }

  render() {
    this.wContainer.innerHTML = `
      <div id="api-list-layout">
        <div class="api-list-filter mb-3 grid-4 gap-1">
          <input id="api-list-filter-search" class="form-input span-4" placeholder="${t('modal.api-list.filter.search')}">
          <select id="api-list-filter-mode" class="form-select">
            <option value="all">${t('modal.api-list.filter-all')}</option>
            ${Object.entries(ApiSettingMode).map(([key, value]) => `
              <option value="${value}" ${value === Store.apiListFilter.mode ? 'selected' : ''}>
                ${t(`modal.api-list.filter.mode-${key.toLowerCase()}`)}
              </option>
            `).join('')}
          </select>
          <select id="api-list-filter-method" class="form-select">
            <option value="all">${t('modal.api-list.filter.method')}</option>
            ${Object.entries(HttpMethods).map(([key, value]) => `
              <option value="${value}">${key}</option>
            `).join('')}
          </select>
          <select id="api-list-order-by-key" class="form-select">
            ${this.getSortOptions()}
          </select>
          <select id="api-list-order-by-direction" class="form-select">
            ${this.getSortDirectionOptions()}
          </select>
        </div>
        <ul class="api-list">
          ${ModalApiListItem(this.dataSource) || `<div class="empty-state">${t('modal.api-list.empty')}</div>`}
        </ul>
        <button class="btn-control light" id="btn-add-new-api">${t('modal.api-list.add-new')}</button>
      </div>`;
  }

  static init(props) {
    const instance = new ModalActionListPage(props);
    instance.render();
    instance.setEvent();
  }
}
