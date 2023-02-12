import ClientAdmFacadeInterface, {
  AddClientFacadeInputDTO,
  FindClientFacadeInputDTO, FindClientFacadeOutputDTO
} from './client-adm.facade.interface'
import UseCaseInterface from '../../@shared/usecase/use-case.interface'

export interface ClientAdmFacadeProps {
  findUseCase: UseCaseInterface
  addUseCase: UseCaseInterface
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
  private readonly _findUseCase: UseCaseInterface
  private readonly _addUseCase: UseCaseInterface

  constructor (props: ClientAdmFacadeProps) {
    this._findUseCase = props.findUseCase
    this._addUseCase = props.addUseCase
  }

  async add (input: AddClientFacadeInputDTO): Promise<void> {
    return await this._addUseCase.handle(input)
  }

  async find (input: FindClientFacadeInputDTO): Promise<FindClientFacadeOutputDTO> {
    return await this._findUseCase.handle(input)
  }
}
