import types from './types'; 
import { produce } from 'immer'; 
const INITIAL_STATE = {
    agendamentos: [],
}; 

function agendamento(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.UPDATE_AGENDAMENTO: {
            return produce(state, (draft) => {
                draft.agendamentos = action.agendamentos; 
            } )

        }
        default: 
            return state; 
    }
}


export default agendamento; 
