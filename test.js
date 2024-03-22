// function give disocunt
function handleDiscount(cart, promocode, disountpecent) {
  let result = 0;
  let maximalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    if (promocode === "promocode" && cart[i].price >= 100000) {
   maximalPrice += cart[i].price > maximalPrice ? maximalPrice : cart[i].price; 
      result += maximalPrice;
    }
  }
  return result;
}
// result
const cart = [
  {
    name: "Wireless Mouse",
    qty: 2,
    price: 80000,
  },
  {
    name: "Bluetooth Speaker",
    qty: 3,
    price: 300000,
  },
  {
    name: '21" Monitor',
    qty: 3,
    price: 1500000,
  },
];
const result = handleDiscount(cart, "promocode", 10);
console.log(result);
