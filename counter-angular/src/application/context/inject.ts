import { InjectionToken } from '@angular/core'
import { CountPersistRepository } from '../../domain/repository/CountPersistRepository'
import { CountVolatileRepository } from '../../domain/repository/CountVolatileRepository'
import {Store} from 'redux';

export const COUNT_P_REPO = new InjectionToken<CountPersistRepository>('CountPersistRepository')
export const COUNT_V_REPO = new InjectionToken<CountVolatileRepository>('CountVolatileRepository')
export const STORE = new InjectionToken<Store>('Store')
