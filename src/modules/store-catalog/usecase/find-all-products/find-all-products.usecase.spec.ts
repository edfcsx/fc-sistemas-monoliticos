import Product from '../../domain/product.entity'
import Id from '../../../@shared/domain/value-object/id.value-object'
import FindAllProductsUseCase from './find-all-products.usecase'

const product = new Product({
  id: new Id('1'),
  name: 'Product 1',
  description: 'Product Description',
  salesPrice: 100
})

const product2 = new Product({
  id: new Id('2'),
  name: 'Product 2',
  description: 'Product Description',
  salesPrice: 200
})

const productRepository = () => ({
  find: jest.fn(),
  findAll: jest.fn().mockReturnValue(Promise.resolve([product, product2]))
})

describe('Find all products use case tests', () => {
  it('should find all products', async () => {
    const repository = productRepository()
    const usecase = new FindAllProductsUseCase(repository)
    const result = await usecase.handle()

    expect(repository.findAll).toHaveBeenCalled()
    expect(result.products.length).toBe(2)
    expect(result.products[0].id).toBe('1')
    expect(result.products[0].name).toBe('Product 1')
    expect(result.products[0].description).toBe('Product Description')
    expect(result.products[0].salesPrice).toBe(100)
    expect(result.products[1].id).toBe('2')
    expect(result.products[1].name).toBe('Product 2')
    expect(result.products[1].description).toBe('Product Description')
    expect(result.products[1].salesPrice).toBe(200)
  })
})
