import UseCaseInterface from '../../../@shared/usecase/use-case.interface'
import { ProcessPaymentInputDTO, ProcessPaymentOutputDTO } from './process-payment.dto'
import PaymentGateway from '../../gateway/payment.gateway'
import Transaction from '../../domain/transaction'

export default class ProcessPaymentUseCase implements UseCaseInterface {
  private readonly transactionRepository: PaymentGateway

  constructor (transactionRepository: PaymentGateway) {
    this.transactionRepository = transactionRepository
  }

  async handle (input: ProcessPaymentInputDTO): Promise<ProcessPaymentOutputDTO> {
    const transaction = new Transaction({
      amount: input.amount,
      orderId: input.orderId
    })

    transaction.process()
    const persistTransaction = await this.transactionRepository.save(transaction)

    return {
      transactionId: persistTransaction.id.id,
      orderId: persistTransaction.orderId,
      amount: persistTransaction.amount,
      status: persistTransaction.status,
      createdAt: persistTransaction.createdAt,
      updatedAt: persistTransaction.updatedAt
    }
  }
}
