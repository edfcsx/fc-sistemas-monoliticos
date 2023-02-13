import InvoiceFacadeInterface, {
  InvoiceFacadeFindInputDTO,
  InvoiceFacadeFindOutputDTO, InvoiceFacadeGenerateInputDTO,
  InvoiceFacadeGenerateOutputDTO, InvoiceFacadeProps
} from './invoice.facade.interface'
import UseCaseInterface from '../../@shared/usecase/use-case.interface'

export default class InvoiceFacade implements InvoiceFacadeInterface {
  private readonly _findInvoiceUseCase: UseCaseInterface
  private readonly _generateInvoiceUseCase: UseCaseInterface

  constructor (props: InvoiceFacadeProps) {
    this._findInvoiceUseCase = props.findInvoiceUseCase
    this._generateInvoiceUseCase = props.generateInvoiceUseCase
  }

  async find (input: InvoiceFacadeFindInputDTO): Promise<InvoiceFacadeFindOutputDTO> {
    return this._findInvoiceUseCase.handle(input)
  }

  async generate (input: InvoiceFacadeGenerateInputDTO): Promise<InvoiceFacadeGenerateOutputDTO> {
    return this._generateInvoiceUseCase.handle(input)
  }
}
