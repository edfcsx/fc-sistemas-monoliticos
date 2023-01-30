import Order from './order'
import OrderItem from './order_item'

describe('Order unit test', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      new Order('', '', [])
    }).toThrowError('Id is required')
  })

  it('should throw error when customerId is empty', () => {
    expect(() => {
      new Order('1', '', [])
    }).toThrowError('customerId is required')
  })

  it('should throw error when order items is empty', () => {
    expect(() => {
      new Order('1', '1', [])
    }).toThrowError('Item qtd must be greater than 0')
  })

  it('should calculate total', () => {
    const item = new OrderItem('1', 'item a', 100, 1, 'p1')
    const item2 = new OrderItem('2', 'item b', 200, 2, 'p2')
    const order = new Order('o1', 'c1', [item])
    const total = order.total()

    expect(total).toBe(100)

    const order2 = new Order('o1', 'c1', [item, item2])
    const total2 = order2.total()

    expect(total2).toBe(500)
  })

  it('should throw error if the item qte os greater than 0', () => {
    expect(() => {
      const item = new OrderItem('1', 'item a', 100, 0, 'p1')
      new Order('o1', 'c1', [item])
    }).toThrowError('Quantity must be greater than 0')
  })
})
