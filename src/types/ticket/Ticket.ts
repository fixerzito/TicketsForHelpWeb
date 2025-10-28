export interface Ticket {
  id: number;
  name: string;
  issue: string;
  status: boolean;
  idCustomer: number;
  idEmployee: number | null;
}

export interface TicketViewModel {
  id: number;
  name: string;
  status: boolean;
  idCustomer: number;
  customer?: string;
  idEmployee: number | null;
  employee?: string | null;
}

export interface TicketFormInsert {
  name: string;
  issue: string;
  status: boolean;
  idCustomer: number;
  idEmployee: number | null;
}

export interface TicketFormUpdate {
  id: number;
  name: string;
  issue: string;
  status: boolean;
  idCustomer: number;
  idEmployee: number | null;
}