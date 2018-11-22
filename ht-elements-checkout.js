"use strict";
import { LitElement, html } from "@polymer/lit-element";
import "@polymer/paper-button";
import "@polymer/paper-tooltip";
import "./ht-elements-checkout-order-completed.js";
import "./ht-elements-checkout-details.js";
import {
  // callTestHTTPFunction,
  callFirebaseHTTPFunction
} from "@01ht/ht-client-helper-functions";

class HTElementsCheckout extends LitElement {
  render() {
    const { data, balance, paymentMethod, loading, loadingText } = this;
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
        border: 3px solid #ddd;
        background: #fafafa;
        color: #424242;
        box-sizing: border-box;
        position:relative;
      }

      .payment-button[selected] {
        background: #fff;
        border: 3px solid var(--accent-color);
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

      [hidden] {
        display:none;
      }
    </style>
    <div id="container">
      ${
        loading
          ? html`<ht-spinner page text=${loadingText}></ht-spinner>`
          : null
      }
      ${
        data && data.completed && !loading
          ? html`
            <ht-elements-checkout-order-completed .data=${data}></ht-elements-checkout-order-completed>
          `
          : null
      }
      ${
        data && !data.completed && !loading
          ? html`
            <h1 class="mdc-typography--headline5">Оплата</h1>
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
            <paper-tooltip ?hidden=${data &&
              data.amount >
                balance}>Недостаточно средств</paper-tooltip></paper-button>
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
          : null
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
      loading: { type: Boolean },
      loadingText: { type: String }
    };
  }

  firstUpdated() {
    if (this.data && !this.data.completed) {
      this._handleOrder(this.data.orderId);
    }
  }

  _changePaymentMethod(paymentMethod) {
    if (this.paymentMethod === paymentMethod) {
      this.paymentMethod = undefined;
    } else {
      this.paymentMethod = paymentMethod;
    }
  }

  async _pay() {
    this.loading = true;
    let orderId = this.data.orderId;
    let paymentMethod = this.paymentMethod;
    if (paymentMethod === "card") {
      await this._payViaCard(orderId);
    }
    if (paymentMethod === "balance") {
      await this._payViaBalance(orderId);
    }
    this._handleOrder(orderId);
  }

  async _payViaCard(orderId) {
    let bankPaymentPageURL = await this._registerOrderInBank(orderId);
    await this.handlePaymentSystemOrder(orderId);
    // location = "yandex.payment.url"
    // let response = await callFirebaseHTTPFunction({
    //   name: "httpsOrdersPayOrderViaBalance",
    //   authorization: true,
    //   options: {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //       orderId: orderId
    //     })
    //   }
    // });
    // if (response.error) throw new Error(response.error);
  }

  async _registerOrderInBank(orderId) {
    this.loadingText = "Подготовка платежной системы";
    let response = await callFirebaseHTTPFunction({
      name: "httpsOrdersRegisterOrderInBank",
      authorization: true,
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          orderId: orderId
        })
      }
    });
    if (response.error) throw new Error(response.error);
    return response.paymentSystemOrderId;
  }

  async handlePaymentSystemOrder(orderId) {
    this.loading = true;
    this.loadingText = "Проверка оплаты заказа";
    // location = "yandex.payment.url";
    let response = await callFirebaseHTTPFunction({
      name: "httpsOrdersHandlePaymentSystemOrder",
      authorization: true,
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          orderId: orderId
        })
      }
    });
    if (response.error) throw new Error(response.error);
  }

  async _payViaBalance(orderId) {
    this.loadingText = "Оплата заказа";
    let response = await callFirebaseHTTPFunction({
      name: "httpsOrdersPayOrderViaBalance",
      authorization: true,
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          orderId: orderId
        })
      }
    });
    if (response.error) throw new Error(response.error);
  }

  async _handleOrder(orderId) {
    try {
      this.loading = true;
      this.loadingText = "Обработка заказа";
      let response = await callFirebaseHTTPFunction({
        name: "httpsOrdersHandleOrderIndex",
        authorization: true,
        options: {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            orderId: orderId
          })
        }
      });
      this.loading = false;
      if (response.code === 1) {
        this.dispatchEvent(
          new CustomEvent("on-clear-cart", {
            bubbles: true,
            composed: true
          })
        );
      }
      // if (response.error) throw new Error(response.error);
    } catch (error) {
      this.loading = false;
    }
  }
}

customElements.define(HTElementsCheckout.is, HTElementsCheckout);
