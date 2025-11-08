import type { Metadata } from 'next';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Mail, Linkedin, Github, Phone, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch for collaboration opportunities in development, training, or mentorship. Available for freelance projects and corporate training programs.',
};

export default function ContactPage() {
  return (
    <main id="main-content" className='min-h-screen bg-background'>
      <Header />

      {/* Hero Section */}
      <section className='relative max-w-6xl mx-auto px-4 py-16 lg:py-24 text-center overflow-hidden'>
        {/* Background elements */}
        <div className='absolute top-0 right-0 w-96 h-96 bg-linear-to-bl from-primary/20 to-transparent rounded-full blur-3xl -z-10' />
        <div className='absolute bottom-0 left-0 w-96 h-96 bg-linear-to-tr from-accent/20 to-transparent rounded-full blur-3xl -z-10' />

        <div className='space-y-6 mb-16'>
          {/* Badge */}
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20'>
            <Mail className='w-4 h-4 text-primary' />
            <span className='text-sm font-semibold text-primary'>
              Let's Connect
            </span>
          </div>

          {/* Title */}
          <h1 className='text-5xl lg:text-6xl font-bold'>
            Get In{' '}
            <span className='bg-linear-to-r from-primary via-accent to-secondary bg-clip-text text-transparent'>
              Touch
            </span>
          </h1>

          {/* Description */}
          <p className='text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
            Have a project in mind? Let's connect and build something amazing
            together. Whether it's{' '}
            <span className='text-primary font-semibold'>
              development, training, or mentorship
            </span>{' '}
            - I'm ready to collaborate.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className='max-w-4xl mx-auto px-4 py-8 pb-16'>
        <h2 className='text-2xl font-bold text-foreground mb-6'>
          Contact Information
        </h2>

        <div className='space-y-4'>
          {/* Email Card */}
          <a
            href='mailto:jutionck@gmail.com'
            className='group relative overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1 block'
          >
            <div className='absolute inset-0 bg-linear-to-br from-primary via-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl' />
            <div className='relative glass rounded-2xl p-6 border-2 border-border/50 group-hover:border-primary/50 transition-all duration-500'>
              <div className='flex items-center gap-4'>
                <div className='p-3 rounded-xl bg-linear-to-br from-primary/10 to-accent/10 group-hover:scale-110 transition-transform duration-300'>
                  <Mail className='w-6 h-6 text-primary' />
                </div>
                <div>
                  <h3 className='font-bold text-foreground mb-1'>Email</h3>
                  <p className='text-primary font-medium'>jutionck@gmail.com</p>
                </div>
              </div>
            </div>
          </a>

          {/* Phone Card */}
          <a
            href='tel:+6282180221160'
            className='group relative overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1 block'
          >
            <div className='absolute inset-0 bg-linear-to-br from-primary via-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl' />
            <div className='relative glass rounded-2xl p-6 border-2 border-border/50 group-hover:border-primary/50 transition-all duration-500'>
              <div className='flex items-center gap-4'>
                <div className='p-3 rounded-xl bg-linear-to-br from-primary/10 to-accent/10 group-hover:scale-110 transition-transform duration-300'>
                  <Phone className='w-6 h-6 text-primary' />
                </div>
                <div>
                  <h3 className='font-bold text-foreground mb-1'>Phone</h3>
                  <p className='text-primary font-medium'>+62 821-8022-1160</p>
                </div>
              </div>
            </div>
          </a>

          {/* GitHub Card */}
          <a
            href='https://github.com/jutionck'
            target='_blank'
            rel='noopener noreferrer'
            className='group relative overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1 block'
          >
            <div className='absolute inset-0 bg-linear-to-br from-primary via-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl' />
            <div className='relative glass rounded-2xl p-6 border-2 border-border/50 group-hover:border-primary/50 transition-all duration-500'>
              <div className='flex items-center gap-4'>
                <div className='p-3 rounded-xl bg-linear-to-br from-primary/10 to-accent/10 group-hover:scale-110 transition-transform duration-300'>
                  <Github className='w-6 h-6 text-primary' />
                </div>
                <div>
                  <h3 className='font-bold text-foreground mb-1'>GitHub</h3>
                  <p className='text-primary font-medium'>
                    github.com/jutionck
                  </p>
                </div>
              </div>
            </div>
          </a>

          {/* LinkedIn Card */}
          <a
            href='https://linkedin.com/in/jutionck'
            target='_blank'
            rel='noopener noreferrer'
            className='group relative overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1 block'
          >
            <div className='absolute inset-0 bg-linear-to-br from-primary via-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl' />
            <div className='relative glass rounded-2xl p-6 border-2 border-border/50 group-hover:border-primary/50 transition-all duration-500'>
              <div className='flex items-center gap-4'>
                <div className='p-3 rounded-xl bg-linear-to-br from-primary/10 to-accent/10 group-hover:scale-110 transition-transform duration-300'>
                  <Linkedin className='w-6 h-6 text-primary' />
                </div>
                <div>
                  <h3 className='font-bold text-foreground mb-1'>LinkedIn</h3>
                  <p className='text-primary font-medium'>
                    linkedin.com/in/jutionck
                  </p>
                </div>
              </div>
            </div>
          </a>

          {/* Location Card */}
          <div className='group relative overflow-hidden rounded-2xl transition-all duration-500'>
            <div className='relative glass rounded-2xl p-6 border-2 border-border/50 transition-all duration-500'>
              <div className='flex items-center gap-4'>
                <div className='p-3 rounded-xl bg-linear-to-br from-secondary/10 to-accent/10'>
                  <MapPin className='w-6 h-6 text-secondary' />
                </div>
                <div>
                  <h3 className='font-bold text-foreground mb-1'>Location</h3>
                  <p className='text-secondary font-medium'>
                    Jakarta Selatan, Indonesia
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
