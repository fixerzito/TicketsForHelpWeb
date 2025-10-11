import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { ticketService } from '../../services/ticket/ticketService';
import { customerService } from '../../services/customer/customerService';
import { TicketFormInsert } from '../../types/ticket/Ticket';
import { CustomerDropdownViewModel } from '../../types/customer/Customer';

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
    idCustomer: 0,
  });
  const [saving, setSaving] = useState(false);
  const [customers, setCustomers] = useState<CustomerDropdownViewModel[]>([]);

  useEffect(() => {
    if (visible) {
      customerService.getallDropdown().then(setCustomers).catch(console.error);
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
            idCustomer: data.idCustomer,
          });
        })
        .catch(console.error);
    } else {
      setFormData({
        id: undefined,
        name: '',
        issue: '',
        status: true,
        idCustomer: 0,
      });
    }
  }, [ticketId, visible]);

  const handleChange = (field: keyof TicketFormInsert, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = async () => {
    if (viewMode) {
      onHide();
      return;
    }

    if (!formData.name || !formData.issue || !formData.idCustomer) {
      alert('Preencha todos os campos!');
      return;
    }

    setSaving(true);
    try {
      await onSave(formData);
      onHide();
    } catch (err: any) {
      alert('Erro ao salvar ticket: ' + (err.message || err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      header={viewMode ? 'Detalhes do Chamado' : ticketId ? 'Editar Chamado' : 'Novo Chamado'}
      visible={visible}
      style={{ width: '500px', borderRadius: '10px' }}
      onHide={onHide}
      className="p-d-flex p-flex-column"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div className="p-field">
          <label>Título</label>
          <InputText
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Digite o título do chamado"
            disabled={viewMode}
            style={{ width: '100%', borderRadius: '6px' }}
          />
        </div>
        <div className="p-field">
          <label>Descrição</label>
          <InputText
            value={formData.issue}
            onChange={(e) => handleChange('issue', e.target.value)}
            placeholder="Descreva o problema"
            disabled={viewMode}
            style={{ width: '100%', borderRadius: '6px' }}
          />
        </div>
        <div className="p-field">
          <label>Status</label>
          <Dropdown
            value={formData.status}
            options={[
              { label: 'Aberto', value: true },
              { label: 'Fechado', value: false },
            ]}
            onChange={(e) => handleChange('status', e.value)}
            disabled={viewMode}
            style={{ width: '100%', borderRadius: '6px' }}
          />
        </div>
        <div className="p-field">
          <label>Cliente</label>
          <Dropdown
            value={formData.idCustomer}
            options={customers.map(c => ({ label: c.name, value: c.id }))}
            onChange={(e) => handleChange('idCustomer', e.value)}
            placeholder="Selecione um cliente"
            disabled={viewMode}
            style={{ width: '100%', borderRadius: '6px' }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
          <Button
            label={viewMode ? 'Fechar' : 'Cancelar'}
            className="p-button-text"
            onClick={onHide}
            disabled={saving}
          />
          {!viewMode && (
            <Button
              label="Salvar"
              className="p-button-success"
              onClick={handleSave}
              loading={saving}
            />
          )}
        </div>
      </div>
    </Dialog>
  );
};
