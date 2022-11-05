import * as RadioGroup from "@radix-ui/react-radio-group";
import classNames from "classnames";

import styles from "./RadioTabItem.module.scss";

type RadioTabItemProps = RadioGroup.RadioGroupItemProps & {};

const RadioTabItem = ({ className, ...props }: RadioTabItemProps) => {
  return (
    <RadioGroup.Item
      className={classNames(styles.radioTab, className)}
      {...props}
    />
  );
};

export default RadioTabItem;
