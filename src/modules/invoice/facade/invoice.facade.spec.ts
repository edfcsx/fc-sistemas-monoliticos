import { Sequelize } from 'sequelize-typescript'
import SequelizeSetupTests from '../../@shared/tests/sequelize.setup'
import InvoiceModel from '../repository/invoice.model'
import ProductModel from '../repository/product.model'
import { InvoiceFacadeGenerateInputDTO } from './invoice.facade.interface'
import InvoiceFacadeFactory from '../factory/invoice.facade.factory'

describe('Invoice Facade tests', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = await SequelizeSetupTests.createMemoryInstance([InvoiceModel, ProductModel])
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should generate an invoice', async () => {
    const facade = InvoiceFacadeFactory.create()

    const input: InvoiceFacadeGenerateInputDTO = {
      name: 'john doe',
      document: 'x.xxx.x',
      street: 'street 1',
      complement: 'complement 1',
      number: '167 A',
      city: 'Manhattan',
      state: 'New York',
      zipCode: '00123-877',
      items: [
        { id: '1', name: 'notebook', price: 100 },
        { id: '2', name: 'projetor', price: 200 }
      ]
    }

    const result = await facade.generate(input)

    expect(result.id).toBeDefined()
    expect(result.name).toBe(input.name)
    expect(result.document).toBe(input.document)
    expect(result.street).toBe(input.street)
    expect(result.complement).toBe(input.complement)
    expect(result.number).toBe(input.number)
    expect(result.city).toBe(input.city)
    expect(result.state).toBe(input.state)
    expect(result.zipCode).toBe(input.zipCode)
    expect(result.createdAt).toBeDefined()
    expect(result.updatedAt).toBeDefined()
    expect(result.items).toStrictEqual(result.items)
  })

  it('should find an invoice', async () => {
    const facade = InvoiceFacadeFactory.create()

    const input = {
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

    await InvoiceModel.create(input, { include: [{ model: ProductModel }] })

    const result = await facade.find({ id: '1' })

    expect(result.id).toBe('1')
    expect(result.name).toBe(input.name)
    expect(result.document).toBe(input.document)
    expect(result.street).toBe(input.street)
    expect(result.complement).toBe(input.complement)
    expect(result.number).toBe(input.number)
    expect(result.city).toBe(input.city)
    expect(result.state).toBe(input.state)
    expect(result.zipCode).toBe(input.zip)
    expect(result.createdAt).toStrictEqual(input.createdAt)
    expect(result.updatedAt).toStrictEqual(input.updatedAt)
    expect(result.items[0].id).toBe(input.items[0].id)
    expect(result.items[0].name).toBe(input.items[0].name)
    expect(result.items[0].price).toBe(input.items[0].price)
    expect(result.items[1].id).toBe(input.items[1].id)
    expect(result.items[1].name).toBe(input.items[1].name)
    expect(result.items[1].price).toBe(input.items[1].price)
  })
})
