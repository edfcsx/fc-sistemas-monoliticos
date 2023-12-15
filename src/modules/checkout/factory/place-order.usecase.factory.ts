import PlaceOrderUseCase from '../usecase/place-order/place-order.usecase'
import ProductAdmFacadeFactory from '../../product-adm/factory/facade.factory'
import ClientAdmFacadeFactory from '../../client-adm/factory/client-adm.facade.factory'
import StoreCatalogFacadeFactory from '../../store-catalog/factory/facade.factory'
import PaymentFacadeFactory from '../../payment/factory/payment-facade.factory'
import CheckoutRepository from '../repository/checkout.repository'
import InvoiceFacadeFactory from '../../invoice/factory/invoice.facade.factory'

export default class PlaceOrderUseCaseFactory {
  static create (): PlaceOrderUseCase {
    const clientAdmFacade = ClientAdmFacadeFactory.create()
    const productAdmFacade = ProductAdmFacadeFactory.create()
    const storeCatalogFacade = StoreCatalogFacadeFactory.create()
    const paymentFacade = PaymentFacadeFactory.create()
    const invoiceFacade = InvoiceFacadeFactory.create()
    const checkoutRepository = new CheckoutRepository()

    return new PlaceOrderUseCase({
      clientAdmFacade,
      productAdmFacade,
      storeCatalogFacade,
      paymentFacade,
      invoiceFacade,
      checkoutRepository
    })
  }
}
