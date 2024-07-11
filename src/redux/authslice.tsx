import {
    createAction,
    createAsyncThunk,
    createSlice,
    SliceCaseReducers,
    SliceSelectors,
  } from '@reduxjs/toolkit';
  import axios from 'axios';
  import {storeToken} from '../utils/tokenManagement';
  import {BASE_URL} from '../constants/url';
  import {createFormData} from '../constants/requestStructure';
  import {setUpdateCommentData} from './songsSlice';
  
  interface User {
    email: string;
    email_verified: number;
    fcm_token: string | null;
    fname: string;
    id: string;
    insert_at: string;
    last_logged_in: string | null;
    last_login_offset: string | null;
    lname: string;
    local_id: string;
    name: string;
    provider: string;
    provider_info: string; // You might want to create a more specific type for provider_info
    role_id: string;
    username: string;
  }
  export interface AuthState {
    user: User | null;
    loginStatus: string;
    loginError?: any;
    EditUsernameStatus: string;
    EditUsernameError?: any;
    deleteAccountStatus: string;
    deleteAccountError?: any;
  }
  
  const initialState = {
    user: null,
    loginStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    loginError: null,
    deleteAccountStatus: 'idle',
    deleteAccountError: null,
    EditUsernameStatus: 'idle',
    EditUsernameError: null,
  };
  
  const auth = createSlice<
    AuthState,
    SliceCaseReducers<AuthState>,
    string,
    SliceSelectors<AuthState>
  >({
    name: 'auth',
    initialState,
    reducers: {
      loggedIn: (state, action) => {
        state.user = action.payload.user;
      },
      loggedOut: (state) => {
        state.user = null;
      },
      reset: () => initialState,
    },
    extraReducers(builder) {
      builder
        .addCase(reset, () => initialState)
        .addCase(loginWithSocial.pending, (state) => {
          state.loginError = undefined;
          state.loginStatus = 'loading';
        })
        .addCase(loginWithSocial.rejected, (state) => {
          state.loginError = 'Something went wrong';
          state.loginStatus = 'failed';
        })
        .addCase(loginWithSocial.fulfilled, (state, action) => {
          state.user = action.payload.data;
          if (action.payload.data) {
            axios.defaults.headers.common = {
              Authorization: `${action.payload?.token}`,
            };
            storeToken(action.payload?.token);
            state.loginStatus = 'succeeded';
          } else {
            state.loginError = 'Something went wrong';
            state.loginStatus = 'failed';
          }
        })
        .addCase(deleteAccountSocial.pending, (state) => {
          state.deleteAccountError = undefined;
          state.deleteAccountStatus = 'loading';
        })
        .addCase(deleteAccountSocial.rejected, (state) => {
          state.deleteAccountError = 'Something went wrong';
          state.deleteAccountStatus = 'failed';
        })
        .addCase(deleteAccountSocial.fulfilled, (state) => {
          state.deleteAccountStatus = 'succeeded';
          state.deleteAccountError = 'Something went wrong';
        })
  
        .addCase(EditUsername.pending, (state) => {
          state.EditUsernameError = undefined;
          state.EditUsernameStatus = 'loading';
        })
        .addCase(EditUsername.rejected, (state) => {
          state.EditUsernameError = 'Something went wrong';
          state.EditUsernameStatus = 'failed';
        })
        .addCase(EditUsername.fulfilled, (state, action) => {
          state.user.username = action.payload.username;
          state.EditUsernameStatus = 'succeeded';
          state.EditUsernameError = 'Something went wrong';
        });
    },
  });
  
  export const reset = createAction('RESET');
  
  export const loginWithSocial = createAsyncThunk(
    '/auth/loginWithSocial',
    async (token: string | undefined) => {
      const data = axios
        .post(
          BASE_URL,
          createFormData({
            token: token,
            op: 'login_user',
          }),
        )
        .then((response) => {
          return response.data;
        })
        .catch((error) => error);
      return data;
    },
  );
  
  export const deleteAccountSocial = createAsyncThunk(
    '/auth/deleteAccount',
    async () => {
      const data = axios
        .delete(BASE_URL, {
          data: createFormData({
            op: 'delete_user',
          }),
        })
        .then((response) => {
          return response.data;
        })
        .catch((error) => error);
      return data;
    },
  );
  
  export const EditUsername = createAsyncThunk(
    '/auth/EditUsername',
    async (username: string, {dispatch, getState}) => {
      const {auth: authAction}: any = getState();
  
      const data = axios
        .put(
          `${BASE_URL}?op=update_profile&name=${username}&username=${username}`,
        )
        .then((response) => {
          const returnResponse = {
            username: username,
            data: response.data,
            entry_by: authAction.user.id,
          };
          dispatch(setUpdateCommentData(returnResponse));
          return returnResponse;
        })
        .catch((error) => error);
      return data;
    },
  );
  
  export const {loggedIn, loggedOut} = auth.actions;
  export default auth.reducer;
  