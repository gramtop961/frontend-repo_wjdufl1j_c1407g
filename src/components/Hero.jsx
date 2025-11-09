import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { Rocket } from 'lucide-react';

export default function Hero({ lastKey }) {
  return (
    <section className="relative flex min-h-[80vh] w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-neutral-950/40 to-neutral-950"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-200 backdrop-blur"
        >
          <Rocket className="h-3.5 w-3.5 text-indigo-400" />
          AI & Tech Enthusiast — building thoughtful experiences
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          Hello, I craft smart, modern interfaces
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mx-auto mt-4 max-w-2xl text-base text-neutral-300 md:text-lg"
        >
          Blending AI, engineering, and design to ship fast, accessible, and delightful products.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-8 flex items-center justify-center gap-3 text-sm text-neutral-400"
        >
          <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-white/80">
            hint: press a key
          </span>
          {lastKey && (
            <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-neutral-300">
              you pressed: <strong className="ml-1 text-white">{lastKey === ' ' ? 'Space' : lastKey}</strong>
            </span>
          )}
        </motion.div>
      </div>
    </section>
  );
}
