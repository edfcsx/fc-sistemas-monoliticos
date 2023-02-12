import { Sequelize } from 'sequelize-typescript'
import SequelizeSetupTests from '../../@shared/tests/sequelize.setup'
import { ClientModel } from '../repository/client.model'
import ClientAdmFacadeFactory from '../factory/client-adm.facade.factory'

describe('Client Adm Facade tests', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = await SequelizeSetupTests.createMemoryInstance([ClientModel])
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a client', async () => {
    const facade = ClientAdmFacadeFactory.create()

    const input = {
      id: '1',
      name: 'client',
      email: 'any@mail.com',
      address: 'address 1'
    }

    await facade.add(input)

    const client = await ClientModel.findOne({ where: { id: '1' } })
    expect(client.id).toBe(input.id)
    expect(client.name).toBe(input.name)
    expect(client.email).toBe(input.email)
    expect(client.address).toBe(input.address)
    expect(client.createdAt).toBeDefined()
    expect(client.updatedAt).toBeDefined()
  })

  it('should find a client', async () => {
    const facade = ClientAdmFacadeFactory.create()

    const input = {
      id: '1',
      name: 'john doe',
      email: 'any@mail.com',
      address: 'address 1',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    await ClientModel.create(input)

    const client = await facade.find({ id: '1' })
    expect(client.id).toBe(input.id)
    expect(client.name).toBe(input.name)
    expect(client.email).toBe(input.email)
    expect(client.address).toBe(input.address)
    expect(client.createdAt).toStrictEqual(input.createdAt)
    expect(client.updatedAt).toStrictEqual(input.updatedAt)
  })
})
