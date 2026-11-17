import { useNavigate } from 'react-router-dom';

export default function StepHeader({ title, step }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="mb-2 flex items-center gap-3 text-[11px] font-semibold tracking-[2px] text-cream">
        <button type="button" className="icon-btn" onClick={() => navigate(-1)} aria-label="Back">←</button>
        <span className="font-bold">{title}</span>
        <span className="ml-auto text-muted">{step} / 3</span>
      </div>
      <div className="mb-6 h-[3px] w-full overflow-hidden rounded bg-coffee-600/60">
        <div className="h-full bg-gold transition-all" style={{ width: `${(step / 3) * 100}%` }} />
      </div>
    </>
  );
}
