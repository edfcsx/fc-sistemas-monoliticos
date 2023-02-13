import Invoice from '../../domain/entity/invoice.entity'
import Id from '../../../@shared/domain/value-object/id.value-object'
import Product from '../../domain/entity/product.entity'
import Address from '../../domain/value-object/address.value-object'
import FindInvoiceUseCase from './find-invoice.usecase'

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
  generate: jest.fn(),
  find: jest.fn().mockReturnValue(Promise.resolve(invoice))
})

describe('Find invoice usecase unit tests', () => {
  it('should generate an invoice', async () => {
    const repository = mockRepository()
    const usecase = new FindInvoiceUseCase(repository)

    const input = {
      id: '1'
    }

    const result = await usecase.handle(input)

    expect(result.id).toBe('1')
    expect(result.name).toBe(invoice.name)
    expect(result.document).toBe(invoice.document)
    expect(result.street).toBe(invoice.address.street)
    expect(result.complement).toBe(invoice.address.complement)
    expect(result.number).toBe(invoice.address.number)
    expect(result.city).toBe(invoice.address.city)
    expect(result.state).toBe(invoice.address.state)
    expect(result.zipCode).toBe(invoice.address.zip)
    expect(result.items).toStrictEqual([
      { id: '1', name: 'Notebook', price: 100 },
      { id: '2', name: 'Projector', price: 200 }
    ])
    expect(result.total).toBe(300)
    expect(result.updatedAt).toStrictEqual(invoice.updatedAt)
    expect(result.createdAt).toStrictEqual(invoice.createdAt)
  })
})
