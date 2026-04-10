import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Music, Image as ImageIcon, AlertCircle } from 'lucide-react';
import axiosClient from '../../api/axiosClient';
import toast from 'react-hot-toast';
import { useAlbums } from '../../context/AlbumContext';
import { useNavigate } from 'react-router-dom';

const AdminProducts = () => {
    const { albums, loading: contextLoading, error: contextError, fetchAlbums: refreshGlobalAlbums } = useAlbums();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentAlbum, setCurrentAlbum] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        artist: '',
        description: '',
        price: '',
        imageUrl: '',
        genre: 'Rap',
        releaseYear: new Date().getFullYear(),
        tracklist: []
    });

    useEffect(() => {
        // Sync local loading/error with context
        setLoading(contextLoading);
        setError(contextError);
    }, [contextLoading, contextError]);

    const handleOpenModal = (album = null) => {
        if (album) {
            setCurrentAlbum(album);
            setFormData({
                ...album,
                tracklist: Array.isArray(album.tracklist) ? album.tracklist : []
            });
        } else {
            setCurrentAlbum(null);
            setFormData({
                title: '', artist: '', description: '', price: '',
                imageUrl: '', genre: 'Rap', releaseYear: new Date().getFullYear(),
                tracklist: []
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentAlbum) {
                await axiosClient.put(`/api/albums/${currentAlbum.id}`, formData);
                toast.success('Album updated');
            } else {
                await axiosClient.post('/api/albums', formData);
                toast.success('Album created');
            }
            setIsModalOpen(false);
            refreshGlobalAlbums();
        } catch (err) {
            console.error('Submit Error:', err);
            toast.error(err.response?.data?.message || 'Operation failed');
            if (err.response?.status === 401 || err.response?.status === 403) {
                navigate('/login');
            }
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this album?')) {
            try {
                await axiosClient.delete(`/api/albums/${id}`);
                toast.success('Album deleted');
                refreshGlobalAlbums();
            } catch (err) {
                toast.error('Failed to delete album');
                if (err.response?.status === 401 || err.response?.status === 403) {
                    navigate('/login');
                }
            }
        }
    };

    const addTrack = () => {
        const currentTracks = Array.isArray(formData.tracklist) ? formData.tracklist : [];
        setFormData({ ...formData, tracklist: [...currentTracks, { trackName: '', previewUrl: '' }] });
    };

    const updateTrack = (index, field, value) => {
        const currentTracks = Array.isArray(formData.tracklist) ? formData.tracklist : [];
        const newTracklist = [...currentTracks];
        if (newTracklist[index]) {
            newTracklist[index][field] = value;
            setFormData({ ...formData, tracklist: newTracklist });
        }
    };

    const removeTrack = (index) => {
        const currentTracks = Array.isArray(formData.tracklist) ? formData.tracklist : [];
        setFormData({ ...formData, tracklist: currentTracks.filter((_, i) => i !== index) });
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-24 space-y-4 animate-pulse">
            <div className="w-12 h-12 rounded-full border-2 border-white/5 border-t-white/20 animate-spin"></div>
            <p className="text-muted text-[10px] uppercase tracking-[0.3em]">Auditing Inventory...</p>
        </div>
    );

    if (error) return (
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-16 text-center space-y-6">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="text-muted" size={32} />
            </div>
            <div className="space-y-2">
                <p className="text-white font-medium">{error}</p>
                <p className="text-muted text-sm px-10">Access to the global stock repository was denied or lost.</p>
            </div>
            <button 
                onClick={() => refreshGlobalAlbums()}
                className="bg-white text-void px-8 py-3 rounded-xl font-bold text-sm tracking-tight hover:bg-mist transition-colors shadow-soft-sm"
            >
                Retry Audit
            </button>
        </div>
    );

    return (
        <div className="space-y-8 animate-fade-in">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Stock Management</h1>
                    <p className="text-muted mt-2">Manage your catalog of exclusive releases.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 bg-white text-void px-6 py-3 rounded-xl font-bold text-sm tracking-tight hover:bg-mist transition-colors shadow-soft-sm"
                >
                    <Plus size={18} /> Add New Album
                </button>
            </header>

            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/[0.01] border-b border-white/[0.03]">
                                <th className="px-6 py-5 text-[10px] uppercase tracking-widest text-muted font-medium">Product</th>
                                <th className="px-6 py-5 text-[10px] uppercase tracking-widest text-muted font-medium text-right">Price</th>
                                <th className="px-6 py-5 text-[10px] uppercase tracking-widest text-muted font-medium text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.03]">
                            {(albums || []).map((album) => (
                                <tr key={album?.id} className="hover:bg-white/[0.01] transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-lg overflow-hidden border border-white/5 bg-white/5 flex-shrink-0">
                                                {album?.imageUrl ? (
                                                    <img src={album.imageUrl} alt={album.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center opacity-20"><ImageIcon size={20} /></div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-bold text-white leading-tight">{album?.title || 'Unknown Title'}</p>
                                                <p className="text-sm text-muted mt-0.5">{album?.artist || 'Unknown Artist'} • {album?.releaseYear || '—'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="font-mono text-white text-lg font-bold">{album?.price || 0} $</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-2">
                                            <button onClick={() => handleOpenModal(album)} className="p-2.5 bg-white/[0.03] hover:bg-white/10 text-muted hover:text-white rounded-lg transition-all border border-white/5">
                                                <Edit2 size={16} />
                                            </button>
                                            <button onClick={() => handleDelete(album.id)} className="p-2.5 bg-white/[0.03] hover:bg-mist/10 text-muted hover:text-mist rounded-lg transition-all border border-white/5">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {(!albums || albums.length === 0) && (
                    <div className="p-20 text-center">
                        <ImageIcon size={48} className="mx-auto text-white/5 mb-4" />
                        <p className="text-muted italic">The vault is currently empty.</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-void/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
                    <div className="relative bg-[#0A0A0A] border border-white/10 w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-scale-in">
                        <header className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
                            <div>
                                <h2 className="text-2xl font-bold text-white tracking-tight">{currentAlbum ? 'Edit Album' : 'Create Album'}</h2>
                                <p className="text-muted text-sm mt-1">{currentAlbum ? 'Refine your masterpiece.' : 'Introduce a new icon to the store.'}</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full text-muted hover:text-white transition-colors">
                                <X size={24} />
                            </button>
                        </header>

                        <form onSubmit={handleSubmit} className="flex-1 overflow-auto p-10 custom-scrollbar">
                            <div className="space-y-10">
                                {/* Basic Info */}
                                <section className="grid grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-muted font-bold">Album Title</label>
                                        <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:border-white/20 focus:bg-white/[0.07] outline-none transition-all"
                                            placeholder="Enter title..." />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-muted font-bold">Artist Name</label>
                                        <input required value={formData.artist} onChange={e => setFormData({...formData, artist: e.target.value})}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:border-white/20 focus:bg-white/[0.07] outline-none transition-all"
                                            placeholder="Enter artist..." />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-muted font-bold">Price ($)</label>
                                        <input required type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:border-white/20 focus:bg-white/[0.07] outline-none transition-all"
                                            placeholder="0.00" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-muted font-bold">Release Year</label>
                                        <input required type="number" value={formData.releaseYear} onChange={e => setFormData({...formData, releaseYear: e.target.value})}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:border-white/20 focus:bg-white/[0.07] outline-none transition-all"
                                            placeholder="YYYY" />
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-muted font-bold">Album Cover URL</label>
                                        <input required value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:border-white/20 focus:bg-white/[0.07] outline-none transition-all"
                                            placeholder="https://..." />
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-muted font-bold">Description</label>
                                        <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:border-white/20 focus:bg-white/[0.07] outline-none transition-all resize-none"
                                            placeholder="Album story..." />
                                    </div>
                                </section>

                                {/* Tracklist */}
                                <section className="space-y-6">
                                    <div className="flex justify-between items-center bg-white/[0.02] p-4 rounded-xl border border-white/5">
                                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                            <Music size={16} /> Tracklist Configuration
                                        </h3>
                                        <button type="button" onClick={addTrack}
                                            className="text-[10px] uppercase tracking-widest font-bold bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors border border-white/5 text-mist">
                                            Add Track
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        {(formData.tracklist || []).map((track, index) => (
                                            <div key={index} className="flex gap-4 items-center bg-white/[0.01] p-4 rounded-xl border border-white/[0.02] hover:border-white/10 transition-colors group">
                                                <span className="text-[10px] font-mono text-muted w-4 flex-shrink-0">{index + 1}</span>
                                                <input required value={track?.trackName} onChange={e => updateTrack(index, 'trackName', e.target.value)}
                                                    className="flex-1 bg-transparent border-b border-white/10 py-1 text-sm text-white focus:border-white outline-none"
                                                    placeholder="Track Name" />
                                                <input value={track?.previewUrl} onChange={e => updateTrack(index, 'previewUrl', e.target.value)}
                                                    className="flex-1 bg-transparent border-b border-white/10 py-1 text-sm text-white/40 focus:text-white focus:border-white outline-none"
                                                    placeholder="Preview URL (Optional)" />
                                                <button type="button" onClick={() => removeTrack(index)} 
                                                    className="p-2 opacity-0 group-hover:opacity-100 text-muted hover:text-mist transition-all">
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        </form>

                        <footer className="p-8 border-t border-white/5 bg-void flex justify-end gap-4">
                            <button type="button" onClick={() => setIsModalOpen(false)}
                                className="px-6 py-3 rounded-xl text-sm font-bold text-muted hover:text-white transition-colors">
                                Cancel
                            </button>
                            <button onClick={handleSubmit}
                                className="px-8 py-3 bg-white text-void rounded-xl text-sm font-bold hover:bg-mist transition-colors shadow-soft-sm">
                                {currentAlbum ? 'Update Master' : 'Save as Item'}
                            </button>
                        </footer>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProducts;
