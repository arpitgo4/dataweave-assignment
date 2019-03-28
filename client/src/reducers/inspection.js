

export const inspectionReducer = (state = [], action) => {

    switch (action.type) {

        case 'SAVE_INSPECTION': {
            const { inspection } = action.payload;

            return [
                ...state,
                inspection,
            ];
        }
        
        case 'SAVE_INSPECTIONS': {
            const { inspections } = action.payload;

            return [
                ...inspections,
            ];
        }

        case 'UPDATE_INSPECTIONS': {
            const { inspections: updated_inspections } = action.payload;
            const state_inspections = state;

            const hash_table = {};
            updated_inspections.forEach(insp => hash_table[insp._id] = insp);

            return state_inspections.map(s_insp => {
                if (hash_table[s_insp._id])
                    return hash_table[s_insp._id];
                else return s_insp;
            });
        }

        default: 
            return state;
    }

}