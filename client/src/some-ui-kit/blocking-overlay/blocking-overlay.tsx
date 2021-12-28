import classNames from 'classnames/bind';
import { FC } from 'react';
import { Spinner } from '~/some-ui-kit/spinner';
import css from './blocking-overlay.module.css';

const cs = classNames.bind(css);

type Props = {
  show: boolean;
};
export const BlockingOverlay: FC<Props> = ({ show }) => (
  <div
    className={cs({
      [css.blockingOverlay]: true,
      [css.blockingOverlay_visible]: show,
    })}
  >
    <Spinner />
  </div>
);
