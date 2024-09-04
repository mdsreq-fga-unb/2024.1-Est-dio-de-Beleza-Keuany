import { all, takeLatest, call, put } from 'redux-saga/effects'; 
import types from './types'; 
import { updateAgendamento } from './actions'; 
import api from '../../../services/api'; 
import consts from '../../../consts'; 


export function* filterAgendamento({ start }) {
    try {
        const {data: res} = yield call(api.get, '/agendamento', {
            
            "appointmentSchedule": start,
            "queue[0].customerName": consts.customerName, 
            "queue[0].customerPhone": consts.customerPhone 
                
            
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

export function getAllAppointments() {
    const response = api.get(`/agendamento`);

    return response;
}

export default all([takeLatest(types.FILTER_AGENDAMENTOS, filterAgendamento)]); 

