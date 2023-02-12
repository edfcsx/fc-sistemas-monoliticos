export interface FindStoreCatalogFacadeInputDTO {
  id: string
}

export interface FindStoreCatalogFacadeOutputDTO {
  id: string
  name: string
  description: string
  salesPrice: number
}

export interface FindAllStoreCatalogFacadeOutputDTO {
  products: {
    id: string
    name: string
    description: string
    salesPrice: number
  }[]
}

export default interface StoreCatalogFacadeInterface {
  findProduct(input: FindStoreCatalogFacadeInputDTO): Promise<FindStoreCatalogFacadeOutputDTO>
  findAllProducts(): Promise<FindAllStoreCatalogFacadeOutputDTO>
}
