import React, { useState, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { EmployeeFormInsert } from '../../types/employee/Employee';
import { employeeService } from '../../services/employee/employeeService';

interface Props {
  visible: boolean;
  onHide: () => void;
  onCreated: () => void;
}

export const EmployeeInsertDialog: React.FC<Props> = ({ visible, onHide, onCreated }) => {
  const [formData, setFormData] = useState<EmployeeFormInsert>({
    name: '',
    cpf: '',
    login: '',
    email: '',
    password: '',
    photo: ''
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const toast = useRef<Toast>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({
        ...prev,
        photo: file.name // apenas o nome será enviado
      }));
      setPreviewUrl(URL.createObjectURL(file)); // apenas para pré-visualização
    }
  };

  const handleSave = async () => {
    if (!formData.name || !formData.email || !formData.cpf) {
      toast.current?.show({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Preencha todos os campos obrigatórios!',
        life: 3000
      });
      return;
    }

    setLoading(true);
    try {
      // envia apenas o objeto com o nome do arquivo
      await employeeService.insert(formData); 
      toast.current?.show({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Funcionário cadastrado com sucesso!',
        life: 3000
      });

      // reset
      setFormData({
        name: '',
        cpf: '',
        login: '',
        email: '',
        password: '',
        photo: ''
      });
      setPreviewUrl(null);

      onCreated();
      onHide();
    } catch (err) {
      console.error('Erro ao cadastrar funcionário:', err);
      toast.current?.show({
        severity: 'error',
        summary: 'Erro',
        detail: 'Falha ao cadastrar funcionário.',
        life: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      header="Cadastrar Funcionário"
      visible={visible}
      modal
      style={{ width: '35rem' }}
      onHide={onHide}
      footer={
        <div>
          <Button label="Salvar" icon="pi pi-check" onClick={handleSave} loading={loading} />
          <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={onHide} />
        </div>
      }
    >
      <Toast ref={toast} />
      <div className="p-fluid">
        <div className="p-field">
          <label htmlFor="name">Nome</label>
          <InputText id="name" name="name" value={formData.name} onChange={handleInputChange} />
        </div>
        <div className="p-field">
          <label htmlFor="cpf">CPF</label>
          <InputText id="cpf" name="cpf" value={formData.cpf} onChange={handleInputChange} />
        </div>
        <div className="p-field">
          <label htmlFor="login">Login</label>
          <InputText id="login" name="login" value={formData.login} onChange={handleInputChange} />
        </div>
        <div className="p-field">
          <label htmlFor="email">Email</label>
          <InputText id="email" name="email" value={formData.email} onChange={handleInputChange} />
        </div>
        <div className="p-field">
          <label htmlFor="password">Senha</label>
          <InputText id="password" name="password" type="password" value={formData.password} onChange={handleInputChange} />
        </div>
        <div className="p-field">
          <label htmlFor="photo">Foto</label>
          <input id="photo" type="file" accept="image/*" onChange={handleFileChange} className="p-button"/>
          {previewUrl && (
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <img
                src={previewUrl}
                alt="Pré-visualização"
                style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
              />
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
};
