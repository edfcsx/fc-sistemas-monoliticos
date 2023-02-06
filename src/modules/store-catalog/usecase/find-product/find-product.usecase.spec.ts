import Product from '../../domain/product.entity'
import Id from '../../../@shared/domain/value-object/id.value-object'
import FindProductUsecase from './find-product.usecase'

const product = new Product({
  id: new Id('1'),
  name: 'Product 1',
  description: 'Product Description',
  salesPrice: 100
})

const productRepository = () => ({
  find: jest.fn().mockReturnValue(Promise.resolve(product)),
  findAll: jest.fn()
})

describe('Find product use case unit tests', () => {
  it('should find a product', async () => {
    const repository = productRepository()
    const usecase = new FindProductUsecase(repository)
    const product = await usecase.handle({ id: '1' })

    expect(repository.find).toHaveBeenCalled()
    expect(product.id).toBe('1')
    expect(product.name).toBe('Product 1')
    expect(product.description).toBe('Product Description')
    expect(product.salesPrice).toBe(100)
  })
})
