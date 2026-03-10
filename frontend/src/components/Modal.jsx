import { useEffect } from 'react'

export default function Modal({ id, title, onClose, onSave, saveLabel, cancelLabel, children }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,.7)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-lg rounded-lg overflow-hidden"
        style={{ background: 'var(--navy2)', border: '1px solid var(--border)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4"
             style={{ borderBottom: '1px solid var(--border)' }}>
          <h3 className="font-serif text-lg font-medium" style={{ color: 'var(--white)' }}>
            {title}
          </h3>
          <button onClick={onClose}
                  className="text-sm transition-colors"
                  style={{ color: 'var(--muted)' }}
                  onMouseOver={e => e.target.style.color='var(--gold)'}
                  onMouseOut={e => e.target.style.color='var(--muted)'}>
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 max-h-96 overflow-y-auto">
          {children}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4"
             style={{ borderTop: '1px solid var(--border)' }}>
          <button onClick={onClose}
                  className="px-4 py-2 text-sm rounded transition-all"
                  style={{ border: '1px solid var(--border)', color: 'var(--muted)', background: 'transparent' }}
                  onMouseOver={e => e.currentTarget.style.borderColor='var(--gold)'}
                  onMouseOut={e => e.currentTarget.style.borderColor='var(--border)'}>
            {cancelLabel}
          </button>
          <button onClick={onSave}
                  className="px-4 py-2 text-sm rounded font-medium transition-all"
                  style={{ background: 'var(--gold)', color: 'var(--navy)' }}
                  onMouseOver={e => e.currentTarget.style.background='var(--gold2)'}
                  onMouseOut={e => e.currentTarget.style.background='var(--gold)'}>
            {saveLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

// Reusable form field components
export function FormField({ label, children }) {
  return (
    <div className="mb-4">
      <label className="block text-xs uppercase tracking-wider mb-1.5"
             style={{ color: 'var(--muted)' }}>
        {label}
      </label>
      {children}
    </div>
  )
}

export function FormInput({ ...props }) {
  return (
    <input
      className="w-full px-3 py-2 rounded text-sm outline-none transition-all"
      style={{
        background: 'rgba(248,246,241,.04)', border: '1px solid rgba(248,246,241,.1)',
        color: 'var(--white)', fontFamily: 'inherit',
      }}
      onFocus={e => e.target.style.borderColor='var(--gold)'}
      onBlur={e => e.target.style.borderColor='rgba(248,246,241,.1)'}
      {...props}
    />
  )
}

export function FormSelect({ children, ...props }) {
  return (
    <select
      className="w-full px-3 py-2 rounded text-sm outline-none transition-all"
      style={{
        background: 'var(--navy2)', border: '1px solid rgba(248,246,241,.1)',
        color: 'var(--white)', fontFamily: 'inherit',
      }}
      onFocus={e => e.target.style.borderColor='var(--gold)'}
      onBlur={e => e.target.style.borderColor='rgba(248,246,241,.1)'}
      {...props}
    >
      {children}
    </select>
  )
}
