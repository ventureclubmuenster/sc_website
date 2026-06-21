interface WatermarkBackgroundProps {
  opacityClass?: string
}

export default function WatermarkBackground({
  opacityClass = 'text-white/[0.03]',
}: WatermarkBackgroundProps = {}) {
  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
      {[...Array(14)].map((_, i) => (
        <span
          key={i}
          className={`block text-[5rem] md:text-[8rem] font-bold uppercase ${opacityClass} tracking-tighter whitespace-nowrap leading-none`}
          style={{ transform: `translateX(${i % 2 === 0 ? '-5%' : '-15%'})` }}
        >
          CO-CREATION &nbsp; CO-CREATION &nbsp; CO-CREATION
        </span>
      ))}
    </div>
  )
}
