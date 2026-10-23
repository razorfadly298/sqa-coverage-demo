const { processOrder } = require('../src/order');

describe('processOrder', () => {
  test('error jika order null', () => {
    expect(() => processOrder(null)).toThrow('Order must have items');
  });
  test('error jika items bukan array', () => {
    expect(() => processOrder({ items: 'abc' })).toThrow('Order must have items');
  });
  test('error jika items kosong', () => {
    expect(() => processOrder({ items: [] })).toThrow('Order must have items');
  });
  test('error jika qty 0', () => {
    expect(() => processOrder({ items: [{ price: 1000, qty: 0 }] }))
      .toThrow('Invalid quantity');
  });
  test('order biasa tanpa kupon', () => {
    const res = processOrder({ items: [{ price: 10000, qty: 2 }] });
    expect(res).toEqual({ total: 20000, status: 'PAID' });
  });
  test('kupon DISC10 memberi diskon 10%', () => {
    const res = processOrder({ items: [{ price: 100000, qty: 1 }], coupon: 'DISC10' });
    expect(res.total).toBeCloseTo(90000);
  });
  test('total di atas 1.000.000 dapat potongan 50.000', () => {
    const res = processOrder({ items: [{ price: 600000, qty: 2 }] });
    expect(res.total).toBe(1150000);
  });
  test('total 0 berstatus EMPTY', () => {
    const res = processOrder({ items: [{ price: 0, qty: 1 }] });
    expect(res.status).toBe('EMPTY');
  });
});
