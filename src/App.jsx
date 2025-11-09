import { useEffect, useRef, useState } from 'react';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

export default function App() {
  const [lastKey, setLastKey] = useState(null);
  const [flashSection, setFlashSection] = useState(null);
  const flashTimer = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      setLastKey(e.key);
      // Cycle flash between sections to draw attention subtly
      setFlashSection((prev) => {
        if (prev === 'skills') return 'projects';
        if (prev === 'projects') return 'contact';
        return 'skills';
      });

      // Clear any existing timer
      if (flashTimer.current) clearTimeout(flashTimer.current);
      // Remove flash highlight after a short delay
      flashTimer.current = setTimeout(() => setFlashSection(null), 800);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (flashTimer.current) clearTimeout(flashTimer.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-indigo-500/30 selection:text-white">
      <Hero lastKey={lastKey} />
      <Skills lastKey={lastKey} flash={flashSection === 'skills'} />
      <Projects lastKey={lastKey} flash={flashSection === 'projects'} />
      <Contact lastKey={lastKey} flash={flashSection === 'contact'} />
      <footer className="py-10 text-center text-neutral-400 text-sm">
        Built with care — hint: press a key
        {lastKey ? (
          <span className="ml-2 inline-flex items-center rounded-full bg-neutral-800/70 px-2 py-1 text-xs text-neutral-200">
            last key: {lastKey === ' ' ? 'Space' : lastKey}
          </span>
        ) : null}
      </footer>
    </div>
  );
}
