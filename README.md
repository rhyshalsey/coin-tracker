# Crypto tracker

This is a small application that allows you to search for Cryptocurrencies and view their price data.

## Running the application

In otder to start the app, you can use:

```bash
npm run dev
```

Then, open [http://localhost:3000](http://localhost:3000).

## Running tests

To run Jest tests, use:

```bash
npm run test
```

## Technologies used

This application uses `Next.js` with `Typescript`.

Cryptocurrency data is taken from the `Coingecko price API`

The `Radix UI` and `Headless UI` component libraries have been used in order to create the base of the components. This allows us to have well tested, reliable and accessible components, while reducing the overhead of creating and managing various components.

`D3.js` is used in order to display performant, flexible and animated graphs.

Tests run with `Jest` and the following libraries:

- `React Testing Library` for testing React Components
- `Mock Service Worker` for mocking network requests
- `whatwg-fetch` polyfill to remove errors relating to fetch not existing in the test environment

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
