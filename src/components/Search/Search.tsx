import React, { useEffect, useReducer } from "react";
import { Combobox } from "@headlessui/react";
import { IoSearchSharp } from "react-icons/io5";
import classnames from "classnames";
import { useQuery } from "react-query";

import Toast from "src/components/Toast/Toast";
import { fetcher } from "../../utils/request";

import styles from "./Search.module.scss";
import Dropdown from "../Dropdown/Dropdown";

enum actions {
  SEARCH_INPUT_BLURRED = "SEARCH_INPUT_BLURRED",
  SEARCH_INPUT_FOCUSED = "SEARCH_INPUT_FOCUSED",
  SEARCH_INPUT_TEXT_CHANGED = "SEARCH_INPUT_TEXT_CHANGED",
  TOAST_OPEN_CHANGED = "TOAST_OPEN_CHANGED",
  ERROR_GETTING_DATA = "ERROR_GETTING_DATA",
}

type State = Readonly<{
  searchFocussed: boolean;
  searchValue: string;
  searchError: boolean;
  errorToastOpen: boolean;
}>;

interface Action {
  type: actions;
  payload?: any;
}

const defaultState: State = {
  searchFocussed: false,
  searchValue: "",
  searchError: false,
  errorToastOpen: false,
};

const reducer = (state: State, action: Action): State => {
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
    case actions.TOAST_OPEN_CHANGED:
      console.log("TOAST_OPEN_CHANGED");
      return {
        ...state,
        errorToastOpen: action.payload,
      };
    case actions.ERROR_GETTING_DATA:
      console.log("ERROR_GETTING_DATA");
      return {
        ...state,
        searchError: true,
        errorToastOpen: true,
      };
    default:
      return state;
  }
};

async function getDefaultCryptos() {
  //return fetcher("https://api.coingecko.com/api/v3/search/trending");
  throw new Error("Not implemented");
}

export default function Search() {
  const [
    { searchValue, searchFocussed, errorToastOpen, searchError },
    dispatch,
  ] = useReducer(reducer, defaultState);

  const {
    data,
    error: dataFetchError,
    isFetching,
  } = useQuery("default-cryptos", getDefaultCryptos);

  useEffect(() => {
    if (dataFetchError) {
      console.log("ERROR GETTING DATA");
      dispatch({ type: actions.ERROR_GETTING_DATA });
    }
  }, [dataFetchError]);

  return (
    <div>
      <Combobox
        as="div"
        className={classnames(styles.searchContainer, {
          [styles.focussed]: searchFocussed,
          [styles.error]: searchError,
        })}
        value={searchValue}
        onChange={() => {}}
      >
        <div className={styles.searchInputContainer}>
          <div className={styles.searchIconWrapper}>
            <IoSearchSharp />
          </div>
          <Combobox.Input
            className={styles.searchInput}
            placeholder="Search..."
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
        <Combobox.Options>
          <Combobox.Option key={"test-1"} value={"Test 1"}>
            Test 1
          </Combobox.Option>
        </Combobox.Options>
      </Combobox>

      <Toast
        title={"Search error"}
        description={
          "Unable to get cryptocurrency data, please try again later."
        }
        open={errorToastOpen}
        onOpenChange={(open) => {
          dispatch({ type: actions.TOAST_OPEN_CHANGED, payload: open });
        }}
      />
    </div>
  );
}
