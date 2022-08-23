import classNames from 'classnames/bind';
import { FC, PropsWithChildren } from 'react';
import css from './pane-with-extra.module.css';

const cx = classNames.bind(css);

export const PaneWithExtra: FC<PropsWithChildren<{ extra?: JSX.Element | null | string }>> = ({ children, extra }) => {
  return (
    <div className={css.withExtra}>
      <div className={css.withExtra__content}>{children}</div>
      {extra && <div className={cx(css.withExtra__extra)}>{extra}</div>}
    </div>
  );
};
