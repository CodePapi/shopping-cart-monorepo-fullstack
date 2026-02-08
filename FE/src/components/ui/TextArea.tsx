import { clsx } from 'clsx';
import { forwardRef } from 'react';

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={clsx(
          'w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200',
          className,
        )}
        {...props}
      />
    );
  },
);

TextArea.displayName = 'TextArea';

export default TextArea;
