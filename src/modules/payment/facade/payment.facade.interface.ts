export interface PaymentFacadeProcessInputDTO {
  orderId: string
  amount: number
}

export interface PaymentFacadeProcessOutputDTO {
  transactionId: string
  orderId: string
  amount: number
  status: string
  createdAt: Date
  updatedAt: Date
}

export default interface PaymentFacadeInterface {
  process (input: PaymentFacadeProcessInputDTO): Promise<PaymentFacadeProcessOutputDTO>
}
