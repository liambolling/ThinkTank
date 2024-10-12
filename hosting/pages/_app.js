import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/theme.css';
import '../styles/globals.css';
import { AuthProvider } from '../firebase/config';
import { useEffect } from "react";
import { UserProvider } from '../contexts/userContext';

function MyApp({ Component, pageProps }) {

    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);


    return (
        <UserProvider>
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </UserProvider>

    );
}

export default MyApp;
