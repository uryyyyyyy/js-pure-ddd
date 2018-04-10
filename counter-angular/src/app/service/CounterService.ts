import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

export interface Count {
  count: number
}

@Injectable()
export class CounterService {
  constructor(private http: HttpClient) {}

  getCount(): Observable<Count> {
    return this.http.get<Count>('/api/count')
  }
}
