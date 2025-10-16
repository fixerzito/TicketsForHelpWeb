import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { CustomersViewComponent } from '../customer/CustomersViewComponent';
import { TicketsViewComponent } from '../ticket/TicketViewComponent';
import { HomeComponent } from '../home/HomeComponent';
import { EmployeeViewComponent } from '../employee/EmployeeViewComponent';

export const AppNavigator: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [activePage, setActivePage] = useState<'home' | 'customers' | 'employees' | 'tickets'>('home');

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomeComponent setActivePage={setActivePage} />;
      case 'customers':
        return <CustomersViewComponent />;
      case 'employees':
        return <EmployeeViewComponent />;
      case 'tickets':
        return <TicketsViewComponent />;
      default:
        return <div>Página não encontrada</div>;
    }
  };

  return (
    <div>
      <Button
        icon="pi pi-bars"
        className="p-button-rounded p-m-2"
        onClick={() => setVisible(true)}
      />
      <Sidebar visible={visible} onHide={() => setVisible(false)} position="left">
        <h3
          className="p-text-center p-text-bold p-mb-4"
          style={{ fontSize: '2.2rem', color: '#3f51b5', textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}
        >
          Tickets For Help
        </h3>

        <div className="p-d-flex p-flex-column p-ai-start p-gap-2">
          <Button
            label="Home"
            className="p-button-text w-full"
            onClick={() => {
              setActivePage('home');
              setVisible(false);
            }}
          />
          <Button
            label="Clientes"
            className="p-button-text w-full"
            onClick={() => {
              setActivePage('customers');
              setVisible(false);
            }}
          />
          <Button
            label="Tickets"
            className="p-button-text w-full"
            onClick={() => {
              setActivePage('tickets');
              setVisible(false);
            }}
          />
          <Button
            label="Employees"
            className="p-button-text w-full"
            onClick={() => {
              setActivePage('employees');
              setVisible(false);
            }}
          />
        </div>
      </Sidebar>

      <div className="p-m-3">{renderPage()}</div>
    </div>
  );
};
