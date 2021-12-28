import classNames from 'classnames/bind';
import { FC } from 'react';
import css from './spinner.module.css';

const cx = classNames.bind(css);

type Props = {
  size?: number;
  invert?: boolean;
};
export const Spinner: FC<Props> = ({ size, invert }) => (
  <div
    className={cx({
      [css.spinner]: true,
      [css.spinner_inverted]: invert,
    })}
    style={size ? { width: size, height: size } : undefined}
  />
);
