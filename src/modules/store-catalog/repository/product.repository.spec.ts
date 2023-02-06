import { Sequelize } from 'sequelize-typescript'
import SequelizeSetupTests from '../../@shared/tests/sequelize.setup'
import ProductModel from './product.model'
import ProductRepository from './product.repository'

describe('Product repository unit tests', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = await SequelizeSetupTests.createMemoryInstance([ProductModel])
  })

  afterEach(async () => {
    await sequelize.close()
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

    const repository = new ProductRepository()
    const products = await repository.findAll()

    expect(products.length).toBe(2)
    expect(products[0].id.id).toBe('1')
    expect(products[0].name).toBe('Product 1')
    expect(products[0].description).toBe('Product Description')
    expect(products[0].salesPrice).toBe(100)
    expect(products[1].id.id).toBe('2')
    expect(products[1].name).toBe('Product 2')
    expect(products[1].description).toBe('Product Description')
    expect(products[1].salesPrice).toBe(200)
  })

  it('should find a product', async () => {
    await ProductModel.create({
      id: '1',
      name: 'Product 1',
      description: 'Product Description',
      salesPrice: 100
    })

    const repository = new ProductRepository()
    const product = await repository.find('1')

    expect(product.id.id).toBe('1')
    expect(product.name).toBe('Product 1')
    expect(product.description).toBe('Product Description')
    expect(product.salesPrice).toBe(100)
  })
})
