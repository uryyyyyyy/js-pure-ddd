import { Component, Inject, OnInit } from '@angular/core'
import { CountVolatileRepository } from '../../../../domain/repository/CountVolatileRepository'
import { COUNT_V_REPO } from '../../../context/inject'

@Component({
  selector: 'global-counter',
  templateUrl: './global-counter.html',
  styleUrls: ['./global-counter.scss']
})
export class GlobalCounter implements OnInit {
  internalCount: number

  public constructor(@Inject(COUNT_V_REPO) private countVRepo: CountVolatileRepository) {
    this.internalCount = 0
  }

  ngOnInit(): void {
    console.log(this.countVRepo)
  }
}
