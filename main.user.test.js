import { $, $$ } from "./core/utils/helpers.js";
import { actionMode, formActionMode, modalTabs, Store } from "./core/data/index.js";
import { UIBuilder } from "./core/ui/index.js";
import {
  ModalActionListPage,
  ModalActionSettingPage,
  ModalEnvironmentSettingPage,
  ModalVariableSettingPage,
  SidebarConfigurationPage,
  SidebarApiPage,
  SidebarHubPage
} from "./core/pages/index.js";

class SwaggerFaster {
  constructor() {
    this.currentSidebarTab = actionMode.SIDEBAR_API;
    /** @type {actionMode} Current action mode */
    this.currentModalMode = '';
    /** @type {string|null} Target API ID */
    this.targetId = null;
    /** @type {FormActionMode} Target Action */
    this.targetAction = formActionMode.READ;
    /** @type {boolean} Modal open state */
    this.isOpenModal = false;
    /** @type {number|null} Timeout ID */
    this.timeoutId = null;
    /** @type {boolean} Modal loading state */
    this.isModalLoading = false;
    /** @type {boolean} Sidebar loading state */
    this.isSidebarLoading = false;
    /** @type {boolean} Fetching state */
    this.isFetching = false;
  }

  get btnToggleSidebar() { return $('#jun-tool #btn-toggle-sidebar'); }
  get wModal() { return $('#jun-tool .modal'); }
  get wTabModal() { return $('#jun-tool .modal .modal-tabs'); }
  get hTitleModal() { return $('#jun-tool .modal #title-modal'); }
  get wOverlayModal() { return $('#jun-tool .modal .modal-overlay'); }
  get btnLocale() { return $('#jun-tool #btn-change-language'); }
  get btnClose() { return $('#jun-tool #btn-close-modal'); }
  get btnBack() { return $('#jun-tool #btn-modal-back'); }
  get btnOpenSetting() { return $('#jun-tool #btn-open-setting'); }
  get wTabButtons() { return $$('#jun-tool .modal .modal-tabs .tab-button'); }

  changeSidebarMode(mode) {
    switch (mode) {
      case actionMode.SIDEBAR_API:
        this.currentSidebarTab = actionMode.SIDEBAR_API;
        SidebarApiPage.init({ onRefresh: (mode) => this.refreshPage(mode) });
        break;

      case actionMode.SIDEBAR_ENV:
        this.currentSidebarTab = actionMode.SIDEBAR_ENV;
        SidebarConfigurationPage.init({ onRefresh: (mode) => this.refreshPage(mode) });
        break;

      case actionMode.SIDEBAR_HUB:
        this.currentSidebarTab = actionMode.SIDEBAR_HUB;
        SidebarHubPage.init({ onRefresh: (mode) => this.refreshPage(mode) });
        break;
    };
  }

  onTabChange(event) {
    event.preventDefault();
    const isActiveTab = event.target.classList.contains('active');
    if (isActiveTab) return;

    const currentTab = event.target.dataset['modalTab'] || '';
    switch (currentTab) {
      case modalTabs.API:
        this.onOpenModal(actionMode.MODAL_API_LIST);
        break;

      case modalTabs.ENVIRONMENT:
        this.onOpenModal(actionMode.MODAL_ENVIRONMENT_VARIABLES);
        break;
    }
  }

  onCollapseSidebar() {
    $('#tool-sidebar').classList.toggle('collapsed', Store.isCollabsedSidebar);
  }

  onOpenModal(mode = actionMode.MODAL_API_LIST) {
    this.isOpenModal = true;
    switch (mode) {
      case actionMode.MODAL_API_LIST:
        this.currentModalMode = actionMode.MODAL_API_LIST;
        ModalActionListPage.init({ onRefresh: (mode) => this.refreshPage(mode) });
        break;

      case actionMode.MODAL_API_SETTING:
        this.currentModalMode = actionMode.MODAL_API_SETTING;
        ModalActionSettingPage.init({ targetId: this.targetId, onRefresh: (mode) => this.refreshPage(mode) });
        break;

      case actionMode.MODAL_ENVIRONMENT_SETTINGS:
        this.currentModalMode = actionMode.MODAL_ENVIRONMENT_SETTINGS;
        ModalEnvironmentSettingPage.init({ onRefresh: (mode) => this.refreshPage(mode) });
        break;

      case actionMode.MODAL_ENVIRONMENT_VARIABLES:
        this.currentModalMode = actionMode.MODAL_ENVIRONMENT_VARIABLES;
        ModalVariableSettingPage.init({ onRefresh: (mode) => this.refreshPage(mode) });
        // Binding data for controls and set events
        this.loadEnvDropdownList();
        break;

      default:
        return;
    }

    this.onModalBinding();
  }

  onCloseModal() {
    this.currentModalMode = '';
    this.isOpenModal = false;
    this.onModalBinding();
  }

  onLanguageChange(event) {
    event.preventDefault();
    const selectedLang = event.target.dataset['lang'] || defaultLang;
    Store.currentLang = selectedLang;

    event.target.closest('.dropdown-menu')?.classList.remove('show');
    this.refreshPage(this.currentModalMode);
  }

