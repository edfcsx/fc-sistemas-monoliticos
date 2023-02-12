import UseCaseInterface from '../../../@shared/usecase/use-case.interface'
import ClientGateway from '../../gateway/client.gateway'
import { AddClientInputDTO, AddClientOutputDTO } from './add-client.usecase.dto'
import Client, { ClientProps } from '../../domain/client.entity'
import Id from '../../../@shared/domain/value-object/id.value-object'

export default class AddClientUseCase implements UseCaseInterface {
  constructor (private readonly repository: ClientGateway) {}

  async handle (input: AddClientInputDTO): Promise<AddClientOutputDTO> {
    const props: ClientProps = {
      id: new Id(input.id),
      name: input.name,
      email: input.email,
      address: input.address
    }

    const client = new Client(props)
    await this.repository.add(client)

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
