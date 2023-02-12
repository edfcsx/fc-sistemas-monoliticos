import { Sequelize } from 'sequelize-typescript'
import SequelizeSetupTests from '../../@shared/tests/sequelize.setup'
import ProductModel from '../repository/product.model'
import StoreCatalogFacadeFactory from '../factory/facade.factory'

describe('Store catalog facade unit tests', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = await SequelizeSetupTests.createMemoryInstance([ProductModel])
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should find a product', async () => {
    await ProductModel.create({
      id: '1',
      name: 'Product 1',
      description: 'Product Description',
      salesPrice: 100
    })

    const facade = StoreCatalogFacadeFactory.create()
    const result = await facade.findProduct({ id: '1' })

    expect(result.id).toBe('1')
    expect(result.name).toBe('Product 1')
    expect(result.description).toBe('Product Description')
    expect(result.salesPrice).toBe(100)
  })

  it('should find all products', async () => {
    await ProductModel.create({
      id: '1',
      name: 'Product 1',
      description: 'Product Description',
      salesPrice: 100
    })

    await ProductModel.create({
      id: '2',
      name: 'Product 2',
      description: 'Product Description',
      salesPrice: 200
    })

    const facade = StoreCatalogFacadeFactory.create()
    const result = await facade.findAllProducts()

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
