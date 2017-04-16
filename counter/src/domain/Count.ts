
export default class Count {
  private value: number

  constructor(value: number) {
    this.value = value
  }

  /**
   * 加算
   */
  increment(amount: number): Count {
    return new Count(this.value + amount)
  }

  /**
   * 減算
   */
  decrement(amount: number): Count {
    return new Count(this.value - amount)
  }

  /**
   * 取得
   */
  getCount(): number {
    return this.value
  }
}