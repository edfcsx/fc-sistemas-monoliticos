import ValueObject from '../../../@shared/domain/value-object/value-object.interface'

export type AddressProps = {
  street: string
  complement: string
  number: string
  city: string
  state: string
  zip: string
}

export default class Address implements ValueObject {
  private readonly _street: string
  private readonly _complement: string
  private readonly _number: string
  private readonly _city: string
  private readonly _state: string
  private readonly _zip: string

  constructor (props: AddressProps) {
    this._street = props.street
    this._complement = props.complement
    this._number = props.number
    this._city = props.city
    this._state = props.state
    this._zip = props.zip
  }

  get street (): string {
    return this._street
  }

  get complement (): string {
    return this._complement
  }

  get number (): string {
    return this._number
  }

  get city (): string {
    return this._city
  }

  get state (): string {
    return this._state
  }

  get zip (): string {
    return this._zip
  }
}
