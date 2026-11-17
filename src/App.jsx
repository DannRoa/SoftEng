import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Order from './pages/Order.jsx';
import Table from './pages/Table.jsx';
import Menu from './pages/Menu.jsx';
import MenuView from './pages/Browse.jsx';
import StaffLogin from './pages/stafflogin.jsx';
import Staff from './pages/staff.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/order" element={<Order />} />
      <Route path="/table" element={<Table />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/browse" element={<MenuView />} />
      <Route path="/staff/login" element={<StaffLogin />} />
      <Route path="/staff" element={<Staff />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}