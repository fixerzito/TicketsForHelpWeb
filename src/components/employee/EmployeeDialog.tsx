import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { EmployeeViewModel, EmployeeFormUpdate } from '../../types/employee/Employee';
import { employeeService } from '../../services/employee/employeeService';

interface Props {
    visible: boolean;
    employee: EmployeeViewModel;
    onHide: () => void;
    onUpdated: () => void;
}

export const EmployeeDialog: React.FC<Props> = ({ visible, employee, onHide, onUpdated }) => {
    const [editData, setEditData] = useState<EmployeeViewModel>(employee);
    const [editableField, setEditableField] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [photoUrl, setPhotoUrl] = useState<string>('');

    // Atualiza os dados quando o employee muda
    useEffect(() => {
        setEditData(employee);
        setPhotoUrl(`/images/employees/${employee.photo}`); // caminho relativo à pasta public
    }, [employee]);

    const handleSave = async () => {
        setLoading(true);
        try {
            const updatePayload: EmployeeFormUpdate = { ...editData };
            await employeeService.update(editData.id, updatePayload);
            onUpdated();
            onHide();
        } catch (err) {
            console.error('Erro ao atualizar funcionário:', err);
        } finally {
            setLoading(false);
        }
    };

    const renderField = (label: string, field: keyof EmployeeViewModel) => (
        <div style={{ marginBottom: '1rem' }}>
            <strong>{label}: </strong>
            {editableField === field ? (
                <InputText
                    value={editData[field] as string}
                    onChange={(e) => setEditData({ ...editData, [field]: e.target.value })}
                    onBlur={() => setEditableField(null)}
                    autoFocus
                />
            ) : (
                <span
                    style={{ marginLeft: '0.5rem', cursor: 'pointer', color: '#333' }}
                    onClick={() => setEditableField(field)}
                >
                    {editData[field]}
                </span>
            )}
        </div>
    );

    return (
        <Dialog
            header={`Funcionário #${employee.id}`}
            visible={visible}
            style={{ width: '30rem' }}
            modal
            onHide={onHide}
            footer={
                <div>
                    <Button label="Salvar" icon="pi pi-check" onClick={handleSave} loading={loading} />
                    <Button label="Fechar" icon="pi pi-times" className="p-button-text" onClick={onHide} />
                </div>
            }
        >
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <img
                    src={`/util/images/employees/${employee.photo}`}
                    alt={employee.name}
                    style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
                />

            </div>

            {renderField('Nome', 'name')}
            {renderField('Login', 'login')}
            {renderField('Email', 'email')}
            {renderField('CPF', 'cpf')}
        </Dialog>
    );
};
