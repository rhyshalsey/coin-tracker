import * as RadioGroup from "@radix-ui/react-radio-group";
import classNames from "classnames";

import RadioTabItem from "./RadioTabItem";

import styles from "./RadioTabs.module.scss";

type RadioTabsProps = RadioGroup.RadioGroupProps & {
  children:
    | React.ReactElement<typeof RadioTabItem>
    | React.ReactElement<typeof RadioTabItem>[];
};

const RadioTabs = ({ className, ...props }: RadioTabsProps) => {
  return (
    <RadioGroup.Root
      {...props}
      className={classNames(styles.radioTabs, className)}
    />
  );
};

export default RadioTabs;
