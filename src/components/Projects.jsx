import { useState } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, ExternalLink } from 'lucide-react';

const initialProjects = [
  {
    title: 'AI Code Assistant',
    blurb: 'A smart coding partner with natural language and inline suggestions.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop',
    link: '#'
  },
  {
    title: 'Realtime Vision Demo',
    blurb: 'Web-based computer vision prototype with streaming inference.',
    image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1400&auto=format&fit=crop',
    link: '#'
  },
  {
    title: 'Generative Art Studio',
    blurb: 'Playful text-to-art canvas using diffusion models and shaders.',
    image: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=1400&auto=format&fit=crop',
    link: '#'
  }
];

export default function Projects({ lastKey, flash }) {
  const [projects] = useState(initialProjects);

  return (
    <section id="projects" className={`mx-auto max-w-6xl px-6 py-20 sm:py-24 ${flash ? 'ring-2 ring-indigo-500/60 rounded-xl' : ''}`}>
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">Projects</h2>
        <p className="mt-2 text-neutral-400">Hover cards • hint: press a key</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <article key={p.title} className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5">
            <div className="aspect-video w-full overflow-hidden">
              {p.image ? (
                <img src={p.image} alt="Project cover" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-neutral-900"><ImageIcon className="h-8 w-8 text-neutral-600" /></div>
              )}
            </div>
            <div className="p-5">
              <h3 className="text-lg font-medium text-white">{p.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-neutral-300">{p.blurb}</p>
              <div className="mt-4 flex items-center gap-2 text-sm text-indigo-400">
                <a href={p.link} className="inline-flex items-center gap-1 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded">
                  View <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {lastKey && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-sm text-neutral-400">
          Revealed more context — key: <span className="text-white/90">{lastKey === ' ' ? 'Space' : lastKey}</span>
        </motion.div>
      )}
    </section>
  );
}
