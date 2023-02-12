import ClientRepository from '../repository/client.repository'
import FindClientUseCase from '../usecase/find-client/find-client.usecase'
import AddClientUseCase from '../usecase/add-client/add-client.usecase'
import ClientAdmFacade from '../facade/client-adm.facade'

export default class ClientAdmFacadeFactory {
  static create (): ClientAdmFacade {
    const repository = new ClientRepository()

    const findUseCase = new FindClientUseCase(repository)
    const addUseCase = new AddClientUseCase(repository)

    return new ClientAdmFacade({
      addUseCase,
      findUseCase
    })
  }
}
