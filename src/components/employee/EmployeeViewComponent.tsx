import React, { useEffect, useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { EmployeeListViewModel, EmployeeViewModel } from '../../types/employee/Employee';
import { employeeService } from '../../services/employee/employeeService';
import { EmployeeDialog } from './EmployeeDialog';
import { EmployeeInsertDialog } from './EmployeeInsertDialog';

export const EmployeeViewComponent: React.FC = () => {
  const [employees, setEmployees] = useState<EmployeeListViewModel[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeViewModel | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [displayInsertModal, setDisplayInsertModal] = useState(false);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await employeeService.getAll();
      setEmployees(response);
    } catch (err) {
      console.error('Erro ao carregar funcionários:', err);
    }
  };

  const handleDelete = (employee: EmployeeListViewModel) => {
    confirmDialog({
      message: `Deseja realmente excluir "${employee.name}"?`,
      header: 'Confirmação de exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: async () => {
        try {
          await employeeService.delete(employee.id);
          toast.current?.show({
            severity: 'success',
            summary: 'Excluído',
            detail: `${employee.name} removido.`,
            life: 3000,
          });
          fetchEmployees();
        } catch (error) {
          toast.current?.show({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao excluir funcionário.',
            life: 3000,
          });
        }
      },
    });
  };

  // Ao clicar no funcionário, busca o EmployeeViewModel completo
  const handleViewEmployee = async (employee: EmployeeListViewModel) => {
    try {
      const fullEmployee = await employeeService.getById(employee.id);
      setSelectedEmployee(fullEmployee);
      setShowDialog(true);
    } catch (err) {
      console.error('Erro ao buscar funcionário:', err);
      toast.current?.show({
        severity: 'error',
        summary: 'Erro',
        detail: 'Não foi possível carregar o funcionário.',
        life: 3000,
      });
    }
  };

  const photoBodyTemplate = (row: EmployeeListViewModel) => {
    const src = `/util/images/employees/${row.photo}`;
    return (
      <img
        src={src}
        alt={row.name}
        style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
      />
    );
  };



  const actionsBodyTemplate = (row: EmployeeListViewModel) => (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <Button
        icon="pi pi-eye"
        className="p-button-rounded p-button-info p-button-sm"
        onClick={() => handleViewEmployee(row)}
      />
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-danger p-button-sm"
        onClick={() => handleDelete(row)}
      />
    </div>
  );

  return (
    <div className="card">
      <Toast ref={toast} />
      <ConfirmDialog />

      <h2 style={{ color: '#3f51b5', marginBottom: '1rem' }}>Lista de Funcionários</h2>

      <DataTable
        value={employees}
        paginator
        rows={8}
        emptyMessage="Nenhum funcionário encontrado."
      >
        <Column
          header="Foto"
          body={photoBodyTemplate}
          style={{ width: '100px', textAlign: 'center' }}
        />
        <Column field="name" header="Nome" sortable />
        <Column field="email" header="Email" />
        <Column
          header="Ações"
          body={actionsBodyTemplate}
          style={{ width: '150px', textAlign: 'center' }}
        />
      </DataTable>

      {selectedEmployee && (
        <EmployeeDialog
          visible={showDialog}
          employee={selectedEmployee}
          onHide={() => setShowDialog(false)}
          onUpdated={fetchEmployees}
        />
      )}

      <Button
        icon="pi pi-plus"
        className="p-button-rounded p-button-success p-button-lg"
        style={{ position: 'fixed', bottom: '20px', right: '20px' }}
        onClick={() => setDisplayInsertModal(true)}
      />

      <EmployeeInsertDialog
        visible={displayInsertModal}
        onHide={() => setDisplayInsertModal(false)}
        onCreated={fetchEmployees}
      />
    </div>
  );
};
