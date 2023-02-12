import { Sequelize } from 'sequelize-typescript'
import SequelizeSetupTests from '../../@shared/tests/sequelize.setup'
import { ClientModel } from './client.model'
import ClientRepository from './client.repository'
import Client from '../domain/client.entity'
import Id from '../../@shared/domain/value-object/id.value-object'

describe('Client repository unit tests', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = await SequelizeSetupTests.createMemoryInstance([ClientModel])
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should find a client', async () => {
    const client = await ClientModel.create({
      id: '1',
      name: 'client 1',
      email: 'any@mail.com',
      address: 'address 1',
      createdAt: new Date(),
      updatedAt: new Date()
    })

    const repository = new ClientRepository()
    const result = await repository.find(client.id)

    expect(result.id.id).toEqual(client.id)
    expect(result.name).toEqual(client.name)
    expect(result.email).toEqual(client.email)
    expect(result.address).toEqual(client.address)
    expect(result.createdAt).toStrictEqual(client.createdAt)
    expect(result.updatedAt).toStrictEqual(client.updatedAt)
  })

  it('should create a client', async () => {
    const client = new Client({
      id: new Id('1'),
      name: 'client',
      email: 'any@mail.com',
      address: 'address 1'
    })

    const repository = new ClientRepository()
    await repository.add(client)

    const clientDB = await ClientModel.findOne({ where: { id: '1' } })
    expect(clientDB).toBeDefined()
    expect(clientDB.id).toBe(client.id.id)
    expect(clientDB.name).toBe(client.name)
    expect(clientDB.email).toBe(client.email)
    expect(clientDB.address).toBe(client.address)
    expect(clientDB.createdAt).toBeDefined()
    expect(clientDB.updatedAt).toBeDefined()
  })
})
