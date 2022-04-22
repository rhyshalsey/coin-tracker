import { useReducer } from "react";
import { IoSearchSharp } from "react-icons/io5";
import classnames from "classnames";

import styles from "./Search.module.scss";
import Dropdown from "../Dropdown/Dropdown";

enum actions {
  SEARCH_INPUT_BLURRED = "SEARCH_INPUT_BLURRED",
  SEARCH_INPUT_FOCUSED = "SEARCH_INPUT_FOCUSED",
  SEARCH_INPUT_TEXT_CHANGED = "SEARCH_INPUT_TEXT_CHANGED",
}

type State = {
  searchFocussed: boolean;
  searchValue: string;
};

interface Action {
  type: actions;
  payload?: any;
}

const defaultState: State = {
  searchFocussed: false,
  searchValue: "",
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case actions.SEARCH_INPUT_TEXT_CHANGED:
      return {
        ...state,
        searchValue: action.payload,
      };
    case actions.SEARCH_INPUT_BLURRED:
      return {
        ...state,
        searchFocussed: false,
      };
    case actions.SEARCH_INPUT_FOCUSED:
      return {
        ...state,
        searchFocussed: true,
      };
    default:
      return state;
  }
};

export default function Search() {
  const [{ searchValue, searchFocussed }, dispatch] = useReducer(
    reducer,
    defaultState
  );

  return (
    <div
      className={classnames(styles.searchContainer, {
        [styles.focussed]: searchFocussed,
      })}
    >
      <div className={styles.searchInputContainer}>
        <div className={styles.searchIconWrapper}>
          <IoSearchSharp />
        </div>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search..."
          value={searchValue}
          onChange={(e) =>
            dispatch({
              type: actions.SEARCH_INPUT_TEXT_CHANGED,
              payload: e.target.value,
            })
          }
          onBlur={() => dispatch({ type: actions.SEARCH_INPUT_BLURRED })}
          onFocus={() => dispatch({ type: actions.SEARCH_INPUT_FOCUSED })}
        />
      </div>
      <Dropdown />
    </div>
  );
}
