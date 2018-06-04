import * as React from 'react'
import * as ReactDOM from 'react-dom'
import "reflect-metadata";
import {TYPES} from './context/di-types';
import {container} from './context/context';
import {CounterContainer} from "./components/counter/";
import {CountRepository} from "../domain/repository/CountRepository";
import {CountRepositoryServer} from "./infra/CountRepositoryServer.service";

container.bind<CountRepository>(TYPES.CountRepository).to(CountRepositoryServer).inSingletonScope();

ReactDOM.render(<CounterContainer />,
  document.getElementById('app'));
