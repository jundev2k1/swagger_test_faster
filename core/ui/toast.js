// =============================================
// File: Toast.js
// Description: Contains functions for Toast UI
// Copyright (c) 2025. Jun Dev
// ============================================

import { $ } from "../utils/helpers.js";

/**
 * Toast types
 * @readonly
 * @enum {string}
 */
export const toastType = Object.freeze({
  Success: 'success',
  Warn: 'warning',
  Error: 'error',
  Info: 'info',
});

/**
 * Toast messages
 */
export class Toast {
  /**
   * Get toast container
   * @returns {HTMLElement} Toast container
   */
  get container() {
    return $('#jun-tool #toast-container');
  }

  /**
   * Show toast
   * @param {toastType} type Toast type
   * @param {string} message Message
   * @param {number} duration Duration
   */
  show(type, message, duration) {
    const toast = document.createElement('div');
    toast.className = `jun-toast ${type}`;
    toast.textContent = message;

    toast.style.setProperty('--hide-delay', `${duration}ms`);

    this.container?.appendChild(toast);
    const totalDuration = duration + 300;
    setTimeout(() => {
      toast.remove();
    }, totalDuration + 100);
  }

  /**
   * Show success toast
   * @param {string} message Message
   * @param {number} duration Duration
   */
  static success(message, duration = 3000) {
    new Toast().show(toastType.Success, message, duration);
  }

  /**
   * Show warning toast
   * @param {string} message Message
   * @param {number} duration Duration
   */
  static warning(message, duration = 3000) {
    new Toast().show(toastType.Warn, message, duration);
  }

  /**
   * Show error toast
   * @param {string} message Message
   * @param {number} duration Duration
   */
  static error(message, duration = 3000) {
    new Toast().show(toastType.Error, message, duration);
  }

  /**
   * Show info toast
   * @param {string} message Message
   * @param {number} duration Duration
   */
  static info(message, duration = 3000) {
    new Toast().show(toastType.Info, message, duration);
  }
}
