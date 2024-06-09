import axiosHttp from "../../../utils/axios-client";

const getContacts = async () =>{
    try{
        const response = await axiosHttp.get('/contact');
        return response.data;

    }catch(error){
        throw  error.response.data;
    }
};


const createContact = async (contact) =>{
    try{
        const response = await axiosHttp.post('/contact',contact);
        return response.data;
    }catch(error){
        return error.response.data;
    }
};

const respondContact = async ({id,contact}) =>{
    try{
        const response = await axiosHttp.post(`/contact/${id}`,contact);
        console.log("log3 :"+response.data);
        return response.data;
    }catch(error){
        return error.response.data;
    }
};

const deleteContact = async (id) =>{
    try{
        const response = await axiosHttp.delete(`/contact/delete/${id}`);
        return response.data;
    }catch(error){
        return error.response.data;
    }
};

const contactService ={
        getContacts,
        createContact,
        respondContact,
        deleteContact,
};

export default contactService;