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
      /* === Utility: Comments for clarity, no functional changes === */
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
    const fit = this.config.fit === "fit" ? "fit" : "noscale";
    const align = this.config.align === "center" ? "center" : "left";
    const wrapperClass = `comic-block ${fit} ${align}`;
    const containerClass = `container ${align}${fit === "noscale" ? " noscale" : ""}`;
    if (fit === "noscale") {
      if (align === "center") {
        return html`
          <div class="center-align">
            <div class="image-wrapper">
              <div class="shadow-host">
                <div class="shadow-left"></div>
                <div class="shadow-right"></div>
              </div>
              <div class="${containerClass}">
                <div class="comic-block noscale ${align}">
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
          <div class="image-wrapper">
            <div class="shadow-host">
              <div class="shadow-left"></div>
              <div class="shadow-right"></div>
            </div>
            <div class="${containerClass}">
              <div class="comic-block noscale ${align}">
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
      fit: "noscale",
      align: "left"
    };
  }
}
customElements.define("comic-card", ComicCard);

// --- Editor ---
class ComicCardEditor extends LitElement {
  static get properties() {
    return { hass: {}, config: {} };
  }
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
  render() {
    if (!this.config) return html``;
    return html`
      <input
        type="text"
        .value=${this.config.entity || ""}
        @input=${e => {
          this.config = { ...this.config, entity: e.target.value };
          this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this.config } }));
        }}
        placeholder="image.your_entity"
      />
      <select
        .value=${this.config.fit || "noscale"}
        @change=${e => {
          this.config = { ...this.config, fit: e.target.value };
          this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this.config } }));
        }}
      >
        <option value="noscale">No scaling</option>
        <option value="fit">Fit</option>
      </select>
      <select
        .value=${this.config.align || "left"}
        @change=${e => {
          this.config = { ...this.config, align: e.target.value };
          this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this.config } }));
        }}
      >
        <option value="left">Left</option>
        <option value="center">Center</option>
      </select>
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