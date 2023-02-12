import Id from '../../@shared/domain/value-object/id.value-object'
import BaseEntity from '../../@shared/domain/entity/base.entity'
import AggregateRoot from '../../@shared/domain/entity/aggregate-root.interface'

export enum TransactionStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  DECLINED = 'declined'
}

type TransactionProps = {
  id?: Id
  amount: number
  orderId: string
  status?: string
  createdAt?: Date
  updatedAt?: Date
}

export default class TransactionEntity extends BaseEntity implements AggregateRoot {
  private readonly _amount: number
  private readonly _orderId: string
  private _status: string

  constructor (props: TransactionProps) {
    super(props.id, props.createdAt, props.updatedAt)
    this._amount = props.amount
    this._orderId = props.orderId
    this._status = props.status || TransactionStatus.PENDING.toString()
  }

  private validate (): void {
    if (this._amount <= 0) {
      throw new Error('Amount must be greater than 0')
    }
  }

  approve (): void {
    this._status = TransactionStatus.APPROVED.toString()
  }

  decline (): void {
    this._status = TransactionStatus.DECLINED.toString()
  }

  process (): void {
    if (this._amount >= 100) {
      this.approve()
    } else {
      this.decline()
    }
  }

  get amount (): number {
    return this._amount
  }

  get orderId (): string {
    return this._orderId
  }

  get status (): string {
    return this._status
  }
}
