// =============================
// File: DefaultUI.js (defaultUI.js)
// Description: Render default UI for the application
// Copyright (c) 2025. Jun Dev
// ============================= 

import { config } from "../../../config.js";
import { actionMode } from "../../data/constants.js";
import { t, translate } from "../../i18n/translate.js";
import { UIBuilder } from "../../ui/uiBuilder.js";

/** Render default UI for the application.
 * @param {actionMode} [action] - The current action mode of the application.
 * @returns {string} The HTML of the default UI
 */
const DefaultUI = (action) => {
  const sidebarContent = UIBuilder.createSidebarContent(action);
  return `
    <aside id="tool-sidebar">
      <div class="sidebar-wrapper">
        <div class="sidebar-header">
          <button class="btn-control badge light" id="btn-toggle-sidebar">≡</button>
          <h1>Jun's Tool</h1>
          <div class="dropdown">
            <button class="btn-control icon-badge light dropdown-toggle" id="btn-change-language">🌍</button>
            <ul class="dropdown-menu" data-target-id="btn-change-language">
              ${config.supportedLanguages.map(lang => `
                <li><a href="javascript:void" data-lang="${lang}">${translate.lang[lang]}</a></li>
              `).join('')}
            </ul>
          </div>
        </div>
        <div class="sidebar-content">
          ${sidebarContent}
        </div>
      </div>
      <div class="sidebar-tab">
        <div class="sidebar-tab-item" data-tab="tab-env">${t('sidebar.tab.env')}</div>
        <div class="sidebar-tab-item active" data-tab="tab-api">${t('sidebar.tab.api')}</div>
      </div>
    </aside>
    
    <div class="modal d-none">
      <div class="modal-overlay"></div>
      <div class="modal-container">
        <div class="modal-header">
          <button id="btn-modal-back" class="btn-back d-none">⮜ ${t('btn.back')}</button>
          <h2 id="title-modal">Jun Tool Settings</h2>
        </div>
        <div class="modal-tabs"></div>
        <div class="modal-content"></div>
        <div class="modal-footer">
          <button id="btn-savechanges" type="submit">${t('btn.save-changes')}</button>
          <button id="btn-close-modal" class="close-modal" type="button">${t('btn.close')}</button>
        </div>
      </div>
    </div>
  
    <div id="toast-container"></div>
  `;
}

export default DefaultUI;
