import { all, takeLatest, call, put } from 'redux-saga/effects'; 
import types from './types'; 
import { updateAgendamento } from './actions'; 
import api from '../../../services/api'; 
import consts from '../../../consts'; 


export function* filterAgendamento({ start }) {
    try {
        const {data: res} = yield call(api.get, '/agendamento/1', {
            
            "schedule": start,
            "customerName": consts.customerName, 
            "customerPhone": consts.customerPhone 
                
            
        });

        if (res.error) {
            alert(res.message); 
            return false; 
        }
        
        yield put(updateAgendamento(res.agendamentos)); 

    }   catch (err) {
        alert(err.message); 

    }

}

export default all([takeLatest(types.FILTER_AGENDAMENTOS, filterAgendamento)]); 

