import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/error-page";
import ExternalRedirect from "./components/external-redirect";
import LanguageRedirect from "./components/language-redirect";

const Routes = createBrowserRouter([
  {
    path: '*',
    element: <ErrorPage />
  },
  {
    path: '/',
    element: <LanguageRedirect />
  },
  {
    path: '/:lng',
    element:
    <>
      <LanguageRedirect />
      <App />
    </>,
    errorElement: <ErrorPage />
  },
  {
    path: '/github',
    element: <ExternalRedirect link="https://github.com/vnxcius" />
  },
  {
    path: '/linkedin',
    element: <ExternalRedirect link="https://www.linkedin.com/in/vinicius-simon-gouveia-hilton" />
  },
  {
    path: 'mail',
    element: <ExternalRedirect link="mailto:contato@vncius.dev" />
  }
]);

export default Routes;