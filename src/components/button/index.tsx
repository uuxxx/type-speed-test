import styles from '@/styles/button.module.scss';
import {MouseEventHandler, ReactElement} from 'react';

interface ButtonProps {
  style?: Record<string, string | number>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactElement | ReactElement[];
  className?: string;
}

export function Button({children, style, onClick, className}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${className}`}
      style={style}
      onClick={onClick}
    >
      <>{children}</>
    </button>
  );
}
