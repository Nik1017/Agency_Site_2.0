import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import BackgroundEffects from '@/components/BackgroundEffects';
import SmoothScroll from '@/components/SmoothScroll';
import Hero from '@/components/Hero';
import Logos from '@/components/Logos';
import Services from '@/components/Services';
import FeaturesCarousel from '@/components/FeaturesCarousel';
import Work from '@/components/Work';
import Process from '@/components/Process';
import WhyUs from '@/components/WhyUs';
import Stats from '@/components/Stats';
import Testimonials from '@/components/Testimonials';
import About from '@/components/About';
import CTA from '@/components/CTA';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen overflow-hidden">
        <BackgroundEffects />
        <CustomCursor />
        <Navbar />
        <main className="relative z-10 w-full">
          <Hero />
          <Logos />
          <Services />
          {/* <FeaturesCarousel /> */}
          <Work />
          <Process />
          <WhyUs />
          <Stats />
          <Testimonials />
          {/* <About /> */}
          <CTA />
          <ContactForm />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}

