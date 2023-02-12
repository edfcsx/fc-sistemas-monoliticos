import { Sequelize } from 'sequelize-typescript'
import SequelizeSetupTests from '../../@shared/tests/sequelize.setup'
import TransactionModel from '../repository/transaction.model'
import { TransactionStatus } from '../domain/transaction.entity'
import PaymentFacadeFactory from '../factory/payment-facade.factory'

describe('Payment Facade tests', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = await SequelizeSetupTests.createMemoryInstance([TransactionModel])
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a transaction', async () => {
    const facade = PaymentFacadeFactory.create()

    const input = {
      orderId: '1',
      amount: 100
    }

    const output = await facade.process(input)

    expect(output.transactionId).toBeDefined()
    expect(output.orderId).toBe(input.orderId)
    expect(output.amount).toBe(input.amount)
    expect(output.status).toBe(TransactionStatus.APPROVED)
  })
})
