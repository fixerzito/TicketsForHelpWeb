
import { EmployeeViewModel, EmployeeFormInsert, EmployeeFormUpdate, EmployeeResponseViewModel, EmployeeDropdownViewModel } from '../../types/employee/Employee';
import { api } from '../api';

export const employeeService = {
  getAll: async (): Promise<EmployeeViewModel[]> => {
    const response = await api.get<EmployeeViewModel[]>('/employees');
    return response.data;
  },
  getById: async (id: number): Promise<EmployeeViewModel> => {
    const response = await api.get<EmployeeViewModel>(`/employees/${id}`);
    return response.data;
  },
  getallDropdown: async (): Promise<EmployeeDropdownViewModel[]> => {
    const response = await api.get<EmployeeDropdownViewModel[]>('/employees/dropdown');
    return response.data;
  },
  insert: async (employee: Omit<EmployeeFormInsert, 'id'>): Promise<EmployeeResponseViewModel> => {
    const response = await api.post<EmployeeResponseViewModel>('/employees', employee);
    return response.data; 
  },
  update: async (id: number, employee: Omit<EmployeeFormUpdate, 'id'>): Promise<EmployeeFormUpdate> => {
    const body = { ...employee, id };
    const response = await api.put<EmployeeFormUpdate>(`/employees/${id}`, body);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.patch(`/employees/${id}`);
  }
};
