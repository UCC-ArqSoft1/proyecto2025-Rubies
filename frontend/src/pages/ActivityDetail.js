import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getActivityById, enrollInActivity, deleteActivity } from '../services/api';
import { useAuth } from '../context/AuthContext';

const ActivityDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isAdmin } = useAuth();

    const [activity, setActivity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        loadActivity();
    }, [id]);

    const loadActivity = async () => {
        try {
            const response = await getActivityById(id);
            setActivity(response.data);
        } catch (err) {
            setMessage({ text: 'Error al cargar la actividad', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleEnroll = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            await enrollInActivity(id);
            setMessage({ text: '¡Inscripción exitosa!', type: 'success' });
        } catch (err) {
            setMessage({
                text: err.response?.data?.error || 'Error al inscribirse',
                type: 'error'
            });
        }
    };

    const handleDelete = async () => {
        if (window.confirm('¿Estás seguro de eliminar esta actividad?')) {
            try {
                await deleteActivity(id);
                setMessage({ text: 'Actividad eliminada', type: 'success' });
                setTimeout(() => navigate('/'), 1500);
            } catch (err) {
                setMessage({ text: 'Error al eliminar', type: 'error' });
            }
        }
    };

    if (loading) return <p className="loading">Cargando...</p>;
    if (!activity) return <p className="error">Actividad no encontrada</p>;

    return (
        <div className="activity-detail">
            <img
                src={activity.image_url}
                alt={activity.title}
                className="detail-image"
            />

            <div className="detail-content">
                <h1>{activity.title}</h1>
                <span className="category-badge">{activity.category}</span>

                <p className="description">{activity.description}</p>

                <div className="detail-info">
                    <p>👤 <strong>Instructor:</strong> {activity.instructor}</p>
                    <p>📅 <strong>Día:</strong> {activity.day}</p>
                    <p>🕐 <strong>Horario:</strong> {activity.schedule}</p>
                    <p>⏱️ <strong>Duración:</strong> {activity.duration_minutes} minutos</p>
                    <p>👥 <strong>Cupo:</strong> {activity.capacity} personas</p>
                </div>

                {message.text && (
                    <div className={`message ${message.type}`}>
                        {message.text}
                    </div>
                )}

                <div className="detail-actions">
                    <button onClick={handleEnroll} className="btn-enroll">
                        Inscribirme
                    </button>

                    {isAdmin() && (
                        <>
                            <button
                                onClick={() => navigate(`/admin/edit/${id}`)}
                                className="btn-edit"
                            >
                                Editar
                            </button>
                            <button onClick={handleDelete} className="btn-delete">
                                Eliminar
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ActivityDetail;