import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyEnrollments } from '../services/api';
import { useAuth } from '../context/AuthContext';
import ActivityCard from '../components/ActivityCard';

const MyActivities = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        loadMyActivities();
    }, [user, navigate]);

    const loadMyActivities = async () => {
        try {
            const response = await getMyEnrollments();
            setActivities(response.data);
        } catch (err) {
            setError('Error al cargar tus actividades');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p className="loading">Cargando...</p>;

    return (
        <div className="my-activities">
            <h1>Mis Actividades</h1>

            {error && <p className="error">{error}</p>}

            {activities.length === 0 ? (
                <div className="no-activities">
                    <p>No estás inscripto en ninguna actividad todavía.</p>
                    <button onClick={() => navigate('/')} className="btn-search">
                        Ver actividades disponibles
                    </button>
                </div>
            ) : (
                <div className="activities-grid">
                    {activities.map((activity) => (
                        <ActivityCard key={activity.id} activity={activity} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyActivities;