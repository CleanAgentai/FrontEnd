import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import Blog from '@/components/Blog';
import FAQ from '@/components/FAQ';
import HowItWorks from '@/components/HowItWorks';
import Stats from '@/components/Stats';
import SignUpPage from '@/pages/auth/SignUpPage';
import LoginPage from '@/pages/auth/LoginPage';
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage';
import PrivacyPolicy from '@/components/PrivacyPolicy';
import CookiePolicy from '@/components/CookiePolicy';
import TermsOfService from '@/components/TermsOfService';
import AboutUs from '@/components/AboutUs';
import BlogPage from '@/pages/BlogPage';
import BlogPost from '@/components/BlogPost';
import Contact from '@/components/Contact';
import { Toaster } from '@/components/ui/toaster';

function LandingPage() {
  return (
    <div className="pt-16">
      <section id="hero">
        <Hero />
      </section>
      
      <section id="how-it-works">
        <HowItWorks />
      </section>

      <section id="stats">
        <Stats />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="features">
        <Features />
      </section>

      <section id="pricing">
        <Pricing />
      </section>

      <section id="testimonials">
        <Testimonials />
      </section>

      <section id="blog">
        <Blog />
      </section>

      <section id="faq">
        <FAQ />
      </section>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
          </Route>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}