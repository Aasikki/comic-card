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
        width: 100%;
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
      label {
        text-transform: capitalize;
      }

      /* === Utility: Comments for clarity, no functional changes === */
    `;
  }
  setConfig(config) {
    if (!config.entity) throw new Error("Entity required");
    // Expect scaling as nested object: { mode: "limit_height" | "fit" | "noscale", height?: number }
    const scalingCfg = (config.scaling && typeof config.scaling === "object")
      ? {
          mode: config.scaling.mode || "limit_height",
          height: config.scaling.height !== undefined ? Number(config.scaling.height) : 250
        }
      : { mode: "limit_height", height: 250 };

    // Normalize legacy `align` to `alignment`
    const normalized = { ...config, scaling: scalingCfg };
    if (config.align !== undefined && normalized.alignment === undefined) {
      normalized.alignment = config.align;
      delete normalized.align;
    }

    this.config = normalized;
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

    // scaling is a nested object { mode, height }
    const scalingCfg = (this.config.scaling && typeof this.config.scaling === "object")
      ? this.config.scaling
      : { mode: "noscale" };
    const scalingMode = scalingCfg.mode || "noscale";

    const alignment = this.config.alignment === "center" ? "center" : "left";
    // map scaling to CSS class: use 'limit' class for 'limit_height' to keep existing styles
    const classMode = (scalingMode === "limit_height") ? "limit" : scalingMode;
    // treat both noscale and limit_height as "noscale" for container behavior (scrolling + shadows)
    const containerClass = `container ${alignment}${(scalingMode === "noscale" || scalingMode === "limit_height") ? " noscale" : ""}`;

    // compute height (default 250) when using limit_height
    const heightVal = (scalingMode === "limit_height") ? (Number(scalingCfg.height || 250) || 250) : null;
    const limitStyle = scalingMode === "limit_height" ? `--limit-height: ${heightVal}px;` : "";

    if (scalingMode === "noscale" || scalingMode === "limit_height") {
      if (alignment === "center") {
        return html`
          <div class="center-align">
            <div class="image-wrapper ${classMode}" style="${limitStyle}">
              <div class="shadow-host">
                <div class="shadow-left"></div>
                <div class="shadow-right"></div>
              </div>
              <div class="${containerClass}">
                <div class="comic-block ${classMode} ${alignment}">
                   <a class="${classMode}" href="${src}" target="_blank" rel="noopener noreferrer">
                     <img class="${classMode}" src="${src}" alt="${alt}" />
                   </a>
                 </div>
               </div>
             </div>
           </div>
         `;
      } else {
        return html`
          <div class="image-wrapper ${classMode}" style="${limitStyle}">
             <div class="shadow-host">
               <div class="shadow-left"></div>
               <div class="shadow-right"></div>
             </div>
             <div class="${containerClass}">
               <div class="comic-block ${classMode} ${alignment}">
                 <a class="${classMode}" href="${src}" target="_blank" rel="noopener noreferrer">
                   <img class="${classMode}" src="${src}" alt="${alt}" />
                 </a>
               </div>
             </div>
           </div>
         `;
       }
    } else {
      // FIT MODE
      if (alignment === "center") {
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
      scaling: { mode: "limit_height", height: 250 },
      alignment: "left"
    };
  }
}
customElements.define("comic-card", ComicCard);

// --- Editor ---
class ComicCardEditor extends LitElement {
  static get properties() { return { hass: {}, config: {} }; }

  setConfig(config) {
    // Ensure scaling is nested object in editor state as well
    const scalingCfg = (config.scaling && typeof config.scaling === "object")
      ? { mode: config.scaling.mode || "limit_height", height: config.scaling.height !== undefined ? Number(config.scaling.height) : 250 }
      : { mode: "limit_height", height: 250 };

    // Normalize legacy `align` to `alignment` for the editor
    const normalized = { ...config, scaling: scalingCfg };
    if (config.align !== undefined && normalized.alignment === undefined) {
      normalized.alignment = config.align;
      delete normalized.align;
    }

    this.config = normalized;
  }

  set hass(hass) {
    this._hass = hass;
    this.requestUpdate();
  }
  get hass() {
    return this._hass;
  }

  _onFormValueChanged(e) {
    const value = e.detail.value || {};
    // Merge form values then ensure scaling becomes nested object { mode, height }
    const merged = { ...this.config, ...value };

    const selectedMode = value.scaling !== undefined
      ? value.scaling
      : (this.config.scaling && this.config.scaling.mode) || "limit_height";

    const selectedHeight = value.height !== undefined
      ? value.height
      : (this.config.scaling && this.config.scaling.height);

    merged.scaling = { mode: selectedMode };
    if (selectedHeight !== undefined) merged.scaling.height = Number(selectedHeight);

    // store only nested height (remove flat height) and legacy 'align'
    delete merged.height;
    if (merged.align !== undefined) delete merged.align;

    this.config = merged;
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: merged } }));
  }

  render() {
    if (!this.config || !this.hass) return html``;

    // Build schema dynamically so Height is only present when 'limit_height' is selected.
    const scalingVal = (this.config.scaling && this.config.scaling.mode) || "limit_height";
    const schema = [
      { name: "entity", required: true, selector: { entity: { domain: ["image"] } } },
      {
        name: "scaling",
        selector: {
          select: {
            options: [
              { value: "limit_height", label: "Height limited" },
              { value: "fit", label: "Fit" },
              { value: "noscale", label: "No scaling" }
            ]
          }
        }
      },
    ];

    if (scalingVal === "limit_height") {
      schema.push({ name: "height", selector: { number: { min: 1 } } });
    }

    schema.push({
      name: "alignment",
      selector: {
        select: {
          options: [
            { value: "left", label: "Left" },
            { value: "center", label: "Center" }
          ]
        }
      }
    });

    // Form data: provide scaling.mode as simple select value and height separately
    const formData = {
      ...this.config,
      scaling: scalingVal,
      height: (this.config.scaling && this.config.scaling.height),
      alignment: this.config.alignment
    };

    return html`
      <ha-form
        .hass=${this.hass}
        .schema=${schema}
        .data=${formData}
        @value-changed=${this._onFormValueChanged}
      ></ha-form>
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