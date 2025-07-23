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
