import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function Login() {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const { updateOrder } = useCart();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', mobile: '', password: '' });
  const [error, setError] = useState('');

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    setError('');
    try {
      const user = mode === 'signup' ? signup(form) : login(form);
      updateOrder({ name: user.name, mobile: user.mobile });
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-[420px] flex-col justify-center px-5 py-10">
      <Link to="/" className="icon-btn mb-8" aria-label="Back">←</Link>

      <h1 className="font-serif text-4xl tracking-[6px]">CAPO</h1>
      <p className="mb-8 mt-1 text-[11px] font-semibold tracking-[4px] text-gold">
        {mode === 'login' ? 'WELCOME BACK' : 'CREATE ACCOUNT'}
      </p>

      <form onSubmit={submit}>
        {mode === 'signup' && (
          <div className="mb-4">
            <label className="label">YOUR NAME *</label>
            <input className="field" required placeholder="Enter your full name" value={form.name} onChange={set('name')} />
          </div>
        )}
        <div className="mb-4">
          <label className="label">MOBILE NUMBER *</label>
          <input className="field" type="tel" required placeholder="09XX XXX XXXX" value={form.mobile} onChange={set('mobile')} />
        </div>
        <div className="mb-4">
          <label className="label">PASSWORD *</label>
          <input className="field" type="password" required minLength={6} placeholder="At least 6 characters" value={form.password} onChange={set('password')} />
        </div>

        {error && <p className="mb-4 rounded-lg border border-red-400/40 bg-red-400/10 px-3 py-2 text-xs text-red-300">{error}</p>}

        <button type="submit" className="btn-gold mt-2">{mode === 'login' ? 'LOGIN' : 'SIGN UP'}</button>
      </form>

      <p className="mt-6 text-center text-xs text-muted">
        {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
        <button type="button" className="font-semibold text-gold underline"
          onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }}>
          {mode === 'login' ? 'Sign up' : 'Login'}
        </button>
      </p>
    </main>
  );
}