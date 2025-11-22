import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = (email, password) =>
    api.post('/auth/login', { email, password });

export const register = (data) =>
    api.post('/auth/register', data);

export const getActivities = (search = '') =>
    api.get(`/activities${search ? `?search=${search}` : ''}`);

export const getActivityById = (id) =>
    api.get(`/activities/${id}`);

export const enrollInActivity = (id) =>
    api.post(`/activities/${id}/enroll`);

export const getMyEnrollments = () =>
    api.get('/my-enrollments');

export const createActivity = (data) =>
    api.post('/admin/activities', data);

export const updateActivity = (id, data) =>
    api.put(`/admin/activities/${id}`, data);

export const deleteActivity = (id) =>
    api.delete(`/admin/activities/${id}`);

export default api;