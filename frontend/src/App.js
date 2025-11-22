import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ActivityDetail from './pages/ActivityDetail';
import Login from './pages/Login';
import MyActivities from './pages/MyActivities';
import CreateActivity from './pages/admin/CreateActivity';
import EditActivity from './pages/admin/EditActivity';
import './App.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="app">
                    <Navbar />
                    <main className="container">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/activity/:id" element={<ActivityDetail />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/my-activities" element={<MyActivities />} />
                            <Route path="/admin/create" element={<CreateActivity />} />
                            <Route path="/admin/edit/:id" element={<EditActivity />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;