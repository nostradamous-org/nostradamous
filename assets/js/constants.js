const chainsId = [
  {
    name: 'Avalanche',
    token: 'AVAX',
    icon: 'tokens/avax',
    id: 43113,
    network: 'Avalanche',
  },
  // {
  //   name: 'Aurora',
  //   token: 'Aurora',
  //   icon: 'tokens/aurora',
  //   id: 1313161555,
  //   network: 'aurora',
  // },
  // {
  //   name: 'Binance',
  //   token: 'BNB',
  //   icon: 'tokens/bnb',
  //   id: 97,
  //   network: 'binance',
  // },
  // {
  //   name: 'Ethereum Goerli',
  //   token: 'ETH',
  //   icon: 'tokens/eth',
  //   id: 5,
  //   network: 'Ethereum',
  // },
  {
    name: 'Fantom',
    token: 'FTM',
    icon: 'tokens/ftm',
    id: 4002,
    network: 'Fantom',
  },
  {
    name: 'Polygon',
    token: 'MATIC',
    icon: 'tokens/matic',
    id: 80001,
    network: 'Polygon',
  },
  {
    name: 'Moonbeam',
    token: 'GLMR',
    icon: 'tokens/moonbeam',
    id: 1287,
    network: 'Moonbeam',
  },
  // {
  //   name: 'Ethereum Goerli',
  //   token: 'ETH',
  //   id: 5,
  // },
  // {
  //   name: 'Avalanche Fuji',
  //   token: 'AVAX',
  //   id: 43113,
  // },
  // {
  //   name: 'Fantom Testnet',
  //   token: 'FTM',
  //   id: 4002,
  // },
  // {
  //   name: 'Polygon Mumbai',
  //   token: 'MATIC',
  //   id: 80001,
  // },
  // {
  //   name: 'Moonbase Alpha',
  //   token: 'DEV',
  //   id: 1287,
  // },
]

const tokens = [
  {
    name: 'USDC',
    token: 'USDC',
    id: 'USDC',
    main: false,
    icon: 'tokens/usdc',
    contracts: [
      {
        name: 'Avalanche',
        address: '0x5425890298aed601595a70AB815c96711a31Bc65',
      },
      {
        name: 'Fantom',
        address: '0xdEE65CaD824eD001a03215941FEb7c85D3E0aA94',
      },
      {
        name: 'Polygon',
        address: '0x234201E48499b104321CB482BeB5A7ae5F3d9627',
      },
      {
        name: 'Moonbase',
        address: '0x5F18ccF6d4826BD47a73979d1d7Fe7b2a64D6ebD',
      },
    ],
  },
  {
    name: 'aUSDC',
    token: 'aUSDC',
    id: 'aUSDC',
    main: false,
    icon: 'tokens/usdc',
    contracts: [
      {
        name: 'Avalanche',
        address: '0x57F1c63497AEe0bE305B8852b354CEc793da43bB',
      },
    ],
  },
]

export { chainsId, tokens }
