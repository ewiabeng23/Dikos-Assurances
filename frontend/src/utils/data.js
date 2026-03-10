// Sample data — will be replaced by real API calls in production

export const sampleClients = [
  { id:1, name:'Martin Essomba',    phone:'+237 677 111 222', email:'m.essomba@email.com', type:'Auto',       status:'active',   premium:185000, policyNo:'POL-2025-001', start:'2025-01-10', expiry:'2026-01-10' },
  { id:2, name:'Carine Mballa',     phone:'+237 699 333 444', email:'c.mballa@email.com',  type:'Habitation',  status:'expiring', premium:95000,  policyNo:'POL-2025-002', start:'2024-03-15', expiry:'2025-03-22' },
  { id:3, name:'Jean-Pierre Nkodo', phone:'+237 655 555 666', email:'jp.nkodo@email.com',  type:'Santé',       status:'active',   premium:220000, policyNo:'POL-2025-003', start:'2025-02-01', expiry:'2026-02-01' },
  { id:4, name:'Fatima Bello',      phone:'+237 690 777 888', email:'f.bello@email.com',   type:'Vie',         status:'expiring', premium:300000, policyNo:'POL-2025-004', start:'2024-03-20', expiry:'2025-03-20' },
  { id:5, name:'Samuel Fouda',      phone:'+237 672 999 000', email:'s.fouda@email.com',   type:'Auto',        status:'expired',  premium:160000, policyNo:'POL-2024-005', start:'2024-02-01', expiry:'2025-02-28' },
  { id:6, name:'Alice Tagne',       phone:'+237 698 123 456', email:'a.tagne@email.com',   type:'Auto',        status:'active',   premium:175000, policyNo:'POL-2025-006', start:'2025-03-01', expiry:'2026-03-01' },
  { id:7, name:'Paul Ngono',        phone:'+237 677 654 321', email:'p.ngono@email.com',   type:'Habitation',  status:'expiring', premium:88000,  policyNo:'POL-2025-007', start:'2024-03-25', expiry:'2025-03-28' },
]

export function daysUntil(dateStr) {
  const today = new Date(); today.setHours(0,0,0,0)
  return Math.ceil((new Date(dateStr) - today) / 86400000)
}

export function fmtDate(s, locale = 'fr-FR') {
  return new Date(s).toLocaleDateString(locale, { day:'2-digit', month:'2-digit', year:'numeric' })
}

export function fmtXAF(n) {
  return Number(n).toLocaleString('fr-FR') + ' XAF'
}
