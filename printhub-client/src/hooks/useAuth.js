import { useSelector } from 'react-redux';

const useAuth = () => {
  const token = localStorage.getItem('token');
  const user = useSelector((state) => state.auth.user);
  return !!token && !!user;
};

export default useAuth;
