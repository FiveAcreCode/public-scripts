// ==UserScript==
// @name         Shopify Admin Tweaks
// @namespace    https://fiveacrecode.com/
// @version      0.6.0
// @description  Small Shopify Admin control panel for optional UI tweaks.
// @author       Five Acre Code
// @license      MIT
// @homepageURL  https://fiveacrecode.github.io/public-scripts/shopify-admin-tweaks/
// @supportURL   https://github.com/FiveAcreCode/public-scripts/issues
// @match        https://admin.shopify.com/*
// @grant        none
// @run-at       document-idle
// @downloadURL  https://raw.githubusercontent.com/FiveAcreCode/public-scripts/main/scripts/shopify-admin/userscripts/shopify-admin-tweaks/shopify-admin-tweaks.user.js
// @updateURL    https://raw.githubusercontent.com/FiveAcreCode/public-scripts/main/scripts/shopify-admin/userscripts/shopify-admin-tweaks/shopify-admin-tweaks.user.js
// ==/UserScript==

(function () {
  'use strict';

  const KEY = 'fac-shopify-admin-tweaks';

  let stored = {};

  try {
    stored = JSON.parse(localStorage.getItem(KEY) || '{}');
  } catch {
    stored = {};
  }

  const settings = {
    open: false,
    hideSidekick: false,
    ...stored,
  };

  function save() {
    localStorage.setItem(KEY, JSON.stringify(settings));
  }

  const style = document.createElement('style');

  style.textContent = `
    /*
     * Sidekick
     *
     * Shopify currently uses a data attribute for Sidekick fields and a
     * generated GlobalRibbonContainer class for the floating prompt. The class
     * fallback can change when Shopify updates Admin, so both are kept narrow.
     */
    html.fac-hide-sidekick [data-sidekick-field],
    html.fac-hide-sidekick div[class^="_GlobalRibbonContainer"],
    html.fac-hide-sidekick div[class*=" _GlobalRibbonContainer"] {
      display: none !important;
    }

    /*
     * Five Acre Code Admin Tools
     */
    #fac-admin-tools {
      position: fixed;
      right: 14px;
      bottom: 14px;
      z-index: 999999;

      font:
        13px -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        Roboto,
        Helvetica,
        Arial,
        sans-serif;

      color: #202223;
    }

    #fac-tool-button {
      width: 34px;
      height: 34px;
      padding: 0;

      display: flex;
      align-items: center;
      justify-content: center;

      border: 1px solid #bbb;
      border-radius: 50%;

      background: #fff;

      box-shadow:
        0 2px 4px rgba(0, 0, 0, 0.08),
        0 3px 10px rgba(0, 0, 0, 0.12);

      cursor: pointer;
    }

    #fac-tool-button:hover {
      background: #f6f6f7;
    }

    #fac-tool-button svg {
      width: 25px;
      height: 25px;
      display: block;
    }

    #fac-tool-panel {
      display: none;

      position: absolute;
      right: 0;
      bottom: 42px;

      width: 200px;

      padding: 11px 12px;

      background: #fff;

      border: 1px solid #c9cccf;
      border-radius: 9px;

      box-shadow:
        0 4px 10px rgba(0, 0, 0, 0.08),
        0 8px 20px rgba(0, 0, 0, 0.12);
    }

    #fac-admin-tools.open #fac-tool-panel {
      display: block;
    }

    .fac-panel-title {
      margin-bottom: 10px;

      font-size: 12px;
      font-weight: 600;

      color: #616161;
    }

    .fac-row {
      display: flex;
      align-items: center;
      justify-content: space-between;

      gap: 12px;
    }

    .fac-label {
      flex: 1;
    }

    .fac-description {
      margin-top: 2px;

      font-size: 11px;
      line-height: 1.3;

      color: #6d7175;
    }

    /*
     * Small toggle
     */
    .fac-toggle {
      position: relative;

      width: 34px;
      height: 20px;

      flex: 0 0 auto;
    }

    .fac-toggle input {
      position: absolute;
      opacity: 0;

      width: 0;
      height: 0;
    }

    .fac-slider {
      position: absolute;
      inset: 0;

      background: #babfc3;

      border-radius: 20px;

      cursor: pointer;

      transition: background 0.15s ease;
    }

    .fac-slider::before {
      content: "";

      position: absolute;

      width: 16px;
      height: 16px;

      left: 2px;
      top: 2px;

      background: #fff;

      border-radius: 50%;

      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);

      transition: transform 0.15s ease;
    }

    .fac-toggle input:checked + .fac-slider {
      background: #2e7d5b;
    }

    .fac-toggle input:checked + .fac-slider::before {
      transform: translateX(14px);
    }
  `;

  document.head.appendChild(style);

  const root = document.createElement('div');
  root.id = 'fac-admin-tools';

  root.innerHTML = `
    <button
      id="fac-tool-button"
      type="button"
      title="Five Acre Code admin tools"
      aria-label="Five Acre Code admin tools"
      aria-expanded="false"
      aria-controls="fac-tool-panel"
    >
      <svg
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <!-- Bottom layer -->
        <polygon
          points="156,304 256,354 256,419 156,369"
          fill="#161B20"
        />
        <polygon
          points="256,354 356,304 356,369 256,419"
          fill="#2C323A"
        />
        <polygon
          points="156,304 256,254 356,304 256,354"
          fill="#20252B"
        />

        <!-- Middle green layer -->
        <polygon
          points="156,224 256,274 256,339 156,289"
          fill="#1E5740"
        />
        <polygon
          points="256,274 356,224 356,289 256,339"
          fill="#3A8B68"
        />
        <polygon
          points="156,224 256,174 356,224 256,274"
          fill="#2E7D5B"
        />

        <!-- Top stone layer -->
        <polygon
          points="156,144 256,194 256,259 156,209"
          fill="#ABB0AA"
        />
        <polygon
          points="256,194 356,144 356,209 256,259"
          fill="#D7DAD5"
        />
        <polygon
          points="156,144 256,94 356,144 256,194"
          fill="#C9CDC8"
        />
      </svg>
    </button>

    <div id="fac-tool-panel">
      <div class="fac-panel-title">
        Shopify Admin Controls
      </div>

      <div class="fac-row">
        <div class="fac-label">
          <div>Hide Sidekick prompt</div>
          <div class="fac-description">
            Hide Shopify's floating Sidekick field
          </div>
        </div>

        <label class="fac-toggle">
          <input
            id="fac-hide-sidekick"
            type="checkbox"
            aria-label="Hide Shopify's floating Sidekick field"
          >
          <span class="fac-slider"></span>
        </label>
      </div>
    </div>
  `;

  document.body.appendChild(root);

  const button = root.querySelector('#fac-tool-button');
  const checkbox = root.querySelector('#fac-hide-sidekick');

  function apply() {
    root.classList.toggle('open', settings.open);
    button.setAttribute('aria-expanded', String(settings.open));

    document.documentElement.classList.toggle(
      'fac-hide-sidekick',
      settings.hideSidekick,
    );

    checkbox.checked = settings.hideSidekick;
  }

  button.addEventListener('click', (event) => {
    event.stopPropagation();

    settings.open = !settings.open;

    save();
    apply();
  });

  checkbox.addEventListener('change', () => {
    settings.hideSidekick = checkbox.checked;

    save();
    apply();
  });

  /*
   * Close the little panel when clicking elsewhere.
   */
  document.addEventListener('click', (event) => {
    if (settings.open && !root.contains(event.target)) {
      settings.open = false;

      save();
      apply();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && settings.open) {
      settings.open = false;

      save();
      apply();
      button.focus();
    }
  });

  apply();
})();
