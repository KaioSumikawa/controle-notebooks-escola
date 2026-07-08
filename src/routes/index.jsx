import { createBrowserRouter } from 'react-router-dom';
import {
  Dashboard,
  Emprestimos,
  Devolucoes,
  Notebooks,
  Historico,
  Relatorios,
  Configuracoes,
  Turmas,
  Login,
} from '../pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/emprestimos',
    element: <Emprestimos />,
  },
  {
    path: '/devolucoes',
    element: <Devolucoes />,
  },
  {
    path: '/notebooks',
    element: <Notebooks />,
  },
  {
    path: '/historico',
    element: <Historico />,
  },
  {
    path: '/relatorios',
    element: <Relatorios />,
  },
  {
    path: '/configuracoes',
    element: <Configuracoes />,
  },
  {
    path: '/turmas',
    element: <Turmas />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);
