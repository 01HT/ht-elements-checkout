"use strict";
import { LitElement, html, css } from "lit-element";
import "@polymer/iron-iconset-svg/iron-iconset-svg.js";
import "@polymer/iron-icon/iron-icon.js";
import "@polymer/paper-ripple";

import { styles } from "@01ht/ht-theme/styles";

class HTElementsCheckoutPaymentMethodChanger extends LitElement {
  static get styles() {
    return [
      styles,
      css`
        :host {
          display: flex;
          position: relative;
          box-sizing: border-box;
          width: 100%;
        }

        iron-icon {
          color: var(--accent-color);
          position: absolute;
          right: 16px;
        }

        #dropdown {
          z-index: 9;
          position: absolute;
          left: 0;
          top: 60px;
          right: 0;
          width: 100%;
          height: auto;
          background: #fff;
          box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
            0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.4);
        }

        #container {
          position: relative;
          width: 100%;
        }

        #changer {
          display: flex;
          width: 100%;
          justify-content: space-between;
          position: relative;
          background: #fafafa;
          box-sizing: border-box;
          cursor: pointer;
          height: 60px;
          align-items: center;
          z-index: 10;
        }

        .item {
          display: flex;
          align-items: center;
          justify-content: center;
          text-transform: none;
          height: 60px;
          position: relative;
          border-top: 1px solid #ddd;
          color: #424242;
          box-sizing: border-box;
          cursor: pointer;
        }

        #changer .item {
          border: none;
        }

        .list-dropdown {
          width: 100%;
        }

        .payment-text {
          font-size: 18px;
          margin-left: 10px;
          font-weight: 400;
          letter-spacing: normal;
        }

        img {
          width: auto;
          height: 32px;
        }

        [hidden] {
          display: none;
        }
      `
    ];
  }

