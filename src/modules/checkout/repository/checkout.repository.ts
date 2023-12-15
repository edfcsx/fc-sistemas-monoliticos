import CheckoutGateway from '../gateway/checkout.gateway'
import Order from '../domain/order.entity'

export default class CheckoutRepository implements CheckoutGateway {
  addOrder (order: Order): Promise<void> {
    throw new Error('method not implemented')
  }

  findOrder (id: string): Promise<Order | null> {
    throw new Error('method not implemented')
  }
}
