import Link from 'next/link';
import { AnimatedRole } from './animated-role';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

export default function Hero() {
  return (
    <section className='relative max-w-5xl mx-auto px-4 py-20 lg:py-32 text-center overflow-hidden'>
      {/* Animated background elements */}
      <div className='absolute -top-40 -right-40 w-96 h-96 bg-linear-to-br from-primary/30 to-secondary/30 rounded-full blur-3xl animate-pulse opacity-40' />
      <div
        className='absolute -bottom-40 -left-40 w-96 h-96 bg-linear-to-tr from-accent/30 to-primary/30 rounded-full blur-3xl animate-pulse opacity-40'
        style={{ animationDelay: '1s' }}
      />

      {/* Grid pattern overlay */}
      <div className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_at_center,black,transparent_70%)] -z-10' />

      <div className='relative space-y-10'>
        {/* Greeting with badge style */}
        <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-accent/20 animate-fade-in'>
          <span className='relative flex h-3 w-3'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75'></span>
            <span className='relative inline-flex rounded-full h-3 w-3 bg-accent'></span>
          </span>
          <p className='text-sm text-accent font-semibold'>
            Open for collaboration
          </p>
        </div>

        {/* Main heading */}
        <div className='space-y-4'>
          <p
            className='text-xl text-muted-foreground font-medium animate-fade-in'
            style={{ animationDelay: '0.1s' }}
          >
            Hi, I'm Jution Candra Kirana 👋
          </p>
          <div className='animate-fade-in' style={{ animationDelay: '0.2s' }}>
            <AnimatedRole />
          </div>
          <p
            className='text-2xl lg:text-3xl font-bold bg-linear-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-fade-in'
            style={{ animationDelay: '0.3s' }}
          >
            Empowering Developers Through Technology
          </p>
        </div>

        {/* Description */}
        <p
          className='text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto animate-fade-in'
          style={{ animationDelay: '0.4s' }}
        >
          With{' '}
          <span className='text-primary font-semibold'>
            7+ years of experience
          </span>
          , I lead teams at Enigma Camp and Sobat Psikotes, specializing in
          backend development, cloud-native solutions, and mentoring the next
          generation of developers. Passionate about building scalable
          applications and driving digital transformation.
        </p>

        {/* CTA Buttons */}
        <div
          className='flex flex-wrap justify-center gap-4 pt-4 animate-fade-in'
          style={{ animationDelay: '0.5s' }}
        >
          <Link
            href='/portfolio'
            className='group px-8 py-4 bg-linear-to-r from-primary to-secondary text-primary-foreground rounded-xl hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 font-semibold flex items-center gap-2'
          >
            View My Work
            <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
          </Link>
          <Link
            href='/contact'
            className='group px-8 py-4 glass text-foreground rounded-xl hover:border-accent hover:shadow-2xl hover:shadow-accent/20 hover:-translate-y-1 transition-all duration-300 font-semibold flex items-center gap-2'
          >
            <Mail className='w-4 h-4' />
            Get In Touch
          </Link>
        </div>

        {/* Social Links */}
        <div
          className='flex justify-center gap-4 pt-4 animate-fade-in'
          style={{ animationDelay: '0.6s' }}
        >
          <a
            href='https://github.com/jutioncandrakirana'
            target='_blank'
            rel='noopener noreferrer'
            className='p-3 glass rounded-lg hover:border-accent hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-1 transition-all duration-300 group'
          >
            <Github className='w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors' />
          </a>
          <a
            href='https://linkedin.com/in/jutioncandrakirana'
            target='_blank'
            rel='noopener noreferrer'
            className='p-3 glass rounded-lg hover:border-accent hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-1 transition-all duration-300 group'
          >
            <Linkedin className='w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors' />
          </a>
        </div>

        {/* Stats */}
        <div
          className='grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto animate-fade-in'
          style={{ animationDelay: '0.7s' }}
        >
          {[
            { value: '7+', label: 'Years Experience', suffix: '' },
            { value: '500+', label: 'Developers Trained', suffix: '' },
            { value: '10+', label: 'Products Delivered', suffix: '' },
          ].map((stat, i) => (
            <div key={i} className='relative group'>
              <div className='absolute inset-0 bg-linear-to-br from-primary/10 to-accent/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
              <div className='relative glass rounded-xl p-6 hover:border-accent/50 transition-all duration-300'>
                <div className='text-4xl lg:text-5xl font-bold bg-linear-to-br from-primary to-accent bg-clip-text text-transparent mb-2'>
                  {stat.value}
                </div>
                <div className='text-sm text-muted-foreground font-medium'>
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
