import { FC, useCallback, useLayoutEffect, useReducer, useState } from 'react';
import { useThemeWithFallbackToSystem } from '~/app/context';
import { LightBgPicture } from './bg-picture';

import css from './deferred-background-image.module.css';

/** Original idea was to have just `background-image: image-set(...)`, but AVIF do not have "progressive loading"
 * and I just want to have some pretty bg transition
 *
 * Loading of a big BG image will be deferred a bit anyway because of the size, therefore it is worth to defer and
 * show it prettily, while CSS cares about layout coloring *
 */
export const DeferredBackground: FC = ({ children }) => {
  const theme = useThemeWithFallbackToSystem();
  const [isShowingImage, setIsShowImage] = useState(false);
  const [isUsingTransition, setIsUsingTransition] = useReducer(() => true, false);

  // if image did not come from cache immediately, then use transition
  useLayoutEffect(() => {
    // setTimeout(setIsUsingTransition, 20);
    setIsUsingTransition();
  }, []);

  /** Used 2 different images originally. Now just using a filter:invert */
  /*
  // make theme transition pretty as well
  useEffect(() => {
    /!* would've actually want to make it cross-dissolve but it would take enormouns amount of effert e.g. to avoid
     * double-image load on initial page load etc. *!/
    setIsShowImage(false);
  }, [theme]);
  */

  const handleImageLoad = useCallback(() => setIsShowImage(true), []);

  // Just to ensure an exhaustive check
  let BgPicture: JSX.Element | null;
  switch (theme) {
    case 'dark':
      BgPicture = (
        <LightBgPicture onLoadImage={handleImageLoad} show={isShowingImage} withTransition={isUsingTransition} invert />
      );
      break;
    case 'light':
      BgPicture = (
        <LightBgPicture onLoadImage={handleImageLoad} show={isShowingImage} withTransition={isUsingTransition} />
      );
      break;
    default:
      // eslint-disable-next-line no-case-declarations
      const didCoverAllValues: never = theme;
      BgPicture = null;
  }

  return (
    <>
      <div className={css.deferredBackgroundContainer}>{BgPicture}</div>
      {children}
    </>
  );
};
