// =============================================
// File: Translate (translate.js)
// Description: Contains translations for the application
// Copyright (c) 2025. Jun Dev
// ============================================

import { config } from "../../config.js";

export const translate = Object.freeze({
  'lang': {
    'en': 'English',
    'vi': 'Tiếng Việt',
    'zh-TW': '繁體中文',
  },
  'color.primary': {
    'en': 'Primary',
    'vi': 'Chính',
    'zh-TW': '主要',
  },
  'color.secondary': {
    'en': 'Secondary',
    'vi': 'Phụ',
    'zh-TW': '次要',
  },
  'color.success': {
    'en': 'Success',
    'vi': 'Thành công',
    'zh-TW': '成功',
  },
  'color.danger': {
    'en': 'Danger',
    'vi': 'Nguy hiểm',
    'zh-TW': '危險',
  },
  'color.warning': {
    'en': 'Warning',
    'vi': 'Cảnh báo',
    'zh-TW': '警告',
  },
  'color.info': {
    'en': 'Info',
    'vi': 'Thông tin',
    'zh-TW': '資訊',
  },
  'api.setting.mode.api': {
    'en': 'Call API',
    'vi': 'Gọi API',
    'zh-TW': '呼叫 API',
  },
  'api.setting.mode.hub': {
    'en': 'SignalR Hub',
    'vi': 'Hub SignalR',
    'zh-TW': 'SignalR Hub',
  },
  'api.setting.mode.hub-method': {
    'en': 'Hub Method',
    'vi': 'Phương thức Hub',
    'zh-TW': 'Hub 方法',
  },
  'btn.back': {
    'en': 'Back',
    'vi': 'Trở lại',
    'zh-TW': '返回',
  },
  'btn.setting': {
    'en': 'Settings',
    'vi': 'Cài đặt',
    'zh-TW': '設定',
  },
  'btn.add-new': {
    'en': 'Add new',
    'vi': 'Thêm mới',
    'zh-TW': '新增',
  },
  'btn.save-changes': {
    'en': 'Save Changes',
    'vi': 'Lưu thay đổi',
    'zh-TW': '儲存變更',
  },
  'btn.close': {
    'en': 'Close',
    'vi': 'Đóng',
    'zh-TW': '關閉',
  },
  'tooltip.copy': {
    'en': 'Copy to clipboard',
    'vi': 'Sao chép vào clipboard',
    'zh-TW': '複製到剪貼簿',
  },
  'tooltip.delete': {
    'en': 'Delete this item',
    'vi': 'Xóa mục này',
    'zh-TW': '刪除此項目',
  },
  'tooltip.copy.success': {
    'en': 'Copied to clipboard successfully!',
    'vi': 'Sao chép vào clipboard thành công!',
    'zh-TW': '成功複製到剪貼簿！',
  },
  'tooltip.copy.fail': {
    'en': 'Failed to copy to clipboard.',
    'vi': 'Sao chép vào clipboard thất bại.',
    'zh-TW': '無法複製到剪貼簿。',
  },
  'tooltip.copy-insert': {
    'en': 'Copy and insert',
    'vi': 'Sao chép và thêm',
    'zh-TW': '複製並插入',
  },
  'dialog.confirm-save': {
    'en': 'Do you want to save changes before closing?',
    'vi': 'Bạn có muốn lưu thay đổi trước khi đóng không?',
    'zh-TW': '您要在關閉之前保存更改嗎？',
  },
  'dialog.confirm-delete': {
    'en': 'Are you sure you want to delete this item?',
    'vi': 'Bạn có chắc chắn muốn xóa mục này không?',
    'zh-TW': '您確定要刪除此項目嗎？',
  },
  'ddl.select-environment': {
    'en': 'Select Environment',
    'vi': 'Chọn môi trường',
    'zh-TW': '選擇環境',
  },
  'sidebar.env.title': {
    'en': 'Environment',
    'vi': 'Môi trường',
    'zh-TW': '環境',
  },
  'sidebar.api.title': {
    'en': 'API Actions',
    'vi': 'Hành động API',
    'zh-TW': 'API 操作',
  },
  'sidebar.response.title': {
    'en': 'Response Result',
    'vi': 'Kết quả phản hồi',
    'zh-TW': '回應結果',
  },
  'sidebar.response.copy': {
    'en': 'Copy full response',
    'vi': 'Sao chép toàn bộ phản hồi',
    'zh-TW': '複製完整回應',
  },
  'modal.tab.env': {
    'en': 'Environment Settings',
    'vi': 'Cài đặt môi trường',
    'zh-TW': '環境設定',
  },
  'modal.tab.api': {
    'en': 'API Settings',
    'vi': 'Cài đặt API',
    'zh-TW': 'API 設定',
  },
  'modal.header.default': {
    'en': 'Jun Tool Settings',
    'vi': 'Cài đặt công cụ Jun',
    'zh-TW': 'Jun 工具設定',
  },
  'modal.header.api-list': {
    'en': 'API List',
    'vi': 'Danh sách API',
    'zh-TW': 'API 列表',
  },
  'modal.header.api-setting': {
    'en': 'API Settings',
    'vi': 'Cài đặt API',
    'zh-TW': 'API 設定',
  },
  'modal.header.env-setting': {
    'en': 'Environment Settings',
    'vi': 'Cài đặt môi trường',
    'zh-TW': '環境設定',
  },
  'modal.header.env-variable': {
    'en': 'Environment Variables',
    'vi': 'Biến môi trường',
    'zh-TW': '環境變數',
  },
  'modal.title.env-var': {
    'en': 'Environment Variables',
    'vi': 'Biến môi trường',
    'zh-TW': '環境變數',
  },
  'modal.title.your-env-var': {
    'en': 'Your Environment Variables ( ${name} )',
    'vi': 'Biến môi trường của bạn ( ${name} )',
    'zh-TW': '您的環境變數 ( ${name} )',
  },
  'modal.env-var.hard-setting.host': {
    'en': 'Host ( ${host} )',
    'vi': 'Máy chủ ( ${host} )',
    'zh-TW': '主機 ( ${host} )',
  },
  'modal.api-setting.name': {
    'en': 'API Name',
    'vi': 'Tên API',
    'zh-TW': 'API 名稱',
  },
  'modal.api-setting.desc': {
    'en': 'Description',
    'vi': 'Mô tả',
    'zh-TW': '描述',
  },
  'modal.api-setting.priority': {
    'en': 'Priority',
    'vi': 'Độ ưu tiên',
    'zh-TW': '優先度',
  },
  'modal.api-setting.request': {
    'en': 'Request',
    'vi': 'Yêu cầu',
    'zh-TW': '請求',
  },
  'modal.api-setting.endpoint': {
    'en': 'Endpoint',
    'vi': 'Điểm cuối',
    'zh-TW': '端點',
  },
  'modal.api-setting.color': {
    'en': 'Color',
    'vi': 'Màu sắc',
    'zh-TW': '顏色',
  },
  'modal.api-setting.http-method': {
    'en': 'HTTP Method',
    'vi': 'Phương thức HTTP',
    'zh-TW': 'HTTP 方法',
  },
  'modal.api-setting.is-auth-api': {
    'en': 'Auto-set token after successful request?',
    'vi': 'Tự động cài đặt token sau khi yêu cầu thành công?',
    'zh-TW': '請求成功後自動設置令牌？',
  },
  'modal.api-setting.mode': {
    'en': 'Mode',
    'vi': 'Chế độ',
    'zh-TW': '模式',
  },
  'modal.api-setting.ref': {
    'en': 'Reference API',
    'vi': 'Tham chiếu đến API',
    'zh-TW': '參考 API',
  },
  'modal.api-setting.ref.prefix': {
    'en': 'API Name',
    'vi': 'Tên API',
    'zh-TW': 'API 名稱',
  },
  'modal.api-setting.ref.none': {
    'en': 'None',
    'vi': 'Không chỉ định',
    'zh-TW': '無',
  },
  'modal.api-setting.call-after': {
    'en': 'Call Again After (ms)',
    'vi': 'Gọi lại sau (ms)',
    'zh-TW': '再次呼叫 (毫秒)',
  },
  'modal.api-list.empty': {
    'en': 'No APIs found. Please add a new API.',
    'vi': 'Không tìm thấy API nào. Vui lòng thêm API mới.',
    'zh-TW': '未找到任何 API。請添加新的 API。',
  },
  'modal.api-list.add-new': {
    'en': 'Add New API',
    'vi': 'Thêm API mới',
    'zh-TW': '新增 API',
  },
  'modal.api-list.api-name': {
    'en': 'API Name',
    'vi': 'Tên API',
    'zh-TW': 'API 名稱',
  },
  'modal.api-list.api-description': {
    'en': 'API Description',
    'vi': 'Mô tả API',
    'zh-TW': 'API 描述',
  },
  'modal.api-list.api-color': {
    'en': 'API Color',
    'vi': 'Màu sắc API',
    'zh-TW': 'API 顏色',
  },
  'modal.api-list.api-action': {
    'en': 'Actions',
    'vi': 'Hành động',
    'zh-TW': '操作',
  },
  'modal.api-list.filter.search': {
    'en': 'Search',
    'vi': 'Tìm kiếm',
    'zh-TW': '搜索',
  },
  'modal.api-list.filter-all': {
    'en': 'All',
    'vi': 'Tất cả',
    'zh-TW': '全部',
  },
  'modal.api-list.filter.mode-api': {
    'en': 'API',
    'vi': 'API',
    'zh-TW': 'API',
  },
  'modal.api-list.filter.mode-hub': {
    'en': 'HUB',
    'vi': 'HUB',
    'zh-TW': 'HUB',
  },
  'modal.api-list.filter.mode-hub_method': {
    'en': 'HUB Method',
    'vi': 'HUB Phương thức',
    'zh-TW': 'HUB 方法',
  },
  'modal.api-list.filter.method': {
    'en': 'Method',
    'vi': 'Phương thức',
    'zh-TW': '方法',
  },
  'modal.api-list.order-by': {
    'en': 'Order By',
    'vi': 'Sắp xếp theo',
    'zh-TW': '排序方式',
  },
  'modal.api-list.order-by.name': {
    'en': 'Name',
    'vi': 'Tên',
    'zh-TW': '名稱',
  },
  'modal.api-list.order-by.endpoint': {
    'en': 'Endpoint',
    'vi': 'Điểm cuối',
    'zh-TW': '端點',
  },
  'modal.api-list.order-by.priority': {
    'en': 'Priority',
    'vi': 'Thuật tố',
    'zh-TW': '優先順序',
  },
  'modal.api-list.order-by.color': {
    'en': 'Color',
    'vi': 'Màu sắc',
    'zh-TW': '顏色',
  },
  'modal.api-list.order-by.mode': {
    'en': 'Mode',
    'vi': 'Chế độ',
    'zh-TW': '模式',
  },
  'modal.api-list.order-by.method': {
    'en': 'Method',
    'vi': 'Phương thức',
    'zh-TW': '方法',
  },
  'modal.api-list.order-by.createdAt': {
    'en': 'Created At',
    'vi': 'Ngày tạo',
    'zh-TW': '創建時間',
  },
  'modal.api-list.order-by.updatedAt': {
    'en': 'Updated At',
    'vi': 'Ngày cập nhật',
    'zh-TW': '更新時間',
  },
  'modal.api-list.order-by.asc': {
    'en': 'Ascending',
    'vi': 'Tăng dần',
    'zh-TW': '升序',
  },
  'modal.api-list.order-by.desc': {
    'en': 'Descending',
    'vi': 'Giảm dần',
    'zh-TW': '降序',
  },
  'modal.api-list-item.endpoint-to': {
    'en': 'To',
    'vi': 'Đến',
    'zh-TW': '至',
  },
  'modal.api-list-item.mode.api': {
    'en': 'API',
    'vi': 'API',
    'zh-TW': 'API',
  },
  'modal.api-list-item.mode.hub': {
    'en': 'HUB',
    'vi': 'HUB',
    'zh-TW': 'HUB',
  },
  'modal.api-list-item.mode.hub_method': {
    'en': 'HUB METHOD',
    'vi': 'HUB METHOD',
    'zh-TW': 'HUB 方法',
  },
  'modal.api-setting.success-event': {
    'en': 'Success Event',
    'vi': 'Sự kiện thành công',
    'zh-TW': '成功事件',
  },
  'modal.env-setting.name': {
    'en': 'Environment Name',
    'vi': 'Tên môi trường',
    'zh-TW': '環境名稱',
  },
  'validation.required': {
    'en': 'This field is required.',
    'vi': 'Trường này là bắt buộc.',
    'zh-TW': '此欄位為必填。',
  },
  'validation.invalid-url': {
    'en': 'Invalid URL format.',
    'vi': 'Định dạng URL không hợp lệ.',
    'zh-TW': '無效的 URL 格式。',
  },
  'validation.invalid-http-method': {
    'en': 'Invalid HTTP method.',
    'vi': 'Phương thức HTTP không hợp lệ.',
    'zh-TW': '無效的 HTTP 方法。',
  },
  'validation.invalid-color': {
    'en': 'Invalid color selection.',
    'vi': 'Lựa chọn màu không hợp lệ.',
    'zh-TW': '無效的顏色選擇。',
  },
  'validation.invalid-json': {
    'en': 'Invalid JSON format.',
    'vi': 'Định dạng JSON không hợp lệ.',
    'zh-TW': '無效的 JSON 格式。',
  },
  'validation.invalid-env-name': {
    'en': 'Invalid environment name. Must start with a letter and contain only letters, numbers, and underscores.',
    'vi': 'Tên môi trường không hợp lệ. Phải bắt đầu bằng chữ cái và chỉ chứa chữ cái, số và dấu gạch dưới.',
    'zh-TW': '無效的環境名稱。必須以字母開頭，並且只能包含字母、數字和下劃線。',
  },
  'validation.missing-replacer': {
    'en': 'Missing environment variables: ${0}',
    'vi': 'Thiếu biến môi trường: ${0}',
    'zh-TW': '缺少環境變數：${0}',
  },
  'validation.duplicate-field': {
    'en': 'This field is duplicated.',
    'vi': 'Trường này bị trùng lặp.',
    'zh-TW': '此欄位重複。',
  },
  'validation.invalid-value': {
    'en': 'Invalid value.',
    'vi': 'Giá trị không hợp lệ.',
    'zh-TW': '無效的值。',
  },
  'validation.invalid-number': {
    'en': 'Invalid number.',
    'vi': ' Số không hợp lệ.',
    'zh-TW': '無效的數字。',
  },
  'message.fetch-api.endpoint-empty': {
    'en': 'No API endpoint provided.',
    'vi': 'Không có điểm cuối API được cung cấp.',
    'zh-TW': '未提供 API 端點。',
  },
  'message.fetch-api.success': {
    'en': 'API fetched successfully.',
    'vi': 'Gọi API thành công.',
    'zh-TW': 'API 獲取成功。',
  },
  'message.fetch-api.fetch-error': {
    'en': 'Failed to fetch API.',
    'vi': 'Gọi API thất bại.',
    'zh-TW': '無法獲取 API。',
  },
  'message.fetch-api.swagger-not-found': {
    'en': 'Swagger UI instance not found.',
    'vi': 'Không tìm thấy instance Swagger UI.',
    'zh-TW': '未找到 Swagger UI 實例。',
  },
  'message.api-response.empty': {
    'en': 'No API response available.',
    'vi': 'Không có phản hồi API nào.',
    'zh-TW': '無 API 回應。',
  },
  'message.save-changes.env.success': {
    'en': 'Environment settings saved successfully.',
    'vi': 'Cài đặt môi trường đã được lưu thành công.',
    'zh-TW': '環境設定已成功保存。',
  },
  'message.save-changes.api-setting.success': {
    'en': 'API settings saved successfully.',
    'vi': 'Cài đặt API đã được lưu thông.',
    'zh-TW': 'API 設定已成功保存。',
  },
  'message.save-changes.variable.success': {
    'en': 'Environment variable saved successfully.',
    'vi': 'Biến môi trường đa được lưu thông.',
    'zh-TW': '環境變數已成功保存。',
  },
  'message.save-changes.fail': {
    'en': 'Failed to save changes.',
    'vi': 'Lưu thay đổi thất bại.',
    'zh-TW': '保存更改失敗。',
  },
});

/**
 * Translate a key to the current language.
 * @param {string} key The translation key
 * @param {string} [defaultValue] The default value to return if the key is not found in the translations
 * @returns {string} The translated text or the default value if the key is not found
 */
export function t(key, defaultValue = key) {
  const language = getLanguage();
  const translation = translate[key] && translate[key][language];

  return translation ?? defaultValue;
}

/**
 * Gets the current language from local storage.
 * @returns {string} The current language
 */
function getLanguage() {
  const storedLanguage = localStorage.getItem('juntool-lang');
  const language = config.supportedLanguages.includes(storedLanguage) ? storedLanguage : config.defaultLang;

  return language;
}
