import Header from '@/components/header';
import Footer from '@/components/footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Jution Candra Kirana collects, uses, and protects information on this site, including the use of analytics and advertising cookies.',
};

export default function PrivacyPolicyPage() {
  return (
    <main id='main-content' className='min-h-screen bg-background'>
      <Header />

      <section className='relative pt-32 pb-24 overflow-hidden'>
        <div className='absolute top-0 right-0 w-96 h-96 bg-linear-to-bl from-primary/10 to-transparent rounded-full blur-3xl -z-10' />

        <div className='max-w-3xl mx-auto px-6'>
          <h1 className='text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight'>
            Privacy Policy
          </h1>
          <p className='text-sm text-muted-foreground mb-12'>
            Last updated: July 20, 2026
          </p>

          <div className='space-y-14'>
            <p className='text-muted-foreground leading-relaxed text-base'>
              This Privacy Policy explains how{' '}
              <strong className='text-foreground'>
                jutioncandrakirana.site
              </strong>{' '}
              (&quot;this site&quot;, &quot;we&quot;, &quot;us&quot;)
              collects, uses, and protects information when you visit. By
              using this site, you agree to the practices described here.
            </p>

            <section>
              <h2 className='text-2xl font-bold text-foreground tracking-tight mb-4'>
                Information We Collect
              </h2>
              <p className='text-muted-foreground leading-relaxed mb-4'>
                This site does not require account registration and does
                not collect personal information directly from visitors,
                other than what you voluntarily share when contacting us by
                email. We use the following services that may collect
                limited, non-identifying technical data automatically:
              </p>
              <ul className='space-y-3 ml-5 list-disc marker:text-primary'>
                <li className='text-muted-foreground leading-relaxed pl-1'>
                  <strong className='text-foreground'>
                    Vercel Analytics &amp; Speed Insights
                  </strong>{' '}
                  — aggregated, privacy-friendly page-view and performance
                  metrics (no cookies, no cross-site tracking).
                </li>
                <li className='text-muted-foreground leading-relaxed pl-1'>
                  <strong className='text-foreground'>
                    Theme preference
                  </strong>{' '}
                  — a small value stored in your browser&apos;s local
                  storage to remember whether you prefer light or dark
                  mode. This never leaves your device.
                </li>
              </ul>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-foreground tracking-tight mb-4'>
                Advertising &amp; Cookies
              </h2>
              <p className='text-muted-foreground leading-relaxed mb-4'>
                This site may display advertisements served by Google
                AdSense and its advertising partners. Google, as a
                third-party vendor, uses cookies (such as the DoubleClick
                DART cookie) to serve ads based on your visits to this site
                and other sites on the internet. These cookies allow Google
                and its partners to serve ads based on your prior visits to
                this or other websites.
              </p>
              <p className='text-muted-foreground leading-relaxed'>
                You may opt out of personalized advertising by visiting{' '}
                <a
                  href='https://adssettings.google.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-primary hover:underline'
                >
                  Google Ads Settings
                </a>
                . You can also learn more about how Google uses data in the
                context of advertising at{' '}
                <a
                  href='https://policies.google.com/technologies/partner-sites'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-primary hover:underline'
                >
                  Google&apos;s Privacy &amp; Terms site
                </a>
                . Third-party vendors, including Google, may also use
                cookies to serve ads based on prior visits, and
                third-party sites or apps that partner with Google to serve
                ads may also use cookies.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-foreground tracking-tight mb-4'>
                Third-Party Links
              </h2>
              <p className='text-muted-foreground leading-relaxed'>
                This site may link to external websites (portfolio
                projects, social profiles, referenced sources in blog
                articles). We are not responsible for the privacy practices
                or content of third-party sites. We encourage you to review
                the privacy policy of any site you visit.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-foreground tracking-tight mb-4'>
                Children&apos;s Privacy
              </h2>
              <p className='text-muted-foreground leading-relaxed'>
                This site is not directed at children under 13, and we do
                not knowingly collect personal information from children.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-foreground tracking-tight mb-4'>
                Changes to This Policy
              </h2>
              <p className='text-muted-foreground leading-relaxed'>
                This Privacy Policy may be updated from time to time to
                reflect changes in our practices or for legal, regulatory,
                or operational reasons. The &quot;Last updated&quot; date
                above indicates when it was last revised.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-foreground tracking-tight mb-4'>
                Contact Us
              </h2>
              <p className='text-muted-foreground leading-relaxed'>
                If you have questions about this Privacy Policy, contact us
                at{' '}
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
