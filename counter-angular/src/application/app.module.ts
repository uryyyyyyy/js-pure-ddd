import { NgModule } from '@angular/core'
import { Counter } from './components/counter/counter'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { CountPersistRepositoryServer } from './infra/CountPersistRepositoryServer'
import { CountVolatileRepositoryImpl } from './infra/CountSessionRepository'
import { LocalCounter } from './components/counter/localCounter/local-counter'
import { CountPersistRepository } from '../domain/repository/CountPersistRepository'
import { CountVolatileRepository } from '../domain/repository/CountVolatileRepository'
import { GlobalCounter } from './components/counter/globalCounter/global-counter'

@NgModule({
  imports: [BrowserModule, HttpClientModule],
  declarations: [Counter, LocalCounter, GlobalCounter],
  bootstrap: [Counter],
  providers: [
    { provide: CountPersistRepository, useClass: CountPersistRepositoryServer },
    { provide: CountVolatileRepository, useClass: CountVolatileRepositoryImpl }
  ]
})
export class AppModule {}
