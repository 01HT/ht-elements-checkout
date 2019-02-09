"use strict";
import { LitElement, html, css } from "lit-element";
import "@polymer/paper-button";

import "./ht-elements-checkout-payment-method-changer.js";
import "./ht-elements-checkout-order-completed.js";
import "./ht-elements-checkout-details.js";
import {
  // callTestHTTPFunction,
  callFirebaseHTTPFunction
} from "@01ht/ht-client-helper-functions";

class HTElementsCheckout extends LitElement {
  static styles = [
    window.SharedStyles,
    css`<style>
      :host {
        display: block;
        position: relative;
        box-sizing: border-box;
      }

      h2 {
        margin: 0;
        font-size: 18px;
      }

      .card ht-elements-checkout-payment-method-changer {
        padding: 0;
      }

      #container {
        max-width: 600px;
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
    </style>`
  ];

  render() {
    const { data, loading, loadingText, paymentType } = this;
    return html`
    <div id="container">
      ${
        loading
          ? html`<ht-spinner page text="${loadingText}"></ht-spinner>`
          : null
      }
      ${
        data && data.completed && !loading
          ? html`
            <ht-elements-checkout-order-completed .data="${data}"></ht-elements-checkout-order-completed>
          `
          : null
      }
      ${
        data && !data.completed && !loading
          ? html`
            <h1 class="mdc-typography--headline5">Оплата</h1>
        <div id="settings" class="card">
          <ht-elements-checkout-payment-method-changer .paymentType="${paymentType}"></ht-elements-checkout-payment-method-changer>
          <div class="separator"></div>
          <div id="order-details">
            <ht-elements-checkout-details .data="${data}"></ht-elements-checkout-details>
          </div>
          <div class="separator"></div>
          <div id="amount">
            <div id="total-text">Всего:</div><div id="total"><span class="dollar">$</span>${
              data ? data.amount : null
            }</div>
          </div>
          <div class="separator"></div>
          <div class="actions">
            <paper-button raised @click="${this._pay}">Оплатить</paper-button>
          </div>
        </div>`
          : null
      }
    </div>
`;
  }

  static get properties() {
    return {
      data: { type: Object },
      loading: { type: Boolean },
      loadingText: { type: String },
      paymentType: { type: String }
    };
  }

  shouldUpdate(changedProperties) {
    if (changedProperties.has("data")) {
      if (this.data && this.data.paymentObject) {
        this.paymentType = this.data.paymentObject.payment_method.type;
        this._handlePayment(this.data.paymentObject.id);
      } else {
        this.paymentType = "bank_card";
      }
    }
    return true;
  }

  get paymentTypeBlock() {
    return this.shadowRoot.querySelector(
      "ht-elements-checkout-payment-method-changer"
    );
  }

  async _pay() {
    try {
      this.loading = true;
      this.loadingText = "Подготовка платежной системы";
      let orderId = this.data.orderId;
      let paymentMethod = this.paymentTypeBlock.paymentType;
      let response = await callFirebaseHTTPFunction({
        name: "httpsOrdersCreatePayment",
        authorization: true,
        options: {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            orderId: orderId,
            paymentType: paymentMethod
          })
        }
      });
      let paymentPageURL = response.confirmation.confirmation_url;
      window.location = paymentPageURL;
    } catch (error) {
      console.log("_pay: " + error.message);
      this.loading = false;
    }
  }

  async _handlePayment(paymentId) {
    try {
      if (
        (this.data && this.data.completed) ||
        this.data.paymentObject === undefined
      )
        return;
      this.loading = true;
      this.loadingText = "Обработка заказа";
      let response = await callFirebaseHTTPFunction({
        name: "httpsOrdersHandlePayment",
        authorization: true,
        options: {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            paymentId: paymentId
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
    } catch (error) {
      this.loading = false;
    }
  }
}

customElements.define("ht-elements-checkout", HTElementsCheckout);
