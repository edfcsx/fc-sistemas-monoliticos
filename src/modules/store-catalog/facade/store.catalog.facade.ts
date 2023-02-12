import StoreCatalogFacadeInterface, {
  FindAllStoreCatalogFacadeOutputDTO,
  FindStoreCatalogFacadeInputDTO, FindStoreCatalogFacadeOutputDTO
} from './store-catalog.facade.interface'
import FindProductUsecase from '../usecase/find-product/find-product.usecase'
import FindAllProductsUseCase from '../usecase/find-all-products/find-all-products.usecase'

export interface StoreCatalogFacadeProps {
  findProductUseCase: FindProductUsecase
  findAllProductsUseCase: FindAllProductsUseCase
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  private readonly _findProductUseCase: FindProductUsecase
  private readonly _findAllProductsUseCase: FindAllProductsUseCase

  constructor (props: StoreCatalogFacadeProps) {
    this._findProductUseCase = props.findProductUseCase
    this._findAllProductsUseCase = props.findAllProductsUseCase
  }

  async findProduct (input: FindStoreCatalogFacadeInputDTO): Promise<FindStoreCatalogFacadeOutputDTO> {
    return await this._findProductUseCase.handle({ id: input.id })
  }

  async findAllProducts (): Promise<FindAllStoreCatalogFacadeOutputDTO> {
    return await this._findAllProductsUseCase.handle()
  }
}
