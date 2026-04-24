import { ArrowLeft, MessageSquareQuote } from 'lucide-react';
import ClientFeedbackForm from '../components/ClientFeedbackForm';

type Page = 'home' | 'about' | 'services' | 'products' | 'contact' | 'solutions' | 'feedback';

interface FeedbackPageProps {
  onNavigate: (page: Page) => void;
}

export default function FeedbackPage({ onNavigate }: FeedbackPageProps) {
  return (
    <div className="min-h-screen bg-[#030d1f] pt-28 pb-16">
      <div className="mx-auto max-w-4xl px-6">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 transition hover:bg-white/10"
        >
          <ArrowLeft size={16} />
          Back to home
        </button>

        <div className="mb-8 rounded-[28px] border border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 via-white/5 to-cyan-500/10 p-8">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10">
            <MessageSquareQuote size={24} className="text-cyan-300" />
          </div>
          <span className="text-sm font-semibold tracking-[0.22em] text-cyan-400">CLIENT FEEDBACK</span>
          <h1 className="mt-3 text-3xl font-extrabold text-white md:text-4xl">Share your experience with BinaryGuard</h1>
          <p className="mt-4 max-w-2xl leading-8 text-gray-300">
            This page is intentionally kept out of the main navigation. Submit your feedback here and approved reviews can later appear in the homepage client feedback section.
          </p>
        </div>

        <ClientFeedbackForm onNavigate={onNavigate} />
      </div>
    </div>
  );
}
