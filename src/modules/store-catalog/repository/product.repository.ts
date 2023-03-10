import ProductGateway from '../gateway/product.gateway'
import Product from '../domain/product.entity'
import ProductModel from './product.model'
import Id from '../../@shared/domain/value-object/id.value-object'

export default class ProductRepository implements ProductGateway {
  async find (id: string): Promise<Product> {
    const product = await ProductModel.findOne({ where: { id } })

    return new Product({
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice
    })
  }

  async findAll (): Promise<Product[]> {
    const products = await ProductModel.findAll()

    return products.map((p) => {
      return new Product({
        id: new Id(p.id),
        name: p.name,
        description: p.description,
        salesPrice: p.salesPrice
      })
    })
  }
}
