import counterRepository from '../CounterRepository'
import Count from '../../domain/Count'

const countKey = 'COUNT_KEY'

describe('CounterRepository', () => {

  beforeEach(() => {
    sessionStorage.clear()
  })

  it('can getCount from localStorage', () => {
    const count = counterRepository.getCount()
    expect(count).toEqual(new Count(0))
    
    sessionStorage.setItem(countKey, '10')
    const count2 = counterRepository.getCount()
    expect(count2).toEqual(new Count(10))
  })

  it('can save and send event', () => {
    counterRepository.subject
      .subscribe(count => {
        expect(count).toEqual(new Count(15))
    })
    counterRepository.save(new Count(15))
    expect(counterRepository.getCount()).toEqual(new Count(15))
  })
})