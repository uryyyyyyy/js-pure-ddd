import {InjectionToken} from '@angular/core'
import {CountRepository} from '../../domain/repository/CountRepository'

export const COUNT_REPO = new InjectionToken<CountRepository>('CountRepository')
