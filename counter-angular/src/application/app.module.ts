import {NgModule} from '@angular/core'
import {Counter} from './components/counter/counter'
import {BrowserModule} from '@angular/platform-browser'
import {HttpClientModule} from '@angular/common/http'
import {CountRepositoryServer} from './infra/count-repository-server.service'
import {LocalCounter} from './components/counter/localCounter/local-counter'
import {GlobalCounter} from './components/counter/globalCounter/global-counter'
import {COUNT_REPO} from './context/inject'

@NgModule({
  imports: [BrowserModule, HttpClientModule],
  declarations: [Counter, LocalCounter, GlobalCounter],
  bootstrap: [Counter],
  providers: [
    { provide: COUNT_REPO, useClass: CountRepositoryServer }
  ]
})
export class AppModule {}
