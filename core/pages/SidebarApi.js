import { $, $$, resolveCookiePattern, resolveObjectVars, resolveVars, setTempCookie } from "../utils/helpers.js";
import { SidebarApiList } from "../components/index.js";
import { Toast } from "../ui/toast.js";
import { Store } from "../data/store.js";
import { t } from "../i18n/translate.js";
import { renderJsonFormattedStrict } from "../ui/renderJson.js";

export class SidebarApiPage {
  constructor({ onRefresh }) {
    this.onRefresh = onRefresh;
    /** @type {number|null} Timeout ID */
    this.timeoutId = null;
    /** @type {string|null} API response */
    this.apiResponse = null;
    /** @type {string} Pre-authentication token, used to store the token before login */
    this.preAuthToken = '';
    /** @type {boolean} Fetching state */
    this.isFetching = false;
  }

  get wContainer() { return $('#jun-tool #tool-sidebar .sidebar-content'); }
  get btnActionItems() { return $$('#jun-tool .api-action-group .api-action-group-item .api-action-control'); }
  get btnCopyResponse() { return $('#jun-tool .response-result #btn-copy-response'); }
  get wApiResponse() { return $('#jun-tool .response-result .card'); }

  /**
   * Fetch API settings from the server.
   * @param {ApiSetting} apiSetting API setting object to fetch 
   */
  async fetchApiSettings(apiSetting) {
    const { name, endpoint, method, request, successEvent, isAuth } = apiSetting || {};
    if (!endpoint) {
      console.warn('No API endpoint provided for fetching settings.');
      Toast.warning(t('message.fetch-api.endpoint-empty'));
      return;
    }

    try {
      const option = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(isAuth ? { 'Authorization': `Bearer ${this.preAuthToken}` } : {})
        },
        body: request && method !== HttpMethods.GET
          ? resolveCookiePattern(resolveObjectVars(request))
          : undefined,
      };
      const response = await fetch(resolveVars(endpoint), option);
      const data = await response.json();
      this.apiResponse = data;
      this.displayResponseChange();

      if (successEvent.trim()) this.onFetchSuccess(successEvent);

      response.ok && isAuth && this.autoSetToken(data?.data?.token || '');

      console.log(`API settings fetched successfully for ${name}`);
      Toast.success(t('message.fetch-api.success'));
    }
    catch (error) {
      this.apiResponse = null;
      Toast.error(t('message.fetch-api.fetch-error'));
      console.error(`Error fetching API settings for ${name}:`, error);
    } finally {
      this.isFetching = false;
    }
  }

  /**
   * Execute success event
   * @param {string} successEvent Success event 
   */
  onFetchSuccess(successEvent) {
    this.apiResponse;
    try {
      const script = resolveCookiePattern(resolveVars(successEvent));
      const onSuccess = new Function('data', 'setStore', script);
      onSuccess(this.apiResponse, setTempCookie);
    } catch (error) {
      console.error('Error executing success event:', error);
    }
  }

  /**
   * Set token
   * @param {string} token Token 
   * @param {boolean} isAuth Is auth 
   */
  autoSetToken(token = '', isAuth = true) {
    this.preAuthToken = token;
    const swaggerUi = window.ui;
    if (swaggerUi && swaggerUi.preauthorizeApiKey) {
      if (isAuth) {
        swaggerUi.preauthorizeApiKey('bearerAuth', `Bearer ${token}`);
        console.log('Token set using preauthorizeApiKey');
      }
      else {
        swaggerUi.preauthorizeApiKey('bearerAuth', '');
        console.log('No token set.');
      }
    } else {
      console.error('Swagger UI instance or preauthorizeApiKey not found');
      Toast.error(t('message.fetch-api.swagger-not-found'));
    }
  }

  /**
   * Display API response
   */
  displayResponseChange() {
    if (!this.wApiResponse) return;

    if (this.btnCopyResponse) this.btnCopyResponse.disabled = !this.apiResponse;

    if (!this.apiResponse) {
      this.wApiResponse.textContent = t('message.api-response.empty');
      return;
    }

    const jsonContent = renderJsonFormattedStrict(this.apiResponse);
    this.wApiResponse.innerHTML = jsonContent.innerHTML;
    this.wApiResponse.querySelectorAll('.copyable').forEach(element => {
      element.addEventListener('click', (event) => {
        event.preventDefault();
        let text = event.target.textContent.trim();
        if (/^".*"$/.test(text))
          text = text.replace(/^"(.*)"$/, '$1');

        navigator.clipboard.writeText(text)
          .then(() => {
            Toast.success(t('tooltip.copy.success'));
          }).catch(() => {
            Toast.error(t('tooltip.copy.fail'));
          });
      })
    })
  }
  /**
   * Execute the event every time you click on the sidebar API action item.
   * @param {MouseEvent} event Click event
   */
  async onActionItemClick(event) {
    event.preventDefault();
    const apiId = event.target.dataset['apiId'];
    if (!apiId) return;

    const targetApi = Store.apiSettings.find(api => api.id === apiId);
    if (!targetApi) return;

    this.isFetching = true;
    const refSetting = Store.apiSettings.find(api => api.id === targetApi.refTo);
    if (!refSetting) {
      await this.fetchApiSettings(targetApi);
      return;
    }

    await this.fetchApiSettings(refSetting);
    setTimeout(() => {
      this.fetchApiSettings(targetApi);
    }, targetApi.callAfter || 0);
  }

  setEvent() {
    this.btnActionItems?.forEach((element) => {
      element.addEventListener('click', (event) => this.onActionItemClick(event));
    });

    this.btnCopyResponse?.addEventListener('click', (event) => {
      event.preventDefault();
      if (!this.apiResponse) return;

      navigator.clipboard.writeText(JSON.stringify(this.apiResponse, null, 2))
        .then(() => Toast.success(t('tooltip.copy.success')))
        .catch(() => Toast.error(t('tooltip.copy.fail')));
    });
  }

  render() {
    this.wContainer.innerHTML = SidebarApiList();
  }

  static init(props) {
    const instance = new SidebarApiPage(props);
    instance.render();
    instance.setEvent();
  }
}
