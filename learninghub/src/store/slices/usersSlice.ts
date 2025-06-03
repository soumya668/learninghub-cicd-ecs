import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';
import api from "../../services/api";

// Define a type for the user object
export interface User {
  data: RawUser[]
  success: boolean
  message: string
  total: number
}

export interface RawUser {
  address: {
    geo: {
      lat: string;
      lng: string;
    };
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  _id: string;
  userId: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  createdAt: string;
}

// Define the state structure
interface UsersState {
  users: User;
  currentUser: RawUser | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: UsersState = {
  users: {
    data: [],
    success: false,
    message: '',
    total: 0
  },
  currentUser: null,
  loading: false,
  error: null,
};

// Async thunks for API calls
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      // This would be replaced with actual API call
      const response = await api.get('/users');
      return response.data;

      // Mock data for now
      // return [
      //   { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
      //   { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
      //   { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager' },
      // ];
    } catch (error) {
      return rejectWithValue('Failed to fetch users');
    }
  }
);

export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (userId: string, { rejectWithValue }) => {
    try {
      // This would be replaced with actual API call
      const response = await api.get(`/users/${userId}`);
      return response.data.data;

      // Mock data for now - commented out as we're using the API
      // const mockRawUser: RawUser = {
      //   address: {
      //     geo: {
      //       lat: '0',
      //       lng: '0',
      //     },
      //     street: 'Mock Street',
      //     suite: 'Suite 1',
      //     city: 'Mock City',
      //     zipcode: '12345',
      //   },
      //   company: {
      //     name: 'Mock Company',
      //     catchPhrase: 'Mock Catch Phrase',
      //     bs: 'Mock BS',
      //   },
      //   _id: userId,
      //   userId: parseInt(userId),
      //   name: 'Mock User',
      //   username: 'mockuser',
      //   email: 'mock@example.com',
      //   phone: '123-456-7890',
      //   website: 'mockwebsite.com',
      //   createdAt: new Date().toISOString(),
      // };
      // return mockRawUser;
    } catch (error) {
      return rejectWithValue('Failed to fetch user');
    }
  }
);

// Create the slice
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchUsers
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle fetchUserById
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action: PayloadAction<RawUser>) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { clearCurrentUser } = usersSlice.actions;

// Export selectors
export const selectUsers = (state: RootState) => state.users.users;
export const selectCurrentUser = (state: RootState) => state.users.currentUser;
export const selectUsersLoading = (state: RootState) => state.users.loading;
export const selectUsersError = (state: RootState) => state.users.error;

export default usersSlice.reducer;
