import { useSelector } from 'react-redux';

export const useAuth = () => useSelector(s => s.auth);
export const useAlert = () => useSelector(s => s.alert);