import Invoice from '../domain/entity/invoice.entity'

export default interface InvoiceGateway {
  generate(input: Invoice): Promise<Invoice>
  find(id: string): Promise<Invoice>
}
