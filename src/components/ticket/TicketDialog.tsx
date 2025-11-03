import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { ticketService } from '../../services/ticket/ticketService';
import { customerService } from '../../services/customer/customerService';
import { TicketCriticity, TicketFormInsert } from '../../types/ticket/Ticket';
import { CustomerDropdownViewModel } from '../../types/customer/Customer';
import { EmployeeDropdownViewModel } from '../../types/employee/Employee';
import { employeeService } from '../../services/employee/employeeService';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputSwitch } from 'primereact/inputswitch';
import { ticketCategoryService } from '../../services/ticket/ticketCategoryService';
import { TicketCategoryViewModel } from '../../types/ticket/TicketCategory';

interface TicketDialogProps {
  visible: boolean;
  onHide: () => void;
  onSave: (ticket: TicketFormInsert & { id?: number }) => void;
  ticketId?: number;
  viewMode?: boolean;
}

export const TicketDialog: React.FC<TicketDialogProps> = ({
  visible,
  onHide,
  onSave,
  ticketId,
  viewMode = false,
}) => {
  const [formData, setFormData] = useState<TicketFormInsert & { id?: number }>({
    id: undefined,
    name: '',
    issue: '',
    status: true,
    criticity: '',
    idCustomer: 0,
    idEmployee: undefined,
    idCategory: undefined
  });
  const [saving, setSaving] = useState(false);
  const [customers, setCustomers] = useState<CustomerDropdownViewModel[]>([]);
  const [employees, setEmployees] = useState<EmployeeDropdownViewModel[]>([]);
  const [categories, setCategories] = useState<TicketCategoryViewModel[]>([]);
  const [criticity, setCriticity] = useState<TicketCriticity[]>([])

  useEffect(() => {
    if (visible) {
      customerService.getallDropdown().then(setCustomers).catch(console.error);
      employeeService.getallDropdown().then(setEmployees).catch(console.error);
      ticketCategoryService.getAll().then(setCategories).catch(console.error);
      ticketService.getCriticity().then(setCriticity).catch(console.error);
    }
  }, [visible]);

  useEffect(() => {
    if (ticketId) {
      ticketService.getById(ticketId)
        .then(data => {
          setFormData({
            id: data.id,
            name: data.name,
            issue: data.issue,
            status: data.status,
            criticity: data.criticity,
            idCustomer: data.idCustomer,
            idEmployee: data.idEmployee,
            idCategory: data.idCategory
          });
        })
        .catch(console.error);
    } else {
      setFormData({
        id: undefined,
        name: '',
        issue: '',
        status: true,
        criticity: '',
        idCustomer: 0,
        idEmployee: undefined,
        idCategory: undefined
      });
    }
  }, [ticketId, visible]);

  const handleChange = (field: keyof TicketFormInsert, value: any) => {
    setFormData({ ...formData!, [field]: value });
  };

  const handleSave = async () => {
    if (viewMode) {
      onHide();
      return;
    }

    if (!formData!.name || !formData!.issue || !formData!.idCustomer) {
      alert('Preencha todos os campos!');
      return;
    }

    setSaving(true);
    try {
      await onSave(formData!);
      onHide();
    } catch (err: any) {
      alert('Erro ao salvar ticket: ' + (err.message || err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      header={
        <div className="flex items-center gap-3">
          <i className="pi pi-ticket text-blue-500 text-2xl"></i>
          <div>
            <h2 className="text-xl font-semibold m-0">
              {viewMode ? "#" + ticketId + " - " : ticketId ? '' : ''}{viewMode ? 'Detalhes do Chamado' : ticketId ? "#" + ticketId + " - " + 'Editar Chamado' : 'Novo Chamado'}
            </h2>
            <span className="text-sm text-gray-500">
              {viewMode ? 'Visualize as informações do ticket' : 'Preencha os detalhes abaixo'}
            </span>
          </div>
        </div>
      }
      visible={visible}
      style={{
        width: '80vw',
        maxWidth: '1100px',
        borderRadius: '16px',
        backgroundColor: '#f9fafb',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
      }}
      onHide={onHide}
      className="p-0"
    >
      <div className="p-6 bg-white rounded-lg flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b pb-6 items-end">
          <div className="md:col-span-2">
            <label className="text-gray-600 font-medium mb-1 block">Título</label>
            <InputText
              value={formData!.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Digite o título"
              disabled={viewMode}
              className="w-full border-round-md"
            />
          </div>
          <div className="flex items-center justify-start md:justify-end gap-3 md:col-span-3">
            <label className="font-medium text-gray-600">Status:</label>
            <InputSwitch
              checked={formData!.status}
              onChange={(e) => handleChange('status', e.value)}
              disabled={viewMode}
            />
            <span
              className={`text-sm font-semibold px-3 py-1 rounded-full ${formData!.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}
            >
              {formData!.status ? 'Aberto' : 'Fechado'}
            </span>
          </div>

          <div>
            <label className="text-gray-600 font-medium mb-1 block">Categoria</label>
            <Dropdown
              value={formData!.idCategory}
              options={categories.map((c) => ({ label: c.name, value: c.id }))}
              onChange={(e) => handleChange('idCategory', e.value)}
              placeholder="Selecione uma categoria"
              disabled={viewMode}
              className="w-full border-round-md"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b pb-6">
          <div>
            <label className="text-gray-600 font-medium mb-1 block">Cliente</label>
            <Dropdown
              value={formData!.idCustomer}
              options={customers.map((c) => ({ label: c.name, value: c.id }))}
              onChange={(e) => handleChange('idCustomer', e.value)}
              placeholder="Selecione um cliente"
              disabled={viewMode}
              className="w-full border-round-md"
            />
          </div>

          <div>
            <label className="text-gray-600 font-medium mb-1 block">Criticidade</label>
            <Dropdown
              value={formData!.criticity}
              options={criticity.map((c) => ({ label: c, value: c }))}
              onChange={(e) => handleChange('criticity', e.value)}
              placeholder="Selecione a criticidade do ticket"
              disabled={viewMode}
              className="w-full border-round-md"
            />
          </div>

          <div>
            <label className="text-gray-600 font-medium mb-1 block">Colaborador</label>
            <Dropdown
              value={formData!.idEmployee}
              options={employees.map((c) => ({ label: c.name, value: c.id }))}
              onChange={(e) => handleChange('idEmployee', e.value)}
              placeholder="Selecione um colaborador"
              disabled={viewMode}
              className="w-full border-round-md"
            />
          </div>
        </div>

        <div>
          <label className="text-gray-600 font-medium mb-1 block">Descrição</label>
          <InputTextarea
            value={formData!.issue}
            onChange={(e) => handleChange('issue', e.target.value)}
            placeholder="Descreva o problema..."
            disabled={viewMode}
            className="w-full border-round-md"
            rows={8}
            autoResize
          />

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              label={viewMode ? 'Fechar' : 'Cancelar'}
              className="p-button-text p-button-lg"
              onClick={onHide}
              disabled={saving}
            />
            {!viewMode && (
              <Button
                label="Salvar"
                icon="pi pi-check"
                className="p-button-success p-button-lg"
                onClick={handleSave}
                loading={saving}
              />
            )}
          </div>
        </div>

      </div>
    </Dialog>
  );




};
