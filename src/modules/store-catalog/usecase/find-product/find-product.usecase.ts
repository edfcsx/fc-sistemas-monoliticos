import UseCaseInterface from '../../../@shared/usecase/use-case.interface'
import ProductGateway from '../../gateway/product.gateway'
import { FindProductInputDTO, FindProductOutputDTO } from './find-product.dto'

export default class FindProductUsecase implements UseCaseInterface {
  constructor (private readonly repository: ProductGateway) {}

  async handle (input: FindProductInputDTO): Promise<FindProductOutputDTO> {
    const product = await this.repository.find(input.id)

    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice
    }
  }
}
