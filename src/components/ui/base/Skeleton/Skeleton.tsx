import classNames from "classnames";

import styles from "./Skeleton.module.scss";

export enum SkeletonLoaderVariants {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  smallText,
  text,
  largeText,
  circle,
  rectangle,
  chip,
}

const classes = {
  [SkeletonLoaderVariants.h1]: styles.h1,
  [SkeletonLoaderVariants.h2]: styles.h2,
  [SkeletonLoaderVariants.h3]: styles.h3,
  [SkeletonLoaderVariants.h4]: styles.h4,
  [SkeletonLoaderVariants.h5]: styles.h5,
  [SkeletonLoaderVariants.h6]: styles.h6,
  [SkeletonLoaderVariants.smallText]: styles.smallText,
  [SkeletonLoaderVariants.text]: styles.text,
  [SkeletonLoaderVariants.largeText]: styles.largeText,
  [SkeletonLoaderVariants.circle]: styles.circle,
  [SkeletonLoaderVariants.rectangle]: styles.rectangle,
  [SkeletonLoaderVariants.chip]: styles.chip,
};

type propTypes = {
  variant?: SkeletonLoaderVariants;
  width?: number | string;
  height?: number | string;
  style?: object;
};

const Skeleton = ({
  variant = SkeletonLoaderVariants.rectangle,
  width,
  height,
  style,
}: propTypes) => {
  return (
    <div
      className={classNames(styles.skeleton, classes[variant])}
      style={{
        ...(width && { width }),
        ...(height && { height }),
        ...style,
      }}
    ></div>
  );
};

export default Skeleton;
