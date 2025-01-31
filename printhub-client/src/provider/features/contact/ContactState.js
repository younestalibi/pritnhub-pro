export const initialContactState = {
    contacts:[],
    getContactsState : {
        isLoading : false,
        isError : false,
        isSuccess: false,
        message :""
    },
    CreateContactState : {
        isLoading : false,
        isError : false,
        isSuccess: false,
        message :""
    },
    respondContactState : {
        isLoading : false,
        isError : false,
        isSuccess: false,
        message :""
    },
    deleteContactState : {
        isLoading : false,
        isError : false,
        isSuccess: false,
        message :""
    },

};

export const resetContactState = (state) =>{
    state.getContactsState = {...initialContactState.getContactsState};
    state.CreateContactState = {...initialContactState.CreateContactState};
    state.respondContactState = {...initialContactState.respondContactState};
    state.deleteContactState = {...initialContactState.deleteContactState};
};