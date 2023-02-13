import UseCaseInterface from '../../../@shared/usecase/use-case.interface'
import { GenerateInvoiceUseCaseInputDTO, GenerateInvoiceUseCaseOutputDTO } from './generate-invoice.usecase.dto'
import Invoice from '../../domain/entity/invoice.entity'
import Address from '../../domain/value-object/address.value-object'
import Product from '../../domain/entity/product.entity'
import Id from '../../../@shared/domain/value-object/id.value-object'
import InvoiceGateway from '../../gateway/invoice.gateway'

export default class GenerateInvoiceUseCase implements UseCaseInterface {
  private readonly repository: InvoiceGateway

  constructor (invoiceRepository: InvoiceGateway) {
    this.repository = invoiceRepository
  }

  async handle (input: GenerateInvoiceUseCaseInputDTO): Promise<GenerateInvoiceUseCaseOutputDTO> {
    const invoice = new Invoice({
      name: input.name,
      document: input.document,
      items: input.items.map(product => (new Product({
        id: new Id(product.id),
        name: product.name,
        price: product.price
      }))),
      address: new Address({
        street: input.street,
        number: input.number,
        complement: input.complement,
        city: input.city,
        state: input.state,
        zip: input.zipCode
      })
    })

    const result = await this.repository.generate(invoice)

    return {
      id: result.id.id,
      name: result.name,
      document: result.document,
      street: result.address.street,
      number: result.address.number,
      complement: result.address.complement,
      city: result.address.city,
      state: result.address.state,
      zipCode: result.address.zip,
      items: result.items.map((item) => ({ id: item.id.id, name: item.name, price: item.price })),
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      total: result.total
    }
  }
}
