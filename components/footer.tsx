import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className='border-t border-border mt-16 py-8 px-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
          <p className='text-muted-foreground text-sm text-center sm:text-left'>
            © 2025 Tech Edu & Full-Stack Developer. All rights reserved.
          </p>

          <div className='flex items-center gap-6'>
            <a
              href='https://github.com/jutionck'
              target='_blank'
              rel='noopener noreferrer'
              className='text-muted-foreground hover:text-primary transition-colors'
              aria-label='GitHub'
            >
              <Github size={20} />
            </a>
            <a
              href='https://linkedin.com/in/jutionck'
              target='_blank'
              rel='noopener noreferrer'
              className='text-muted-foreground hover:text-primary transition-colors'
              aria-label='LinkedIn'
            >
              <Linkedin size={20} />
            </a>
            <a
              href='mailto:jutionck@gmail.com'
              className='text-muted-foreground hover:text-primary transition-colors'
              aria-label='Email'
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
