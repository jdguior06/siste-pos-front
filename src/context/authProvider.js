import { useDispatch, useSelector } from 'react-redux';
import { setAuth, clearAuth } from '../features/authSlice';
import { useEffect } from 'react';

export const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();
    const { token, loading } = useSelector((state) => state.auth);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            dispatch(setAuth(storedToken)); // Guardar token y usuario en el store
        } else {
            dispatch(clearAuth());
        }
    }, [dispatch]);
    return <>{!loading && children}</>;
};

export const useAuth = () => useSelector((state) => state.auth);
