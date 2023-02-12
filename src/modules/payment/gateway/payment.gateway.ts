import TransactionEntity from '../domain/transaction.entity'

export default interface PaymentGateway {
  save(input: TransactionEntity): Promise<TransactionEntity>
}
