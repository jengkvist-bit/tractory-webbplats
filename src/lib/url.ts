// Lägger till sajtens bas-adress framför interna länkar.
// Behövs bara när sajten testas på en underadress (t.ex. github.io/tractory-webbplats).
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const url = (p: string) => (p.startsWith('/') && !p.startsWith('//') ? base + p : p);
