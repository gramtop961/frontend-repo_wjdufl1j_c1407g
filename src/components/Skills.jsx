import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Brain, Code, Database, Zap } from 'lucide-react';

const skills = [
  {
    icon: Cpu,
    name: 'Frontend Engineering',
    details: 'React, Vite, TypeScript, Tailwind, accessibility-first UI, component systems.'
  },
  {
    icon: Brain,
    name: 'Machine Learning',
    details: 'Python, PyTorch, transformers, data pipelines, prompt engineering.'
  },
  {
    icon: Code,
    name: 'Backend & APIs',
    details: 'FastAPI, Node, REST, auth, performance, testing, observability.'
  },
  {
    icon: Database,
    name: 'Data & Cloud',
    details: 'MongoDB, Postgres, Docker, CI/CD, serverless, cloud runtimes.'
  }
];

export default function Skills({ lastKey, flash }) {
  const [active, setActive] = useState(0);

  return (
    <section id="skills" className={`relative mx-auto max-w-6xl px-6 py-20 sm:py-24 ${flash ? 'ring-2 ring-indigo-500/60 rounded-xl' : ''}`}>
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">Skills</h2>
          <p className="mt-2 text-neutral-400">Tap to expand • hint: press a key</p>
        </div>
        <Zap className="h-5 w-5 text-indigo-400" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((s, i) => (
          <button
            key={s.name}
            onClick={() => setActive(i)}
            className={`group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-5 text-left outline-none transition duration-300 hover:translate-y-[-2px] hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-indigo-500 ${active === i ? 'ring-2 ring-indigo-500/60' : ''}`}
            aria-expanded={active === i}
          >
            <div className="flex items-center gap-3">
              <s.icon className="h-5 w-5 text-indigo-400" aria-hidden />
              <span className="font-medium text-white">{s.name}</span>
            </div>
            <AnimatePresence initial={false}>
              {active === i && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="mt-3 text-sm leading-6 text-neutral-300"
                >
                  {s.details}
                </motion.p>
              )}
            </AnimatePresence>
          </button>
        ))}
      </div>

      {lastKey && (
        <div className="mt-6 text-sm text-neutral-400">Key detected → <span className="text-white/90">{lastKey === ' ' ? 'Space' : lastKey}</span></div>
      )}
    </section>
  );
}
