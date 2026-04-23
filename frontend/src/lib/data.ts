export const initialCommodityData = {
  wti_crude: Array.from({ length: 50 }, (_, i) => ({
    time: i,
    price: 80 + Math.sin(i / 5) * 5 + Math.random() * 2,
  })),
  brent_crude: Array.from({ length: 50 }, (_, i) => ({
    time: i,
    price: 85 + Math.sin(i / 5) * 5 + Math.random() * 2,
  })),
  natural_gas: Array.from({ length: 50 }, (_, i) => ({
    time: i,
    price: 2.5 + Math.cos(i / 4) * 0.5 + Math.random() * 0.2,
  })),
  coal: Array.from({ length: 50 }, (_, i) => ({
    time: i,
    price: 130 + Math.sin(i / 10) * 10 + Math.random() * 5,
  })),
  electricity: Array.from({ length: 50 }, (_, i) => ({
    time: i,
    price: 90 + Math.cos(i / 8) * 15 + Math.random() * 4,
  })),
};

export const MOCK_COUNTRY_PROFILES = [
  { id: 'USA', name: 'United States', dependency: 15, primary: 'Oil', renewableShare: 20, conflictRisk: 10 },
  { id: 'DEU', name: 'Germany', dependency: 65, primary: 'Gas', renewableShare: 45, conflictRisk: 40 },
  { id: 'CHN', name: 'China', dependency: 80, primary: 'Coal', renewableShare: 30, conflictRisk: 20 },
  { id: 'IND', name: 'India', dependency: 85, primary: 'Coal', renewableShare: 22, conflictRisk: 30 },
  { id: 'FRA', name: 'France', dependency: 40, primary: 'Nuclear', renewableShare: 25, conflictRisk: 15 },
  { id: 'BRA', name: 'Brazil', dependency: 20, primary: 'Hydro', renewableShare: 80, conflictRisk: 10 },
  { id: 'UKR', name: 'Ukraine', dependency: 50, primary: 'Nuclear', renewableShare: 15, conflictRisk: 95 },
  { id: 'RUS', name: 'Russia', dependency: -100, primary: 'Gas', renewableShare: 18, conflictRisk: 85 },
];
