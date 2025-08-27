import { $ } from "../utils/helpers.js";
import { t } from "../i18n/translate.js";
import { actionMode, ApiSettingMode, formActionMode, HttpMethods, Store } from "../data/index.js";
import { ModalApiListItem } from "../components/index.js";

export class ModalActionListPage {
  constructor({ onRefresh }) {
    this.dataSource = [...Store.apiSettings] || [];
    this.onRefresh = onRefresh;
  }

  get wContainer() { return $('#jun-tool .modal-container .modal-content'); }
  // Filter elements
  get tbFilterSearch() { return this.wContainer.querySelector('#api-list-filter-search'); }
  get ddlFilterMode() { return this.wContainer.querySelector('#api-list-filter-mode'); }
  get ddlFilterMethod() { return this.wContainer.querySelector('#api-list-filter-method'); }
  get ddlOrderByKey() { return this.wContainer.querySelector('#api-list-order-by-key'); }
  get ddlOrderByDirection() { return this.wContainer.querySelector('#api-list-order-by-direction'); }
  // List action elements
  get btnAddNewApi() { return this.wContainer.querySelector('#btn-add-new-api'); }
  get btnCopyApiSettingItems() { return this.wContainer.querySelectorAll('.api-list-item button[data-action="copy-insert-api"]'); }
  get btnApiSettingItems() { return this.wContainer.querySelectorAll('.api-list-item [data-api-id]'); }
  get btnRemoveApiSettingItems() { return this.wContainer.querySelectorAll('.api-list-item button[data-action="delete-api"]'); }

  setFilterEvent() {
    let timeout = null;
    this.tbFilterSearch?.addEventListener('input', (e) => {
      const filter = Store.apiListFilter;
      filter.search = e.target.value.trim();
      Store.apiListFilter = filter;
      clearTimeout(timeout);
      timeout = setTimeout(() => this.loadData(), 300);
    });

    this.ddlFilterMode?.addEventListener('change', (e) => {
      const filter = Store.apiListFilter;
      filter.mode = e.target.value;
      Store.apiListFilter = filter;
      this.loadData();
    });

    this.ddlFilterMethod?.addEventListener('change', (e) => {
      const filter = Store.apiListFilter;
      filter.method = e.target.value;
      Store.apiListFilter = filter;
      this.loadData();
    });

    this.ddlOrderByKey?.addEventListener('change', (e) => {
      const filter = Store.apiListFilter;
      filter.sort = e.target.value;
      Store.apiListFilter = filter;
      this.loadData();
    });

    this.ddlOrderByDirection?.addEventListener('change', (e) => {
      const filter = Store.apiListFilter;
      filter.sortDirection = e.target.value;
      Store.apiListFilter = filter;
      this.loadData();
    });
  }

  setApiListEvent() {
    this.btnAddNewApi?.addEventListener('click', () => {
      this.onRefresh(actionMode.MODAL_API_SETTING, formActionMode.CREATE, null);
    });

    this.btnApiSettingItems?.forEach(btn => {
      btn.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = event.currentTarget.dataset['apiId'];
        this.onRefresh(actionMode.MODAL_API_SETTING, formActionMode.UPDATE, targetId);
      });
    });

    this.btnCopyApiSettingItems?.forEach(icon => {
      icon.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = event.currentTarget.closest('.api-list-item').querySelector('a[data-api-id]')?.dataset['apiId'];
        if (!targetId) return;

        this.onRefresh(actionMode.MODAL_API_SETTING, formActionMode.COPY_INSERT, targetId);
      });
    });

    this.btnRemoveApiSettingItems?.forEach(icon => {
      icon.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = event.target.closest('.api-list-item').querySelector('a[data-api-id]')?.dataset['apiId'];
        if (!targetId) return;

        const targetApiIndex = Store.apiSettings.findIndex(api => api.id === targetId);
        if (targetApiIndex < 0) return;

        if (confirm(t('dialog.confirm-delete'))) {
          const settings = Store.apiSettings.filter(api => api.id !== targetId);
          Store.apiSettings = [...settings];
          this.dataSource = [...settings];
          this.loadData();
        }
      });
    });
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

  loadData() {
    this.wContainer.querySelector('ul.api-list').innerHTML =
      ModalApiListItem(this.dataSource) || `<div class="empty-state">${t('modal.api-list.empty')}</div>`;

    this.setApiListEvent();
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
        <ul class="api-list"></ul>
        <button class="btn-control light" id="btn-add-new-api">${t('modal.api-list.add-new')}</button>
      </div>`;
  }

  static init(props) {
    const instance = new ModalActionListPage(props);
    instance.render();
    instance.setFilterEvent();
    instance.loadData();
  }
}
