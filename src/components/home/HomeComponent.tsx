import React from 'react';
import { Card } from 'primereact/card';
import { FooterComponent } from './FooterComponent';

interface HomeComponentProps {
  setActivePage: (page: 'home' | 'customers' | 'tickets') => void;
}

export const HomeComponent: React.FC<HomeComponentProps> = ({ setActivePage }) => {
  return (
    <div style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card
          style={{
            width: '100%',
            height: '100%',
            padding: '3rem',
            textAlign: 'center',
            boxShadow: 'none',
            borderRadius: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
            Bem-vindo ao{' '}
            <span
              style={{
                color: '#3f51b5',
                fontWeight: 'bold',
                textShadow: '1px 1px 3px rgba(0,0,0,0.2)',
              }}
            >
              Tickets For Help
            </span>
          </h1>
          <p style={{ fontSize: '1.5rem', lineHeight: '2', color: '#555' }}>
            Esta é a página inicial da aplicação. Você pode navegar entre as seções usando o menu lateral ou clicando diretamente nos links {' '}
            <span
              style={{ color: '#3f51b5', fontWeight: 'bold', cursor: 'pointer' }}
              onClick={() => setActivePage('customers')}
            >
              Clientes
            </span>{' '}
            e{' '}
            <span
              style={{ color: '#3f51b5', fontWeight: 'bold', cursor: 'pointer' }}
              onClick={() => setActivePage('tickets')}
            >
              Tickets
            </span>
            .
          </p>
        </Card>
      </div>

      <FooterComponent />
    </div>
  );
};
