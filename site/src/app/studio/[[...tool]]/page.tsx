import { Studio } from './Studio';

export const dynamic = 'force-static';
export { metadata, viewport } from 'next-sanity/studio';

export default function StudioPage() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return (
      <main style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 640, margin: '10vh auto', padding: 24, lineHeight: 1.6 }}>
        <h1>Administración no configurada</h1>
        <p>El portal de administración (Sanity Studio) necesita un proyecto de Sanity. Defina <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> y <code>NEXT_PUBLIC_SANITY_DATASET</code> en las variables de entorno y vuelva a desplegar. Mientras tanto, el sitio usa el contenido local.</p>
        <p>Instrucciones: ver <code>ADMIN_GUIDE.md</code> y <code>README.md</code>.</p>
      </main>
    );
  }
  return <Studio />;
}
