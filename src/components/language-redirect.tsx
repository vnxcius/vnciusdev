import { Navigate, useLocation } from 'react-router-dom';

const defaultLanguage = 'br';
const supportedLanguages = ['en', 'br'];

const LanguageRedirect = () => {
  const location = useLocation();
  const { pathname } = location;

  const pathParts = pathname.split('/');
  const currentLang = pathParts[1];

  if (currentLang && supportedLanguages.includes(currentLang)) {
    return null; // Valid language, no redirection needed
  }

  // Redirect to the default language with the same path
  const newPath = `/${defaultLanguage}`;

  return <Navigate to={newPath} />;
};

export default LanguageRedirect;
