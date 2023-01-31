import { Sequelize } from 'sequelize-typescript'
import { ProductModel } from './product.model'
import Product, { ProductProps } from '../domain/product.entity'
import Id from '../../@shared/domain/value-object/id.value-object'
import ProductRepository from './product.repository'
import SequelizeSetupTests from '../../@shared/tests/sequelize.setup'

describe('Product Repository test', function () {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = await SequelizeSetupTests.createMemoryInstance([ProductModel])
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a product', async () => {
    const productProps: ProductProps = {
      id: new Id('1'),
      name: 'Product 1',
      description: 'Product 1 Description',
      purchasePrice: 100,
      stock: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const product = new Product(productProps)
    const productRepository = new ProductRepository()
    await productRepository.add(product)

    const findProduct = await ProductModel.findOne({
      where: { id: productProps.id.id }
    })

    expect(productProps.id.id).toEqual(findProduct.id)
    expect(productProps.name).toEqual(findProduct.name)
    expect(productProps.description).toEqual(findProduct.description)
    expect(productProps.purchasePrice).toEqual(findProduct.purchasePrice)
    expect(productProps.stock).toEqual(findProduct.stock)
  })

  it('should find a product', async () => {
    await ProductModel.create({
      id: '1',
      name: 'Product 1',
      description: 'Product 1 Description',
      purchasePrice: 100,
      stock: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    const productRepository = new ProductRepository()
    const product = await productRepository.find('1')

    expect(product.id.id).toEqual('1')
    expect(product.name).toEqual('Product 1')
    expect(product.description).toEqual('Product 1 Description')
    expect(product.purchasePrice).toEqual(100)
    expect(product.stock).toEqual(100)
  })
})
