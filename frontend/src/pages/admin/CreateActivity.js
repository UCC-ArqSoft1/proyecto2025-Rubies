import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createActivity } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const CreateActivity = () => {
    const navigate = useNavigate();
    const { isAdmin } = useAuth();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        instructor: '',
        day: '',
        schedule: '',
        duration_minutes: '',
        capacity: '',
        image_url: ''
    });
    const [message, setMessage] = useState({ text: '', type: '' });
    const [loading, setLoading] = useState(false);

    if (!isAdmin()) {
        navigate('/');
        return null;
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = {
                ...formData,
                duration_minutes: parseInt(formData.duration_minutes),
                capacity: parseInt(formData.capacity)
            };

            await createActivity(data);
            setMessage({ text: '¡Actividad creada exitosamente!', type: 'success' });
            setTimeout(() => navigate('/'), 1500);
        } catch (err) {
            setMessage({ text: 'Error al crear la actividad', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-form">
            <h1>Nueva Actividad</h1>

            {message.text && (
                <div className={`message ${message.type}`}>{message.text}</div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Título</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Descripción</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Categoría</label>
                        <select name="category" value={formData.category} onChange={handleChange} required>
                            <option value="">Seleccionar...</option>
                            <option value="funcional">Funcional</option>
                            <option value="spinning">Spinning</option>
                            <option value="mma">MMA</option>
                            <option value="yoga">Yoga</option>
                            <option value="crossfit">CrossFit</option>
                            <option value="pilates">Pilates</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Instructor</label>
                        <input type="text" name="instructor" value={formData.instructor} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Día</label>
                        <select name="day" value={formData.day} onChange={handleChange} required>
                            <option value="">Seleccionar...</option>
                            <option value="Lunes">Lunes</option>
                            <option value="Martes">Martes</option>
                            <option value="Miércoles">Miércoles</option>
                            <option value="Jueves">Jueves</option>
                            <option value="Viernes">Viernes</option>
                            <option value="Sábado">Sábado</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Horario</label>
                        <input type="time" name="schedule" value={formData.schedule} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Duración (minutos)</label>
                        <input type="number" name="duration_minutes" value={formData.duration_minutes} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Cupo</label>
                        <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-group">
                    <label>URL de Imagen</label>
                    <input type="url" name="image_url" value={formData.image_url} onChange={handleChange} placeholder="https://..." />
                </div>

                <button type="submit" className="btn-submit" disabled={loading}>
                    {loading ? 'Creando...' : 'Crear Actividad'}
                </button>
            </form>
        </div>
    );
};

export default CreateActivity;