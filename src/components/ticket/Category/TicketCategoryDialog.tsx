import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { TicketCategoryFormInsert } from "../../../types/ticket/TicketCategory";

interface TicketCategoryDialogProps {
  visible: boolean;
  onHide: () => void;
  onSave: (ticket: TicketCategoryFormInsert & { id?: number }) => void;
  ticketId?: number;
  viewMode?: boolean;
}

export const TicketCategoryDialog: React.FC<TicketCategoryDialogProps> = ({
  visible,
  onHide,
  onSave,
  viewMode = false,
}) => {
  const [formData, setFormData] = useState<TicketCategoryFormInsert & { id?: number }>({
    name: ''
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (visible) {
      setFormData({
        name: ''
      })
    }
  }, [visible]);

  const handleChange = (field: keyof TicketCategoryFormInsert, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = async () => {
    if (viewMode) {
      onHide();
      return;
    }

    if (!formData.name.trim()) {
      alert('Preencha o nome da categoria!');
      return;
    }

    setSaving(true);
    try {
      await onSave(formData);
      onHide();
    } catch (err: any) {
      alert('Erro ao salvar categoria: ' + (err.message || err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      header="Nova Categoria"
      visible={visible}
      style={{ width: '40vw', maxWidth: '500px' }}
      modal
      onHide={onHide}
    >
      <div>
        <label className="text-gray-600 font-medium mb-1 block">Descrição</label>
        <InputText
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Insira o nome da categoria"
          disabled={viewMode}
          className="w-full border-round-md"
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
    </Dialog>
  );
};
