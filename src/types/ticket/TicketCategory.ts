export interface TicketCategory {
  id: number;
  name: string;
}

export interface TicketCategoryViewModel {
  id: number;
  name: string;
}

export interface TicketCategoryFormInsert {
  id?:number,
  name: string;
}

export interface TicketCategoryFormUpdate {
  id: number;
  name: string;
}

