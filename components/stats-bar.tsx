const stats = [
  { value: '07+', label: 'Years Experience' },
  { value: '500+', label: 'Developers Trained' },
  { value: '10+', label: 'Enterprise Projects' },
  { value: '02', label: 'Degrees (BS & MS)' },
];

export default function StatsBar() {
  return (
    <section className='border-y border-border bg-card/50 backdrop-blur-sm'>
      <div className='max-w-6xl mx-auto'>
        <div className='grid grid-cols-2 md:grid-cols-4 divide-x divide-border'>
          {stats.map((stat, index) => (
            <div
              key={index}
              className='py-10 px-6 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors cursor-default group'
            >
              <div className='font-mono text-3xl md:text-4xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors'>
                {stat.value}
              </div>
              <div className='text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest font-semibold'>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
