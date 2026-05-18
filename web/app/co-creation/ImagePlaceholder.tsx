import Image from 'next/image'

interface ImagePlaceholderProps {
  src?: string
  alt: string
  label: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  rounded?: string
}

export default function ImagePlaceholder({
  src,
  alt,
  label,
  fill,
  width,
  height,
  className = '',
  rounded = 'rounded-2xl',
}: ImagePlaceholderProps) {
  if (src) {
    if (fill) {
      return (
        <Image src={src} alt={alt} fill className={`object-cover ${className}`} />
      )
    }
    return (
      <Image
        src={src}
        alt={alt}
        width={width ?? 800}
        height={height ?? 600}
        className={className}
      />
    )
  }

  return (
    <div
      className={`flex items-center justify-center bg-red-300/40 border-2 border-dashed border-red-400/70 ${rounded} ${className}`}
      role="img"
      aria-label={`Platzhalter: ${label}`}
    >
      <div className="text-center px-4 py-2">
        <span className="block text-red-100 font-mono text-xs uppercase tracking-wider">Bild fehlt</span>
        <span className="block text-red-50 font-semibold text-sm mt-1">{label}</span>
      </div>
    </div>
  )
}
