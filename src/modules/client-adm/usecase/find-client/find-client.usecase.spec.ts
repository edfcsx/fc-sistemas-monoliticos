import Client from '../../domain/client.entity'
import Id from '../../../@shared/domain/value-object/id.value-object'
import FindClientUseCase from './find-client.usecase'

const client = new Client({
  id: new Id('1'),
  name: 'client 1',
  email: 'any@mail.com',
  address: 'address 1'
})

const mockRepository = () => ({
  add: jest.fn(),
  find: jest.fn().mockReturnValue(Promise.resolve(client))
})

describe('Find client use case unit tests', () => {
  it('shoul find a client', async () => {
    const repository = mockRepository()
    const usecase = new FindClientUseCase(repository)

    const result = await usecase.handle({ id: '1' })

    expect(repository.find).toHaveBeenCalled()
    expect(result.id).toEqual('1')
    expect(result.name).toEqual(client.name)
    expect(result.email).toEqual(client.email)
    expect(result.address).toEqual(client.address)
    expect(result.createdAt).toEqual(client.createdAt)
    expect(result.updatedAt).toEqual(client.updatedAt)
  })
})
