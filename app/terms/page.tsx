import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'Terms and conditions governing the use of jutioncandrakirana.site, including content usage, disclaimers, and liability.',
};

export default function TermsPage() {
  return (
    <main id='main-content' className='min-h-screen bg-background'>
      <Header />

      <section className='relative pt-32 pb-24 overflow-hidden'>
        <div className='absolute top-0 right-0 w-96 h-96 bg-linear-to-bl from-primary/10 to-transparent rounded-full blur-3xl -z-10' />

        <div className='max-w-3xl mx-auto px-6'>
          <h1 className='text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight'>
            Terms of Use
          </h1>
          <p className='text-sm text-muted-foreground mb-12'>
            Last updated: July 20, 2026
          </p>

          <div className='space-y-14'>
            <p className='text-muted-foreground leading-relaxed text-base'>
              By accessing{' '}
              <strong className='text-foreground'>
                jutioncandrakirana.site
              </strong>
              , you agree to the following terms. If you do not agree,
              please discontinue use of the site.
            </p>

            <section>
              <h2 className='text-2xl font-bold text-foreground tracking-tight mb-4'>
                Purpose of Content
              </h2>
              <p className='text-muted-foreground leading-relaxed'>
                Articles, tutorials, and code snippets published here are
                provided for educational and informational purposes only.
                They reflect the personal experience and opinions of the
                author and should not be treated as professional advice
                for production systems without independent verification.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-foreground tracking-tight mb-4'>
                No Warranty
              </h2>
              <p className='text-muted-foreground leading-relaxed'>
                Content is provided &quot;as is&quot; without warranties of
                any kind, express or implied, including accuracy,
                completeness, or fitness for a particular purpose.
                Technology recommendations, code examples, and
                configurations may become outdated over time.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-foreground tracking-tight mb-4'>
                Limitation of Liability
              </h2>
              <p className='text-muted-foreground leading-relaxed'>
                The author is not liable for any direct, indirect,
                incidental, or consequential damages arising from the use
                of, or inability to use, content on this site.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-foreground tracking-tight mb-4'>
                Intellectual Property
              </h2>
              <p className='text-muted-foreground leading-relaxed'>
                Unless otherwise noted, articles and original code snippets
                are the intellectual property of Jution Candra Kirana. You
                may reference or quote content with attribution and a link
                back to the original article; reproducing full articles
                elsewhere without permission is not allowed.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-foreground tracking-tight mb-4'>
                External Links
              </h2>
              <p className='text-muted-foreground leading-relaxed'>
                This site may link to third-party resources, tools, or
                articles. We do not control and are not responsible for
                the content or practices of external sites.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-foreground tracking-tight mb-4'>
                Advertising
              </h2>
              <p className='text-muted-foreground leading-relaxed'>
                This site may display advertisements through Google
                AdSense and similar networks to support its operation. See
                our{' '}
                <Link
                  href='/privacy'
                  className='text-primary hover:underline'
                >
                  Privacy Policy
                </Link>{' '}
                for details on advertising cookies.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-foreground tracking-tight mb-4'>
                Changes to These Terms
              </h2>
              <p className='text-muted-foreground leading-relaxed'>
                These Terms of Use may be revised periodically. Continued
                use of the site after changes are posted constitutes
                acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-foreground tracking-tight mb-4'>
                Governing Law
              </h2>
              <p className='text-muted-foreground leading-relaxed'>
                These terms are governed by the laws of the Republic of
                Indonesia, without regard to conflict-of-law principles.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-foreground tracking-tight mb-4'>
                Contact
              </h2>
              <p className='text-muted-foreground leading-relaxed'>
                Questions about these terms can be sent to{' '}
                <a
                  href='mailto:jutionck@gmail.com'
                  className='text-primary hover:underline'
                >
                  jutionck@gmail.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
