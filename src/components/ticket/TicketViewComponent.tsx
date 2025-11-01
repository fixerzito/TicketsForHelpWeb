import React, { useEffect, useState, useRef } from 'react';
import { ticketService } from '../../services/ticket/ticketService';
import { customerService } from '../../services/customer/customerService';
import { TicketViewModel, TicketFormInsert } from '../../types/ticket/Ticket';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { TicketDialog } from './TicketDialog';
import { FooterComponent } from '../home/FooterComponent';

export const TicketsViewComponent: React.FC = () => {
  const [tickets, setTickets] = useState<TicketViewModel[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<TicketViewModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [displayModal, setDisplayModal] = useState(false);
  const [editingTicket, setEditingTicket] = useState<TicketViewModel | null>(null);
  const [viewMode, setViewMode] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [filterCustomer, setFilterCustomer] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'closed'>('all');
  const toast = useRef<Toast>(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const ticketsData = await ticketService.getAll();
      setTickets(ticketsData);
      setFilteredTickets(ticketsData);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar tickets');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...tickets];
    if (filterName.trim()) filtered = filtered.filter(t => t.name.toLowerCase().includes(filterName.toLowerCase()));
    if (filterCustomer.trim()) filtered = filtered.filter(t => t.customer!.toLowerCase().includes(filterCustomer.toLowerCase()));
    if (filterStatus === 'open') filtered = filtered.filter(t => t.status === true);
    else if (filterStatus === 'closed') filtered = filtered.filter(t => t.status === false);
    setFilteredTickets(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [filterName, filterCustomer, filterStatus, tickets]);

  const handleDelete = async (ticket: TicketViewModel) => {
    confirmDialog({
      message: `Deseja realmente excluir "${ticket.name}"?`,
      header: 'Confirmação de Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: async () => {
        try {
          await ticketService.delete(ticket.id);
          toast.current?.show({ severity: 'success', summary: 'Excluído', detail: `${ticket.name} foi excluído.`, life: 3000 });
          await fetchTickets();
        } catch (err: any) {
          toast.current?.show({ severity: 'error', summary: 'Erro', detail: `Erro ao excluir: ${err.message || err}`, life: 5000 });
        }
      },
    });
  };

  const handleSaveTicket = async (ticket: TicketFormInsert & { id?: number }) => {
    try {
      if (ticket.id) await ticketService.update(ticket.id, ticket);
      else await ticketService.insert(ticket);
      await fetchTickets();
      setDisplayModal(false);
      setEditingTicket(null);
    } catch (err: any) {
      toast.current?.show({ severity: 'error', summary: 'Erro', detail: err.message || err, life: 5000 });
    }
  };

  const handleCriticityBackground = (criticity: string) => {
    switch (criticity) {
      case "Low":
        return ('#858585ff');
        break;
      case "Medium":
        return ('#8e9100ff');
        break;
      case "High":
        return ('#af0000ff');
        break;
      case "Critical":
        return ('#000000ff');
    }
  };

  if (loading) return <p>Carregando tickets...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="card" style={{ paddingBottom: '4rem' }}>
      <Toast ref={toast} />
      <ConfirmDialog />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
          marginBottom: '1rem',
        }}
      >
        <h1 style={{ margin: 0, color: '#3f51b5' }}>Painel de Chamados</h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <InputText
            placeholder="Buscar por título"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            style={{ minWidth: '150px' }}
          />

          <InputText
            placeholder="Buscar por cliente"
            value={filterCustomer}
            onChange={(e) => setFilterCustomer(e.target.value)}
            style={{ minWidth: '150px' }}
          />

          <Dropdown
            value={filterStatus}
            options={[
              { label: 'Todos', value: 'all' },
              { label: 'Abertos', value: 'open' },
              { label: 'Fechados', value: 'closed' },
            ]}
            onChange={(e) => setFilterStatus(e.value)}
            style={{ minWidth: '150px' }}
          />
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {filteredTickets.map((row) => (
          <Card
            key={row.id}
            className="p-shadow-2"
            style={{
              borderRadius: '10px',
              padding: '1rem',
              cursor: 'pointer',
              transition: 'transform 0.1s ease-in-out',
            }}
            onClick={() => {
              setEditingTicket(row);
              setViewMode(true);
              setDisplayModal(true);
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <div
              style={{
                padding: '',
                display: 'flex',
                marginBottom: '1vh',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h3 style={{ margin: 0, color: '#3f51b5' }}>
                #{row.id} - {row.name}
              </h3>

              <span
                style={{
                  padding: '0.25rem 0.5rem',
                  borderRadius: '18px',
                  fontWeight: 'bold',
                  color: 'white',
                  backgroundColor: handleCriticityBackground(row.criticity),
                  fontSize: '0.90rem',
                }}
              >
                {row.criticity}
              </span>
            </div>



            <span
              style={{
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                fontWeight: 'bold',
                color: 'white',
                backgroundColor: row.status ? '#28a745' : '#dc3545',
                fontSize: '0.85rem',
              }}
            >
              {row.status ? 'Aberto' : 'Fechado'}
            </span>

            <p style={{ margin: '0.5rem 0', color: '#555' }}>{row.customer}</p>
            <p style={{ margin: '0.5rem 0', color: '#555' }}>{row.employee ?? "Nenhum funcionário atribuído"}</p>
            <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
              <Button
                icon="pi pi-pencil"
                className="p-button-rounded p-button-warning p-button-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingTicket(row);
                  setViewMode(false);
                  setDisplayModal(true);
                }}
              />
              <Button
                icon="pi pi-trash"
                className="p-button-rounded p-button-danger p-button-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(row);
                }}
              />
            </div>
          </Card>
        ))}
      </div>

      <Button
        icon="pi pi-plus"
        className="p-button-rounded p-button-success p-button-lg"
        style={{ position: 'fixed', bottom: '20px', right: '20px' }}
        onClick={() => {
          setEditingTicket(null);
          setViewMode(false);
          setDisplayModal(true);
        }}
      />

      <TicketDialog
        visible={displayModal}
        onHide={() => {
          setDisplayModal(false);
          setEditingTicket(null);
        }}
        onSave={handleSaveTicket}
        ticketId={editingTicket?.id}
        viewMode={viewMode}
      />

      <FooterComponent />
    </div>
  );
};
