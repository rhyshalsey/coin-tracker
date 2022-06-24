import Skeleton, {
  SkeletonVariants,
} from "@/components/ui/base/Skeleton/Skeleton";
import Image from "next/image";

import styles from "./SymbolSummary.module.scss";

type propTypes = {
  icon?: string;
  name?: string;
  symbol: string;
  currency: string;
  marketCap?: number;
  isLoading?: boolean;
};

export default function SymbolSummary({
  icon,
  name,
  symbol,
  currency,
  marketCap,
  isLoading = false,
}: propTypes) {
  const formattedMarketCap = marketCap
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency.toUpperCase(),
        maximumFractionDigits: 0,
      }).format(marketCap)
    : "";

  return (
    <div className={styles.summary}>
      <div>
        {isLoading ? (
          <>
            <Skeleton variant={SkeletonVariants.circle} />
            <Skeleton variant={SkeletonVariants.h3} width={150} />
          </>
        ) : (
          <>
            {icon && (
              <Image src={icon} alt={name || symbol} width="30" height="30" />
            )}
            <h3>{`${symbol} / ${currency}`.toUpperCase()}</h3>
          </>
        )}
      </div>
      {isLoading ? (
        <Skeleton variant={SkeletonVariants.h4} />
      ) : (
        marketCap && (
          <div>
            <span className="neutral">Market cap:&nbsp;</span>
            <h4>{formattedMarketCap}</h4>
          </div>
        )
      )}
    </div>
  );
}
