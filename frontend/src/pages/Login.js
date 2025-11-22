import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { loginUser } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await login(formData.email, formData.password);
            const token = response.data.token;

            const payload = JSON.parse(atob(token.split('.')[1]));
            const userData = {
                id: payload.user_id,
                email: payload.email,
                role: payload.role,
                first_name: payload.email.split('@')[0]
            };

            loginUser(token, userData);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h1>Iniciar Sesión</h1>

                {error && <div className="message error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-submit" disabled={loading}>
                        {loading ? 'Ingresando...' : 'Ingresar'}
                    </button>
                </form>

                <div className="login-help">
                    <p><strong>Usuarios de prueba:</strong></p>
                    <p>Admin: admin@gimnasio.com / admin123</p>
                    <p>Socio: socio@gimnasio.com / socio123</p>
                </div>
            </div>
        </div>
    );
};

export default Login;