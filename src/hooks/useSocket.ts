import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { HOST_WEBSOCKET } from '../api/constants';

const useSocket = (userId: number, onMessage: string) => {
    const socketRef = useRef<any>(null);
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        if (!userId || socketRef.current) return;

        const socket = io(HOST_WEBSOCKET, {
            query: { userId },
            reconnection: true,
            reconnectionAttempts: 3,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
        });

        socketRef.current = socket;

        console.log('Socket connected', socket);

        socket.on(onMessage, (data: any) => {
            console.log(`[Socket] Received:`, data);
            setState(data);
        });

        return () => {
            console.log('Socket disconnected');
            socket.disconnect();
            socketRef.current = null;
        };
    }, [userId, onMessage]);

    return { socket: socketRef.current, state };
};

export default useSocket;
