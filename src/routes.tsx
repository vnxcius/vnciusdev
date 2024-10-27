import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/error-page";
import CertFacSenac24 from "./pages/cert-fac-senac-24";

const Routes = createBrowserRouter([
  {
    path: '*',
    element: <ErrorPage />
  },
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: '/certificado-faculdade',
    element: <CertFacSenac24 />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/github',
    loader: async () => { return redirect('https://github.com/vnxcius') }
  },
  {
    path: '/linkedin',
    loader: async () => { return redirect('https://linkedin.com/in/vinicius-simon-gouveia-hilton/') }
  },
  {
    path: '/mail',
    loader: async () => { return redirect('mailto:contato@vncius.dev') }
  },
]);

export default Routes;