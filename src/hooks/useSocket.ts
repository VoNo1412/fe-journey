import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { HOST_WEBSOCKET } from '../api/constants';

const useSocket = (userId: number, on_message: string) => {
    const [socket, setSocket] = useState<any>(null);
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        // Connect to the specific namespace
        const socketInstance = io(HOST_WEBSOCKET, {
            query: { userId },
        });

        setSocket(socketInstance);

        socketInstance.on(on_message, (data: any) => {
            console.log(`[Socket] Received:`, data);
            setState(data);
        });

        return () => {
            socketInstance.disconnect();
        };
    }, [userId, on_message]); // dependency array includes dynamic params

    return { socket, state };
};

export default useSocket;
