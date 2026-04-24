import { FormEvent, useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';

type Page = 'home' | 'about' | 'services' | 'products' | 'contact' | 'solutions' | 'feedback';

interface ClientFeedbackFormProps {
  onNavigate: (page: Page) => void;
}

interface FeedbackFormState {
  name: string;
  company: string;
  role: string;
  email: string;
  rating: number;
  message: string;
  consent: boolean;
}

const initialForm: FeedbackFormState = {
  name: '',
  company: '',
  role: '',
  email: '',
  rating: 5,
  message: '',
  consent: false,
};

function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') return error;

  if (error && typeof error === 'object') {
    const message = 'message' in error ? error.message : '';
    const details = 'details' in error ? error.details : '';
    const hint = 'hint' in error ? error.hint : '';

    const parts = [message, details, hint].filter(
      (part) => typeof part === 'string' && part.trim().length > 0
    );

    if (parts.length > 0) return parts.join(' — ');
  }

  return 'Something went wrong while submitting your feedback. Please try again.';
}

export default function ClientFeedbackForm({ onNavigate }: ClientFeedbackFormProps) {
  const [form, setForm] = useState<FeedbackFormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');

    try {
      const payload = {
        name: form.name.trim(),
        company: form.company.trim() || null,
        role: form.role.trim() || null,
        email: form.email.trim() || null,
        rating: Number(form.rating) || 5,
        message: form.message.trim(),
        consent: form.consent,
        approved: false,
        featured: false,
      };

      if (!payload.name) throw new Error('Please enter your full name.');
      if (!payload.message) throw new Error('Please enter your feedback message.');
      if (!payload.consent) throw new Error('Please confirm consent before submitting.');

      const { error } = await supabase.from('client_reviews').insert([payload]);
      if (error) throw error;

      setSubmitted(true);
      setForm(initialForm);
    } catch (error) {
      console.error('Feedback submit error:', error);
      setErrorMessage(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-[28px] border border-white/10 bg-[#061327] p-8 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-400/10">
          <CheckCircle2 size={30} className="text-cyan-300" />
        </div>
        <h2 className="text-2xl font-bold text-white">Thank you for your feedback</h2>
        <p className="mx-auto mt-3 max-w-xl leading-8 text-gray-300">
          Your message has been submitted successfully. After review and approval, it can be featured on the homepage client feedback section.
        </p>
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:bg-cyan-400"
        >
          Return to home
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[28px] border border-white/10 bg-[#061327] p-6 md:p-8">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-200">Full name</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Jane Perera"
            required
            className="w-full rounded-2xl border border-white/10 bg-[#071224] px-4 py-3 text-white outline-none transition focus:border-cyan-400/50"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-200">Company</label>
          <input
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            placeholder="Company name"
            className="w-full rounded-2xl border border-white/10 bg-[#071224] px-4 py-3 text-white outline-none transition focus:border-cyan-400/50"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-200">Role</label>
          <input
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            placeholder="IT Manager"
            className="w-full rounded-2xl border border-white/10 bg-[#071224] px-4 py-3 text-white outline-none transition focus:border-cyan-400/50"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-200">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="name@company.com"
            className="w-full rounded-2xl border border-white/10 bg-[#071224] px-4 py-3 text-white outline-none transition focus:border-cyan-400/50"
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium text-gray-200">Rating</label>
        <select
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
          className="w-full rounded-2xl border border-white/10 bg-[#071224] px-4 py-3 text-white outline-none transition focus:border-cyan-400/50"
        >
          <option value={5}>5 - Excellent</option>
          <option value={4}>4 - Very good</option>
          <option value={3}>3 - Good</option>
          <option value={2}>2 - Fair</option>
          <option value={1}>1 - Poor</option>
        </select>
      </div>

      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium text-gray-200">Feedback</label>
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Tell us about your experience working with BinaryGuard..."
          required
          rows={6}
          className="w-full rounded-2xl border border-white/10 bg-[#071224] px-4 py-3 text-white outline-none transition focus:border-cyan-400/50"
        />
      </div>

      <label className="mt-6 flex items-start gap-3 rounded-2xl border border-white/10 bg-[#071224] px-4 py-4 text-sm text-gray-300">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(e) => setForm({ ...form, consent: e.target.checked })}
          className="mt-1"
          required
        />
        <span>
          I confirm that this feedback is accurate and I consent to it being reviewed for possible publication on the BinaryGuard website.
        </span>
      </label>

      {errorMessage ? <p className="mt-4 text-sm text-red-300">{errorMessage}</p> : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Send size={16} />
          {submitting ? 'Submitting...' : 'Submit feedback'}
        </button>

        <button
          type="button"
          onClick={() => setForm(initialForm)}
          className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
        >
          Clear form
        </button>
      </div>
    </form>
  );
}
