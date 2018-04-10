import { Component, OnInit } from '@angular/core'
import { CounterService } from './service/CounterService'

@Component({
  selector: 'main-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  name: string
  count: number

  public constructor(private counterService: CounterService) {
    this.name = 'Angular'
    this.count = 0
  }

  ngOnInit(): void {
    this.counterService.getCount().subscribe((data) => {
      this.count = data.count
    })
  }
}
