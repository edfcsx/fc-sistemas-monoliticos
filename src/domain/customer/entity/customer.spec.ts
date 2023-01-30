import Address from '../value-object/address'
import Customer from './customer'

describe('Customer unit test', () => {
	it('should throw error when id is empty', () => {
		expect(() => {
			// eslint-disable-next-line no-new
			new Customer('', 'john')
		}).toThrowError('Id is required')
	})

	it('should throw error when name is empty', () => {
		expect(() => {
			// eslint-disable-next-line no-new
			new Customer('', '')
		}).toThrowError('Name is required')
	})

	it('should change name', () => {
		const customer = new Customer('123', 'John')
		customer.changeName('Jane')

		expect(customer.name).toBe('Jane')
	})

	it('should activate customer', () => {
		const customer = new Customer('1', 'John Doe')
		const address = new Address('Street One', '176', '51350-320', 'New York')
		customer.changeAddress(address)
		customer.activate()

		expect(customer.isActive()).toBe(true)
	})

	it('should deactivate customer', () => {
		const customer = new Customer('1', 'John Doe')
		customer.deactive()

		expect(customer.isActive()).toBe(false)
	})

	it('should throw error when address is undefined when you activate a customer', () => {
		expect(() => {
			const customer = new Customer('1', 'John Doe')
			customer.activate()
		}).toThrowError('Address is mandatory to active a customer')
	})

	it('should add reward points', () => {
		const customer = new Customer('1', 'John Doe')
		expect(customer.rewardPoints).toBe(0)

		customer.addRewardPoints(10)
		expect(customer.rewardPoints).toBe(10)

		customer.addRewardPoints(10)
		expect(customer.rewardPoints).toBe(20)
	})
})
