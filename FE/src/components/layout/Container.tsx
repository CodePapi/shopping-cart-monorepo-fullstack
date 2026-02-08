import { clsx } from 'clsx';

type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

const Container: React.FC<ContainerProps> = ({ className, ...props }) => {
  return (
    <div
      className={clsx(
        'mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8',
        className,
      )}
      {...props}
    />
  );
};

export default Container;
