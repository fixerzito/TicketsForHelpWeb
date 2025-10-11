export interface Ticket {
  id: number;
  name: string;
  issue: string;
  status: boolean;
  idCustomer: number;
}

export interface TicketViewModel {
  id: number;
  name: string;
  status: boolean;
  idCustomer: number;
  customerName?: string;
}

export interface TicketFormInsert {
  name: string;
  issue: string;
  status: boolean;
  idCustomer: number;
}

export interface TicketFormUpdate {
  id: number;
  name: string;
  issue: string;
  status: boolean;
  idCustomer: number;
}