  render() {
    const { paymentType, opened } = this;
    return html`
    <iron-iconset-svg size="24" name="ht-elements-checkout-payment-method-changer-icons">
      <svg>
        <defs>
            <g id="keyboard-arrow-down"><path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"></path></g>    
        </defs>
      </svg>
    </iron-iconset-svg>
    <div id="container">
        <div id="changer" @click="${this._open}">
            <div class="list-dropdown">
                <div id="bank-card" class="item" ?hidden="${paymentType !==
                  "bank_card"}">
                    <img src="https://res.cloudinary.com/cdn-01ht/image/upload/v1543955073/apps/elements/pages/checkout/credit-card.svg" alt="Bank card payment">
                    <div class="payment-text">Банковская карта</div>
                    <paper-ripple></paper-ripple>
                    <iron-icon icon="ht-elements-checkout-payment-method-changer-icons:keyboard-arrow-down"></iron-icon>
                </div>
                <div id="yandex_money" class="item" ?hidden="${paymentType !==
                  "yandex_money"}">
                    <img src="https://res.cloudinary.com/cdn-01ht/image/upload/v1543953568/logos/yandexmoney/yandexmoney.svg" alt="Yandex money payment">
                    <paper-ripple></paper-ripple>
                    <iron-icon icon="ht-elements-checkout-payment-method-changer-icons:keyboard-arrow-down"></iron-icon>
                </div>
                <div id="sberbank" class="item" ?hidden="${paymentType !==
                  "sberbank"}">
                    <img src="https://res.cloudinary.com/cdn-01ht/image/upload/v1543955924/apps/elements/pages/checkout/sberbank.svg" alt="Sberbank online payment">
                    <paper-ripple></paper-ripple>
                    <iron-icon icon="ht-elements-checkout-payment-method-changer-icons:keyboard-arrow-down"></iron-icon>
                </div>
                <div id="tinkoff_bank" class="item" ?hidden="${paymentType !==
                  "tinkoff_bank"}">
                    <img src="https://res.cloudinary.com/cdn-01ht/image/upload/v1550393886/apps/elements/pages/checkout/tinkoff.svg" alt="Tinkoff bank online payment">
                    <paper-ripple></paper-ripple>
                    <iron-icon icon="ht-elements-checkout-payment-method-changer-icons:keyboard-arrow-down"></iron-icon>
                </div>
                <div id="qiwi" class="item" ?hidden="${paymentType !== "qiwi"}">
                    <img src="https://res.cloudinary.com/cdn-01ht/image/upload/v1543956380/apps/elements/pages/checkout/qiwi.svg" alt="Qiwi payment">
                    <paper-ripple></paper-ripple>
                    <iron-icon icon="ht-elements-checkout-payment-method-changer-icons:keyboard-arrow-down"></iron-icon>
                </div>
                <div id="webmoney" class="item" ?hidden="${paymentType !==
                  "webmoney"}">
                    <img src="https://res.cloudinary.com/cdn-01ht/image/upload/v1543957056/apps/elements/pages/checkout/webmoney.svg" alt="WebMoney payment">
                    <paper-ripple></paper-ripple>
                    <iron-icon icon="ht-elements-checkout-payment-method-changer-icons:keyboard-arrow-down"></iron-icon>
                </div>
                <div id="cash" class="item" ?hidden="${paymentType !== "cash"}">
                    <img src="https://res.cloudinary.com/cdn-01ht/image/upload/v1543957798/apps/elements/pages/checkout/cash.svg" alt="Cash payment">
                    <paper-ripple></paper-ripple>
                    <div class="payment-text">Наличные</div>
                    <iron-icon icon="ht-elements-checkout-payment-method-changer-icons:keyboard-arrow-down"></iron-icon>
                </div>
            </div>
        </div>
        <div id="dropdown" ?hidden="${!opened}">
            <div class="list-dropdown">
                <div id="bank-card" class="item" ?hidden="${paymentType ===
                  "bank_card"}" @click="${_ => {
      this._change("bank_card");
    }}" @tap="${_ => {
      this._change("bank_card");
    }}">
                    <img src="https://res.cloudinary.com/cdn-01ht/image/upload/v1543955073/apps/elements/pages/checkout/credit-card.svg" alt="Bank card payment">
                    <div class="payment-text">Банковская карта</div>
                    <paper-ripple></paper-ripple>
                </div>
                <div id="yandex_money" class="item" ?hidden="${paymentType ===
                  "yandex_money"}" @click="${_ => {
      this._change("yandex_money");
    }}" @tap="${_ => {
      this._change("yandex_money");
    }}">
                    <img src="https://res.cloudinary.com/cdn-01ht/image/upload/v1543953568/logos/yandexmoney/yandexmoney.svg" alt="Yandex money payment">
                    <paper-ripple></paper-ripple>
                </div>
                <div id="sberbank" class="item" ?hidden="${paymentType ===
                  "sberbank"}" @click=${_ => {
      this._change("sberbank");
    }}" @tap="${_ => {
      this._change("sberbank");
    }}">
                    <img src="https://res.cloudinary.com/cdn-01ht/image/upload/v1543955924/apps/elements/pages/checkout/sberbank.svg" alt="Sberbank online payment">
                    <paper-ripple></paper-ripple>
                </div>
                <div id="tinkoff_bank" class="item" ?hidden="${paymentType ===
                  "tinkoff_bank"}" @click=${_ => {
      this._change("tinkoff_bank");
    }}" @tap="${_ => {
      this._change("tinkoff_bank");
    }}">
                    <img src="https://res.cloudinary.com/cdn-01ht/image/upload/v1550393886/apps/elements/pages/checkout/tinkoff.svg" alt="Tinkoff bank online payment">
                    <paper-ripple></paper-ripple>
                </div>
                <div id="qiwi" class="item" ?hidden="${paymentType ===
                  "qiwi"}" @click="${_ => {
      this._change("qiwi");
    }}" @tap="${_ => {
      this._change("qiwi");
    }}">
                    <img src="https://res.cloudinary.com/cdn-01ht/image/upload/v1543956380/apps/elements/pages/checkout/qiwi.svg" alt="Qiwi payment">
                    <paper-ripple></paper-ripple>
                </div>
                <div id="webmoney" class="item" ?hidden="${paymentType ===
                  "webmoney"}" @click="${_ => {
      this._change("webmoney");
    }}" @tap="${_ => {
      this._change("webmoney");
    }}">
                    <img src="https://res.cloudinary.com/cdn-01ht/image/upload/v1543957056/apps/elements/pages/checkout/webmoney.svg" alt="WebMoney payment">
                    <paper-ripple></paper-ripple>
                </div>
                <div id="cash" class="item" ?hidden="${paymentType ===
                  "cash"}" @click="${_ => {
      this._change("cash");
    }}" @tap="${_ => {
      this._change("cash");
    }}">
                    <img src="https://res.cloudinary.com/cdn-01ht/image/upload/v1543957798/apps/elements/pages/checkout/cash.svg" alt="Cash payment">
                    <paper-ripple></paper-ripple>
                    <div class="payment-text">Наличные</div>
                </div>
            </div>
        </div>
    </div>
`;
  }

  static get properties() {
    return {
      paymentType: { type: String },
      opened: { type: Boolean }
    };
  }

  get menu() {
    return this.shadowRoot.querySelector("#dropdown");
  }

  constructor() {
    super();
    this.paymentType = "bank_card";
  }

  _open() {
    this.opened = !this.opened;
  }

  _close() {
    this.opened = false;
  }

  _change(paymentType) {
    this.paymentType = paymentType;
    this._close();
  }
}

customElements.define(
  "ht-elements-checkout-payment-method-changer",
  HTElementsCheckoutPaymentMethodChanger
);
