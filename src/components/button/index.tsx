import styles from '@/styles/button.module.scss';
import {MouseEventHandler, ReactElement} from 'react';

interface ButtonProps {
  style?: Record<string, string | number>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  highlighted?: boolean;
  children: ReactElement | ReactElement[];
  className?: string;
}

export function Button({
  children,
  style,
  onClick,
  highlighted = false,
  className,
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${
        highlighted ? styles.highlighted : ''
      } ${className}`}
      style={style}
      onClick={onClick}
    >
      <>{children}</>
    </button>
  );
}
