"use strict";
import { LitElement, html } from "@polymer/lit-element";
import "@polymer/paper-button";
import "@polymer/paper-ripple";
import "./ht-elements-checkout-details.js";

class HTElementsCheckout extends LitElement {
  render() {
    const { data, balance, paymentMethod, iframeMode } = this;
    return html`
    ${SharedStyles}
    <style>
      :host {
        display: block;
        position: relative;
        box-sizing: border-box;
      }

      h2 {
        margin: 0;
        font-size: 18px;
      }

      #container {
        max-width: 800px;
        margin: auto;
      }

      .card {
        font-size: 14px;
        position:relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-radius:3px;
        background: #fff;
        overflow:hidden;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
      }

      .card > * {
        padding: 16px;
      }

      .card .separator {
        background: #ddd;
        height: 1px;
        padding: 0;
      }

      #payment-method {
        display: flex;
        flex-wrap: wrap;
        justify-content:space-between;
        position: relative;
        padding-top: 0;
      }

      .payment-button {
        text-align: center;
        display:flex;
        flex-direction: column;
        align-items:center;
        justify-content:center;
        border-radius: 6px;
        text-transform: none;
        padding: 24px 8px 16px 8px;
        width: calc(50% - 8px);
        position: relative;
        border: 1px solid #ddd;
        background: #fafafa;
        color: #424242;
      }

      .payment-button[selected] {
        background: #fff;
        border: 1px solid var(--accent-color);
      }

      .payment-button[disabled] {
        filter: grayscale(1);
      }

      .payment-button img {
        width: 48px;
        height: 48px;
      }

      .payment-text {
        margin-top: 8px;
        font-size: 16px;
        line-height: 1.3;
      }

      .payment-button span {
        margin-top: 8px;
        font-size: 14px;
        color: var(--secondary-text-color);
      }

      #amount, .actions {
        display:flex;
        justify-content: flex-end;
        align-items: center;
      }

      .actions {
        background: #fafafa;
      }

      #total-text {
        font-size: 18px;
        color: var(--secondary-text-color);
        margin-right: 8px;
      }

      #total {
        display:flex;
        align-items:center;
        font-size: 20px;
        font-weight: 500;
      }

      span.dollar {
        margin-right: 2px;
        font-size: 14px;
        color: var(--secondary-text-color);
      }

      iframe {
        height: 600px;
        overflow: auto;
      }

      #bank-iframe {
        overflow: auto;
      }
    </style>
    <div id="container">
      <h1 class="mdc-typography--headline5">Оплата</h1>
      ${
        !iframeMode
          ? html`
        <div id="settings" class="card">
          <div id="choose-method">
            <h2 class="mdc-typography--headline6">Выберите способ оплаты</h2>
          </div>
          <div id="payment-method">
            <paper-button id="bank-card" class="payment-button" ?selected=${paymentMethod ==
              "card"} @click=${_ => {
              this._changePaymentMethod("card");
            }}>
              <img src="https://res.cloudinary.com/cdn-01ht/image/upload/v1542287537/apps/elements/pages/checkout/card.svg" alt="Bank card payment">
              <div class="payment-text">Банковская карта</div>
            </paper-button>
            <paper-button id="balance" class="payment-button" ?selected=${paymentMethod ==
              "balance"} ?disabled=${data &&
              data.amount > balance} @click=${_ => {
              this._changePaymentMethod("balance");
            }}>
              <img src="https://res.cloudinary.com/cdn-01ht/image/upload/v1530624792/logos/01ht/logo.svg" alt="Bank card payment">
              <div class="payment-text">Баланс 01HT <span>($${balance})</span></div>
            </paper-button>
          </div>
          <div class="separator"></div>
          <div id="order-details">
            <ht-elements-checkout-details .data=${data}></ht-elements-checkout-details>
          </div>
          <div class="separator"></div>
          <div id="amount">
            <div id="total-text">Всего:</div><div id="total"><span class="dollar">$</span>${
              data ? data.amount : null
            }</div>
          </div>
          <div class="separator"></div>
          <div class="actions" ?hidden=${paymentMethod === undefined}>
            <paper-button raised @click=${_ => {
              this._pay();
            }}>Оплатить</paper-button>
          </div>
        </div>`
          : html`<div id="bank-iframe" class="card">
        <iframe src="https://alfabank.ru" frameborder="0"></iframe>
        <div class="separator"></div>
        <div class="actions">
            <paper-button raised @click=${_ => {
              this._back();
            }}>Назад</paper-button>
          </div>
      </div>`
      }
    </div>
`;
  }

  static get is() {
    return "ht-elements-checkout";
  }

  static get properties() {
    return {
      data: { type: Object },
      balance: { type: Number },
      paymentMethod: { type: String },
      iframeMode: { type: Boolean }
    };
  }

  _changePaymentMethod(paymentMethod) {
    this.paymentMethod = paymentMethod;
  }

  _back() {
    this.iframeMode = false;
  }

  _pay() {
    console.log(this.paymentMethod);
    if (this.paymentMethod === "card") {
      this.iframeMode = true;
    }
  }
}

customElements.define(HTElementsCheckout.is, HTElementsCheckout);
