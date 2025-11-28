export default function Footer() {
  return (
    <footer className='bg-background py-8 border-t border-border'>
      <div className='max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4'>
        <div className='text-muted-foreground text-xs font-mono'>
          JCK.DEV © {new Date().getFullYear()}
        </div>
        <div className='flex gap-6'>
          <span className='text-muted-foreground/60 text-xs font-mono'>
            BUILT WITH NEXT.JS & TAILWIND
          </span>
        </div>
      </div>
    </footer>
  );
}
