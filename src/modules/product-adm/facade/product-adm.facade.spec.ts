import { Sequelize } from 'sequelize-typescript'
import SequelizeSetupTests from '../../@shared/tests/sequelize.setup'
import { ProductModel } from '../repository/product.model'
import ProductAdmFacadeFactory from '../factory/facade.factory'

describe('Product Adm Facade tests', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = await SequelizeSetupTests.createMemoryInstance([ProductModel])
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a product', async () => {
    const productFacade = ProductAdmFacadeFactory.create()

    const input = {
      id: '1',
      name: 'Product 1',
      description: 'Product 1 Description',
      purchasePrice: 100,
      stock: 10
    }

    await productFacade.addProduct(input)
    const product = await ProductModel.findOne({ where: { id: '1' } })

    expect(product.id).toEqual(input.id)
    expect(product.name).toEqual(input.name)
    expect(product.description).toEqual(input.description)
    expect(product.purchasePrice).toEqual(input.purchasePrice)
    expect(product.stock).toEqual(input.stock)
  })

  it('should check a product stock', async () => {
    const productFacade = ProductAdmFacadeFactory.create()

    const input = {
      id: '1',
      name: 'Product 1',
      description: 'Product 1 Description',
      purchasePrice: 100,
      stock: 10
    }

    await productFacade.addProduct(input)
    const result = await productFacade.checkStock({ productId: input.id })
    expect(result.productId).toBe(input.id)
    expect(result.stock).toBe(input.stock)
  })
})
