import { v4 as uuid } from 'uuid'
import OrderFactory, { OrderFactoryProps } from './order.factory'

describe('Order factory unit test', () => {
  it('should create an order', () => {
    const props: OrderFactoryProps = {
      id: uuid(),
      customerId: uuid(),
      items: [
        {
          id: uuid(),
          name: 'Product 1',
          productId: uuid(),
          quantity: 1,
          price: 100
        }
      ]
    }

    const order = OrderFactory.create(props)

    expect(order.id).toEqual(props.id)
    expect(order.customerId).toEqual(props.customerId)
    expect(order.items.length).toBe(1)
  })
})
