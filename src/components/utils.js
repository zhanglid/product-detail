import numeral from "numeral";
export const dollar = value => `$ ${numeral(value).format("0,0.00")}`;
