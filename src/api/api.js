export const base = "https://api.coingecko.com/api/v3";

export const fetchCoinList = async () => {
  try {
    const response = await fetch(`${base}/coins/list`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const fetchChartData = async (crypto, days, vs_currency) => {
  try {
    const response = await fetch(
      `${base}/coins/${crypto}/market_chart?vs_currency=${vs_currency}&days=${days}&interval=daily`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
