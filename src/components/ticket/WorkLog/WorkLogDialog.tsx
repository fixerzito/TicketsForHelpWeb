import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { WorkLogFormInsert } from "../../../types/ticket/WorkLog";
import { InputNumber } from "primereact/inputnumber";
import { Editor } from 'primereact/editor';

interface WorkLogDialogProps {
    visible: boolean;
    onHide: () => void;
    onSave: (ticket: WorkLogFormInsert & { id?: number }) => void;
    ticket: {
        id: number;
        employeeId: number;
    };
    workLogId?: number;
    viewMode?: boolean;
}

export const WorkLogDialog: React.FC<WorkLogDialogProps> = ({
    visible,
    onHide,
    ticket,
    onSave,
    viewMode = false,
}) => {
    const [formData, setFormData] = useState<WorkLogFormInsert & { id?: number }>({
        idTicket: undefined,
        idEmployee: undefined,
        date: null,
        hoursWorked: 0,
        description: ''
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (visible && ticket) {
            setFormData({
                idTicket: ticket.id,
                idEmployee: ticket.employeeId, 
                date: new Date(),
                hoursWorked: undefined,
                description: ''
            })
        }
    }, [visible, ticket]);

    const handleChange = (field: keyof WorkLogFormInsert, value: any) => {
        setFormData(prev => ({
        ...prev,
        [field]: value
    }));
    };

    const handleSave = async () => {
        if (viewMode) {
            onHide();
            return;
        }

        if (!formData.hoursWorked || !formData.description || !formData.date) {
            alert('Preencha os campos obrigatórios!');
            return;
        }
        setSaving(true);
        try {
            onSave({
            ...formData,
            idTicket: ticket.id,
            idEmployee: ticket.employeeId
        });
            onHide();
        } catch (err: any) {
            alert('Erro ao salvar apontamento: ' + (err.message || err));
        } finally {
            setSaving(false);
        }
    };


    return (
        <Dialog
            header="Registrar apontamento"
            visible={visible}
            style={{ width: '40vw', maxWidth: '500px' }}
            modal
            onHide={onHide}
        >
            <div>
                <label className="text-gray-600 font-medium mb-1 block">Horas Trabalhadas</label>
                <InputNumber
                    value={formData.hoursWorked}
                    onChange={(e) => handleChange('hoursWorked', e.value)}
                    placeholder="Informe as horas trabalhadas"
                    disabled={viewMode}
                    className="w-full border-round-md"
                />

                <label className="text-gray-600 font-medium mb-1 block">Dscrição de atuação</label>
                <Editor style={{ height: '320px' }} value={formData.description} onTextChange={(e) => setFormData({ ...formData, description: e.htmlValue ?? '' })} />

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
        </Dialog>
    );
};
