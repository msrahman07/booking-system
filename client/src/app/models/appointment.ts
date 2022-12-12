export interface IAppointmentResponse {
    id?: number;
    guestId: number;
    guestFullName: string;
    serviceId: number;
    serviceName: string;
    staffId: number;
    staffFullName: string;
    date: Date;
    startTime: Date;
    endTime: Date;
}

export interface IAppointmentRequest {
    guestId: number;
    serviceId: number;
    staffId: number;
    date: Date;
    startTime: ITimeSpan;
    endTime: ITimeSpan;
}

export interface ITimeSpan {
    hours: number;
    minutes: number;
    seconds: number;
}