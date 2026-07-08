import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import './assets/styles/index.css';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
