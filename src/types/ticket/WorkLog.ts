export interface WorkLog {
    id: number;
    idTicket: number;
    ticket: string;
    idEmployee: number;
    employee: string;
    date: Date;
    hoursWorked: number;
    description: string;
}

export interface WorkLogViewModel {
    idTicket: number | undefined;
    ticket: string;
    idEmployee: number | undefined;
    employee: string;
    date: Date | null;
    hoursWorked: number;
    description: string;
}

export interface WorkLogFormInsert {
    id?:number,
    idTicket: number | undefined;
    idEmployee: number | undefined;
    date: Date | null;
    hoursWorked: number | undefined;
    description: string;
}

export interface WorkLogFormUpdate {
    id: number;
    idTicket: number | undefined;
    idEmployee: number | undefined;
    date: Date | null;
    hoursWorked: number;
    description: string;
}

export interface WorkLogCardView {
    employee: string;
    date: Date | null;
    hoursWorked: number;
}
