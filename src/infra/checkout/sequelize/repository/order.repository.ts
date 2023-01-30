import Order from '@domain/checkout/entity/order'
import OrderItem from '@domain/checkout/entity/order_item'
import OrderRepositoryInterface from '@domain/checkout/repository/order-repository.interface'
import OrderItemModel from '@infra/checkout/sequelize/model/order-item.model'
import OrderModel from '@infra/checkout/sequelize/model/order.model'

export default class OrderRepository implements OrderRepositoryInterface {
  async create (entity: Order): Promise<void> {
    await OrderModel.create({
      id: entity.id,
      customer_id: entity.customerId,
      total: entity.total(),
      items: entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity
      }))
    }, {
      include: [{ model: OrderItemModel }]
    })
  }

  async update (entity: Order): Promise<void> {
    await OrderModel.update({
      id: entity.id,
      customer_id: entity.customerId,
      total: entity.total()
    }, { where: { id: entity.id } })

    for (const item of entity.items) {
      await OrderItemModel.update({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity
      }, { where: { id: item.id } })
    }
  }

  async find (id: string): Promise<Order> {
    let model: OrderModel

    try {
      model = await OrderModel.findOne({
        where: { id },
        rejectOnEmpty: true,
        include: [{ model: OrderItemModel }]
      })
    } catch (error) {
      throw new Error('Order not found')
    }

    const orderItems: OrderItem[] = model.items.map((item) => {
      return new OrderItem(item.id, item.name, item.price, item.quantity, item.product_id)
    })

    const order = new Order(model.id, model.customer_id, orderItems)
    return order
  }

  async findAll (): Promise<Order[]> {
    const models = await OrderModel.findAll({
      include: [{ model: OrderItemModel }]
    })

    return models.map((model) => {
      const items: OrderItem[] = model.items.map((item) => {
        return new OrderItem(item.id, item.name, item.price, item.quantity, item.product_id)
      })

      return new Order(model.id, model.customer_id, items)
    })
  }
}
