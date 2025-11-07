import { WorkLog, WorkLogFormInsert, WorkLogViewModel } from '../../types/ticket/WorkLog';
import { api } from '../api';

export const workLogService = {
  getAll: async (): Promise<WorkLogViewModel[]> => {
    const response = await api.get<WorkLogViewModel[]>('/workLogs');
    return response.data;
  },
  GetByTicketId: async (id: number): Promise<WorkLog[]> => {
    const response = await api.get<WorkLog[]>(`/workLogs/ticket-history/${id}`);
    return response.data;
  },
  getById: async (id: number): Promise<WorkLog> => {
    const response = await api.get<WorkLog>(`/workLogs/${id}`);
    return response.data;
  },
  insert: async (WorkLog: Omit<WorkLogFormInsert, 'id'>): Promise<WorkLogFormInsert> => {
    const response = await api.post<WorkLogFormInsert>('/workLogs', WorkLog);
    return response.data;
  },
  update: async (id: number, dto: WorkLogFormInsert): Promise<WorkLogViewModel> => {
    const response = await api.put<WorkLogViewModel>(`/workLogs/${id}`, dto);
    return response.data;
  },
  delete: async (id: number): Promise<void> => {
    await api.patch(`/workLogs/${id}`);
  }
};
