export interface Ticket {
  id: number;
  name: string;
  issue: string;
  status: boolean;
  criticity: string;
  idCustomer: number | undefined;
  idEmployee: number | undefined;
  idCategory: number | undefined;
}

export interface TicketViewModel {
  id: number;
  name: string;
  status: boolean;
  criticity: string;
  idCustomer: number | undefined;
  customer?: string | null;
  idEmployee: number | undefined;
  employee?: string | null;
  idCategory: number | undefined;
  category?: string | null;
}

export interface TicketFormInsert {
  name: string;
  issue: string;
  status: boolean;
  criticity: string;
  idCustomer: number | undefined;
  idEmployee: number | undefined;
  idCategory: number | undefined;
}

export interface TicketFormUpdate {
  id: number;
  name: string;
  issue: string;
  status: boolean;
  criticity: string;
  idCustomer: number | undefined;
  idEmployee: number | undefined;
  idCategory: number | undefined;
}

export interface TicketCriticity {
  criticity: string
}
