import UseCaseInterface from '../../@shared/usecase/use-case.interface'

export interface InvoiceFacadeFindInputDTO {
  id: string
}

export interface InvoiceFacadeFindOutputDTO {
  id: string
  name: string
  document: string
  street: string
  number: string
  complement: string
  city: string
  state: string
  zipCode: string
  items: {
    id: string
    name: string
    price: number
  }[]
  total: number
  createdAt: Date
  updatedAt: Date
}

export interface InvoiceFacadeGenerateInputDTO {
  name: string
  document: string
  street: string
  number: string
  complement: string
  city: string
  state: string
  zipCode: string
  items: {
    id: string
    name: string
    price: number
  }[]
}

export interface InvoiceFacadeGenerateOutputDTO {
  id: string
  name: string
  document: string
  street: string
  number: string
  complement: string
  city: string
  state: string
  zipCode: string
  items: {
    id: string
    name: string
    price: number
  }[]
  total: number
  createdAt: Date
  updatedAt: Date
}

export interface InvoiceFacadeProps {
  findInvoiceUseCase: UseCaseInterface
  generateInvoiceUseCase: UseCaseInterface
}

export default interface InvoiceFacadeInterface {
  find(input: InvoiceFacadeFindInputDTO): Promise<InvoiceFacadeFindOutputDTO>
  generate(input: InvoiceFacadeGenerateInputDTO): Promise<InvoiceFacadeGenerateOutputDTO>
}
