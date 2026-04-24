import { Wrench } from 'lucide-react';
import Footer from '../components/Footer';

type Page = 'home' | 'about' | 'services' | 'products' | 'contact' | 'solutions';

interface ProductsProps {
  onNavigate: (page: Page) => void;
}

export default function Products({ onNavigate }: ProductsProps) {
  return (
    <div className="bg-[#030d1f] min-h-screen flex flex-col">
      <section className="relative flex-1 flex flex-col items-center justify-center pt-16 min-h-[80vh]">
        <div className="absolute inset-0 z-0">
          <img src="/Products.jpg" alt="Products" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-[#030d1f]/75" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8">
          <span className="inline-block border border-white/30 text-white/70 text-xs tracking-widest px-3 py-1 mb-8">PRODUCTS</span>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center py-16 px-6 text-center flex-1">
          <div className="bg-yellow-400 border-4 border-yellow-600 rounded-2xl p-10 max-w-sm w-full shadow-2xl">
            <div className="flex justify-center gap-4 mb-4">
              <Wrench size={48} className="text-yellow-900 -rotate-45" />
              <Wrench size={48} className="text-yellow-900 rotate-45" />
            </div>
            <h2 className="text-yellow-900 font-extrabold text-2xl tracking-widest leading-tight mb-1">PAGE IS UNDER</h2>
            <h3 className="text-yellow-900 font-extrabold text-2xl tracking-widest">CONSTRUCTION</h3>
            <div className="mt-4 h-3 bg-yellow-900 rounded" style={{ background: 'repeating-linear-gradient(45deg, #000 0, #000 10px, #ffcc00 10px, #ffcc00 20px)' }} />
          </div>
          <p className="text-gray-400 text-sm mt-8 max-w-md">
            We're working hard to bring you an amazing product catalogue. Check back soon or{' '}
            <button
              onClick={() => onNavigate('contact')}
              className="text-cyan-400 hover:text-cyan-300 transition-colors underline"
            >
              contact us
            </button>{' '}
            to learn about our current product offerings.
          </p>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
