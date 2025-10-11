import { CustomerDropdownViewModel, CustomerFormInsert, CustomerFormUpdate, CustomerResponseViewModel, CustomerViewModel } from '../../types/customer/Customer';
import { api } from '../api';

export const customerService = {
  getAll: async (): Promise<CustomerViewModel[]> => {
    const response = await api.get<CustomerViewModel[]>('/customers');
    return response.data;
  },
  getById: async (id: number): Promise<CustomerViewModel> => {
    const response = await api.get<CustomerViewModel>(`/customers/${id}`);
    return response.data;
  },
  getallDropdown: async (): Promise<CustomerDropdownViewModel[]> => {
    const response = await api.get<CustomerDropdownViewModel[]>('/customers/dropdown');
    return response.data;
  },
  insert: async (customer: Omit<CustomerFormInsert, 'id'>): Promise<CustomerResponseViewModel> => {
    const response = await api.post<CustomerResponseViewModel>('/customers', customer);
    return response.data; 
  },
  update: async (id: number, customer: Omit<CustomerFormUpdate, 'id'>): Promise<CustomerFormUpdate> => {
    const body = { ...customer, id };
    const response = await api.put<CustomerFormUpdate>(`/customers/${id}`, body);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.patch(`/customers/${id}`);
  }
};
