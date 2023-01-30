import Address from '@domain/customer/value-object/address'
import Customer from '@domain/customer/entity/customer'
import CustomerRepositoryInterface from '@domain/customer/repository/customer-repository.interface'
import CustomerModel from '@infra/customer/sequelize/model/customer.model'

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create (entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.Address.street,
      number: entity.Address.number,
      zipcode: entity.Address.zip,
      city: entity.Address.city,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints
    })
  }

  async update (entity: Customer): Promise<void> {
    await CustomerModel.update({
      id: entity.id,
      name: entity.name,
      street: entity.Address.street,
      number: entity.Address.number,
      zipcode: entity.Address.zip,
      city: entity.Address.city,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints
    }, { where: { id: entity.id } })
  }

  async find (id: string): Promise<Customer> {
    let model: CustomerModel

    try {
      model = await CustomerModel.findOne({ where: { id }, rejectOnEmpty: true })
    } catch (error) {
      throw new Error('Customer not found')
    }

    const customer = new Customer(model.id, model.name)
    customer.changeAddress(new Address(model.street, model.number, model.zipcode, model.city))
    customer.addRewardPoints(model.rewardPoints)

    return customer
  }

  async findAll (): Promise<Customer[]> {
    const models = await CustomerModel.findAll()

    return models.map((model) => {
      const customer = new Customer(model.id, model.name)
      customer.changeAddress(new Address(model.street, model.number, model.zipcode, model.city))
      customer.addRewardPoints(model.rewardPoints)

      return customer
    })
  }
}
