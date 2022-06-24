import classNames from "classnames";

import styles from "./Skeleton.module.scss";

export enum SkeletonVariants {
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
}

const classes = {
  [SkeletonVariants.h1]: styles.h1,
  [SkeletonVariants.h2]: styles.h2,
  [SkeletonVariants.h3]: styles.h3,
  [SkeletonVariants.h4]: styles.h4,
  [SkeletonVariants.h5]: styles.h5,
  [SkeletonVariants.h6]: styles.h6,
  [SkeletonVariants.smallText]: styles.smallText,
  [SkeletonVariants.text]: styles.text,
  [SkeletonVariants.largeText]: styles.largeText,
  [SkeletonVariants.circle]: styles.circle,
  [SkeletonVariants.rectangle]: styles.rectangle,
};

type propTypes = {
  variant?: SkeletonVariants;
  width?: number;
  height?: number;
};

const Skeleton = ({
  variant = SkeletonVariants.rectangle,
  width,
  height,
}: propTypes) => {
  return (
    <div
      className={classNames(styles.skeleton, classes[variant])}
      style={{ ...(width && { width }), ...(height && { height }) }}
    ></div>
  );
};

export default Skeleton;
