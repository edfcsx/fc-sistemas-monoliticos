export interface AddClientFacadeInputDTO {
  id?: string
  name: string
  email: string
  address: string
}

export interface FindClientFacadeInputDTO {
  id: string
}

export interface FindClientFacadeOutputDTO {
  id: string
  name: string
  email: string
  address: string
  createdAt: string
  updatedAt: string
}

export default interface ClientAdmFacadeInterface {
  add(input: AddClientFacadeInputDTO): Promise<void>
  find(input: FindClientFacadeInputDTO): Promise<FindClientFacadeOutputDTO>
}
