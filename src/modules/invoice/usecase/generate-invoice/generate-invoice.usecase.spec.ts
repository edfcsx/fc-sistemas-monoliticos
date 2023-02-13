import GenerateInvoiceUseCase from './generate-invoice.usecase'
import Invoice from '../../domain/entity/invoice.entity'
import Id from '../../../@shared/domain/value-object/id.value-object'
import Product from '../../domain/entity/product.entity'
import Address from '../../domain/value-object/address.value-object'

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

const mockRepository = () => ({
  generate: jest.fn().mockReturnValue(Promise.resolve(invoice)),
  find: jest.fn()
})

describe('Generate invoice usecase unit tests', () => {
  it('should generate an invoice', async () => {
    const repository = mockRepository()
    const usecase = new GenerateInvoiceUseCase(repository)

    const input = {
      name: 'john doe',
      document: 'x.xxx.x',
      street: 'Street One',
      number: '176A',
      complement: 'n/a',
      city: 'New York',
      state: 'New York',
      zipCode: '12345-789',
      items: [
        { id: '1', name: 'Notebook', price: 100 },
        { id: '2', name: 'Projector', price: 200 }
      ]
    }

    const result = await usecase.handle(input)

    expect(result.id).toBe('1')
    expect(result.name).toBe(input.name)
    expect(result.document).toBe(input.document)
    expect(result.street).toBe(input.street)
    expect(result.complement).toBe(input.complement)
    expect(result.number).toBe(input.number)
    expect(result.city).toBe(input.city)
    expect(result.state).toBe(input.state)
    expect(result.zipCode).toBe(input.zipCode)
    expect(result.items).toStrictEqual(input.items)
    expect(result.total).toBe(300)
    expect(result.updatedAt).toStrictEqual(invoice.updatedAt)
    expect(result.createdAt).toStrictEqual(invoice.createdAt)
  })
})
