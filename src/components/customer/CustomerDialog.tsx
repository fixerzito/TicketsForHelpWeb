import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { CustomerFormInsert, CustomerViewModel } from '../../types/customer/Customer';

interface CustomerDialogProps {
    visible: boolean;
    onHide: () => void;
    onSave: (customer: CustomerFormInsert & { id?: number }) => void;
    customer?: CustomerViewModel;
}

export const CustomerDialog: React.FC<CustomerDialogProps> = ({ visible, onHide, onSave, customer }) => {
    const [formData, setFormData] = useState<CustomerFormInsert>({
        name: '',
        email: '',
        cnpj: ''
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (customer) {
            setFormData({
                name: customer.name,
                email: customer.email,
                cnpj: customer.cnpj
            });
        } else {
            setFormData({ name: '', email: '', cnpj: '' });
        }
    }, [customer, visible]);

    const handleChange = (field: keyof CustomerFormInsert, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSave = async () => {
        const { name, email, cnpj } = formData;

        if (!name || !email || !cnpj) {
            alert('Preencha todos os campos!');
            return;
        }

        setSaving(true);

        try {
            await onSave({ ...formData, id: customer?.id });
            onHide();
        } catch (error: any) {
            alert('Erro ao salvar cliente: ' + (error.message || error));
        } finally {
            setSaving(false);
        }
    };

    return (
        <Dialog
            header={customer ? "Editar Cliente" : "Cadastrar Cliente"}
            visible={visible}
            style={{ width: '450px' }}
            onHide={onHide}
            className="p-shadow-6"
            breakpoints={{ '640px': '90vw' }}
        >
            <div className="p-fluid">
                <div className="p-field mb-3">
                    <label htmlFor="name" className="p-text-bold">Nome</label>
                    <InputText
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="Digite o nome do cliente"
                    />
                </div>

                <div className="p-field mb-3">
                    <label htmlFor="email" className="p-text-bold">Email</label>
                    <InputText
                        id="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="Digite o email do cliente"
                    />
                </div>

                <div className="p-field mb-3">
                    <label htmlFor="cnpj" className="p-text-bold">CNPJ</label>
                    <InputText
                        id="cnpj"
                        value={formData.cnpj}
                        onChange={(e) => handleChange('cnpj', e.target.value)}
                        placeholder="Digite o CNPJ do cliente"
                    />
                </div>

                <div className="p-d-flex p-flex-row p-jc-end p-gap-2 p-mt-4">
                    <Button
                        label="Cancelar"
                        icon="pi pi-times"
                        className="p-button-text mt-3 mb-3"
                        onClick={onHide}
                        disabled={saving}
                    />
                    <Button
                        label="Salvar"
                        icon="pi pi-check"
                        className="p-button-success"
                        onClick={handleSave}
                        loading={saving}
                    />
                </div>
            </div>
        </Dialog>
    );
};
