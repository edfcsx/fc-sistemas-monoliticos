import { Sequelize } from 'sequelize-typescript'
import Address from '@domain/customer/value-object/address'
import Customer from '@domain/customer/entity/customer'
import CustomerModel from '../model/customer.model'
import CustomerRepository from './customer.repository'

describe('Customer repository unit tests', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: 'memory',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([CustomerModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a customer', async () => {
    const repository = new CustomerRepository()
    const customer = new Customer('1', 'Customer One')
    const address = new Address('Street one', '12a', '12345896', 'Recife')
    customer.changeAddress(address)

    await repository.create(customer)

    const customerModel = await CustomerModel.findOne({ where: { id: '1' } })

    expect(customerModel.toJSON()).toStrictEqual({
      id: '1',
      name: 'Customer One',
      street: 'Street one',
      number: '12a',
      zipcode: '12345896',
      city: 'Recife',
      active: true,
      rewardPoints: 0
    })
  })

  it('should update a customer', async () => {
    const repository = new CustomerRepository()
    const customer = new Customer('1', 'John Doe')
    const address = new Address('Street one', '12', '00000-000', 'Los Angeles')
    customer.changeAddress(address)

    await repository.create(customer)

    const customerModel = await CustomerModel.findOne({ where: { id: '1' } })
    expect(customerModel.toJSON()).toStrictEqual({
      id: '1',
      name: 'John Doe',
      street: 'Street one',
      number: '12',
      zipcode: '00000-000',
      city: 'Los Angeles',
      active: true,
      rewardPoints: 0
    })

    customer.changeName('Harris Lowis')
    await repository.update(customer)
    const customerModel2 = await CustomerModel.findOne({ where: { id: '1' } })

    expect(customerModel2.toJSON()).toStrictEqual({
      id: '1',
      name: 'Harris Lowis',
      street: 'Street one',
      number: '12',
      zipcode: '00000-000',
      city: 'Los Angeles',
      active: true,
      rewardPoints: 0
    })
  })

  it('should find a customer', async () => {
    const customer = new Customer('1', 'John Doe')
    const address = new Address('Street one', '12', '00000-000', 'Los Angeles')
    customer.changeAddress(address)

    const repository = new CustomerRepository()
    await repository.create(customer)

    const customerModel = await CustomerModel.findOne({ where: { id: '1' } })
    const foundProduct = await repository.find('1')

    expect(customerModel.toJSON()).toStrictEqual({
      id: foundProduct.id,
      name: foundProduct.name,
      street: foundProduct.Address.street,
      number: foundProduct.Address.number,
      zipcode: foundProduct.Address.zip,
      city: foundProduct.Address.city,
      active: foundProduct.isActive(),
      rewardPoints: foundProduct.rewardPoints
    })
  })

  it('should find all customers', async () => {
    const repository = new CustomerRepository()

    const customer = new Customer('1', 'John Doe')
    const address = new Address('Street one', '12', '00000-000', 'Los Angeles')
    customer.changeAddress(address)
    await repository.create(customer)

    const customer2 = new Customer('2', 'John Doe 2')
    const address2 = new Address('Street one', '12', '00000-000', 'Los Angeles')
    customer2.changeAddress(address2)
    await repository.create(customer2)

    const foundProducts = await repository.findAll()
    const customers = [customer, customer2]

    expect(customers).toEqual(foundProducts)
  })

  it('should throw an error when customer is not found', async () => {
    const repository = new CustomerRepository()

    expect(async () => {
      await repository.find('ABC')
    }).rejects.toThrow('Customer not found')
  })
})
