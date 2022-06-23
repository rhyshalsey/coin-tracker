import Image from "next/image";

import styles from "./SymbolSummary.module.scss";

type propTypes = {
  icon?: string;
  name?: string;
  symbol: string;
  currency: string;
  marketCap?: number;
};

export default function SymbolSummary({
  icon,
  name,
  symbol,
  currency,
  marketCap,
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
        {icon && (
          <Image src={icon} alt={name || symbol} width="30" height="30" />
        )}
        <h3>{`${symbol} / ${currency}`.toUpperCase()}</h3>
      </div>
      {marketCap && (
        <div>
          <span className="neutral">Market cap:&nbsp;</span>
          <h4>{formattedMarketCap}</h4>
        </div>
      )}
    </div>
  );
}
