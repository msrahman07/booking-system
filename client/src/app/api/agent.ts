import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import { IAppointmentRequest, IAppointmentResponse } from "../models/appointment";
import { IGuest } from "../models/guest";
import { IService } from "../models/service";
import { IStaff } from "../models/staff";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T> (url: string) => axios.delete<T>(url).then(responseBody),
};

const Guests = {
    list: () => requests.get<IGuest[]>('/guests'),
    details: (id: number) => requests.get<IGuest>(`/guests/${id}`),
    create: (guest: IGuest) => requests.post<IGuest>(`/guests`, guest),
    delete: (id: number) => requests.delete<string>(`/guests/${id}`),
};

const Staffs = {
    list: () => requests.get<IStaff[]>('/staffs'),
    details: (id: number) => requests.get<IStaff>(`/staffs/${id}`),
    create: (staff: IStaff) => requests.post<IStaff>(`/staffs`, staff),
    delete: (id: number) => requests.delete<string>(`/staffs/${id}`),
};

const Services = {
    list: () => requests.get<IService[]>('/services'),
    details: (id: number) => requests.get<IService>(`/services/${id}`),
    create: (service: IService) => requests.post<IService>(`/services`, service),
    delete: (id: number) => requests.delete<string>(`/services/${id}`),
};
const Appointments = {
    list: () => requests.get<IAppointmentResponse[]>('/appointments'),
    listByDate: (date: string) => requests.get<IAppointmentResponse[]>(`/appointments/${date}`),
    details: (id: number) => requests.get<IAppointmentResponse>(`/appointments/${id}`),
    create: (appointment: IAppointmentRequest) => requests.post<IAppointmentResponse>(`/appointments`, appointment),
    delete: (id: number) => requests.delete<string>(`/appointments/${id}`),
};

const agent = {
    Guests,
    Staffs,
    Services,
    Appointments
};

export default agent;