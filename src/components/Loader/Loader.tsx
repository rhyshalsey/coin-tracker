import * as Progress from "@radix-ui/react-progress";
import classNames from "classnames";

import styles from "./Loader.module.scss";

export const enum LoaderSizes {
  Small = "small",
  Medium = "medium",
  Large = "large",
  XLarge = "xLarge",
}

type LoaderProps = {
  size?: LoaderSizes;
};

const Loader = ({ size = LoaderSizes.Medium }: LoaderProps) => {
  return (
    <Progress.Root>
      <Progress.Indicator
        className={classNames(styles.spinner, styles[size])}
      />
    </Progress.Root>
  );
};

export default Loader;
