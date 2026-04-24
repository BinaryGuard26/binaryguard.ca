import { ArrowLeft, MessageSquareText } from 'lucide-react';
import ClientFeedbackForm from '../components/ClientFeedbackForm';

type Page = 'home' | 'about' | 'services' | 'products' | 'contact' | 'solutions' | 'feedback';

interface FeedbackPageProps {
  onNavigate: (page: Page) => void;
}

export default function FeedbackPage({ onNavigate }: FeedbackPageProps) {
  return (
    <main className="min-h-screen bg-[#030d1f] px-5 pb-16 pt-24 text-white">
      <div className="mx-auto max-w-5xl">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          <ArrowLeft size={16} />
          Back to home
        </button>

        <section className="mb-8 rounded-[28px] border border-cyan-400/20 bg-cyan-400/10 p-6 md:p-8">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
            <MessageSquareText size={22} />
          </div>
          <span className="text-sm font-semibold tracking-[0.22em] text-cyan-300">CLIENT FEEDBACK</span>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight text-white md:text-4xl">
            Share your experience with BinaryGuard
          </h1>
          <p className="mt-4 max-w-3xl leading-8 text-gray-300">
            This page is intentionally kept out of the main navigation. Submit your feedback here and approved reviews can later appear in the homepage client feedback section.
          </p>
        </section>

        <ClientFeedbackForm onNavigate={onNavigate} />
      </div>
    </main>
  );
}
