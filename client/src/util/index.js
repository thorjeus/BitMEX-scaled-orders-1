const startEndPutOrders = (obj, start, end, amount, side) => {
  obj.push({
    symbol: 'XBTUSD',
    side: side,
    orderQty: amount,
    price: start,
    ordType: 'Limit',
    execInst: 'ParticipateDoNotInitiate',
    text: 'order'
  });
  obj.push({
    symbol: 'XBTUSD',
    side: side,
    orderQty: amount,
    price: end,
    ordType: 'Limit',
    execInst: 'ParticipateDoNotInitiate',
    text: 'order'
  });
};
const roundHalf = num => {
  return Math.round(num * 2) / 2;
};
const Uniform = (amount, n_tp, start, end, side, symbol) => {
  let orders = { orders: [] };

  const increment = roundHalf((end - start) / (n_tp - 1));
  console.log(increment, 'INCREMENTS');
  const mean = Math.floor(amount / n_tp);
  //startEndPutOrders(orders.orders, start, end, mean, side);
  for (let i = 0; i < n_tp; i++) {
    //ROUND TO NEAREST 0.5
    orders.orders.push({
      symbol: symbol,
      side: side,
      orderQty: mean,
      price: start + i * increment,
      ordType: 'Limit',
      execInst: 'ParticipateDoNotInitiate',
      text: 'order'
    });
  }

  return orders;
};
const Positive = (amount, n_tp, start, end, side, symbol) => {
  let orders = { orders: [] };
  const increment = Math.round((end - start) / n_tp);

  return orders;
};
const Negative = (amount, n_tp, start, end, side, symbol) => {
  let orders = { orders: [] };
  const increment = Math.round((end - start) / n_tp);

  return orders;
};
const Normal = (amount, n_tp, start, end, side, symbol) => {
  const gauss = (mean, x, delta) => {
    const member1 = 1 / (delta * Math.sqrt(2 * Math.PI));
    const member2 = Math.pow(Math.E, -((x - mean) ** 2) / (2 * delta ** 2));
    return member1 * member2;
  };
  const START_CFG = -2;
  const END_CFG = 2;

  const incrementQty = (END_CFG - START_CFG) / (n_tp - 1);

  const arr = [];
  for (let i = 0; i < n_tp; i++) {
    arr.push(gauss(0, START_CFG + i * incrementQty, 1)); //mean == 0
  }
  const summ = arr.reduce((a, b) => a + b, 0);

  const incrementPrice = (end - start) / (n_tp - 1);
  let orders = { orders: [] };
  for (let i = 0; i < n_tp; i++) {
    //ROUND TO NEAREST 0.5
    orders.orders.push({
      symbol: symbol,
      side: side,
      orderQty: Math.floor((arr[i] / summ) * amount),
      price: roundHalf(start + i * incrementPrice),
      ordType: 'Limit',
      execInst: 'ParticipateDoNotInitiate',
      text: 'order'
    });
  }

  return orders;
};

export const orderBulk = ({
  quantity,
  n_tp,
  start,
  end,
  side,
  distribution,
  symbol // : XBTUSD, ETHUSD...
}) => {
  switch (distribution) {
    case 'Positive':
      return Positive(quantity, n_tp, start, end, side, symbol);
    case 'Negative':
      return Negative(quantity, n_tp, start, end, side, symbol);
    case 'Normal':
      return Normal(quantity, n_tp, start, end, side, symbol);
    case 'Uniform':
    default:
      return Uniform(quantity, n_tp, start, end, side, symbol);
  }
};