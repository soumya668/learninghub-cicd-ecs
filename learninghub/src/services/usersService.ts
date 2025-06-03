import api from './api';
import { User, RawUser } from '../store/slices/usersSlice';

// Define the API endpoints
const ENDPOINTS = {
  USERS: '/users',
  USER_BY_ID: (id: string) => `/users/${id}`,
};

// Define the service functions
const usersService = {
  // Get all users
  getUsers: async (): Promise<User> => {
    const response = await api.get(ENDPOINTS.USERS);
    return response.data;
  },

  // Get user by ID
  getUserById: async (id: string): Promise<RawUser> => {
    const response = await api.get(ENDPOINTS.USER_BY_ID(id));
    return response.data;
  },

  // Create a new user
  createUser: async (userData: Omit<RawUser, '_id'>): Promise<RawUser> => {
    const response = await api.post(ENDPOINTS.USERS, userData);
    return response.data;
  },

  // Update an existing user
  updateUser: async (id: string, userData: Partial<RawUser>): Promise<RawUser> => {
    const response = await api.put(ENDPOINTS.USER_BY_ID(id), userData);
    return response.data;
  },

  // Delete a user
  deleteUser: async (id: string): Promise<void> => {
    await api.delete(ENDPOINTS.USER_BY_ID(id));
  },
};

export default usersService;
