import AddClientUseCase from './add-client.usecase'

const mockRepository = () => ({
  add: jest.fn(),
  find: jest.fn()
})

describe('Add client usecase unit tests', () => {
  it('should add a client', async () => {
    const repository = mockRepository()
    const usecase = new AddClientUseCase(repository)

    const input = {
      name: 'Client 1',
      email: 'client1@any_mail.com',
      address: 'address 1'
    }

    const result = await usecase.handle(input)
    expect(repository.add).toHaveBeenCalled()
    expect(result.id).toBeDefined()
    expect(result.name).toBe(input.name)
    expect(result.email).toBe(input.email)
    expect(result.address).toBe(input.address)
  })
})