  onEnvironmentChange(event) {
    const value = event.target.value;
    const targetOption = event.target.selectedOptions[0];
    const isAddNewEnvCommand = value === 'add-new'
      || targetOption.attributes['command']?.value === 'add-new-env';
    if (isAddNewEnvCommand) {
      event.target.value = Store.currentEnv || '';
      this.currentModalMode = actionMode.MODAL_ENVIRONMENT_SETTINGS;
    } else {
      Store.currentEnv = event.target.value;
    }

    this.refreshPage();
  }

  setLocaleEvent() {
    this.btnLocale.addEventListener('click', (event) => {
      event.stopPropagation();
      const menu = this.btnLocale.parentElement.querySelector(`[data-target-id="${this.btnLocale.id}"]`);
      menu?.classList.toggle('show');
    });

    const dropdownItems = $$(`[data-target-id="${this.btnLocale.id}"] li a`);
    dropdownItems.forEach((ddlItem) => {
      ddlItem.addEventListener('click', (event) => this.onLanguageChange(event));
    });

    document.addEventListener('click', (event) => {
      const menu = this.btnLocale.parentElement.querySelector('.dropdown-menu');
      if (menu.classList.contains('show') && !menu.contains(event.target)) {
        menu.classList.remove('show');
      }
    })
  }

  loadEnvDropdownList() {
    const envControls = $$('select[control="ddl-select-environment"]');
    const envSelections = UIBuilder.createEnvDropdownItems(Store.envSettings, Store.currentEnv);
    envControls.forEach((dropdown) => {
      dropdown.innerHTML = envSelections;
      dropdown.addEventListener('change', (e) => this.onEnvironmentChange(e));
    });
  }

  onModalBinding() {
    // Show or hide the modal based on the current action
    this.wModal.classList.toggle('d-none', !this.isOpenModal);

    // Set the title and modal container based on the current action
    this.hTitleModal.textContent = UIBuilder.getHeaderModal(this.currentModalMode);
    const tabHTML = UIBuilder.createTabModalTabs(this.currentModalMode);
    this.wTabModal.innerHTML = tabHTML;

    this.wTabButtons.forEach((btn) => {
      btn.addEventListener('click', (event) => this.onTabChange(event));
    });

    // Binding data for controls and set events
    this.loadEnvDropdownList();
  }

  onSidebarBinding() {
    // Show or hide the sidebar based on the current action
    this.onCollapseSidebar();

    // Set active sidebar tab
    $$('#jun-tool .sidebar-tab .sidebar-tab-item').forEach((item) => {
      item.classList.toggle('active', item.dataset['tab'] === this.currentSidebarTab);
    });

    this.changeSidebarMode(this.currentSidebarTab);

    // Binding data for controls and set events
    this.loadEnvDropdownList();
  }

  setUiEvent() {
    $$('#jun-tool .sidebar-tab .sidebar-tab-item').forEach((item) => {
      item.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();

        const targetTab = event.target.dataset['tab'] || actionMode.SIDEBAR_API;
        if (this.currentSidebarTab === targetTab)
          return;

        this.currentSidebarTab = targetTab;
        this.onSidebarBinding();
      });
    });

    this.btnToggleSidebar?.addEventListener('click', (event) => {
      event.preventDefault();

      Store.isCollabsedSidebar = !Store.isCollabsedSidebar;
      this.onCollapseSidebar();
    });

    // Modal events
    this.btnOpenSetting?.addEventListener('click', (event) => {
      event.preventDefault();
      this.onOpenModal();
    });
    this.btnClose?.addEventListener('click', (event) => {
      event.preventDefault();
      this.onCloseModal();
    });
    this.wOverlayModal?.addEventListener('click', (event) => {
      event.preventDefault();
      this.onCloseModal();
    });
    this.btnBack?.addEventListener('click', (event) => {
      event.preventDefault();

      // Redirect to the previous action
      const redirectAction = this.currentModalMode === actionMode.MODAL_API_SETTING
        ? actionMode.MODAL_API_LIST
        : actionMode.MODAL_ENVIRONMENT_VARIABLES;

      // Refresh the modal with the new action
      this.onOpenModal(redirectAction);
    });

    this.setLocaleEvent();
  }

  renderUI() {
    const rootElement = $('#jun-tool');
    const rootNode = rootElement || document.createElement('div');
    rootNode.id = 'jun-tool';
    rootNode.innerHTML = UIBuilder.createDefaultUI(this.currentModalMode);

    if (!rootElement) document.body.appendChild(rootNode);
  }

  refreshPage(modalMode = '', targetActionMode = formActionMode.READ, targetId = null) {
    this.currentModalMode = modalMode;
    this.targetId = targetId;
    this.targetAction = targetActionMode;

    this.renderUI();
    this.setUiEvent();
    this.onModalBinding();
    this.onSidebarBinding();
    // Binding data for controls and set events
    this.loadEnvDropdownList();
  }

  static init() {
    const instance = new SwaggerFaster();
    console.log("SwaggerFaster initialized");
    instance.refreshPage();
    console.log("SwaggerFaster executed");
  }
}

SwaggerFaster.init();