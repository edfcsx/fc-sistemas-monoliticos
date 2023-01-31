import Product from '../../domain/product.entity'
import Id from '../../../@shared/domain/value-object/id.value-object'
import CheckProductStockUseCase from './check-product-stock.usecase'

const product = new Product({
  id: new Id('1'),
  name: 'Product',
  description: 'Product Description',
  purchasePrice: 100,
  stock: 10
})

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product))
  }
}

describe('Check product stock use case unit test', () => {
  it('should get stock of a product', async () => {
    const productRepository = MockRepository()
    const checkStockUseCase = new CheckProductStockUseCase(productRepository)

    const result = await checkStockUseCase.handle({ productId: '1' })

    expect(productRepository.find).toHaveBeenCalled()
    expect(result.productId).toBe('1')
    expect(result.stock).toBe(10)
  })
})
