import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../app/store';
import '../styles/globals.css';
import { SessionProvider as AuthProvider } from "next-auth/react";

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider session={pageProps.session}>
      <ReduxProvider store={store}>
        <Component {...pageProps} />
      </ReduxProvider>
    </AuthProvider>
  );
}

export default MyApp;

