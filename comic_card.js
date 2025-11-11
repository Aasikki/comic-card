import { LitElement, html, css } from "https://unpkg.com/lit-element/lit-element.js?module";

const TRANSLATIONS = {
  en: {
    entity: "Image entity",
    mode: "Scaling",
    limit_height: "Limit height",
    fit: "Fit",
    noscale: "No scale",
    height: "Height (px)",
    alignment: "Alignment",
    left: "Left",
    center: "Center"
  },
  fi: {
    entity: "Kuvaentiteetti",
    mode: "Skaalaus",
    limit_height: "Rajoita korkeus",
    fit: "Sovita",
    noscale: "Ei skaalausta",
    height: "Korkeus (px)",
    alignment: "Tasaus",
    left: "Vasen",
    center: "Keskitetty"
  }
};

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

      /* === Utility: Comments for clarity, no functional changes === */
    `;
  }
  setConfig(config) {
    // Accept dotted keys returned by the form editor (e.g. "scaling.mode")
    const expanded = this._expandConfigDots(config || {});

    if (!expanded.entity) throw new Error("Entity required");
    // Expect scaling as nested object: { mode: "limit_height" | "fit" | "noscale", height?: number }
    const scalingCfg = (expanded.scaling && typeof expanded.scaling === "object")
      ? {
          mode: expanded.scaling.mode || "limit_height",
          height: expanded.scaling.height !== undefined ? Number(expanded.scaling.height) : 250
        }
      : { mode: "limit_height", height: 250 };

    // Normalize legacy `align` to `alignment`
    const normalized = { ...expanded, scaling: scalingCfg };
    if (expanded.align !== undefined && normalized.alignment === undefined) {
      normalized.alignment = expanded.align;
      delete normalized.align;
    }

    this.config = normalized;
  }

  // Helper to expand dotted keys into nested objects so the editor's output is accepted.
  _expandConfigDots(obj) {
    const out = {};
    for (const [key, value] of Object.entries(obj || {})) {
      if (!key.includes(".")) {
        out[key] = value;
        continue;
      }
      const parts = key.split(".");
      let cur = out;
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (i === parts.length - 1) {
          cur[part] = value;
        } else {
          if (cur[part] === undefined || typeof cur[part] !== "object") cur[part] = {};
          cur = cur[part];
        }
      }
    }
    return out;
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

  // Removed static getConfigElement so Home Assistant uses static getConfigForm()
  // (previously returned a custom editor which prevented the built-in form editor
  // from being shown)

  // Helper method to find comic-related image entities
  static findComicEntities(hass) {
    return Object.keys(hass.states).filter(eid => 
      eid.startsWith("image.") && (
        // Known comic integrations
        eid === "image.daily_fingerpori" ||
        // Generic comic-related names
        eid.includes("comic") || 
        eid.includes("strip") || 
        eid.includes("webcomic") ||
        eid.includes("daily_comic") ||
        eid.includes("garfield") ||
        eid.includes("xkcd") ||
        eid.includes("garfield") ||
        eid.includes("dilbert") ||
        eid.includes("calvin_and_hobbes") ||
        eid.includes("peanuts") ||
        eid.includes("web_comic")
      )
    );
  }

  static getStubConfig(hass, options = {}) {
    const comicEntities = ComicCard.findComicEntities(hass);
    // Prefer daily_fingerpori if it exists, otherwise use the first comic entity found
    const preferredEntity = hass.states["image.daily_fingerpori"] ? "image.daily_fingerpori" : comicEntities[0];
    
    // If no comic entities are found, fall back to any image entity
    const fallbackEntity = preferredEntity || Object.keys(hass.states).find(eid => eid.startsWith("image."));
    
    // Detect if this is for preview mode by checking the call stack or using a hint
    const isPreview = options.preview || (new Error().stack && new Error().stack.includes('preview')) || false;
    
    return {
      entity: fallbackEntity || "",
      scaling: { 
        mode: isPreview ? "fit" : "limit_height", 
        height: 250 
      },
      alignment: "left"
    };
  }

  // Add Home Assistant built-in form editor support (nested `scaling` object instead of dotted keys)
  static getConfigForm() {
    // Determine language: use only the page / Home Assistant language (<html lang="">).
    // Fall back to English if not present.
    const lang = (typeof document !== "undefined" && document.documentElement?.lang)
      ? document.documentElement.lang.split("-")[0]
      : "en";
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;

    // small helper to get translation for option labels or fall back to English
    const t = (keyOrDefault) => {
      // if key exists in dict return it, otherwise if passed a string not a key return it
      if (typeof keyOrDefault === "string" && dict[keyOrDefault]) return dict[keyOrDefault];
      return keyOrDefault;
    };

    return {
      schema: [
        // Restrict entity picker to image entities only
        { name: "entity", required: true, selector: { entity: { domain: "image" } } },
        {
          name: "scaling",
          type: "grid",
          schema: [
            {
              name: "mode",
              selector: {
                select: {
                  options: [
                    { value: "limit_height", label: t("limit_height") },
                    { value: "fit", label: t("fit") },
                    { value: "noscale", label: t("noscale") }
                  ]
                }
              }
            },
            {
              name: "height",
              selector: { number: {} }
            }
          ]
        },
        {
          type: "grid",
          name: "",
          schema: [
            {
              name: "alignment",
              selector: {
                select: {
                  options: [
                    { value: "left", label: t("left") },
                    { value: "center", label: t("center") }
                  ]
                }
              }
            }
          ]
        }
      ],
      computeLabel: (schema) => {
        switch (schema.name) {
          case "entity":
            return dict.entity;
          case "mode":
            return dict.mode;
          case "height":
            return dict.height;
          case "alignment":
            return dict.alignment;
        }
        return undefined;
      },
      assertConfig: (config) => {
        if (!config || !config.entity) {
          throw new Error("Entity is required");
        }
        if (config.scaling && typeof config.scaling !== "object") {
          throw new Error("scaling must be an object");
        }
        if (
          config.scaling &&
          config.scaling.mode === "limit_height" &&
          (config.scaling.height === undefined || Number(config.scaling.height) <= 0)
        ) {
          throw new Error("scaling.height must be a positive number when using limit_height");
        }
      }
    };
  }
}
customElements.define("comic-card", ComicCard);

window.customCards = window.customCards || [];

// Simple approach: register without preview initially, then check for comics and re-register if needed
const registerComicCard = () => {
  // First, register without preview
  window.customCards.push({
    type: "comic-card",
    name: "Comic Card",
    preview: false,
    description: "Display comics from image entities like daily_fingerpori, xkcd, garfield, etc.",
  });

  // Function to check for comics and update registration
  const checkForComics = () => {
    // Try to find Home Assistant object in various ways
    let hass = null;
    
    // Method 1: Direct window access
    if (window.hass && window.hass.states) {
      hass = window.hass;
    }
    // Method 2: Connection object
    else if (window.hassConnection?.conn?._hass?.states) {
      hass = window.hassConnection.conn._hass;
    }
    // Method 3: Look for hass in document elements
    else {
      const homeAssistant = document.querySelector('home-assistant');
      if (homeAssistant && homeAssistant.hass && homeAssistant.hass.states) {
        hass = homeAssistant.hass;
      }
    }

    if (hass && hass.states) {
      const comicEntities = ComicCard.findComicEntities(hass);
      if (comicEntities.length > 0) {
        // Remove the old registration and add a new one with preview enabled
        const cardIndex = window.customCards.findIndex(card => card.type === "comic-card");
        if (cardIndex !== -1) {
          window.customCards.splice(cardIndex, 1);
        }
        window.customCards.push({
          type: "comic-card",
          name: "Comic Card",
          preview: true,
          description: "Display comics from image entities",
        });
        return true; // Found comics, stop checking
      }
    }
    return false; // No comics found or hass not available yet
  };

  // Try checking immediately
  if (!checkForComics()) {
    // If not found immediately, try a few more times with delays
    let attempts = 0;
    const maxAttempts = 10;
    const checkInterval = setInterval(() => {
      attempts++;
      if (checkForComics() || attempts >= maxAttempts) {
        clearInterval(checkInterval);
      }
    }, 1000);
  }
};

registerComicCard();
