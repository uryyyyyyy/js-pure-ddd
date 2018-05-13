import {NgModule} from '@angular/core'
import {Counter} from './components/counter/counter'
import {BrowserModule} from '@angular/platform-browser'
import {HttpClientModule} from '@angular/common/http'
import {CountPersistRepositoryServer} from './infra/CountPersistRepositoryServer'
import {LocalCounter} from './components/counter/localCounter/local-counter'
import {GlobalCounter} from './components/counter/globalCounter/global-counter'
import {COUNT_P_REPO, COUNT_V_REPO, STORE} from './context/inject'
import {CountVolatileRepositoryImpl} from './infra/CountVolatileRepository';
import {store} from './infra/store/Store';

@NgModule({
  imports: [BrowserModule, HttpClientModule],
  declarations: [Counter, LocalCounter, GlobalCounter],
  bootstrap: [Counter],
  providers: [
    { provide: STORE, useValue: store },
    { provide: COUNT_P_REPO, useClass: CountPersistRepositoryServer },
    { provide: COUNT_V_REPO, useClass: CountVolatileRepositoryImpl }
  ]
})
export class AppModule {}
