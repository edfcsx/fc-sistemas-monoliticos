import UseCaseInterface from '../../../@shared/usecase/use-case.interface'
import { PlaceOrderInputDTO, PlaceOrderOutputDTO } from './place-order.dto'
import ClientAdmFacadeInterface from '../../../client-adm/facade/client-adm.facade.interface'
import ProductAdmFacadeInterface from '../../../product-adm/facade/product-adm.facade.interface'
import StoreCatalogFacadeInterface from '../../../store-catalog/facade/store-catalog.facade.interface'
import Product from '../../domain/product.entity'
import Id from '../../../@shared/domain/value-object/id.value-object'
import Client from '../../domain/client.entity'
import PaymentFacadeInterface from '../../../payment/facade/payment.facade.interface'
import InvoiceFacadeInterface from '../../../invoice/facade/invoice.facade.interface'
import CheckoutGateway from '../../gateway/checkout.gateway'

type PlaceOrderUseCaseProps = {
  clientAdmFacade: ClientAdmFacadeInterface
  productAdmFacade: ProductAdmFacadeInterface
  storeCatalogFacade: StoreCatalogFacadeInterface
  paymentFacade: PaymentFacadeInterface
  invoiceFacade: InvoiceFacadeInterface
  checkoutRepository: CheckoutGateway
}

export default class PlaceOrderUseCase implements UseCaseInterface {
  private _clientAdmFacade: ClientAdmFacadeInterface
  private _productAdmFacade: ProductAdmFacadeInterface
  private _storeCatalogFacade: StoreCatalogFacadeInterface
  private _paymentFacade: PaymentFacadeInterface
  private _invoiceFacade: InvoiceFacadeInterface
  private _checkoutRepository: CheckoutGateway

  constructor (props: PlaceOrderUseCaseProps) {
    this._clientAdmFacade = props.clientAdmFacade
    this._productAdmFacade = props.productAdmFacade
    this._storeCatalogFacade = props.storeCatalogFacade
    this._paymentFacade = props.paymentFacade
    this._invoiceFacade = props.invoiceFacade
    this._checkoutRepository = props.checkoutRepository
  }

  async handle (input: PlaceOrderInputDTO): Promise<PlaceOrderOutputDTO> {
    const client = await this._clientAdmFacade.find({ id: input.clientId })
    if (!client) throw new Error('client not found')

    await this.validateProducts(input)
    const products = await Promise.all(
      input.products.map((p) => this.getProduct(p.productId))
    )

    const checkoutClient = new Client({
      id: new Id(client.id),
      name: client.name,
      address: client.address,
      email: client.email
    })

    return {
      id: '',
      invoiceId: '',
      status: '',
      total: 0,
      products: []
    }
  }

  private async validateProducts (input: PlaceOrderInputDTO): Promise<void> {
    if (!input.products.length) {
      throw new Error('no products selected')
    }

    for (const p of input.products) {
      const product = await this._productAdmFacade.checkStock({ productId: p.productId })
      if (product.stock <= 0) throw new Error(`Product ${p.productId} is not available in stock`)
    }
  }

  private async getProduct (productId: string): Promise<Product> {
    const product = await this._storeCatalogFacade.findProduct({ id: productId })

    if (!product) throw new Error('Product not found')

    return new Product({
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice
    })
  }
}
