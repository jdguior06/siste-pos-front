import { useDispatch, useSelector } from 'react-redux';
import { setAuth, clearAuth, setLoading } from '../features/authSlice';
import { useEffect } from 'react';

export const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);

    useEffect(() => {
        const storedAuth = localStorage.getItem('auth');
        
        if (storedAuth) {
            const authData = JSON.parse(storedAuth);
            dispatch(setAuth(authData)); // Carga el objeto completo, incluidos los permisos
        } else {
            dispatch(clearAuth());
        }
        dispatch(setLoading(false)); // Carga completada
    }, [dispatch]);

    return <>{!loading && children}</>;
};


// Guardar en localStorage después de login
export const saveAuthToLocalStorage = (authData) => {
    localStorage.setItem('auth', JSON.stringify(authData));
};

// Limpiar localStorage en logout
export const clearAuthFromLocalStorage = () => {
    localStorage.removeItem('auth');
};
