import type { AppProps } from "next/app";

import "normalize.css/normalize.css";

import "@radix-ui/colors/teal.css";
import "@radix-ui/colors/tealDark.css";
import "@radix-ui/colors/mint.css";
import "@radix-ui/colors/mintDark.css";
import "@radix-ui/colors/slate.css";
import "@radix-ui/colors/slateDark.css";

import "styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="dark-theme">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
