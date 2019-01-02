"use strict";
import { LitElement, html } from "@polymer/lit-element";
import "@polymer/iron-iconset-svg/iron-iconset-svg.js";
import "@polymer/iron-icon/iron-icon.js";
import "@polymer/iron-collapse";
import "@01ht/ht-elements-orders/ht-elements-orders-item-details.js";

class HTElementsCheckoutDetails extends LitElement {
  render() {
    const { data, opened } = this;
    return html`
    ${SharedStyles}
    <style>
      :host {
        display: flex;
        position: relative;
        box-sizing:border-box;
      }

      #container {
          display:flex;
          flex-direction: column;
          width: 100%;
      }

      .value {
        color: var(--secondary-text-color);
      }

      #number, #status {
        font-size :14px;
        font-weight: 500;
        line-height: 24px;
      }

      #status {
        display:flex;
        align-items:center;
        line-height: 16px;
        margin: 4px 0;
      }

      #status iron-icon {
        width: 16px;
        height: 16px;
        color: var(--secondary-text-color);
        margin: 0 2px;
      }

      .amount .value {
        font-weight: 500;
        color: var(--accent-color);
      }

      #header {
        display: flex;
        justify-content: space-between;
        align-items:center;
        font-size: 14px;
        max-width: 130px;
        width: 100%;
        color: var(--accent-color);
        font-weight: 500;
        cursor:pointer;
        user-select: none;
      }
    </style>
    <iron-iconset-svg size="24" name="ht-elements-orders-item">
      <svg>
          <defs>
            <g id="expand-less"><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"></path></g>
            <g id="expand-more"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></g>
            <g id="access-time"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></g>
          </defs>
      </svg>
    </iron-iconset-svg>
    ${
      data
        ? html`
        <div id="container">
          <div id="number">№ заказа: <span class="value">${
            data.orderNumber
          }</span></div>
            <div id="status">Статус: <iron-icon icon="ht-elements-orders-item:access-time"></iron-icon><span class="value">${
              data ? data.statusText : null
            }</span></div>
            <div id="header" @click=${_ => {
              this.toggle();
            }}><div>Детали заказа</div><iron-icon icon="ht-elements-orders-item:${
            opened ? "expand-less" : "expand-more"
          }"></iron-icon></div>
          <iron-collapse ?opened=${opened}>
            <ht-elements-orders-item-details .items=${
              data.items
            }></ht-elements-orders-item-details>
            </iron-collapse>
        </div>`
        : null
    }
`;
  }

  static get is() {
    return "ht-elements-checkout-details";
  }

  static get properties() {
    return {
      data: { type: Object },
      opened: { type: Boolean }
    };
  }

  toggle() {
    this.opened = !this.opened;
  }
}

customElements.define(HTElementsCheckoutDetails.is, HTElementsCheckoutDetails);
