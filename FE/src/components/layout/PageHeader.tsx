import { clsx } from 'clsx';
import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
  align?: 'left' | 'center';
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  action,
  align = 'left',
}) => {
  return (
    <div
      className={clsx(
        'flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white px-6 py-6 shadow-sm sm:flex-row sm:items-center sm:justify-between',
        align === 'center' && 'text-center sm:flex-col sm:items-center',
      )}
    >
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};

export default PageHeader;
