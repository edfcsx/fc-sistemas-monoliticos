import UseCaseInterface from '../../../@shared/usecase/use-case.interface'
import ProductGateway from '../../gateway/product.gateway'
import { FindAllProductsDTO } from './find-all-products.dto'

export default class FindAllProductsUseCase implements UseCaseInterface {
  constructor (private readonly productRepository: ProductGateway) {}

  async handle (): Promise<FindAllProductsDTO> {
    const product = await this.productRepository.findAll()

    return {
      products: product.map((p) => ({
        id: p.id.id,
        name: p.name,
        description: p.description,
        salesPrice: p.salesPrice
      }))
    }
  }
}
