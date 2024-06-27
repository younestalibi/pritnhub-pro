import contactService from "./ContactServices";
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { initialContactState, resetContactState } from "./ContactState";

export const getContacts = createAsyncThunk(
  "contact/get-all",
  async (_, thunkAPI) => {
    try {
      return await contactService.getContacts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createContact = createAsyncThunk(
  "contact/create-one",
  async (contact, thunkAPI) => {
    try {
      return await contactService.createContact(contact);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const respondContact = createAsyncThunk(
  "contact/respond",
  async (contact, thunkAPI) => {
    try {
      // console.log([...contact])
      return await contactService.respondContact(contact);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contact/delete-one",
  async (id, thunkAPI) => {
    try {
      return await contactService.deleteContact(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetStateContact = createAction("contact/reset-state");
export const ContactSlice = createSlice({
  name: "contact",
  initialState: initialContactState,
  reducers: {},
  extraReducers: (builder) => {
    //get-all contacts
    builder
      .addCase(getContacts.pending, (state) => {
        resetContactState(state);
        state.getContactsState.isLoading = true;
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        resetContactState(state);
        state.getContactsState.isSuccess = true;
        state.getContactsState.message = action.payload.message;
        state.contacts = action.payload.contacts;
      })
      .addCase(getContacts.rejected, (state, action) => {
        resetContactState(state);
        state.getContactsState.isError = true;
        state.getContactsState.message = action.payload.error;
      })
      //========delete contact state========
      .addCase(deleteContact.pending, (state) => {
        resetContactState(state);
        state.deleteContactState.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.deleteContactState.isError = false;
        state.deleteContactState.isLoading = false;
        state.deleteContactState.isSuccess = true;
        state.deleteContactState.message = action.payload.message;
        state.contacts = state.contacts.filter((contact) => {
          return contact.id != action.payload.id;
        });
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.deleteContactState.isError = true;
        state.deleteContactState.isLoading = false;
        state.deleteContactState.isSuccess = false;
        state.deleteContactState.message = action.payload.error;
      })
      //========respond contact state========
      .addCase(respondContact.pending, (state) => {
        resetContactState(state);
        state.respondContactState.isLoading = true;
      })
      .addCase(respondContact.fulfilled, (state, action) => {
        state.respondContactState.isError = false;
        state.respondContactState.isLoading = false;
        state.respondContactState.isSuccess = true;
        state.respondContactState.message = action.payload.message;
      })
      .addCase(respondContact.rejected, (state, action) => {
        state.respondContactState.isError = true;
        state.respondContactState.isLoading = false;
        state.respondContactState.isSuccess = false;
        state.respondContactState.message = action.payload.error;
      })
      //================create contact =================
      .addCase(createContact.pending, (state) => {
        resetContactState(state);
        state.CreateContactState.isLoading = true;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.CreateContactState.isSuccess = true;
        state.CreateContactState.message = action.payload.message;
        state.contacts.unshift(action.payload.contact);
      })
      .addCase(createContact.rejected, (state, action) => {
        state.CreateContactState.isError = true;
        state.CreateContactState.message = action.payload.error;
      })
      //reset-state-address
      .addCase(resetStateContact, (state) => {
        resetContactState(state);
      });
  },
});
export default ContactSlice.reducer;
