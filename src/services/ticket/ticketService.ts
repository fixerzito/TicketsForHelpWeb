import { Ticket, TicketFormInsert, TicketFormUpdate, TicketViewModel } from '../../types/ticket/Ticket';
import { api } from '../api';

export const ticketService = {
  getAll: async (): Promise<TicketViewModel[]> => {
    const response = await api.get<TicketViewModel[]>('/tickets');
    return response.data;
  },
  getById: async (id: number): Promise<Ticket> => {
    const response = await api.get<Ticket>(`/tickets/${id}`);
    return response.data;
  },
  insert: async (ticket: Omit<TicketFormInsert, 'id'>): Promise<TicketFormInsert> => {
    const response = await api.post<TicketFormInsert>('/tickets', ticket);
    return response.data;
  },
  update: async (id: number, dto: TicketFormInsert): Promise<TicketViewModel> => {
  const response = await api.put<TicketViewModel>(`/tickets/${id}`, dto);
  return response.data;
  },
  delete: async (id: number): Promise<void> => {
  await api.patch(`/tickets/${id}`);
  }
};
