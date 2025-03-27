import { useState, useEffect } from "react";
import axios from "../api/axios";

const useFetchQuery = (url: string, query: string, delay = 500) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!query) {
            setData([]);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`${url}?${query}`);
                setData(response.data);
            } catch (err) {
                setError("Error fetching data");
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(fetchData, delay); // Debounce request

        return () => clearTimeout(timeoutId); // Cleanup timeout on unmount or query change
    }, [url, query, delay]);

    return { data, loading, error };
};

export default useFetchQuery;
