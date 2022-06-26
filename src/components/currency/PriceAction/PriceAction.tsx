import classNames from "classnames";
import { IoCaretDown, IoCaretUp, IoRemove } from "react-icons/io5";

import Skeleton, {
  SkeletonLoaderVariants,
} from "@/components/ui/base/Skeleton/Skeleton";

import styles from "./PriceAction.module.scss";

type propTypes = {
  price: number;
  currency: string;
  percentage: number;
  isLoading?: boolean;
};

const PriceAction = ({
  price,
  percentage,
  currency,
  isLoading = false,
}: propTypes) => {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    maximumFractionDigits: 8,
  }).format(price);

  const formattedPercent = new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(percentage / 100);

  return (
    <div className={styles.priceAction}>
      {isLoading ? (
        <>
          <Skeleton variant={SkeletonLoaderVariants.h1} />
          <Skeleton variant={SkeletonLoaderVariants.chip} width={100} />
        </>
      ) : (
        <>
          <h1>{formattedPrice}</h1>
          <div
            className={classNames(styles.chip, {
              [styles.up]: percentage > 0,
              [styles.down]: percentage < 0,
            })}
          >
            {percentage == 0 && <IoRemove />}
            {percentage > 0 && <IoCaretUp />}
            {percentage < 0 && <IoCaretDown />}
            <h5>{formattedPercent}</h5>
          </div>
        </>
      )}
    </div>
  );
};

export default PriceAction;
