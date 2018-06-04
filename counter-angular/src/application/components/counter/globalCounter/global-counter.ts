import { Component, Inject, OnInit } from '@angular/core'
import { COUNT_REPO } from '../../../context/inject'
import {
  CountRepository,
  isFail
} from '../../../../domain/repository/CountRepository'
import { Count } from '../../../../domain/entities/Count'
import {CounterService} from '../../../../domain/service/CounterService';

@Component({
  selector: 'global-counter',
  templateUrl: './global-counter.html',
  styleUrls: ['./global-counter.scss']
})
export class GlobalCounter implements OnInit {
  count: Count
  loadingCount: number
  service: CounterService

  public constructor(
    @Inject(COUNT_REPO) countPRepo: CountRepository
  ) {
    this.service = new CounterService(countPRepo)
    this.count = new Count(0)
    this.loadingCount = 0
  }

  ngOnInit(): void {
    this.service.subscribe((c: Count) => (this.count = c))
    this.reload()
  }

  increment(num: number): void {
    this.service.increment(num)
  }

  decrement(num: number): void {
    this.service.decrement(num)
  }

  reload(): void {
    this.loadingCount = this.loadingCount + 1
    this.service.fetchLatest()
      .catch((e) => console.error(e))
      .finally(() => (this.loadingCount = this.loadingCount - 1))
  }

  save(): void {
    this.loadingCount = this.loadingCount + 1
    this.service.save(this.count)
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
