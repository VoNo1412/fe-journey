import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { AUTH_API } from '../../api/api';


const GoogleCallback = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuth();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await AUTH_API.apiGetMe();
                setAuth({ user: { ...res.user } });
            } catch (error) {
                console.error('Token không hợp lệ hoặc hết hạn');
            }
        };
        fetchUser();
        navigate('/dashboard')

    }, []);

    return <div>Đang xác thực...</div>;
};

export default GoogleCallback;
