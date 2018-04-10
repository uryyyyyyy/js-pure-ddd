import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { enableProdMode } from '@angular/core'
import { AppModule } from './app.module'
import { PRODUCTION } from './environments/Variables'

if (PRODUCTION) {
  enableProdMode()
}

platformBrowserDynamic().bootstrapModule(AppModule)
