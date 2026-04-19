interface HealthBadgeProps {
  status: 'healthy' | 'warning' | 'critical'
  label: string
}

export default function HealthBadge({ status, label }: HealthBadgeProps) {
  const styles = {
    healthy: 'bg-[#FF4500]/15 text-[#FF4500] border-[#FF4500]/30',
    warning: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
    critical: 'bg-red-500/15 text-red-400 border-red-500/30',
  }[status]

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${
        status === 'healthy' ? 'bg-[#FF4500]' : status === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
      }`} />
      {label}
    </span>
  )
}
