import { useEffect, useState } from 'react';
import io from 'socket.io-client';

// Create a custom hook
const useSocket = (url: string, userId: number) => {
    const [socket, setSocket] = useState<any>(null); // state to store the socket instance
    const [userStatus, setUserStatus] = useState<any>(null); // state to store user status updates

    useEffect(() => {
        // Establish socket connection
        const socketInstance = io(url, { query: { userId } }); // Pass userId as a query parameter

        // Set the socket instance in state
        setSocket(socketInstance);

        // Listen for user-status-update events
        socketInstance.on('user-status-update', (data: any) => {
            console.log('User status update:', data);
            setUserStatus(data); // Update the state with the new user status
        });

        // Cleanup function to disconnect the socket when the component unmounts
        return () => {
            socketInstance.disconnect();
        };
    }, [url]); // Re-run the effect only if the URL changes

    return { socket, userStatus };
};

export default useSocket;
