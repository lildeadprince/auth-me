/* eslint-disable prettier/prettier */
import classNames from 'classnames/bind';
import { DispatchWithoutAction, FC } from 'react';
import css from './deferred-background-image.module.css';

const cx = classNames.bind(css);

type Props = {
  onLoadImage: DispatchWithoutAction;
  withTransition?: boolean;
  show?: boolean;
  invert?: boolean;
};

/** Actual imageset might be produced better, I guess */
export const LightBgPicture: FC<Props> = ({ onLoadImage, withTransition = true, show = true, invert = false }) => (
  <picture
    onLoad={onLoadImage}
    className={cx({
      [css.deferredBackgroundContainer__image]: true,
      [css.deferredBackgroundContainer__image_withTransition]: withTransition,
      [css.deferredBackgroundContainer__image_inverted]: invert,
      [css.show]: show,
    })}
  >
    <source srcSet="assets/img/bg-4k.avif" media="(min-width: 3840px)" type="image/avif"/>
    <source srcSet="assets/img/bg-4k.jpg" media="(min-width: 3840px )"/>
    <source srcSet="assets/img/bg-2k.avif 1x, assets/img/bg-4k.avif" media="(min-width: 2560px)" type="image/avif"/>
    <source srcSet="assets/img/bg-2k.jpg 1x, assets/img/bg-4k.jpg" media="(min-width: 2560px)"/>
    <source srcSet="assets/img/bg-fhd.avif 1x, assets/img/bg-2k.avif 2x, assets/img/bg-4k.avif 3x" type="image/avif"/>
    <source srcSet="assets/img/bg-fhd.jpg 1x, assets/img/bg-2k.jpg 2x, assets/img/bg-4k.jpg 3x"/>

    <img alt="dark background image of black and white architecture" srcSet="assets/img/bg-fhd.jpg"/>
  </picture>
);
