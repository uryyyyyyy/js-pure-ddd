import * as React from 'react'
import counterService from '../../services/CounterService'
import {shallow} from 'enzyme'
import App from '../App'
import Count from '../../domain/Count'
import {Subject} from 'rxjs/Subject'

describe('App', () => {

  it('can initialize', () => {
    const wrapper = shallow(<App counterService={counterService} />)
    expect(wrapper.find('p').at(0).prop('children')).toBe('score: 0')
    console.log(counterService.getCount())
  })

  it('can initialize with value', () => {
    spyOn(counterService, 'getCount').and.returnValue(new Count(10))
    const wrapper = shallow(<App counterService={counterService} />)
    expect(wrapper.find('p').at(0).prop('children')).toBe('score: 10')
  })

  it('can update with new state', () => {
    const subject = new Subject()
    spyOn(counterService, 'getObservable').and.returnValue(subject)
    const wrapper = shallow(<App counterService={counterService} />)
    expect(wrapper.find('p').at(0).prop('children')).toBe('score: 0')
    subject.next(new Count(15))
    expect(wrapper.find('p').at(0).prop('children')).toBe('score: 15')
  })
})