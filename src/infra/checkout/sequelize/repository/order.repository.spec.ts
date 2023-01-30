import { Sequelize } from 'sequelize-typescript'
import Address from '@domain/customer/value-object/address'
import Customer from '@domain/customer/entity/customer'
import Order from '@domain/checkout/entity/order'
import OrderItem from '@domain/checkout/entity/order_item'
import Product from '@domain/product/entity/product'
import CustomerModel from '@infra/customer/sequelize/model/customer.model'
import OrderItemModel from '@infra/checkout/sequelize/model/order-item.model'
import OrderModel from '@infra/checkout/sequelize/model/order.model'
import ProductModel from '@infra/product/sequelize/model/product.model'
import CustomerRepository from '@infra/customer/sequelize/repository/customer.repository'
import OrderRepository from './order.repository'
import ProductRepository from '@infra/product/sequelize/repository/product.repository'

describe('Order repository unit tests', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: 'memory',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel])

    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a new order', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('c1', 'John Doe')
    customer.changeAddress(new Address('Street one', '12', '00000-000', 'Los Angeles'))
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product('p1', 'Product one', 100)
    await productRepository.create(product)

    const orderItem = new OrderItem('oi1', product.name, product.price, 2, product.id)
    const order = new Order('o1', customer.id, [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items']
    })

    expect(orderModel.toJSON()).toStrictEqual({
      id: 'o1',
      customer_id: 'c1',
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: 'o1',
          product_id: 'p1'
        }
      ]
    })
  })

  it('should update an order', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('c1', 'John Doe')
    customer.changeAddress(new Address('Street one', '12', '00000-000', 'Los Angeles'))
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product('p1', 'Product one', 100)
    await productRepository.create(product)

    const orderItem = new OrderItem('oi1', product.name, product.price, 2, product.id)
    const order = new Order('o1', customer.id, [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    order.items[0].changeQuantity(10)

    await orderRepository.update(order)

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items']
    })

    expect(orderModel.toJSON()).toStrictEqual({
      id: 'o1',
      customer_id: 'c1',
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: 'o1',
          product_id: 'p1'
        }
      ]
    })
  })

  it('should find an order', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('c1', 'John Doe')
    customer.changeAddress(new Address('Street one', '12', '00000-000', 'Los Angeles'))
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product('p1', 'Product one', 100)
    await productRepository.create(product)

    const orderItem = new OrderItem('oi1', product.name, product.price, 2, product.id)
    const order = new Order('o1', customer.id, [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const orderModel = await orderRepository.find('o1')
    const orderSearched = await OrderModel.findOne({ where: { id: 'o1' }, include: [{ model: OrderItemModel }] })

    expect(orderSearched.toJSON()).toStrictEqual({
      id: orderModel.id,
      customer_id: orderModel.customerId,
      total: orderModel.total(),
      items: [
        {
          id: orderModel.items[0].id,
          name: orderModel.items[0].name,
          price: orderModel.items[0].price,
          quantity: orderModel.items[0].quantity,
          order_id: 'o1',
          product_id: 'p1'
        }
      ]
    })
  })

  it('should throw an error when order is not found', async () => {
    const repository = new OrderRepository()

    expect(async () => {
      await repository.find('NOT_FOUNDED')
    }).rejects.toThrowError('Order not found')
  })

  it('should find all orders', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('c1', 'John Doe')
    customer.changeAddress(new Address('Street one', '12', '00000-000', 'Los Angeles'))
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product('p1', 'Product one', 100)
    await productRepository.create(product)

    const orderItem = new OrderItem('oi1', product.name, product.price, 2, product.id)
    const order = new Order('o1', customer.id, [orderItem])

    const orderItem2 = new OrderItem('oi2', product.name, product.price, 5, product.id)
    const order2 = new Order('o2', customer.id, [orderItem2])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)
    await orderRepository.create(order2)

    const allOrders = await OrderModel.findAll({ include: [{ model: OrderItemModel }] })
    const ordersModel = await orderRepository.findAll()

    const orderToJson = allOrders[0].toJSON()
    const orderToJson2 = allOrders[1].toJSON()

    expect(orderToJson).toStrictEqual({
      id: ordersModel[0].id,
      customer_id: ordersModel[0].customerId,
      total: ordersModel[0].total(),
      items: [
        {
          id: ordersModel[0].items[0].id,
          name: ordersModel[0].items[0].name,
          price: ordersModel[0].items[0].price,
          quantity: ordersModel[0].items[0].quantity,
          order_id: 'o1',
          product_id: 'p1'
        }
      ]
    })

    expect(orderToJson2).toStrictEqual({
      id: ordersModel[1].id,
      customer_id: ordersModel[1].customerId,
      total: ordersModel[1].total(),
      items: [
        {
          id: ordersModel[1].items[0].id,
          name: ordersModel[1].items[0].name,
          price: ordersModel[1].items[0].price,
          quantity: ordersModel[1].items[0].quantity,
          order_id: 'o2',
          product_id: 'p1'
        }
      ]
    })
  })
})
