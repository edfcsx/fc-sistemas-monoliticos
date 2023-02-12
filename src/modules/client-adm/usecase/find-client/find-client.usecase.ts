import UseCaseInterface from '../../../@shared/usecase/use-case.interface'
import { FindClientUseCaseInputDTO, FindClientUseCaseOutputDTO } from './find-client.usecase.dto'
import ClientGateway from '../../gateway/client.gateway'

export default class FindClientUseCase implements UseCaseInterface {
  constructor (private readonly repository: ClientGateway) {}

  async handle (input: FindClientUseCaseInputDTO): Promise<FindClientUseCaseOutputDTO> {
    const client = await this.repository.find(input.id)

    return {
      id: client.id.id,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt
    }
  }
}
