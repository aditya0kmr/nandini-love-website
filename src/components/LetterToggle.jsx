import './LetterToggle.css';

export default function LetterToggle({ mode, onModeChange }) {
  return (
    <div className="letter-toggle-pill">
      <button
        onClick={() => onModeChange('sweet')}
        className={`toggle-btn ${mode === 'sweet' ? 'active' : 'inactive'}`}
      >
        💖 Love Letters
      </button>
      <button
        onClick={() => onModeChange('flirty')}
        className={`toggle-btn ${mode === 'flirty' ? 'active' : 'inactive'}`}
      >
        😏 Flirty Letters
      </button>
    </div>
  );
}
