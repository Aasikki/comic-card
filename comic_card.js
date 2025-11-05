import { LitElement, html, css } from "https://unpkg.com/lit-element/lit-element.js?module";

class ComicCard extends LitElement {
  static get properties() {
    return { hass: {}, config: {} };
  }
  static get styles() {
    return css`
      /* === Card Container === */
      .container {
        padding: 2px 4px;
        margin-bottom: var(--row-gap);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        overflow: hidden;
        gap: 8px;
      }
      .content:hover ha-icon-next {
        transform: translateX(calc(4px * var(--scale-direction)));
      }
      .container .content {
        flex: 1 0 fill;
        min-width: 100px;
      }
      .container .content:not(:has(p)) {
        min-width: fit-content;
      }
      .container .badges {
        flex: 0 0;
      }
      .content {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 8px;
        color: var(--ha-heading-card-title-color, var(--primary-text-color));
        font-size: var(--ha-heading-card-title-font-size, var(--ha-font-size-l));
        font-weight: var(--ha-heading-card-title-font-weight, var(--ha-font-weight-normal));
        line-height: var(--ha-heading-card-title-line-height, var(--ha-line-height-normal));
        letter-spacing: 0.1px;
        --mdc-icon-size: 18px;
      }
      .content ha-icon,
      .content ha-icon-next {
        display: flex;
        flex: none;
      }
      .content p {
        margin: 0;
        font-style: normal;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex-shrink: 1;
        min-width: 0;
      }
      .content.subtitle {
        color: var(--ha-heading-card-subtitle-color, var(--secondary-text-color));
        font-size: var(--ha-heading-card-subtitle-font-size, var(--ha-font-size-m));
        font-weight: var(--ha-heading-card-subtitle-font-weight, var(--ha-font-weight-medium));
        line-height: var(--ha-heading-card-subtitle-line-height, var(--ha-line-height-condensed));
      }
      .badges {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        gap: 4px 10px;
      }

      /* === Host & Variables === */
      :host {
        display: block;
        position: relative;
        --mdc-icon-size: 18px;
      }
      /* === Layout Containers (only those still used) === */
      .center-align {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
      }
      .container {
        width: 100%;
      }
      .container.center { text-align: center; }
      .container.left { text-align: left; }
      .container.noscale {
        overflow-x: auto;
        scrollbar-width: none;
        width: 100%;
        border-radius: 0 !important;
        margin: 0 calc(var(--ha-view-sections-row-gap, 16px) * -1);
        padding: 0 var(--ha-view-sections-row-gap, 16px);
        position: relative;
        background: transparent;
      }
      .comic-block {
        /* base styles */
      }
      .comic-block.fit.center {
        width: 100%;
        margin: 0 auto;
      }
      .comic-block.noscale.center {
        width: max-content;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
      .comic-block.fit.left {
        width: 100%;
        margin: 0;
        display: block;
      }
      .comic-block.noscale.left {
        width: max-content;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
      .comic-outer.center {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
      }
      .comic-outer.left {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
      }
      .comic-center-wrapper.center {
        width: 100%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .comic-center-wrapper.left {
        width: 100%;
        margin: 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
      .image-wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: max-content;
        max-width: 100%;
      }
      .image-wrapper.fit {
        width: 100%;
        max-width: 100%;
        align-items: stretch;
      }
      .image-wrapper.fit.left {
        width: 100%;
        max-width: 100%;
        align-items: flex-start;
      }

      /* === Height limited option (behaves like noscale but locks height to var(--limit-height,250px)) === */
      .image-wrapper.limit {
        height: var(--limit-height, 250px);
        max-height: var(--limit-height, 250px);
      }
      .comic-block.limit {
        height: var(--limit-height, 250px);
        max-height: var(--limit-height, 250px);
      }
      a.limit {
        display: inline-block;
        height: var(--limit-height, 250px);
        max-height: var(--limit-height, 250px);
      }
      img.limit {
        height: var(--limit-height, 250px);
        max-height: var(--limit-height, 250px);
        width: auto;
        display: block;
        object-fit: contain;
      }

      /* === Utility & Effects (still used) === */
      .overflow-wrapper {
        position: static;
      }
      .shadow-host {
        position: absolute;
        top: 0;
        left: calc(var(--ha-view-sections-row-gap, 16px) * -1);
        right: calc(var(--ha-view-sections-row-gap, 16px) * -1);
        height: 100%;
        pointer-events: none;
        z-index: 10;
      }
      .shadow-left, .shadow-right {
        position: absolute;
        top: 0;
        width: var(--ha-view-sections-row-gap, 16px);
        height: 100%;
        pointer-events: none;
        opacity: 1;
      }
      .shadow-left {
        left: 0;
        background: linear-gradient(
          to right,
          rgba(0,0,0,0.18) 0%,
          rgba(0,0,0,0.12) 30%,
          rgba(0,0,0,0.06) 60%,
          transparent 100%
        );
      }
      .shadow-right {
        right: 0;
        background: linear-gradient(
          to left,
          rgba(0,0,0,0.18) 0%,
          rgba(0,0,0,0.12) 30%,
          rgba(0,0,0,0.06) 60%,
          transparent 100%
        );
      }
      .hide-shadow {
        opacity: 0 !important;
      }
      /* === Elements (still used) === */
      a {
        text-decoration: none;
        margin: 0;
        padding: 0;
        border: 0;
      }
      a.fit {
        display: block;
        width: 100%;
      }
      a.noscale {
        display: inline-block;
        width: auto;
        vertical-align: top;
      }
      img {
        margin: 0;
        padding: 0;
        border: 0;
        display: block;
      }
      img.fit {
        width: 100%;
        height: auto;
        display: block;
      }
      img.noscale {
        width: auto;
        height: auto;
        display: block;
      }

      /* Simple editor label styles */
      .editor-row {
        display: flex;
        flex-direction: column;
        gap: 6px;
        margin: 6px 0;
      }
      .editor-row label {
        font-size: 12px;
        color: var(--secondary-text-color);
      }
      .editor-row .controls {
        display: flex;
        gap: 8px;
        align-items: center;
      }

      /* Editor: grid layout to match HA look; labels left, controls right */
      .editor-grid {
        display: grid;
        grid-template-columns: 110px 1fr;
        column-gap: 20px;
        row-gap: 14px;
        align-items: center;
        margin: 14px 0;
      }
      .editor-grid label {
        justify-self: end;
        font-size: 13px;
        color: var(--secondary-text-color);
      }
      .editor-grid .controls {
        display: flex;
        gap: 14px;
        align-items: center;
        width: 100%;
      }

      /* scaling + height inline */
      .scaling-controls {
        display: flex;
        gap: 12px;
        align-items: center;
        width: 100%;
      }
      .scaling-controls select {
        min-width: 170px;
        flex: 1 1 auto;
      }
      .scaling-controls .height-input {
        width: 120px;
        flex: 0 0 120px;
      }

      /* make entity picker / selects expand nicely */
      .editor-grid ha-entity-picker,
      .editor-grid select,
      .editor-grid mwc-textfield {
        width: 100%;
      }
      /* disabled appearance */
      mwc-textfield[disabled] { opacity: 0.6; }

      /* === Utility: Comments for clarity, no functional changes === */

      /* Collapsible section styling (using native <details> to be robust)
         Reworked to more closely match Home Assistant editor sections:
         - boxed header with subtle divider
         - right-aligned chevron that rotates on open
         - section body separated and padded
      */
      details.section {
        background: transparent;
        margin: 12px 0;
        border-radius: var(--ha-card-border-radius, 8px);
        overflow: visible;
      }

      /* Header that matches Home Assistant editor sections */
      details.section summary {
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        cursor: pointer;
        border-radius: var(--ha-card-border-radius, 8px);
        background: var(--card-background-color, var(--surface, transparent));
        border: 1px solid var(--divider-color, rgba(0,0,0,0.08));
        color: var(--primary-text-color);
        font-weight: 500;
        gap: 12px;
        transition: background .12s ease, border-color .12s ease;
      }
      details.section summary:hover {
        background: rgba(0,0,0,0.02);
      }

      /* hide default marker for consistency across browsers */
      details.section summary::-webkit-details-marker { display: none; }
      details.section summary::marker { font-size: 0; }

      /* title on the left, chevron on the right */
      details.section summary .title {
        font-size: 14px;
        color: var(--primary-text-color);
      }
      details.section summary .chev {
        color: var(--secondary-text-color);
        transition: transform .15s ease-in-out, color .12s ease;
        transform: rotate(0deg);
        font-size: 12px;
        line-height: 1;
      }
      details.section[open] summary .chev {
        transform: rotate(90deg);
        color: var(--primary-text-color);
      }

      /* section body visually separated and padded like stock editors */
      details.section .section-body {
        padding: 12px 12px;
        margin-top: 8px;
        border: 1px solid var(--divider-color, rgba(0,0,0,0.08));
        border-radius: calc(var(--ha-card-border-radius, 8px) - 2px);
        background: var(--card-background-color, transparent);
      }

      /* ensure ha-form inside sections takes full width */
      details.section ha-form {
        width: 100%;
        display: block;
      }
    `;
  }
  setConfig(config) {
    if (!config.entity) throw new Error("Entity required");
    this.config = {
      ...config,
    };
  }
  firstUpdated() {
    this._updateShadows();
    const container = this.renderRoot.querySelector('.container.noscale');
    if (container) {
      container.addEventListener('scroll', () => this._updateShadows());
      window.addEventListener('resize', () => this._updateShadows());
    }
  }
  updated() {
    this._updateShadows();
  }
  _updateShadows() {
    const container = this.renderRoot.querySelector('.container.noscale');
    const leftShadow = this.renderRoot.querySelector('.shadow-left');
    const rightShadow = this.renderRoot.querySelector('.shadow-right');
    if (!container || !leftShadow || !rightShadow) return;
    const hasOverflow = container.scrollWidth > container.clientWidth + 1;
    leftShadow.classList.toggle('hide-shadow', !hasOverflow || container.scrollLeft <= 2);
    rightShadow.classList.toggle('hide-shadow', !hasOverflow || (container.scrollLeft + container.clientWidth >= container.scrollWidth - 2));
  }
  render() {
    if (!this.hass || !this.config) return html``;
    const stateObj = this.hass.states[this.config.entity];
    const src = stateObj?.attributes?.entity_picture || "";
    const alt = stateObj?.attributes?.friendly_name || this.config.entity;
    // allow three fit modes: "fit", "noscale" and new "limit"
    const fit = (this.config.fit === "fit" || this.config.fit === "limit") ? this.config.fit : "noscale";
    const align = this.config.align === "center" ? "center" : "left";
    const wrapperClass = `comic-block ${fit} ${align}`;
    // treat both noscale and limit as "noscale" for container behavior (scrolling + shadows)
    const containerClass = `container ${align}${(fit === "noscale" || fit === "limit") ? " noscale" : ""}`;

    // compute limit height (default 250)
    const limitHeight = (fit === "limit") ? (Number(this.config.limit_height) || 250) : null;
    const limitStyle = fit === "limit" ? `--limit-height: ${limitHeight}px;` : "";

    if (fit === "noscale" || fit === "limit") {
      if (align === "center") {
        return html`
          <div class="center-align">
            <div class="image-wrapper ${fit}" style="${limitStyle}">
              <div class="shadow-host">
                <div class="shadow-left"></div>
                <div class="shadow-right"></div>
              </div>
              <div class="${containerClass}">
                <div class="comic-block ${fit} ${align}">
                  <a class="${fit}" href="${src}" target="_blank" rel="noopener noreferrer">
                    <img class="${fit}" src="${src}" alt="${alt}" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        `;
      } else {
        return html`
          <div class="image-wrapper ${fit}" style="${limitStyle}">
            <div class="shadow-host">
              <div class="shadow-left"></div>
              <div class="shadow-right"></div>
            </div>
            <div class="${containerClass}">
              <div class="comic-block ${fit} ${align}">
                <a class="${fit}" href="${src}" target="_blank" rel="noopener noreferrer">
                  <img class="${fit}" src="${src}" alt="${alt}" />
                </a>
              </div>
            </div>
          </div>
        `;
      }
    } else {
      // FIT MODE
      if (align === "center") {
        return html`
          <div class="center-align">
            <div class="image-wrapper fit">
              <div class="comic-block fit center">
                <div class="container center">
                  <a class="fit" href="${src}" target="_blank" rel="noopener noreferrer">
                    <img class="fit" src="${src}" alt="${alt}" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        `;
      } else {
        // LEFT ALIGN FIT MODE: image should fill width and be left-aligned
        return html`
          <div class="image-wrapper fit left">
            <div class="comic-block fit left">
              <div class="container left">
                <a class="fit" href="${src}" target="_blank" rel="noopener noreferrer">
                  <img class="fit" src="${src}" alt="${alt}" />
                </a>
              </div>
            </div>
          </div>
        `;
      }
    }
  }
  getCardSize() { return 1; }
  static getConfigElement() {
    return document.createElement("comic-card-editor");
  }
  static getStubConfig(hass) {
    const image = Object.keys(hass.states).find(eid => eid.startsWith("image."));
    return {
      entity: image || "",
      fit: "limit",
      limit_height: 250,
      align: "left"
    };
  }
}
customElements.define("comic-card", ComicCard);

