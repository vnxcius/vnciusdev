import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/error-page";
import CertFacSenac24 from "./pages/cert-fac-senac-24";
import Article from "./pages/article";
import Articles from "./pages/articles";
import Minecraft from "./pages/minecraft";
import StackCalculator from "./pages/stack-calculator";

const Routes = createBrowserRouter([
  {
    path: '*',
    element: <ErrorPage />,
    errorElement: <ErrorPage />
  },
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/certificado-faculdade',
    element: <CertFacSenac24 />,
  },
  {
    path: '/blog',
    element: <Articles />,
  },
  {
    path: '/blog/:slug',
    element: <Article />,
  },
  {
    path: '/minecraft',
    element: <Minecraft />,
  },
  {
    path: '/minecraft/stack-calculator',
    element: <StackCalculator />,
  },
  {
    path: '/github',
    loader: async () => {
      return redirect('https://github.com/vnxcius')
    }
  },
  {
    path: '/linkedin',
    loader: async () => {
      return redirect('https://linkedin.com/in/vinicius-simon-gouveia-hilton/')
    }
  },
  {
    path: '/mail',
    loader: async () => {
      return redirect('mailto:contato@vncius.dev')
    }
  },
]);

export default Routes;