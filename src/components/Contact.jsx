import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail } from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function Contact({ lastKey, flash }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: 'idle', msg: '' });

  useEffect(() => {
    if (!lastKey) return;
    // Subtle pulse on key interaction
    const el = document.getElementById('contact-card');
    if (!el) return;
    el.classList.remove('ring-2');
    void el.offsetWidth; // reflow to restart animation
    el.classList.add('ring-2');
    const t = setTimeout(() => el.classList.remove('ring-2'), 400);
    return () => clearTimeout(t);
  }, [lastKey]);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ type: 'loading', msg: 'Sending…' });
    try {
      const res = await fetch(`${BACKEND_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || 'Failed to send');
      setStatus({ type: 'success', msg: 'Thanks! I will get back to you shortly.' });
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', msg: err.message });
    }
  }

  return (
    <section id="contact" className={`mx-auto max-w-4xl px-6 py-20 sm:py-24 ${flash ? 'ring-2 ring-indigo-500/60 rounded-xl' : ''}`}>
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">Let's Work Together</h2>
        <p className="mt-2 text-neutral-400">Email directly or send a message • hint: press a key</p>
      </div>

      <div id="contact-card" className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl ring-indigo-500/60">
        <div className="mb-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
          <a href="mailto:hello@example.com" className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <Mail className="h-4 w-4 text-indigo-400" /> hello@example.com
          </a>
          {status.type !== 'idle' && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-sm ${status.type === 'success' ? 'text-emerald-400' : status.type === 'error' ? 'text-rose-400' : 'text-indigo-300'}`}>
              {status.msg}
            </motion.span>
          )}
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-neutral-300" htmlFor="name">Name</label>
            <input
              id="name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full rounded-md border border-white/10 bg-neutral-900/60 px-3 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Ada Lovelace"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-neutral-300" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full rounded-md border border-white/10 bg-neutral-900/60 px-3 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@domain.com"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm text-neutral-300" htmlFor="message">Message</label>
            <textarea
              id="message"
              rows="5"
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className="w-full rounded-md border border-white/10 bg-neutral-900/60 px-3 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Tell me about your project, goals, or timeline…"
              required
            />
          </div>
          <div className="sm:col-span-2 flex items-center justify-between">
            <p className="text-xs text-neutral-500">By submitting, you agree to be contacted back. Accessible and mobile-friendly.</p>
            <button type="submit" className="inline-flex items-center gap-2 rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-indigo-500">
              <Send className="h-4 w-4" /> Send
            </button>
          </div>
        </form>
      </div>

      {lastKey && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-center text-sm text-neutral-400">
          Keyboard active — key: <span className="text-white/90">{lastKey === ' ' ? 'Space' : lastKey}</span>
        </motion.div>
      )}
    </section>
  );
}
