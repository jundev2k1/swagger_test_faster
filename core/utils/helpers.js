// =============================================
// File: helpers.js
// Description: Contains helper functions
// Copyright (c) 2025. Jun Dev
// ============================================

import { config } from "../../config.js";
import { Store } from "../data/index.js";

/**
 * Get the first element that matches the selector.
 * @param {string} selector DOM Selector 
 * @returns {Element|null} The first element that matches the selector or null if no elements match.
 */
export function $(selector = '') {
  return document.querySelector(selector);
}

/**
 * Get all elements that match the selector.
 * @param {string} selector DOM Selector
 * @returns {NodeList} A NodeList of elements that match the selector.
 */
export function $$(selector = '') {
  return document.querySelectorAll(selector) || [];
}

/**
 * Try to parse a JSON string and return the parsed object.
 * @param {string} jsonString JSON string to parse 
 * @returns {Object|null} The parsed object if successful, or null if parsing fails.
 */
export function tryParseJSON(jsonString, defaultValue = null) {
  try {
    return JSON.parse(jsonString) || defaultValue;
  } catch (e) {
    console.error("Error parsing JSON:", e);
    return defaultValue;
  }
}

/**
 * Escapes special characters in a string for use in HTML.
 * @param {string} str The input string to escape.
 * @returns {string} The escaped string.
 */
export function escapeHTML(str) {
  if (typeof str !== "string") return str;
  return str
    // Escape ampersands
    .replace(/&/g, "&amp;")
    // Escape double quotes
    .replace(/"/g, "&quot;")
    // Escape single quotes
    .replace(/'/g, "&#39;")
    // Escape angle brackets
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Attempts to extract the pathname from a given URL.
 * @param {string} url The URL string from which to extract the pathname.
 * @returns {string} The pathname of the URL, or the original URL if invalid.
 */
export function tryGetUrlPath(url = '') {
  try {
    // Attempt to create a URL object and extract its pathname
    const result = new URL(url).pathname;
    return result;
  } catch {
    // Return the original URL if it is not a valid URL
    return url;
  }
}

// ================================================
// Cookie Functions
// ================================================

/**
 * Resolve variables in an array, object or string with cookie pattern.
 * @param {[] | {} | string} input Input array, object or string
 * @returns {string} Resolved input
 */
export function resolveObjectCookiePattern(input) {
  const convert = (obj) => Object.fromEntries(
    Object.entries(obj).map(([key, val]) => [
      key,
      typeof val === 'string' ? resolveCookiePattern(val, '') :
        typeof val === 'number' ? resolveCookiePattern(val.toString(), 0) :
          typeof val === 'boolean' ? resolveCookiePattern(val.toString(), false) : val,
    ])
  );

  switch (typeof input) {
    case 'object':
      return Array.isArray(input)
        ? input.map(convert)
        : convert(input);

    case 'string':
      return resolveVars(input);

    default:
      return input;
  }
}

/**
 * Resolve cookie pattern
 * @param {string} input Input string to resolve variables 
 */
export function resolveCookiePattern(input, defaultValue = '') {
  return input.replace(/@@(.*?)@@/g, (_, key) => {
    const raw = getTempCookie(key);
    if (!raw) return defaultValue;
    try {
      const decoded = decodeURIComponent(escape(atob(raw)));
      return decoded;
    } catch (e) {
      return defaultValue;
    }
  });
}
/**
 * Set temporary cookie
 * @param {string} key Cookie key
 * @param {string} value Cookie value
 */
export function setTempCookie(key, value) {
  const encoded = btoa(unescape(encodeURIComponent(value)));
  const expire = new Date(Date.now() + config.tempCookieExpiry).toUTCString();
  document.cookie = `${config.tempCookieKey}${key}=${encoded}; expires=${expire}; path=/`;
}

/**
 * Get temporary cookie
 * @param {string} name Cookie name
 * @returns {string} Cookie value
 */
export function getTempCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + config.tempCookieKey + name + "=([^;]+)"));
  return match ? match[2] : '';
}

/**
 * Bind events to the page elements.
 * @param {string} input Input string to resolve variables
 * @returns {string} Resolved input string with environment variables replaced
 */
export function resolveVars(input = '') {
  if (!input || !Store.envReplacer || Store.envReplacer.length === 0) return input;

  let result = input;
  for (const [name, value] of Store.envReplacer) {
    const regex = new RegExp(`\\$\\{${name}\\}`, 'g');
    result = result.replace(regex, value);
  }
  return result;
}

/**
 * Resolve variables in an array, object or string.
 * @param {[] | {} | string} input Input array, object or string
 * @returns {string} Resolved input
 */
export function resolveObjectVars(input) {
  const convert = (obj) => Object.fromEntries(
    Object.entries(obj).map(([key, val]) => [
      key,
      typeof val === 'string' ? resolveVars(val) : val,
    ])
  );

  switch (typeof input) {
    case 'object':
      return Array.isArray(input)
        ? input.map(convert)
        : convert(input);

    case 'string':
      return resolveVars(input);

    default:
      return input;
  }
}
