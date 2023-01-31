export default interface UseCaseInterface {
  handle(input: any): Promise<any>
}
