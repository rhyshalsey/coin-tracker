import type { AppProps } from "next/app";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { QueryClient, QueryClientProvider } from "react-query";

import "normalize.css/normalize.css";

import "@radix-ui/colors/red.css";
import "@radix-ui/colors/redDark.css";
import "@radix-ui/colors/teal.css";
import "@radix-ui/colors/tealDark.css";
import "@radix-ui/colors/mint.css";
import "@radix-ui/colors/mintDark.css";
import "@radix-ui/colors/slate.css";
import "@radix-ui/colors/slateDark.css";

import "styles/globals.scss";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastPrimitive.Provider>
        <div id="app-wrapper" className="dark-theme">
          <Component {...pageProps} />
          <ToastPrimitive.Viewport id="toast-viewport" />
        </div>
      </ToastPrimitive.Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
