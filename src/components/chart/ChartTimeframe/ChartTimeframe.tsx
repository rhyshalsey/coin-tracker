import RadioTabs from "@/components/ui/RadioTabs/RadioTabs";
import RadioTabItem from "@/components/ui/RadioTabs/RadioTabItem";
import { useMedia } from "react-use";

import styles from "./ChartTimeframe.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/utils/store";
import { timeframeChanged } from "src/features/appSlice";
import { Timeframes, timeframeValues } from "src/constants";

const ChartTimeframe = () => {
  const isMediumAndDown = useMedia(`(max-width: ${styles.breakpointMedium})`);

  const dispatch = useDispatch();

  const currentTimeframe = useSelector(
    (state: RootState) => state.app.chartTimeframe
  );

  return (
    <div className={styles.chartTimeframeContainer}>
      <RadioTabs
        defaultValue={Timeframes.DAYS_1}
        onValueChange={(value) => {
          dispatch(timeframeChanged(value as Timeframes));
        }}
      >
        {Object.entries(timeframeValues)
          .filter(
            ([, timeframe]) =>
              !isMediumAndDown || (isMediumAndDown && timeframe.showOnMobile)
          )
          .map(([key, timeframe]) => (
            <RadioTabItem key={timeframe.value} value={key}>
              {timeframe.label}
            </RadioTabItem>
          ))}
      </RadioTabs>
    </div>
  );
};

export default ChartTimeframe;
