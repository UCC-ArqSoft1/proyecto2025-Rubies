import { useState, useEffect } from 'react';
import { getActivities } from '../services/api';
import ActivityCard from '../components/ActivityCard';

const Home = () => {
    const [activities, setActivities] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadActivities();
    }, []);

    const loadActivities = async (searchTerm = '') => {
        try {
            setLoading(true);
            const response = await getActivities(searchTerm);
            setActivities(response.data);
            setError('');
        } catch (err) {
            setError('Error al cargar las actividades');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        loadActivities(search);
    };

    return (
        <div className="home">
            <h1>Actividades Deportivas</h1>

            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Buscar por nombre, categoría, horario..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-input"
                />
                <button type="submit" className="btn-search">Buscar</button>
            </form>

            {loading && <p className="loading">Cargando actividades...</p>}

            {error && <p className="error">{error}</p>}

            <div className="activities-grid">
                {activities.map((activity) => (
                    <ActivityCard key={activity.id} activity={activity} />
                ))}
            </div>

            {!loading && activities.length === 0 && (
                <p className="no-results">No se encontraron actividades</p>
            )}
        </div>
    );
};

export default Home;