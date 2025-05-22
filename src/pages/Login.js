import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const onInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.get('http://54.165.104.165:8080/api/usuario');
            const user = res.data.data.find(
                u => u.username === form.username && u.password === form.password
            );
            if (user) {
                if (user.deletedAt !== null || user.deletedBy !== null) {
                    setError('El usuario fue eliminado');
                    return;
                }
                sessionStorage.setItem('userId', user.id);
                navigate(`/HomeAgenda/${user.id}`);
            } else {
                setError('Usuario o contraseña incorrectos');
            }
        } catch (err) {
            setError('Error de conexión');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '85vh' }}>
            <form onSubmit={onSubmit} className="border p-4 rounded-4 shadow-lg bg-white" style={{ minWidth: 340, maxWidth: 400 }}>
                <div className="text-center mb-4">
                    <img src={require('../images/LogoCorhuila.png')} alt="Logo" style={{ width: 70, marginBottom: 10 }} />
                    <h2 className="fw-bold" style={{ color: '#1a237e', letterSpacing: 1 }}>Iniciar Sesión</h2>
                </div>
                <div className="mb-3">
                    <label className="form-label fw-semibold">Usuario</label>
                    <div className="input-group">
                        <span className="input-group-text bg-primary text-white"><i className="fas fa-user"></i></span>
                        <input
                            type="text"
                            className="form-control border-primary"
                            name="username"
                            value={form.username}
                            onChange={onInputChange}
                            required
                            autoFocus
                            style={{ background: '#f8fafc' }}
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label fw-semibold">Contraseña</label>
                    <div className="input-group">
                        <span className="input-group-text bg-primary text-white"><i className="fas fa-lock"></i></span>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control border-primary"
                            name="password"
                            value={form.password}
                            onChange={onInputChange}
                            required
                            style={{ background: '#f8fafc' }}
                        />
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            tabIndex={-1}
                            onClick={() => setShowPassword((prev) => !prev)}
                            style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                        >
                            <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                        </button>
                    </div>
                </div>
                {error && <div className="text-danger mb-3 text-center fw-semibold">{error}</div>}
                <button type="submit" className="btn btn-primary w-100 fw-bold shadow-sm" style={{ fontSize: '1.1rem', letterSpacing: 1 }}>
                    <i className="fas fa-sign-in-alt me-2"></i>Entrar
                </button>
            </form>
        </div>
    );
}
