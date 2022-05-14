import { rest } from "msw";

export const handlers = [
  rest.get("https://api.coingecko.com/api/v3/search", (req, res, ctx) => {
    console.log(req);
    return res(ctx.json({}));
  }),
  rest.get(
    "https://api.coingecko.com/api/v3/search/trending",
    (req, res, ctx) => {
      return res(
        ctx.json({
          coins: [
            {
              item: {
                id: "solana",
                coin_id: 4128,
                name: "Solana",
                symbol: "SOL",
                market_cap_rank: 9,
                thumb:
                  "https://assets.coingecko.com/coins/images/4128/thumb/solana.png?1640133422",
                small:
                  "https://assets.coingecko.com/coins/images/4128/small/solana.png?1640133422",
                large:
                  "https://assets.coingecko.com/coins/images/4128/large/solana.png?1640133422",
                slug: "solana",
                price_btc: 0.0016500242966126471,
                score: 3,
              },
            },
            {
              item: {
                id: "crypto-com-chain",
                coin_id: 7310,
                name: "Cronos",
                symbol: "CRO",
                market_cap_rank: 20,
                thumb:
                  "https://assets.coingecko.com/coins/images/7310/thumb/oCw2s3GI_400x400.jpeg?1645172042",
                small:
                  "https://assets.coingecko.com/coins/images/7310/small/oCw2s3GI_400x400.jpeg?1645172042",
                large:
                  "https://assets.coingecko.com/coins/images/7310/large/oCw2s3GI_400x400.jpeg?1645172042",
                slug: "cronos",
                price_btc: 0.00000619784467427701,
                score: 4,
              },
            },
            {
              item: {
                id: "shiba-inu",
                coin_id: 11939,
                name: "Shiba Inu",
                symbol: "SHIB",
                market_cap_rank: 16,
                thumb:
                  "https://assets.coingecko.com/coins/images/11939/thumb/shiba.png?1622619446",
                small:
                  "https://assets.coingecko.com/coins/images/11939/small/shiba.png?1622619446",
                large:
                  "https://assets.coingecko.com/coins/images/11939/large/shiba.png?1622619446",
                slug: "shiba-inu",
                price_btc: 4.1599938548489856e-10,
                score: 5,
              },
            },
          ],
          exchanges: [],
        })
      );
    }
  ),
];
