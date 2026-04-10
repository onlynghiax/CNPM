import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import axiosClient from '../api/axiosClient';

const AlbumContext = createContext();

export const AlbumProvider = ({ children }) => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAlbums = useCallback(async (params = {}) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosClient.get('/api/albums', { params });
            setAlbums(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            setError(err.message || 'Could not load albums');
            setAlbums([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial fetch on mount
    useEffect(() => {
        fetchAlbums();
    }, [fetchAlbums]);

    return (
        <AlbumContext.Provider value={{ albums, loading, error, fetchAlbums, setAlbums }}>
            {children}
        </AlbumContext.Provider>
    );
};

export const useAlbums = () => {
    const context = useContext(AlbumContext);
    if (!context) {
        throw new Error('useAlbums must be used within an AlbumProvider');
    }
    return context;
};
