export default class OrderItem {
  private _id: string
  private _productId: string
  private _name: string
  private _price: number
  private _quantity: number

  constructor (id: string, name: string, price: number, quantity: number, productId: string) {
    this._id = id
    this._name = name
    this._price = price
    this._quantity = quantity
    this._productId = productId
  }

  public get id (): string {
    return this._id
  }

  public get name (): string {
    return this._name
  }

  public get price (): number {
    return this._price
  }

  public get quantity (): number {
    return this._quantity
  }

  public get productId (): string {
    return this._productId
  }

  public orderItemTotal (): number {
    return this._price * this._quantity
  }

  public changeQuantity (quantity: number): void {
    this._quantity = quantity
  }
}
