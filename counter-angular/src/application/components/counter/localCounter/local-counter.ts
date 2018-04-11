import { Component } from '@angular/core'

@Component({
  selector: 'local-counter',
  templateUrl: './local-counter.html',
  styleUrls: ['./local-counter.scss']
})
export class LocalCounter {
  internalCount: number

  public constructor() {
    this.internalCount = 0
  }

  increment(num: number): void {
    this.internalCount = this.internalCount + num
  }

  decrement(num: number): void {
    this.internalCount = this.internalCount - num
  }
}
