import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout, isAdmin } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">🏋️ Gimnasio</Link>
            </div>

            <div className="navbar-menu">
                <Link to="/">Inicio</Link>

                {user ? (
                    <>
                        <Link to="/my-activities">Mis Actividades</Link>
                        {isAdmin() && <Link to="/admin/create">Nueva Actividad</Link>}
                        <span className="navbar-user">Hola, {user.first_name}</span>
                        <button onClick={handleLogout} className="btn-logout">
                            Cerrar Sesión
                        </button>
                    </>
                ) : (
                    <Link to="/login">Iniciar Sesión</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;