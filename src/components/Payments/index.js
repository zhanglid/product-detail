import React from "react";
import "./style.css";

/* maestro sofortbanking mastercard tef casein ideal mp balance p24 qiwi yandex cash safetypay
visa webmoney tt boleto doku giropay ban amex mir paypal */

const Payments = ({ methods = [] }) => (
  <ul style={{ listStyle: "disc" }} className="payment-logo-method">
    {methods.map((name, index) => (
      <li key={index} className={`payment-${name}`} />
    ))}
  </ul>
);

export default Payments;
