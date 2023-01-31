import ProductAdmFacade from '../facade/product-adm.facade'
import ProductRepository from '../repository/product.repository'
import AddProductUseCase from '../usecase/add-product/add-product.usecase'
import CheckProductStockUseCase from '../usecase/check-product-stock/check-product-stock.usecase'

export default class ProductAdmFacadeFactory {
  static create (): ProductAdmFacade {
    const productRepository = new ProductRepository()
    const addProductUseCase = new AddProductUseCase(productRepository)
    const checkProductStockUseCase = new CheckProductStockUseCase(productRepository)

    return new ProductAdmFacade({
      addProductUseCase,
      checkProductStockUseCase
    })
  }
}
