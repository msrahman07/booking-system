import { IAppointmentResponse } from "./appointment";

export interface IStaff {
    id?: number;
    firstName: string;
    lastName: string;
    jobTitle: string;
    appointments?: IAppointmentResponse[];
}