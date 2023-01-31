import UseCaseInterface from '../../../@shared/usecase/use-case.interface'
import { CheckProductStockInputDTO, CheckProductStockOutputDTO } from './check-product-stock.dto'
import ProductGateway from '../../gateway/product.gateway'

export default class CheckProductStockUseCase implements UseCaseInterface {
  private readonly _persistence: ProductGateway

  constructor (persistence: ProductGateway) {
    this._persistence = persistence
  }

  async handle (input: CheckProductStockInputDTO): Promise<CheckProductStockOutputDTO> {
    const product = await this._persistence.find(input.productId)

    if (!product) throw new Error(`Product with ${input.productId} not found`)

    return {
      productId: product.id.id,
      stock: product.stock
    }
  }
}
