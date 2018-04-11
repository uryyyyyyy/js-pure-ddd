import { NgModule } from '@angular/core'
import { Counter } from './components/counter/counter'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { countPersistRepositoryServer } from './infra/CountPersistRepositoryServer'
import { countVolatileRepositoryImpl } from './infra/CountSessionRepository'
import { LocalCounter } from './components/counter/localCounter/local-counter'
import { GlobalCounter } from './components/counter/globalCounter/global-counter'
import { COUNT_P_REPO, COUNT_V_REPO } from './context/inject'

@NgModule({
  imports: [BrowserModule, HttpClientModule],
  declarations: [Counter, LocalCounter, GlobalCounter],
  bootstrap: [Counter],
  providers: [
    { provide: COUNT_P_REPO, useValue: countPersistRepositoryServer },
    { provide: COUNT_V_REPO, useValue: countVolatileRepositoryImpl }
  ]
})
export class AppModule {}
