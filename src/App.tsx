import { Toaster } from 'sonner';
import { wedding } from './config/wedding';
import { usePreventZoom } from './hooks/usePreventZoom';
import { sectionRegistry } from './sections';

export default function App() {
  usePreventZoom();

  return (
    <>
      <main className="card">
        {wedding.sections.map((key) => {
          const SectionComponent = sectionRegistry[key];
          return <SectionComponent key={key} />;
        })}
      </main>
      <Toaster
        position="bottom-center"
        offset={32}
        mobileOffset={24}
        toastOptions={{
          style: {
            justifyContent: 'center',
            border: 'none',
            borderRadius: '999px',
            background: 'rgb(74 64 64 / 92%)',
            color: '#fff',
            fontFamily: 'var(--font-ko)',
            fontSize: '0.875rem',
          },
        }}
      />
    </>
  );
}
