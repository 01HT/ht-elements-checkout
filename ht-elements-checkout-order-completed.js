"use strict";
import { LitElement, html } from "@polymer/lit-element";
import "@polymer/iron-iconset-svg/iron-iconset-svg.js";
import "@polymer/iron-icon/iron-icon.js";

class HTElementsCheckoutOrderCompleted extends LitElement {
  render() {
    const { data } = this;
    return html`
    ${SharedStyles}
        <style>
        :host {
            display: flex;
            position: relative;
            box-sizing: border-box;
        }

        /* a {
            color:inherit;
            text-decoration: none;
        } */

        iron-icon {
            width: 12vw;
            height: auto;
            max-width: 96px;
            min-width: 96px;
            color: var(--accent-color);
        }

        #container {
            display:flex;
            align-items:center;
            flex-direction:column;
            margin: 32px auto 32px auto;
        }

        #text {
            margin-top:16px;
        }

        #sub {
            text-align:center;
            margin: 8px 0 16px 0;
            font-size: 16px;
            color: var(--secondary-text-color);
        }
    </style>
    <iron-iconset-svg size="24" name="ht-elements-checkout-order-completed">
      <svg>
        <defs>
            <g id="check-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></g>
        </defs>
      </svg>
    </iron-iconset-svg>
    <div id="container">
        <iron-icon icon="ht-elements-checkout-order-completed:check-circle"></iron-icon>
        <div id="text" class="mdc-typography--headline5">Заказ №${
          data ? data.orderNumber : null
        } выполнен</div>
        <div id="sub-text">
          <div id="sub">${
            data && data.ordertypeId === "v2m2Mq3clhUhyeex5Xkp"
              ? html`Приобретенные лицензии находятся в разделе <a href="/my-licenses">Мои лицензии</a>`
              : null
          }</div>
        </div>
    </div>
`;
  }

  static get is() {
    return "ht-elements-checkout-order-completed";
  }

  static get properties() {
    return {
      data: { type: Object }
    };
  }
}

customElements.define(
  HTElementsCheckoutOrderCompleted.is,
  HTElementsCheckoutOrderCompleted
);
