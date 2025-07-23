/**
 * =============================
 * File: DefaultUI.js (defaultUI.js)
 * Description: Render default UI for the application
 * Copyright (c) 2025. Jun Dev
 * ============================= 
 */

import { config } from "../../../config";
import { t, translate } from "../../i18n/translate";

const DefaultUI = () => {
  return `
    <aside id="tool-sidebar">
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
        <h3>${t('sidebar.env.title')}</h3>
        <div class="form-group">
          <select name="environment" class="form-select" control="ddl-select-environment"></select>
        </div>
  
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
