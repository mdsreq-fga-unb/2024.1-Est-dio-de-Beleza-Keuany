import { all } from 'redux-saga/effects'; 

import agendamento from './modules/agendamento/sagas';

export default function* rootSaga(){
    return yield all([agendamento]); 
    
}