// --- Editor ---
class ComicCardEditor extends LitElement {
  static get properties() { return { hass: {}, config: {} }; }

  setConfig(config) {
    this.config = { ...config };
  }

  set hass(hass) {
    this._hass = hass;
    this.requestUpdate();
  }
  get hass() {
    return this._hass;
  }

  _onSectionChanged(e) {
    if (!e?.detail?.value) return;
    const next = { ...this.config, ...e.detail.value };
    this.config = next;
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: next } }));
  }

  render() {
    if (!this.config || !this.hass) return html``;

    const fitVal = this.config.fit || "limit";

    const contentSchema = [
      { name: "entity", required: true, selector: { entity: { domain: ["image"] } } },
    ];

    const scalingSchema = [
      {
        name: "fit",
        selector: {
          select: {
            options: [
              { value: "limit", label: "Height limited" },
              { value: "fit", label: "Fit" },
              { value: "noscale", label: "No scaling" }
            ]
          }
        }
      }
    ];
    if (fitVal === "limit") {
      scalingSchema.push({ name: "limit_height", selector: { number: { min: 1 } } });
    }

    const positionSchema = [
      {
        name: "align",
        selector: {
          select: {
            options: [
              { value: "left", label: "Left" },
              { value: "center", label: "Center" }
            ]
          }
        }
      }
    ];

    return html`
      <details class="section" open>
        <summary><span class="title">Content</span><span class="chev">▸</span></summary>
        <div class="section-body">
          <ha-form
            .hass=${this.hass}
            .schema=${contentSchema}
            .data=${this.config}
            @value-changed=${this._onSectionChanged}
          ></ha-form>
        </div>
      </details>

      <details class="section" open>
        <summary><span class="title">Scaling</span><span class="chev">▸</span></summary>
        <div class="section-body">
          <ha-form
            .hass=${this.hass}
            .schema=${scalingSchema}
            .data=${this.config}
            @value-changed=${this._onSectionChanged}
          ></ha-form>
        </div>
      </details>

      <details class="section" open>
        <summary><span class="title">Position</span><span class="chev">▸</span></summary>
        <div class="section-body">
          <ha-form
            .hass=${this.hass}
            .schema=${positionSchema}
            .data=${this.config}
            @value-changed=${this._onSectionChanged}
          ></ha-form>
        </div>
      </details>
    `;
  }
}
customElements.define("comic-card-editor", ComicCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "comic-card",
  name: "Comic Card",
  description: "Display comics from image entities",
});