import { AddProductInputDTO, AddProductOutputDTO } from './add-product.dto'
import Product, { ProductProps } from '../../domain/product.entity'
import Id from '../../../@shared/domain/value-object/id.value-object'
import ProductGateway from '../../gateway/product.gateway'
import UseCaseInterface from '../../../@shared/usecase/use-case.interface'

export default class AddProductUseCase implements UseCaseInterface {
  private readonly persistence: ProductGateway

  constructor (persistence: ProductGateway) {
    this.persistence = persistence
  }

  async handle (input: AddProductInputDTO): Promise<AddProductOutputDTO> {
    const props: ProductProps = {
      id: new Id(input.id),
      name: input.name,
      description: input.description,
      purchasePrice: input.purchasePrice,
      stock: input.stock
    }

    const product = new Product(props)
    await this.persistence.add(product)

    return Promise.resolve({
      id: product.id.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    })
  }
}
