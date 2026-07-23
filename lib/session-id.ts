export function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  let id = localStorage.getItem('uppr_session_id');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('uppr_session_id', id);
  }
  return id;
}
