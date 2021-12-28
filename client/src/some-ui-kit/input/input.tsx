import classNames from 'classnames/bind';
import { FC, InputHTMLAttributes } from 'react';
import css from './input.module.css';

const cx = classNames.bind(css);

type Props = InputHTMLAttributes<HTMLInputElement>;
export const Input: FC<Props> = ({ className, ...htmlButtonProps }) => (
  <input className={cx(className, css.blackWhiteInput)} {...htmlButtonProps} />
);
