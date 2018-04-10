import { Component, OnInit } from '@angular/core'
import { CountVolatileRepository } from '../../../../domain/repository/CountVolatileRepository'

@Component({
  selector: 'local-counter',
  templateUrl: './local-counter.html',
  styleUrls: ['./local-counter.scss']
})
export class LocalCounter implements OnInit {
  internalCount: number

  public constructor(private countVolatileRepository: CountVolatileRepository) {
    this.internalCount = 0
  }

  ngOnInit(): void {
    console.log(this.countVolatileRepository)
  }
}
