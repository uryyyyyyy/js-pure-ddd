import { Component, OnInit } from '@angular/core'
import { CountVolatileRepository } from '../../../../domain/repository/CountVolatileRepository'

@Component({
  selector: 'global-counter',
  templateUrl: './global-counter.html',
  styleUrls: ['./global-counter.scss']
})
export class GlobalCounter implements OnInit {
  internalCount: number

  public constructor(private countVolatileRepository: CountVolatileRepository) {
    this.internalCount = 0
  }

  ngOnInit(): void {
    console.log(this.countVolatileRepository)
  }
}
