export interface Ticket {
  id: number;
  name: string;
  issue: string;
  status: boolean;
  criticity: string;
  idCustomer: number;
  idEmployee: number | null;
}

export interface TicketViewModel {
  id: number;
  name: string;
  status: boolean;
  criticity: string;
  idCustomer: number;
  customer?: string;
  idEmployee: number | null;
  employee?: string | null;
}

export interface TicketFormInsert {
  name: string;
  issue: string;
  status: boolean;
  criticity: string;
  idCustomer: number;
  idEmployee: number | null;
}

export interface TicketFormUpdate {
  id: number;
  name: string;
  issue: string;
  status: boolean;
  criticity: string;
  idCustomer: number;
  idEmployee: number | null;
}

export interface TicketCriticity {
  criticity: string
}
