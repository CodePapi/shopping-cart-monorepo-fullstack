import { clsx } from 'clsx';

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: 'neutral' | 'success' | 'warning' | 'danger';
};

const toneStyles: Record<NonNullable<BadgeProps['tone']>, string> = {
  neutral: 'bg-slate-100 text-slate-700',
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-rose-100 text-rose-700',
};

const Badge: React.FC<BadgeProps> = ({
  className,
  tone = 'neutral',
  ...props
}) => {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold',
        toneStyles[tone],
        className,
      )}
      {...props}
    />
  );
};

export default Badge;
