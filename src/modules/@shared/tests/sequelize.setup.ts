import { Sequelize } from 'sequelize-typescript'
import { ModelCtor } from 'sequelize-typescript/dist/model/model/model'

export default abstract class SequelizeSetupTests {
  static async createMemoryInstance (models: ModelCtor[]) {
    const sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels(models)
    await sequelize.sync()
    return sequelize
  }
}
