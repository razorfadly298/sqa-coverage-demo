function processOrder(order) {
  if (!order || !Array.isArray(order.items) || order.items.length === 0) {
    throw new Error('Order must have items');
  }
  let total = 0;
  for (const item of order.items) {
    if (item.qty <= 0) throw new Error('Invalid quantity');
    total += item.price * item.qty;
  }
  if (order.coupon === 'DISC10') total *= 0.9;
  if (total > 1000000) total -= 50000;
  return { total, status: total > 0 ? 'PAID' : 'EMPTY' };
}

module.exports = { processOrder };
