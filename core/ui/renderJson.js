// ==============================
// File: RenderJson.js
// Description: Contains functions for rendering JSON data
// Copyright (c) 2025. Jun Dev
// ==============================

/**
 * Renders JSON data into a human-readable format with collapsible sections.
 * @param {Object|Array} jsonData - The JSON data to render.
 * @returns {HTMLDivElement} - The container with formatted JSON.
 */
export function renderJsonFormattedStrict(jsonData) {
  const jsonViewer = document.createElement('div');
  jsonViewer.className = 'json-viewer';

  /**
   * Recursively renders JSON data into HTML elements.
   * @param {any} jsonValue - The current JSON value to render.
   * @param {number} depth - The current depth in the JSON structure.
   * @returns {HTMLElement[]} - Array of HTML elements representing the JSON structure.
   */
  function renderJson(jsonValue, depth) {
    const jsonLines = [];

    if (Array.isArray(jsonValue)) {
      jsonLines.push(makeLine('[', depth));

      jsonValue.forEach((item, index) => {
        const childLines = renderJson(item, depth + 1);
        const lastLine = childLines[childLines.length - 1];
        if (lastLine) {
          lastLine.appendChild(document.createTextNode(index < jsonValue.length - 1 ? ',' : ''));
        }
        jsonLines.push(...childLines);
      });

      jsonLines.push(makeLine(']', depth));
      return jsonLines;
    }

    if (typeof jsonValue === 'object' && jsonValue !== null) {
      jsonLines.push(makeLine('{', depth));

      const keys = Object.keys(jsonValue);
      keys.forEach((key, index) => {
        const line = makeLine('', depth + 1);

        const keySpan = document.createElement('span');
        keySpan.className = 'key';
        keySpan.textContent = `"${key}"`;
        line.appendChild(keySpan);
        line.appendChild(document.createTextNode(': '));

        const jsonPropertyValue = jsonValue[key];

        if (typeof jsonPropertyValue === 'object' && jsonPropertyValue !== null) {
          jsonLines.push(line);
          const childLines = renderJson(jsonPropertyValue, depth + 1);
          const last = childLines[childLines.length - 1];
          if (last) last.appendChild(document.createTextNode(index < keys.length - 1 ? ',' : ''));
          jsonLines.push(...childLines);
        } else {
          const valSpan = document.createElement('span');
          valSpan.className = 'value ' + getTypeClass(jsonPropertyValue);
          valSpan.textContent = formatValue(jsonPropertyValue);
          valSpan.title = valSpan.textContent;
          valSpan.classList.add('copyable');
          line.appendChild(valSpan);
          line.appendChild(document.createTextNode(index < keys.length - 1 ? ',' : ''));
          jsonLines.push(line);
        }
      });

      jsonLines.push(makeLine('}', depth));
      return jsonLines;
    }

    const jsonLine = makeLine('', depth);
    const valSpan = document.createElement('span');
    valSpan.className = 'value ' + getTypeClass(jsonValue);
    valSpan.textContent = formatValue(jsonValue);
    valSpan.title = valSpan.textContent;
    valSpan.classList.add('copyable');
    jsonLine.appendChild(valSpan);
    return [jsonLine];
  }

  /**
   * Creates a line element with padding based on depth.
   * @param {string} text - The text to display in the line.
   * @param {number} depth - The depth level for indentation.
   * @returns {HTMLDivElement} - The created line element.
   */
  function makeLine(text, depth) {
    const div = document.createElement('div');
    div.style.paddingLeft = depth * 16 + 'px';
    if (text) div.textContent = text;
    return div;
  }

  /**
   * Formats a JSON value for display.
   * @param {any} jsonValue - The value to format.
   * @returns {string} - The formatted value as a string.
   */
  function formatValue(jsonValue) {
    if (jsonValue === null) return 'null';
    if (typeof jsonValue === 'string') return `"${jsonValue}"`;
    if (typeof jsonValue === 'boolean') return jsonValue ? 'true' : 'false';
    return String(jsonValue);
  }

  /**
   * Determines the CSS class for a given value type.
   * @param {any} jsonValue - The value to determine the class for.
   * @returns {string} - The CSS class name for the value type.
   */
  function getTypeClass(jsonValue) {
    if (jsonValue === null) return 'null';
    switch (typeof jsonValue) {
      case 'string': return 'string';
      case 'number': return 'number';
      case 'boolean': return 'boolean';
      default: return '';
    }
  }

  // Render and attach all lines to the container
  const jsonLines = renderJson(jsonData, 0);
  jsonLines.forEach(line => jsonViewer.appendChild(line));
  return jsonViewer;
}
