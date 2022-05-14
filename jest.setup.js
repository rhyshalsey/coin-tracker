import "whatwg-fetch";
import "@testing-library/jest-dom/extend-expect";
import { QueryCache } from "react-query";
import { server } from "./src/mocks/server";

const queryCache = new QueryCache();

beforeAll(() => server.listen());

afterEach(() => {
  queryCache.clear();
  server.resetHandlers();
});

afterAll(() => server.close());
