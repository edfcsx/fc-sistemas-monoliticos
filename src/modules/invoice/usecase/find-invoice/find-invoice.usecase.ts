import UseCaseInterface from '../../../@shared/usecase/use-case.interface'
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from './find-invoice.usecase.dto'
import InvoiceGateway from '../../gateway/invoice.gateway'

export default class FindInvoiceUseCase implements UseCaseInterface {
  private readonly repository: InvoiceGateway

  constructor (invoiceRepository: InvoiceGateway) {
    this.repository = invoiceRepository
  }

  async handle (input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
    const invoice = await this.repository.find(input.id)

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zip,
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
      total: invoice.total,
      items: invoice.items.map(item => ({ id: item.id.id, name: item.name, price: item.price }))
    }
  }
}
