export default async function handler(req, res) {
  const { symbol, resolution, from, to } = req.query;

  if (!symbol || !resolution || !from || !to) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    const url = `https://finnhub.io/api/v1/stock/candle?symbol=${encodeURIComponent(symbol)}&resolution=${resolution}&from=${from}&to=${to}&token=${process.env.FINNHUB_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
