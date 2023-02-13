import InvoiceGateway from '../gateway/invoice.gateway'
import Invoice from '../domain/entity/invoice.entity'
import InvoiceModel from './invoice.model'
import ProductModel from './product.model'
import Id from '../../@shared/domain/value-object/id.value-object'
import Address from '../domain/value-object/address.value-object'
import Product from '../domain/entity/product.entity'

export default class InvoiceRepository implements InvoiceGateway {
  async find (id: string): Promise<Invoice> {
    const invoice = await InvoiceModel.findOne({ where: { id }, include: [{ model: ProductModel }] })

    return new Invoice({
      id: new Id(invoice.id),
      name: invoice.name,
      document: invoice.document,
      updatedAt: invoice.updatedAt,
      createdAt: invoice.createdAt,
      address: new Address({
        street: invoice.street,
        complement: invoice.complement,
        number: invoice.number,
        city: invoice.city,
        state: invoice.state,
        zip: invoice.zip
      }),
      items: invoice.items.map((item) => (new Product({
        id: new Id(item.id),
        name: item.name,
        price: item.price
      })))
    })
  }

  async generate (input: Invoice): Promise<Invoice> {
    await InvoiceModel.create({
      id: input.id.id,
      name: input.name,
      document: input.document,
      street: input.address.street,
      complement: input.address.complement,
      number: input.address.number,
      city: input.address.city,
      state: input.address.state,
      zip: input.address.zip,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
      items: input.items.map(item => ({
        id: item.id.id,
        invoiceId: input.id.id,
        name: item.name,
        price: item.price
      }))
    }, {
      include: [{
        model: ProductModel
      }]
    })

    return input
  }
}
