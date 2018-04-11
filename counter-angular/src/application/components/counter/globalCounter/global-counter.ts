import { Component, Inject, OnInit } from '@angular/core'
import { CountVolatileRepository } from '../../../../domain/repository/CountVolatileRepository'
import { COUNT_P_REPO, COUNT_V_REPO } from '../../../context/inject'
import {
  CountPersistRepository,
  isFail
} from '../../../../domain/repository/CountPersistRepository'
import { Count } from '../../../../domain/entities/Count'

@Component({
  selector: 'global-counter',
  templateUrl: './global-counter.html',
  styleUrls: ['./global-counter.scss']
})
export class GlobalCounter implements OnInit {
  count: number
  loadingCount: number

  public constructor(
    @Inject(COUNT_P_REPO) private countPRepo: CountPersistRepository,
    @Inject(COUNT_V_REPO) private countVRepo: CountVolatileRepository
  ) {
    this.count = 0
    this.loadingCount = 0
  }

  ngOnInit(): void {
    this.countVRepo.getStateObservable().subscribe((c: Count) => (this.count = c.getValue()))
    this.reload()
  }

  increment(num: number): void {
    this.countVRepo.increment(num)
  }

  decrement(num: number): void {
    this.countVRepo.decrement(num)
  }

  reload(): void {
    this.loadingCount = this.loadingCount + 1
    this.countPRepo
      .fetchCount()
      .then((count) => this.countVRepo.update(count))
      .catch((e) => console.error(e))
      .finally(() => (this.loadingCount = this.loadingCount - 1))
  }

  save(): void {
    this.loadingCount = this.loadingCount + 1
    this.countPRepo
      .saveCount(new Count(this.count))
      .then((result) => {
        if (isFail(result)) {
          window.alert(result.err.message)
        } else {
          window.alert('セーブしました')
        }
      })
      .catch((e) => {
        console.error(e)
        window.alert('サーバーに繋がりませんでした')
      })
      .finally(() => (this.loadingCount = this.loadingCount - 1))
  }
}
