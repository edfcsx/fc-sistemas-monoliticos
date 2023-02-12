import { Sequelize } from 'sequelize-typescript'
import SequelizeSetupTests from '../../@shared/tests/sequelize.setup'
import TransactionModel from './transaction.model'
import TransactionEntity from '../domain/transaction.entity'
import Id from '../../@shared/domain/value-object/id.value-object'
import TransactionRepository from './transaction.repository'

describe('TransactionEntity Repository tests', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = await SequelizeSetupTests.createMemoryInstance([TransactionModel])
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should save a transaction', async () => {
    const transaction = new TransactionEntity({
      id: new Id('1'),
      amount: 100,
      orderId: '1'
    })

    transaction.approve()

    const repository = new TransactionRepository()
    const result = await repository.save(transaction)

    expect(transaction.id.id).toBe(result.id.id)
    expect(transaction.amount).toBe(result.amount)
    expect(transaction.orderId).toBe(result.orderId)
    expect(transaction.status).toBe(result.status)
    expect(transaction.createdAt).toBe(result.createdAt)
    expect(transaction.updatedAt).toBe(result.updatedAt)
  })
})
