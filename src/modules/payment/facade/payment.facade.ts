import PaymentFacadeInterface, {
  PaymentFacadeProcessInputDTO,
  PaymentFacadeProcessOutputDTO
} from './payment.facade.interface'
import UseCaseInterface from '../../@shared/usecase/use-case.interface'

export interface PaymentFacadeProps {
  processPaymentUseCase: UseCaseInterface
}

export default class PaymentFacade implements PaymentFacadeInterface {
  private readonly _processPaymentUseCase: UseCaseInterface

  constructor (props: PaymentFacadeProps) {
    this._processPaymentUseCase = props.processPaymentUseCase
  }

  process (input: PaymentFacadeProcessInputDTO): Promise<PaymentFacadeProcessOutputDTO> {
    return this._processPaymentUseCase.handle(input)
  }
}
