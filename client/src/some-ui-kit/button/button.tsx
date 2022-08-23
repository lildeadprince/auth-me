import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';
import css from './button.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(css);

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
  variant?: 'basic' | 'solid';
};

export const Button: FC<Props> = ({ label, variant = 'basic', children, className, ...htmlButtonProps }) => {
  return (
    <button
      className={cx(className, {
        [css.blackWhiteButton]: true,
        [css.blackWhiteButton_solid]: variant === 'solid',
      })}
      {...htmlButtonProps}
    >
      {label || children}
    </button>
  );
};
