import { useSelector } from 'react-redux';

const useAdmin = () => {
  const token = localStorage.getItem('token');
  const user = useSelector((state) => state.auth.user);
  return !!token && !!user && user.role=='admin';
};

export default useAdmin;
