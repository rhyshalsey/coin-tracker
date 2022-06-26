import React, { Fragment, useEffect, useReducer } from "react";
import { useDispatch } from "react-redux";
import { Combobox } from "@headlessui/react";
import { IoSearchSharp } from "react-icons/io5";
import classnames from "classnames";
import { useQuery } from "react-query";
import Fuse from "fuse.js";

import Toast from "@/components/ui/base/Toast/Toast";
import Loader, { LoaderSizes } from "@/components/ui/base/Loader/Loader";
import Image from "@/components/ui/base/Image/Image";
import { SkeletonLoaderVariants } from "@/components/ui/base/Skeleton/Skeleton";

import { coinChanged } from "src/features/appSlice";

import { fetcher } from "../../../utils/request";

import { coinGeckoKeys } from "src/constants";
import { Cryptocurrency } from "src/types";

import styles from "./Search.module.scss";

enum actions {
  SEARCH_INPUT_BLURRED = "SEARCH_INPUT_BLURRED",
  SEARCH_INPUT_FOCUSED = "SEARCH_INPUT_FOCUSED",
  SEARCH_INPUT_TEXT_CHANGED = "SEARCH_INPUT_TEXT_CHANGED",
  SEARCH_OPTION_SELECTED = "SEARCH_OPTION_SELECTED",
  TOAST_OPEN_CHANGED = "TOAST_OPEN_CHANGED",
  ERROR_GETTING_DATA = "ERROR_GETTING_DATA",
}

type State = Readonly<{
  searchFocussed: boolean;
  searchValue: string;
  searchError: boolean;
  selectedOption?: Cryptocurrency | null;
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
  selectedOption: null,
  errorToastOpen: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case actions.SEARCH_INPUT_TEXT_CHANGED:
      return {
        ...state,
        searchValue: action.payload,
        searchError: false,
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
    case actions.SEARCH_OPTION_SELECTED:
      return {
        ...state,
        searchValue: action.payload.name,
        selectedOption: action.payload,
        searchError: false,
      };
    case actions.TOAST_OPEN_CHANGED:
      return {
        ...state,
        errorToastOpen: action.payload,
      };
    case actions.ERROR_GETTING_DATA:
      return {
        ...state,
        searchError: true,
        errorToastOpen: true,
      };
    default:
      return state;
  }
};

async function getTrendingCrypto() {
  const response = await fetcher(
    "https://api.coingecko.com/api/v3/search/trending"
  );

  return {
    ...response,
    coins: response.coins.map(({ item }: { item: Cryptocurrency }) => item),
  };
}

async function searchCrypto(query: string) {
  const response = await fetcher(
    `https://api.coingecko.com/api/v3/search?query=${query}`
  );

  // Fuzzy search to improve Coingecko results
  const fuse = new Fuse(response.coins, { keys: ["name", "symbol"] });

  return {
    ...response,
    coins: fuse.search(query).map(({ item }) => item),
  };
}

export default function Search() {
  const dispatch = useDispatch();

  const [state, localDispatch] = useReducer(reducer, defaultState);

  const {
    searchValue,
    searchFocussed,
    selectedOption,
    errorToastOpen,
    searchError,
  }: State = state;

  const {
    data,
    error: dataFetchError,
    isFetching,
  } = useQuery(
    searchValue ? coinGeckoKeys.search(searchValue) : coinGeckoKeys.trending(),
    ({ queryKey: [, , query] }) =>
      query ? searchCrypto(query) : getTrendingCrypto()
  );

  useEffect(() => {
    if (dataFetchError) {
      localDispatch({ type: actions.ERROR_GETTING_DATA });
    }
  }, [dataFetchError]);

  return (
    <>
      <Combobox
        as="div"
        className={classnames(styles.searchContainer, {
          [styles.focussed]: searchFocussed,
          [styles.error]: searchError,
        })}
        value={selectedOption}
        onChange={(coinData: Cryptocurrency) => {
          localDispatch({
            type: actions.SEARCH_OPTION_SELECTED,
            payload: coinData,
          });
          dispatch(coinChanged(coinData.id));
        }}
      >
        <Combobox.Button as="div" className={styles.searchInputContainer}>
          <div className={styles.searchIconWrapper}>
            {isFetching ? (
              <Loader size={LoaderSizes.Small} />
            ) : (
              <IoSearchSharp data-testid="search-icon" />
            )}
          </div>
          <Combobox.Input
            className={styles.searchInput}
            placeholder="Search..."
            autoComplete="off"
            displayValue={(coinData: Cryptocurrency) =>
              coinData ? coinData.name : searchValue
            }
            onChange={(e) =>
              localDispatch({
                type: actions.SEARCH_INPUT_TEXT_CHANGED,
                payload: e.target.value,
              })
            }
            onBlur={() => localDispatch({ type: actions.SEARCH_INPUT_BLURRED })}
            onFocus={() =>
              localDispatch({ type: actions.SEARCH_INPUT_FOCUSED })
            }
          />
        </Combobox.Button>
        <Combobox.Options className={styles.searchOptionsContainer}>
          {data?.coins &&
            data.coins
              .filter((_: any, index: number) => index <= 4)
              .map((item: Cryptocurrency) => (
                <Combobox.Option key={item.id} value={item} as={Fragment}>
                  {({ active, selected }) => (
                    <li
                      className={classnames(styles.searchOption, {
                        [styles.active]: active,
                        [styles.selected]: selected,
                      })}
                    >
                      <div>
                        <div className={styles.coinIconWrapper}>
                          <Image
                            src={item.thumb}
                            alt={item.name}
                            width={styles.listItemIconSize}
                            height={styles.listItemIconSize}
                            loaderShape={SkeletonLoaderVariants.circle}
                          />
                        </div>
                        <span className={styles.coinName}>{item.name}</span>
                      </div>
                      <span className={styles.coinSymbol}>{item.symbol}</span>
                    </li>
                  )}
                </Combobox.Option>
              ))}
        </Combobox.Options>
      </Combobox>

      <Toast
        title={"Search error"}
        description={
          "Unable to get cryptocurrency data, please try again later."
        }
        open={errorToastOpen}
        onOpenChange={(open) => {
          localDispatch({ type: actions.TOAST_OPEN_CHANGED, payload: open });
        }}
      />
    </>
  );
}
