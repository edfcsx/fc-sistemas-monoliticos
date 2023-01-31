import ProductAdmFacadeInterface, {
  AddProductFacadeInputDTO,
  CheckStockFacadeInputDTO,
  CheckStockFacadeOutputDTO
} from './product-adm.facade.interface'
import UseCaseInterface from '../../@shared/usecase/use-case.interface'

export interface UseCasesProps {
  addProductUseCase: UseCaseInterface
  checkProductStockUseCase: UseCaseInterface
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
  private _addProductUseCase: UseCaseInterface
  private _checkProductStockUseCase: UseCaseInterface

  constructor (usecasesProps: UseCasesProps) {
    this._addProductUseCase = usecasesProps.addProductUseCase
    this._checkProductStockUseCase = usecasesProps.checkProductStockUseCase
  }

  async addProduct (input: AddProductFacadeInputDTO): Promise<void> {
    return this._addProductUseCase.handle(input)
  }

  checkStock (input: CheckStockFacadeInputDTO): Promise<CheckStockFacadeOutputDTO> {
    return this._checkProductStockUseCase.handle(input)
  }
}
