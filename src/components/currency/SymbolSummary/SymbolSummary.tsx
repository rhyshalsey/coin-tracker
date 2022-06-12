import Image from "next/image";
import styles from "./SymbolSummary.module.scss";

type propTypes = {
  icon?: string;
  name?: string;
  symbol: string;
  currency: string;
  marketCap?: Number;
};

export default function SymbolSummary({
  icon,
  name,
  symbol,
  currency,
  marketCap,
}: propTypes) {
  const formattedMarketCap = marketCap?.toString();

  return (
    <div className={styles.summary}>
      {icon && <Image src={icon} alt={name || symbol} />}
      <div>{`${symbol} / ${currency}`.toUpperCase()}</div>
      {marketCap && <div>{formattedMarketCap}</div>}
    </div>
  );
}
