export const SLIDES_INFO = [
  { seedPools: "__", withoutNftUp: "40", withNftUp: "80", circleColor: "#FFFFFF", percent: "10", zamCount: "2", belt: "White", badgeContent: "1", icon: "images/zam-pad/1lvl.png", lvlNumber: '1', privatePool: 'Private', seedPool: '', multiplier: 'x2' },
  { seedPools: "__", withoutNftUp: "250", withNftUp: "450", circleColor: "#FECD08", percent: "20", zamCount: "10", belt: "Yellow", badgeContent: "1", icon: "images/zam-pad/2lvl.png", lvlNumber: '2', privatePool: 'Private', seedPool: '', multiplier: 'x1.8' },
  { seedPools: "__", withoutNftUp: "500", withNftUp: "750", circleColor: "#FA8003", percent: "20", zamCount: "30", belt: "Orange", badgeContent: "1", icon: "images/zam-pad/3lvl.png", lvlNumber: '3', privatePool: 'Private,', seedPool: 'Seed', multiplier: 'x1.5' },
  { seedPools: "__", withoutNftUp: "900", withNftUp: "1,350", circleColor: "#7AE404", percent: "12", zamCount: "80", belt: "Green", badgeContent: "2", icon: "images/zam-pad/4lvl.png", lvlNumber: '4', privatePool: 'Private,', seedPool: 'Seed', multiplier: 'x1.5' },
  { seedPools: "__", withoutNftUp: "1,600", withNftUp: "2,400", circleColor: "#1682F6", percent: "12", zamCount: "160", belt: "Blue", badgeContent: "3", icon: "images/zam-pad/5lvl.png", lvlNumber: '5', privatePool: 'Private,', seedPool: 'Seed', multiplier: 'x1.5' },
  { seedPools: "__", withoutNftUp: "2,800", withNftUp: "4,200", circleColor: "#6A3A24", percent: "10", zamCount: "320", belt: "Brown", badgeContent: "4", icon: "images/zam-pad/6lvl.png", lvlNumber: '6', privatePool: 'Private,', seedPool: 'Seed', multiplier: 'x1.5' },
  { seedPools: "__", withoutNftUp: "4,800", withNftUp: "7,200", circleColor: "#020202", percent: "8", zamCount: "500", belt: "Black", badgeContent: "5", icon: "images/zam-pad/7lvl.png", lvlNumber: '7', privatePool: 'Private,', seedPool: 'Seed', multiplier: 'x1.5' },
  { seedPools: "Private", withoutNftUp: "7,000", withNftUp: "10,500", circleColor: "#F31A12", percent: "8", zamCount: "800", belt: "Red", badgeContent: "6", icon: "images/zam-pad/8lvl.png", lvlNumber: '8', privatePool: 'Private,', seedPool: 'Seed', multiplier: 'x1.5' }
];

export const PARTICITATES_INFO = [
  { 
    number: "1.", 
    image: "images/zam-pad/register.svg", 
    title: "Register", 
    content: "In order to participate in sales on ZAMpad, you must register. You can still stake and earn ZAM without registering.", 
    button: "Start the KYC", 
    localUrl: "login" 
  },
  { 
    number: "2.", 
    image: "images/zam-pad/wallet.svg", 
    title: "Verify Wallet", 
    content: "Once you have registered, you must verify your wallet. This is the only wallet you will be able to use for sales.", 
    button: "Verify Wallet", 
    localUrl: ""
  },
  { 
    number: "3.", 
    image: "images/zam-pad/zam.svg", 
    title: "Allocation Staking", 
    content: "By staking ZAM, you earn allocation in ZAMpad. If you do not want to participate in sales, you can still benefit from staking.", 
    button: "Stake $ZAM", 
    localUrl: "staking" 
  },
  { 
    number: "4.", 
    image: "images/zam-pad/sale.svg", 
    title: "Whitelist for Sale", 
    content: "During the registration period, you must confirm your interest in participation. Once Whitelist closes, you will not be able to register until the next sale.", 
    button: "Register", 
    localUrl: "" 
  }
];

export const FILTERS_INFO = [
  {
    name: "All", 
    content: "All Networks", 
    icon: "", 
    modifier: ""
  },
  {
    name: "BSC", 
    content: "BSC", 
    icon: "images/zam-pad/bscc.svg", 
    modifier: "network-button__text_orange"
  },
  {
    name: "SOL", 
    content: "SOL", 
    icon: "images/zam-pad/sol.svg",
    modifier: ""
  },
  {
    name: "ETH", 
    content: "ETH", 
    icon: "images/zam-pad/eth.svg",
     modifier: ""
    },
  {
    name: "MATIC", 
    content: "MATIC", 
    icon: "images/zam-pad/matic.svg", 
    modifier: "network-button__text_violet"
  } 
];

export const SALES_INFO = [
  {
    title: "Oracula",
    description: "DeFi Prediction markets the way you’ve never played before.",
    followers: "12 432",
    score: "👌 7.8/10",
    access: "Private",
    image: "images/zam-pad/oracula.jpg",
    currency: "images/zam-pad/usd.svg",
    headerImage: "images/zam-pad/oracula-icon.svg",
    tokenName: "ORACULA",
    tokenPrice: "0.15",
    href: "/oracula",
    bsc: true,
    sol: false,
    eth: false,
    matic: false,
  },
];

export const DETAILED_INFO = [
  {
    title: "Oracula",
    description: "DeFi Prediction markets the way you’ve never played before.",
    followers: "12 432",
    score: "👌 7.8/10",
    access: "Private",
    image: "images/zam-pad/oracula.jpg",
    currency: "images/zam-pad/usd.svg",
    headerImage: "images/zam-pad/oracula-icon.svg",
    tokenName: "ORACULA",
    tokenPrice: "0.15",
    href: "/oracula",
    bsc: true,
    sol: false,
    eth: false,
    matic: false,
  }
];