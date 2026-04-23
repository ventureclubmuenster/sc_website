const partners = [
  { name: 'Flaschenpost', src: '/partners-banner/flaschenpost.svg', className: 'h-6 md:h-8' },
  { name: 'Meta', src: '/partners-banner/meta.svg', className: 'h-4 md:h-6' },
  { name: 'NRW.Bank', src: '/partners-banner/nrw-bank.svg', className: 'h-10 md:h-12' },
  { name: 'Google Cloud', src: '/partners-banner/google-cloud.svg', className: 'h-4 md:h-6' },
  { name: 'eCAPITAL', src: '/partners-banner/ecapital.png', className: 'h-[67px] md:h-[77px]' },
  { name: 'OACE', src: '/partners-banner/oace.png', className: 'h-6 md:h-8' },
  { name: 'capacura', src: '/partners-banner/capacura.svg', className: 'h-6 md:h-8' },
  { name: 'IKEA', src: '/partners-banner/ikea.svg', className: 'h-8 md:h-10' },
  { name: 'EY', src: '/partners-banner/ey.svg', className: 'h-6 md:h-8' },
]

export default function PartnerBanner() {
  const loop = [...partners, ...partners]

  return (
    <section className="relative bg-black py-8 overflow-hidden">
      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div
          className="flex items-center gap-16 md:gap-24 w-max"
          style={{ animation: 'marquee-scroll 50s linear infinite' }}
        >
          {loop.map((partner, i) => (
            <img
              key={`${partner.name}-${i}`}
              src={partner.src}
              alt={partner.name}
              className={`shrink-0 ${partner.className} w-auto object-contain`}
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
