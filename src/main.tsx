import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Routes from './routes'
import './utils/i18n'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={Routes} />
)
