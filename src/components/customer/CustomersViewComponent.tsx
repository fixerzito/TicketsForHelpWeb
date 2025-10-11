import React, { useEffect, useState, useRef } from 'react';
import { customerService } from '../../services/customer/customerService';
import { CustomerFormInsert, CustomerViewModel } from '../../types/customer/Customer';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { CustomerDialog } from './CustomerDialog';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { FooterComponent } from '../home/FooterComponent';

export const CustomersViewComponent: React.FC = () => {
  const [customers, setCustomers] = useState<CustomerViewModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [displayModal, setDisplayModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<CustomerViewModel | null>(null);
  const toast = useRef<Toast>(null);
  const [first, setFirst] = useState(0);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await customerService.getAll();
        setCustomers(data);
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar customers');
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const handleSaveCustomer = async (customer: CustomerFormInsert & { id?: number }) => {
    try {
      if (customer.id) {
        await customerService.update(customer.id, customer);
        toast.current?.show({
          severity: 'success',
          summary: 'Sucesso',
          detail: `${customer.name} atualizado!`,
          life: 3000
        });
      } else {
        await customerService.insert(customer);
        toast.current?.show({
          severity: 'success',
          summary: 'Sucesso',
          detail: `${customer.name} cadastrado!`,
          life: 3000
        });
      }

      setLoading(true);
      const data = await customerService.getAll();
      setCustomers(data);
      setDisplayModal(false);
      setEditingCustomer(null);
    } catch (err: any) {
      toast.current?.show({
        severity: 'error',
        summary: 'Erro',
        detail: err.message || err,
        life: 5000
      });
    } finally {
      setLoading(false);
    }
  };


  const actionBodyTemplate = (rowData: CustomerViewModel) => {
    const handleDelete = (rowData: CustomerViewModel) => {
      confirmDialog({
        message: `Deseja realmente excluir ${rowData.name}?`,
        header: 'Confirmação de Exclusão',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: async () => {
          try {
            await customerService.delete(rowData.id);

            toast.current?.show({
              severity: 'success',
              summary: 'Excluído',
              detail: `${rowData.name} foi excluído`,
              life: 3000
            });

            setLoading(true);
            const data = await customerService.getAll();
            setCustomers(data);
          } catch (error: any) {
            toast.current?.show({
              severity: 'error',
              summary: 'Erro',
              detail: `Erro ao excluir: ${error.message || error}`,
              life: 5000
            });
          } finally {
            setLoading(false);
          }
        }
      });
    };


    return (
      <div className="p-d-flex p-gap-2">
        <Button
          label="Editar"
          icon="pi pi-pencil"
          className="p-button-sm mr-2"
          onClick={() => {
            setEditingCustomer(rowData);
            setDisplayModal(true);
          }}
        />
        <Button
          label="Excluir"
          icon="pi pi-trash"
          className="p-button-sm p-button-danger"
          onClick={() => handleDelete(rowData)}
        />
      </div>
    );
  };

  if (loading) return <p>Carregando customers...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="card">
      <Toast ref={toast} />
      <ConfirmDialog />
      <h1 className="p-text-center p-mb-4">Clientes</h1>

      <DataTable
        value={customers}
        tableStyle={{ minWidth: '70rem' }}
        paginator
        rows={8}
        first={first}
        onPage={(e) => setFirst(e.first)}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      >

        <Column field="name" header="Nome do Cliente" style={{ width: '290px' }} />
        <Column field="cnpj" header="CNPJ" style={{ width: '200px' }} />
        <Column field="email" header="Email" style={{ width: '250px' }} />
        <Column header="Ações" body={actionBodyTemplate} style={{ width: '190px' }} />
      </DataTable>


      <Button
        icon="pi pi-plus"
        className="p-button-rounded p-button-success p-button-lg"
        style={{ position: 'fixed', bottom: '20px', right: '20px' }}
        onClick={() => {
          setEditingCustomer(null);
          setDisplayModal(true);
        }}
      />

      <CustomerDialog
        visible={displayModal}
        onHide={() => setDisplayModal(false)}
        onSave={handleSaveCustomer}
        customer={editingCustomer || undefined}
      />
    </div>
  );
};
