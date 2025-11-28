import Link from 'next/link';
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Terminal,
  Server,
} from 'lucide-react';

export default function Hero() {
  return (
    <section
      id='home'
      className='relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-background'
    >
      {/* Grid Background */}
      <div className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[4rem_4rem] pointer-events-none' />
      <div className='absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent pointer-events-none' />

      <div className='max-w-6xl mx-auto px-6 relative z-10 w-full'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          {/* Text Content */}
          <div className='flex flex-col items-start'>
            <div className='font-mono text-xs text-primary mb-6 flex items-center gap-2 bg-primary/10 px-3 py-1 rounded border border-primary/20'>
              <span className='relative flex h-2 w-2'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75'></span>
                <span className='relative inline-flex rounded-full h-2 w-2 bg-primary'></span>
              </span>
              SYSTEM STATUS: ONLINE
            </div>

            <h1 className='text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight leading-[1.1]'>
              Jution Candra <br />
              <span className='text-muted-foreground'>Kirana.</span>
            </h1>

            <div className='h-px w-20 bg-border mb-8'></div>

            <p className='text-lg md:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed font-light'>
              Senior Trainer at{' '}
              <strong className='text-foreground'>Enigma Camp</strong> with 7+
              years of experience in backend, frontend, and cloud-native
              development. Founder of{' '}
              <strong className='text-foreground'>MIPDEVP</strong> and{' '}
              <strong className='text-foreground'>Sobat Psikotes</strong>,
              delivering scalable apps and digital solutions for businesses and
              organizations. Passionate about building systems and developing
              future tech talent.
            </p>

            <div className='flex flex-wrap gap-4'>
              <Link
                href='#portfolio'
                className='px-6 py-3 bg-foreground text-background font-semibold text-sm rounded hover:bg-foreground/90 transition-all flex items-center gap-2'
              >
                View Projects <ArrowRight className='w-4 h-4' />
              </Link>
              <div className='flex items-center gap-2 border-l border-border pl-4 ml-2'>
                <SocialLink
                  href='https://github.com/jutionck'
                  icon={<Github className='w-5 h-5' />}
                />
                <SocialLink
                  href='https://linkedin.com/in/jutionck'
                  icon={<Linkedin className='w-5 h-5' />}
                />
                <SocialLink
                  href='mailto:jutionck@gmail.com'
                  icon={<Mail className='w-5 h-5' />}
                />
              </div>
            </div>
          </div>

          {/* Visual/Code Block */}
          <div className='hidden lg:block relative'>
            <div className='absolute -inset-1 bg-linear-to-r from-primary to-secondary rounded-lg blur opacity-20'></div>
            <div className='relative bg-card border border-border rounded-lg overflow-hidden shadow-2xl'>
              <div className='flex items-center justify-between px-4 py-3 bg-muted border-b border-border'>
                <div className='flex gap-2'>
                  <div className='w-3 h-3 rounded-full bg-destructive/20 border border-destructive/50'></div>
                  <div className='w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50'></div>
                  <div className='w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50'></div>
                </div>
                <div className='text-[10px] font-mono text-muted-foreground'>
                  jutioncandrakirana.json
                </div>
              </div>
              <div className='p-6 font-mono text-sm leading-relaxed text-muted-foreground'>
                <div className='text-primary mb-2'>
                  import{' '}
                  <span className='text-foreground'>&quot;expertise&quot;</span>
                </div>
                <div className='mb-4'>
                  <span className='text-secondary'>const</span>{' '}
                  <span className='text-yellow-500'>Engineer</span> = {`{`}
                </div>
                <div className='pl-6 space-y-2'>
                  <div>
                    <span className='text-muted-foreground'>name:</span>{' '}
                    <span className='text-green-500'>
                      &quot;Jution Candra Kirana&quot;
                    </span>
                    ,
                  </div>
                  <div>
                    <span className='text-muted-foreground'>role:</span>{' '}
                    <span className='text-green-500'>
                      &quot;Tech Edu & Software Engineer&quot;
                    </span>
                    ,
                  </div>
                  <div>
                    <span className='text-muted-foreground'>location:</span>{' '}
                    <span className='text-green-500'>&quot;Jakarta&quot;</span>,
                  </div>
                  <div>
                    <span className='text-muted-foreground'>experience:</span>{' '}
                    <span className='text-orange-400'>7+ Years</span>,
                  </div>
                  <div>
                    <span className='text-muted-foreground'>stack:</span> [
                  </div>
                  <div className='pl-4 text-green-500'>
                    &quot;Golang&quot;, &quot;Java&quot;,&quot;PHP&quot;,
                    &quot;JavaScript&quot;, &quot;Next.js&quot;,
                    &quot;Docker&quot;
                  </div>
                  <div>],</div>
                  <div>
                    <span className='text-muted-foreground'>education:</span>{' '}
                    {`{`}
                  </div>
                  <div className='pl-4'>
                    <span className='text-muted-foreground'>master:</span>{' '}
                    <span className='text-green-500'>
                      &quot;Universitas Budi Luhur (Ongoing)&quot;
                    </span>
                  </div>
                  <div>{`}`}</div>
                </div>
                <div className='mt-4'>{`}`}</div>
              </div>
            </div>

            {/* Floating Badges */}
            <div
              className='absolute -right-8 -top-8 p-4 bg-card border border-border rounded-lg shadow-xl flex items-center gap-3 animate-bounce'
              style={{ animationDuration: '3s' }}
            >
              <div className='p-2 bg-primary/10 rounded'>
                <Server className='w-5 h-5 text-primary' />
              </div>
              <div className='text-xs'>
                <div className='text-muted-foreground'>Full Stack</div>
                <div className='text-foreground font-mono'>Dev</div>
              </div>
            </div>

            <div className='absolute -left-8 bottom-10 p-4 bg-card border border-border rounded-lg shadow-xl flex items-center gap-3'>
              <div className='p-2 bg-green-500/10 rounded'>
                <Terminal className='w-5 h-5 text-green-500' />
              </div>
              <div className='text-xs'>
                <div className='text-muted-foreground'>Trainer</div>
                <div className='text-foreground font-mono'>500+ Students</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target='_blank'
      rel='noreferrer'
      className='p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-all'
    >
      {icon}
    </a>
  );
}
