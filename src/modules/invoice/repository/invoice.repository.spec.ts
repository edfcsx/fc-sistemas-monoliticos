import { Sequelize } from 'sequelize-typescript'
import SequelizeSetupTests from '../../@shared/tests/sequelize.setup'
import InvoiceModel from './invoice.model'
import ProductModel from './product.model'
import Invoice from '../domain/entity/invoice.entity'
import Id from '../../@shared/domain/value-object/id.value-object'
import Address from '../domain/value-object/address.value-object'
import Product from '../domain/entity/product.entity'
import InvoiceRepository from './invoice.repository'

describe('Invoice repository tests', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = await SequelizeSetupTests.createMemoryInstance([InvoiceModel, ProductModel])
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should add invoice', async () => {
    const repository = new InvoiceRepository()

    const invoice = new Invoice({
      id: new Id('1'),
      name: 'john doe',
      document: 'x.xxx.x',
      address: new Address({
        street: 'Street One',
        number: '176A',
        complement: 'n/a',
        city: 'New York',
        state: 'New York',
        zip: '12345-789'
      }),
      items: [
        new Product({ id: new Id('1'), name: 'Notebook', price: 100 }),
        new Product({ id: new Id('2'), name: 'Projector', price: 200 })
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    })

    const result = await repository.generate(invoice)

    expect(result.id.id).toBe(invoice.id.id)
    expect(result.name).toBe(invoice.name)
    expect(result.document).toBe(invoice.document)
    expect(result.address.street).toBe(invoice.address.street)
    expect(result.address.complement).toBe(invoice.address.complement)
    expect(result.address.number).toBe(invoice.address.number)
    expect(result.address.city).toBe(invoice.address.city)
    expect(result.address.state).toBe(invoice.address.state)
    expect(result.address.zip).toBe(invoice.address.zip)
    expect(result.items).toStrictEqual(invoice.items)
    expect(result.total).toBe(300)
    expect(result.updatedAt).toStrictEqual(invoice.updatedAt)
    expect(result.createdAt).toStrictEqual(invoice.createdAt)
  })

  it('should find invoice', async () => {
    const repository = new InvoiceRepository()

    const invoice = {
      id: '1',
      name: 'john doe',
      document: 'x.xxx.x',
      street: 'street 1',
      complement: 'complement 1',
      number: '167 A',
      city: 'Manhattan',
      state: 'New York',
      zip: '00123-877',
      createdAt: new Date(),
      updatedAt: new Date(),
      items: [
        { id: '1', invoiceId: '1', name: 'notebook', price: 100 },
        { id: '2', invoiceId: '1', name: 'projetor', price: 200 }
      ]
    }

    await InvoiceModel.create(invoice, { include: [{ model: ProductModel }] })
    const result = await repository.find('1')

    expect(result.id.id).toBe(invoice.id)
    expect(result.name).toBe(invoice.name)
    expect(result.document).toBe(invoice.document)
    expect(result.address.street).toBe(invoice.street)
    expect(result.address.complement).toBe(invoice.complement)
    expect(result.address.number).toBe(invoice.number)
    expect(result.address.city).toBe(invoice.city)
    expect(result.address.state).toBe(invoice.state)
    expect(result.address.zip).toBe(invoice.zip)
    expect(result.createdAt).toStrictEqual(invoice.createdAt)
    expect(result.updatedAt).toStrictEqual(invoice.updatedAt)
    expect(result.items[0].id.id).toBe(invoice.items[0].id)
    expect(result.items[0].name).toBe(invoice.items[0].name)
    expect(result.items[0].price).toBe(invoice.items[0].price)
    expect(result.items[1].id.id).toBe(invoice.items[1].id)
    expect(result.items[1].name).toBe(invoice.items[1].name)
    expect(result.items[1].price).toBe(invoice.items[1].price)
  })
})
