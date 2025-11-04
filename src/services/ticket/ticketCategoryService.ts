import { TicketCategory, TicketCategoryFormInsert, TicketCategoryViewModel } from '../../types/ticket/TicketCategory';
import { api } from '../api';

export const ticketCategoryService = {
  getAll: async (): Promise<TicketCategoryViewModel[]> => {
    const response = await api.get<TicketCategoryViewModel[]>('/ticket-categories');
    return response.data;
  },
  getById: async (id: number): Promise<TicketCategory> => {
    const response = await api.get<TicketCategory>(`/ticket-categories/${id}`);
    return response.data;
  },
  insert: async (ticketCategory: Omit<TicketCategoryFormInsert, 'id'>): Promise<TicketCategoryFormInsert> => {
    const response = await api.post<TicketCategoryFormInsert>('/ticket-categories', ticketCategory);
    return response.data;
  },
  update: async (id: number, dto: TicketCategoryFormInsert): Promise<TicketCategoryViewModel> => {
    const response = await api.put<TicketCategoryViewModel>(`/ticket-categories/${id}`, dto);
    return response.data;
  },
  delete: async (id: number): Promise<void> => {
    try {
      await api.patch(`/ticket-categories/${id}`);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.message ||
        'Erro ao excluir categoria.';
      throw new Error(errorMessage);
    }
  }
};
