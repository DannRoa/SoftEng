import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Order from './pages/Order.jsx';
import Table from './pages/Table.jsx';
import Menu from './pages/Menu.jsx';
import MenuView from './pages/Browse.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/order" element={<Order />} />
      <Route path="/table" element={<Table />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/browse" element={<MenuView />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}