import '../test-polyfills'
import { async, TestBed } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { Count, CounterService } from './service/CounterService'
import { HttpClientModule } from '@angular/common/http'
import { of } from 'rxjs'

describe('AppComponent', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [AppComponent],
        imports: [HttpClientModule],
        providers: [
          CounterService,
          {
            provide: CounterService,
            useValue: jasmine.createSpyObj('CounterService', ['getCount'])
          }
        ]
      }).compileComponents()
    })
  )
  it(
    'should create the app',
    async(() => {
      const fixture = TestBed.createComponent(AppComponent)
      const app = fixture.debugElement.componentInstance
      expect(app).toBeTruthy()
    })
  )
  it(
    `should have name`,
    async(() => {
      const fixture = TestBed.createComponent(AppComponent)
      const app: AppComponent = fixture.debugElement.componentInstance
      expect(app.name).toEqual('Angular')
    })
  )
  it(
    'should render title in a h1 tag',
    async(() => {
      const spy = TestBed.get(CounterService)
      spy.getCount.and.returnValue(of<Count>({ count: 100 }))

      const fixture = TestBed.createComponent(AppComponent)
      fixture.detectChanges()
      const compiled = fixture.debugElement.nativeElement
      expect(compiled.querySelector('h1').textContent).toContain('Angular App')
    })
  )
  it(
    'should render count with async module',
    async(() => {
      const spy = TestBed.get(CounterService)
      spy.getCount.and.returnValue(of<Count>({ count: 100 }))
      const fixture = TestBed.createComponent(AppComponent)
      fixture.detectChanges()
      const compiled = fixture.debugElement.nativeElement
      expect(compiled.querySelectorAll('p')[1].textContent).toContain('count: 100')
    })
  )
})
