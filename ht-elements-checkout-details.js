"use strict";
import { LitElement, html } from "@polymer/lit-element";
import "@01ht/ht-image";
import "@polymer/iron-iconset-svg/iron-iconset-svg.js";
import "@polymer/iron-icon/iron-icon.js";
import "@polymer/iron-collapse";
import "./ht-elements-checkout-details-order-info";

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

      .order-id {
        font-size :16px;
        font-weight: 500;
        margin: 16px 0 8px 0;
      }

      .amount .value {
        font-weight: 500;
        color: var(--accent-color);
      }

      #header {
        display: flex;
        justify-content: space-between;
        align-items:center;
        font-size: 18px;
        max-width: 160px;
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
          </defs>
      </svg>
    </iron-iconset-svg>
    ${
      data
        ? html`
        <div id="container">
            <div id="header" @click=${_ => {
              this.toggle();
            }}><div>Детали заказа</div><iron-icon icon="ht-elements-orders-item:${
            opened ? "expand-less" : "expand-more"
          }"></iron-icon></div>
          <iron-collapse ?opened=${opened}>
            <div class="order-id">ID заказа: <span class="value">${
              data.orderId
            }</span></div>
            <ht-elements-checkout-details-order-info .items=${
              data.items
            }></ht-elements-checkout-details-order-info>
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
