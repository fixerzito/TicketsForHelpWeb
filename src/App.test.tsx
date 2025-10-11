import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TicketsViewComponent } from './components/ticket/TicketViewComponent';
import { CustomersViewComponent } from './components/customer/CustomersViewComponent';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/tickets" replace />} />
        <Route path="/tickets" element={<TicketsViewComponent />} />
        <Route path="/customers" element={<CustomersViewComponent />} />
      </Routes>
    </Router>
  );
};

export default App;
