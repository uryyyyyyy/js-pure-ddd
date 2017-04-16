import {CounterService} from '../CounterService'
import {CounterRepository} from '../../infra/CounterRepository'
import Count from '../../domain/Count'

describe('CounterService', () => {
  let counterRepository: any

  beforeEach(() => {
    sessionStorage.clear()
    counterRepository = new CounterRepository(sessionStorage)
  })

  it('can getCount', () => {
    spyOn(counterRepository, 'getCount').and.returnValue(new Count(10))
    const service = new CounterService(counterRepository)
    const count = service.getCount()
    expect(count).toEqual(new Count(10))
  })

  it('can increment', () => {
    spyOn(counterRepository, 'save')
    const service = new CounterService(counterRepository)
    expect(service.getCount()).toEqual(new Count(0))

    service.increment(15)
    expect(counterRepository.save.calls.count()).toEqual(1)
    expect(counterRepository.save.calls.argsFor(0)[0]).toEqual(new Count(15))
  })
})