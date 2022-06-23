import { fireEvent, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { ToastProvider, ToastViewport } from "@radix-ui/react-toast";

import Search from "./Search";

import { server } from "src/mocks/server";
import { renderWithQueryClient } from "src/mocks/utils";

jest.mock("./Search.module.scss", () => {
  return {
    listItemIconSize: 10,
  };
});

describe("Search", () => {
  it("displays a search icon", async () => {
    renderWithQueryClient(<Search />);

    await waitFor(() =>
      expect(screen.getByTestId("search-icon")).toBeInTheDocument()
    );
  });

  describe("the user clicks on the search input", () => {
    describe("there is no search query entered", () => {
      it("displays trending cryptos", async () => {
        renderWithQueryClient(<Search />);

        await waitFor(() => fireEvent.click(screen.getByRole("combobox")));

        await waitFor(() =>
          // Based on return values from src/mocks/server-handlers.ts
          expect(screen.getByText("SOL")).toBeInTheDocument()
        );
      });
    });

    describe("the user enters a search query", () => {
      it("searches the CoinGecko api and displays the search results", async () => {
        renderWithQueryClient(<Search />);

        await waitFor(() =>
          fireEvent.change(screen.getByRole("combobox"), {
            target: { value: "eth" },
          })
        );

        await waitFor(() =>
          expect(screen.getByText("eth")).toBeInTheDocument()
        );
      });
    });

    describe("there is an error searching the coingecko API", () => {
      beforeEach(() => {
        jest.spyOn(console, "error").mockImplementation(() => {});

        server.use(
          rest.get(
            "https://api.coingecko.com/api/v3/search",
            (req, res, ctx) => {
              return res(ctx.status(500), ctx.json({}));
            }
          )
        );
      });

      it.only("displays a toast message", async () => {
        renderWithQueryClient(
          <ToastProvider>
            <Search />
            <ToastViewport />
          </ToastProvider>
        );

        await waitFor(() =>
          fireEvent.change(screen.getByRole("combobox"), {
            target: { value: "eth" },
          })
        );

        await waitFor(() =>
          expect(screen.getByText("Search error")).toBeInTheDocument()
        );
      });
    });
  });
});
