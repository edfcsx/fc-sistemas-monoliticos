import { PlaceOrderInputDTO } from './place-order.dto'
import PlaceOrderUseCaseFactory from '../../factory/place-order.usecase.factory'
import Product from '../../domain/product.entity'
import Id from '../../../@shared/domain/value-object/id.value-object'

describe('Place order usecase unit tests', () => {
  describe('client tests', () => {
    it('should throw an error when client not found', async () => {
      const mockClientFacade = {
        find: jest.fn().mockResolvedValue(undefined),
        add: jest.fn()
      }

      const placeOrderUseCase = PlaceOrderUseCaseFactory.create()
      placeOrderUseCase['_clientAdmFacade'] = mockClientFacade

      const input: PlaceOrderInputDTO = { clientId: '0', products: [] }
      await (expect(placeOrderUseCase.handle(input))).rejects.toThrow(new Error('client not found'))
    })
  })

  describe('validate products tests', () => {
    it('should throw an error when products are not valid', async () => {
      const mockClientFacade = {
        find: jest.fn().mockResolvedValue(true),
        add: jest.fn()
      }

      const placeOrderUseCase = PlaceOrderUseCaseFactory.create()
      placeOrderUseCase['_clientAdmFacade'] = mockClientFacade

      const mockValidateProducts = jest.spyOn((placeOrderUseCase as any), 'validateProducts')
        .mockRejectedValue(new Error('no products selected'))

      // @ts-expected-error - force set client facade

      const input: PlaceOrderInputDTO = { clientId: '1', products: [] }
      await expect(placeOrderUseCase.handle(input)).rejects.toThrow(new Error('no products selected'))
      expect(mockValidateProducts).toHaveBeenCalledTimes(1)
    })

    it('should throw an error when product is out of stock', async () => {
      const placeOrderUseCase = PlaceOrderUseCaseFactory.create()

      const mockProductAdmFacade = {
        checkStock: jest.fn(({ productId }: { productId: string }) =>
          Promise.resolve({
            productId,
            stock: productId === '1' ? 0 : 1
          })
        ),
        addProduct: jest.fn()
      }

      placeOrderUseCase['_productAdmFacade'] = mockProductAdmFacade

      let input: PlaceOrderInputDTO = {
        clientId: '0',
        products: [{ productId: '1' }]
      }

      await expect(placeOrderUseCase['validateProducts'](input)).rejects.toThrow(
        new Error('Product 1 is not available in stock')
      )

      input = {
        clientId: '0',
        products: [{ productId: '0' }, { productId: '1' }]
      }

      await expect(placeOrderUseCase['validateProducts'](input)).rejects.toThrow(
        new Error('Product 1 is not available in stock')
      )
      expect(mockProductAdmFacade.checkStock).toHaveBeenCalledTimes(3)
    })
  })

  describe('get products test', () => {
    const mockDate = new Date(2000, 1, 1)

    beforeAll(() => {
      jest.useFakeTimers({ advanceTimers: true })
      jest.setSystemTime(mockDate)
    })

    afterAll(() => {
      jest.useRealTimers()
    })

    it('should throw error when product not found', async () => {
      const placeOrderUseCase = PlaceOrderUseCaseFactory.create()

      const mockStoreCatalogFacade = {
        findProduct: jest.fn().mockResolvedValue(undefined),
        findAllProducts: jest.fn()
      }

      placeOrderUseCase['_storeCatalogFacade'] = mockStoreCatalogFacade
      await expect(placeOrderUseCase['getProduct']('0')).rejects.toThrow(new Error('Product not found'))
    })

    it('should return a product', async () => {
      const placeOrderUseCase = PlaceOrderUseCaseFactory.create()

      const mockStoreCatalogFacade = {
        findProduct: jest.fn().mockResolvedValue({
          id: 'valid_id',
          name: 'any product',
          description: 'any_description',
          salesPrice: 100
        }),
        findAllProducts: jest.fn()
      }

      placeOrderUseCase['_storeCatalogFacade'] = mockStoreCatalogFacade

      await expect(placeOrderUseCase['getProduct']('valid_id')).resolves.toEqual(
        new Product({
          id: new Id('valid_id'),
          name: 'any product',
          description: 'any_description',
          salesPrice: 100
        })
      )

      expect(mockStoreCatalogFacade.findProduct).toHaveBeenCalled()
    })
  })

  describe('place an order tests', () => {
    const placeOrderUseCase = PlaceOrderUseCaseFactory.create()

    const clientProps = {
      id: 'valid id',
      name: 'any name',
      email: 'any@mail.com',
      address: 'any address',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const mockClientAdmFacade = {
      find: jest.fn().mockResolvedValue(clientProps),
      add: jest.fn()
    }

    placeOrderUseCase['_clientAdmFacade'] = mockClientAdmFacade

    const mockPaymentFacade = { process: jest.fn() }
    placeOrderUseCase['_paymentFacade'] = mockPaymentFacade

    const mockCheckoutRepository = {
      findOrder: jest.fn(),
      addOrder: jest.fn()
    }
    placeOrderUseCase['_checkoutRepository'] = mockCheckoutRepository

    const mockInvoiceFacade = {
      find: jest.fn(),
      generate: jest.fn().mockResolvedValue({ id: 'l1' })
    }
    placeOrderUseCase['_invoiceFacade'] = mockInvoiceFacade

    const products = {
      1: new Product({
        id: new Id('1'),
        name: 'Product 1',
        description: 'some description',
        salesPrice: 40
      }),
      2: new Product({
        id: new Id('2'),
        name: 'Product 2',
        description: 'some description',
        salesPrice: 30
      })
    }

    const validateProductsSpy = jest.spyOn(placeOrderUseCase as any, 'validateProducts').mockResolvedValue(null)

    const mockGetProductSpy = jest.spyOn(placeOrderUseCase as any, 'getProduct')
      // @ts-ignore
      .mockImplementation((productId: keyof typeof products) => products[productId])

    it('should not be approved', async () => {
      mockPaymentFacade.process = mockPaymentFacade.process.mockReturnValue({
        transactionId: '1t',
        orderId: '1o',
        mount: 100,
        status: 'error',
        createdAt: new Date(),
        updatedAt: new Date()
      })

      const input: PlaceOrderInputDTO = {
        clientId: '1c',
        products: [{ productId: '1' }, { productId: '2' }]
      }

      const output = await placeOrderUseCase.handle(input)
      expect(output.invoiceId).toBe(null)
      expect(output.total).toBe(70)
      expect(output.products).toStrictEqual([
        { productId: '1' },
        { productId: '2' }
      ])
      expect(mockClientAdmFacade.find).toHaveBeenCalledTimes(1)
      expect(mockClientAdmFacade.find).toHaveBeenCalledWith({ id: 'ic' })
      expect(validateProductsSpy).toHaveBeenCalled()
      expect(mockGetProductSpy).toHaveBeenCalledTimes(2)
      expect(mockCheckoutRepository.addOrder).toHaveBeenCalledTimes(1)
      expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1)
      expect(mockPaymentFacade.process).toHaveBeenCalledWith({
        orderId: output.id,
        amount: output.total
      })
      expect(mockInvoiceFacade.generate).toHaveBeenCalledTimes(0)
    })
  })
})
