import Link from 'next/link';
import { ArrowRight, Mail, MessageCircle } from 'lucide-react';

export default function CTASection() {
  return (
    <section className='relative max-w-5xl mx-auto px-4 py-20 overflow-hidden'>
      {/* Animated background */}
      <div className='absolute inset-0 bg-linear-to-r from-primary/10 via-accent/10 to-secondary/10 rounded-3xl blur-3xl -z-10' />
      <div className='absolute inset-0 bg-[linear-linear(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[3rem_3rem] -z-10 rounded-3xl' />

      <div className='relative glass rounded-3xl p-12 lg:p-16 border border-accent/30 overflow-hidden'>
        {/* Gradient overlay */}
        <div className='absolute top-0 right-0 w-96 h-96 bg-linear-to-bl from-primary/20 to-transparent rounded-full blur-3xl -z-10' />
        <div className='absolute bottom-0 left-0 w-96 h-96 bg-linear-to-tr from-accent/20 to-transparent rounded-full blur-3xl -z-10' />

        <div className='relative text-center space-y-8'>
          {/* Badge */}
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-accent/20'>
            <span className='relative flex h-2 w-2'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75'></span>
              <span className='relative inline-flex rounded-full h-2 w-2 bg-accent'></span>
            </span>
            <span className='text-sm font-semibold text-accent'>
              Let's Work Together
            </span>
          </div>

          {/* Heading */}
          <div className='space-y-4'>
            <h2 className='text-4xl lg:text-5xl font-bold'>
              Ready to Start{' '}
              <span className='bg-linear-to-r from-primary via-accent to-secondary bg-clip-text text-transparent'>
                Your Project?
              </span>
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed'>
              Whether you need a scalable application, technical training, or
              product consultation, I'm here to help bring your vision to life.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className='flex flex-wrap justify-center gap-4 pt-4'>
            <Link
              href='/contact'
              className='group px-8 py-4 bg-linear-to-r from-primary to-secondary text-primary-foreground rounded-xl hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 font-semibold inline-flex items-center gap-2'
            >
              <Mail className='w-5 h-5' />
              Get In Touch
              <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
            </Link>
            <Link
              href='/portfolio'
              className='group px-8 py-4 glass text-foreground rounded-xl hover:border-accent hover:shadow-2xl hover:shadow-accent/20 hover:-translate-y-1 transition-all duration-300 font-semibold inline-flex items-center gap-2'
            >
              <MessageCircle className='w-5 h-5' />
              View My Work
            </Link>
          </div>

          {/* Stats */}
          <div className='grid grid-cols-3 gap-8 pt-12 max-w-xl mx-auto border-t border-border/50'>
            <div className='space-y-1'>
              <div className='text-2xl font-bold text-primary'>24h</div>
              <div className='text-xs text-muted-foreground'>Response Time</div>
            </div>
            <div className='space-y-1'>
              <div className='text-2xl font-bold text-accent'>100%</div>
              <div className='text-xs text-muted-foreground'>
                Client Satisfaction
              </div>
            </div>
            <div className='space-y-1'>
              <div className='text-2xl font-bold text-secondary'>7+</div>
              <div className='text-xs text-muted-foreground'>
                Years Experience
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
