import Count from "../Count";

describe('Count', () => {
  it('can increment', () => {
    const count = new Count(10)
    expect(count.getCount()).toBe(10)
    const newCount = count.increment(5)
    expect(newCount.getCount()).toBe(15)
  })

  it('can decrement', () => {
    const count = new Count(10)
    expect(count.getCount()).toBe(10)
    const newCount = count.decrement(5)
    expect(newCount.getCount()).toBe(5)
  })
})