export const getConvRates = async (currency: string) => {
  const res = await fetch(`https://open.er-api.com/v6/latest/${currency}`);
  const rates = await res.json();
  return await rates.rates;
};
