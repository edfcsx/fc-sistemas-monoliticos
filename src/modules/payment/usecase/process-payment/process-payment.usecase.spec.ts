import TransactionEntity, { TransactionStatus } from '../../domain/transaction.entity'
import Id from '../../../@shared/domain/value-object/id.value-object'
import ProcessPaymentUseCase from './process-payment.usecase'

const mockRepository = () => {
  return {
    save: jest.fn()
  }
}

describe('Process Payment usecase unit tests', () => {
  it('should approve a transaction', async () => {
    const repository = mockRepository()
    const usecase = new ProcessPaymentUseCase(repository)

    const transaction = new TransactionEntity({
      id: new Id('1'),
      amount: 100,
      orderId: '1'
    })

    jest.spyOn(usecase['transactionRepository'], 'save').mockImplementation(() =>
      Promise.resolve(new TransactionEntity({
        id: new Id('1'),
        amount: 100,
        orderId: '1',
        status: TransactionStatus.APPROVED,
        updatedAt: transaction.updatedAt,
        createdAt: transaction.createdAt
      })))

    const result = await usecase.handle({
      orderId: transaction.orderId,
      amount: transaction.amount
    })

    expect(repository.save).toHaveBeenCalled()
    expect(result.transactionId).toBe(transaction.id.id)
    expect(result.status).toBe(TransactionStatus.APPROVED)
    expect(result.amount).toBe(100)
    expect(result.orderId).toBe('1')
    expect(result.createdAt).toStrictEqual(transaction.createdAt)
    expect(result.updatedAt).toStrictEqual(transaction.updatedAt)
  })

  it('should decline a transaction', async () => {
    const repository = mockRepository()
    const usecase = new ProcessPaymentUseCase(repository)

    const transaction = new TransactionEntity({
      id: new Id('1'),
      amount: 50,
      orderId: '1'
    })

    jest.spyOn(usecase['transactionRepository'], 'save').mockImplementation(() =>
      Promise.resolve(new TransactionEntity({
        id: new Id('1'),
        amount: 50,
        orderId: '1',
        status: TransactionStatus.DECLINED,
        updatedAt: transaction.updatedAt,
        createdAt: transaction.createdAt
      })))

    const result = await usecase.handle({
      orderId: transaction.orderId,
      amount: transaction.amount
    })

    expect(repository.save).toHaveBeenCalled()
    expect(result.transactionId).toBe(transaction.id.id)
    expect(result.status).toBe(TransactionStatus.DECLINED)
    expect(result.amount).toBe(50)
    expect(result.orderId).toBe('1')
    expect(result.createdAt).toStrictEqual(transaction.createdAt)
    expect(result.updatedAt).toStrictEqual(transaction.updatedAt)
  })
})
