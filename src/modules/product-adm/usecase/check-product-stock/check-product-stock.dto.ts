export interface CheckProductStockInputDTO {
  productId: string
}

export interface CheckProductStockOutputDTO {
  productId: string
  stock: number
}
