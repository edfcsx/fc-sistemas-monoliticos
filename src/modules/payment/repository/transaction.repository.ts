import PaymentGateway from '../gateway/payment.gateway'
import TransactionModel from './transaction.model'
import TransactionEntity from '../domain/transaction.entity'

export default class TransactionRepository implements PaymentGateway {
  async save (input: TransactionEntity): Promise<TransactionEntity> {
    await TransactionModel.create({
      id: input.id.id,
      orderId: input.orderId,
      amount: input.amount,
      status: input.status,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt
    })

    return new TransactionEntity({
      id: input.id,
      orderId: input.orderId,
      amount: input.amount,
      status: input.status,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt
    })
  }
}
