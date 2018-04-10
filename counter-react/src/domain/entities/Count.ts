import deepEqual from 'deep-equal'

export class Count {
  private readonly value: number

  constructor(value: number) {
    this.value = value
  }

  /**
   * increment
   */
  increment(amount: number): Count {
    return new Count(this.value + amount)
  }

  /**
   * decrement
   */
  decrement(amount: number): Count {
    return new Count(this.value - amount)
  }

  /**
   * get value
   */
  getValue(): number {
    return this.value
  }

  equals(count: Count): boolean {
    return deepEqual(this, count)
  }
}