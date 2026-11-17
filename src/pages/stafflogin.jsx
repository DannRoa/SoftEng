import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { staffLogin } from '../lib/livestore.js';

export default function StaffLogin() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    try {
      staffLogin(id, pin);
      navigate('/staff');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-[420px] flex-col justify-center px-5 py-10">
      <Link to="/" className="icon-btn mb-8" aria-label="Back">←</Link>
      <h1 className="font-serif text-4xl tracking-[6px]">CAPO</h1>
      <p className="mb-8 mt-1 text-[11px] font-semibold tracking-[4px] text-gold">STAFF LOGIN</p>

      <form onSubmit={submit}>
        <div className="mb-4">
          <label className="label">STAFF ID</label>
          <input className="field" required placeholder="e.g. marco" value={id} onChange={(e) => setId(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="label">PIN</label>
          <input className="field" type="password" required placeholder="••••" value={pin} onChange={(e) => setPin(e.target.value)} />
        </div>

        {error && <p className="mb-4 rounded-lg border border-red-400/40 bg-red-400/10 px-3 py-2 text-xs text-red-300">{error}</p>}

        <button type="submit" className="btn-gold mt-2">LOGIN</button>
      </form>

      <p className="mt-6 text-center text-[11px] text-muted/70">Demo: ID <b>marco</b> · PIN <b>1234</b></p>
    </main>
  );
}