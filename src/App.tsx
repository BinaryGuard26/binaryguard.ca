import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Solutions from './pages/Solutions';
import Services from './pages/Services';
import Products from './pages/Products';
import Contact from './pages/Contact';

type Page = 'home' | 'about' | 'services' | 'products' | 'contact' | 'solutions';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const titles: Record<Page, string> = {
      home: 'BinaryGuard – Securing Your Premises',
      about: 'About Us – BinaryGuard',
      solutions: 'Solutions – BinaryGuard',
      services: 'Services – BinaryGuard',
      products: 'Products – BinaryGuard',
      contact: 'Contact Us – BinaryGuard',
    };
    document.title = titles[currentPage];
  }, [currentPage]);

  return (
    <div className="bg-[#030d1f]">
      <Navbar currentPage={currentPage} onNavigate={navigate} />
      {currentPage === 'home' && <Home onNavigate={navigate} />}
      {currentPage === 'about' && <About onNavigate={navigate} />}
      {currentPage === 'solutions' && <Solutions onNavigate={navigate} />}
      {currentPage === 'services' && <Services onNavigate={navigate} />}
      {currentPage === 'products' && <Products onNavigate={navigate} />}
      {currentPage === 'contact' && <Contact onNavigate={navigate} />}
    </div>
  );
}
