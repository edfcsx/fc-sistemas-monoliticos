import Product from './product'

describe('Product unit tests', () => {
  it('Should throw error when id is empty', () => {
    expect(() => {
      new Product('', 'Product 1', 100)
    }).toThrowError('Id is required')
  })

  it('Should throw error when name is empty', () => {
    expect(() => {
      new Product('1', '', 100)
    }).toThrowError('Name is required')
  })

  it('Should throw error when price is less than zero', () => {
    expect(() => {
      new Product('1', 'product', -1)
    }).toThrowError('Price must be great than zero')
  })

  it('Should change name', () => {
    const product = new Product('1', 'product', 100)
    product.changeName('product 2')
    expect(product.name).toBe('product 2')
  })

  it('Should change price', () => {
    const product = new Product('1', 'product', 100)
    product.changePrice(2000)
    expect(product.price).toBe(2000)
  })
})
