import express from 'express';
import YahooFinance from 'yahoo-finance2';
import { env } from '../config/env.js';

const router = express.Router();
const CACHE_KEY = 'prices:latest';
const CACHE_TTL_SECONDS = 3600;

const yahooFinance = new YahooFinance();

async function getCachedPrices() {
  if (!env.upstashRedisUrl || !env.upstashRedisToken) {
    return null;
  }

  const url = `${env.upstashRedisUrl}/get/${encodeURIComponent(CACHE_KEY)}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${env.upstashRedisToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    return null;
  }

  const payload = await response.json();
  if (!payload?.result) {
    return null;
  }

  try {
    return JSON.parse(payload.result);
  } catch {
    return null;
  }
}

async function setCachedPrices(value) {
  if (!env.upstashRedisUrl || !env.upstashRedisToken) {
    return;
  }

  const encodedValue = encodeURIComponent(JSON.stringify(value));
  const url = `${env.upstashRedisUrl}/set/${encodeURIComponent(CACHE_KEY)}/${encodedValue}?ex=${CACHE_TTL_SECONDS}`;
  await fetch(url, {
    headers: {
      Authorization: `Bearer ${env.upstashRedisToken}`,
      'Content-Type': 'application/json'
    }
  });
}

function parseQuotePrice(quote) {
  return Number(
    quote?.regularMarketPrice ?? quote?.postMarketPrice ?? quote?.preMarketPrice ?? quote?.regularMarketPreviousClose ?? 0
  );
}

async function fetchPricesFromYahoo() {
  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 30);

    const [brentHistory, wtiHistory] = await Promise.all([
      yahooFinance.historical('BZ=F', { period1: startDate, period2: endDate }),
      yahooFinance.historical('CL=F', { period1: startDate, period2: endDate })
    ]);

    // Create a map of date to prices
    const brentMap = new Map();
    brentHistory.forEach(item => {
      const date = item.date.toISOString().split('T')[0]; // YYYY-MM-DD
      brentMap.set(date, item.close);
    });

    const wtiMap = new Map();
    wtiHistory.forEach(item => {
      const date = item.date.toISOString().split('T')[0];
      wtiMap.set(date, item.close);
    });

    // Combine into array of objects
    const allDates = new Set([...brentMap.keys(), ...wtiMap.keys()]);
    const data = Array.from(allDates).sort().map(date => ({
      date,
      brent: brentMap.get(date) || null,
      wti: wtiMap.get(date) || null
    }));

    return data;
  } catch (error) {
    throw new Error(`Yahoo Finance API error: ${error.message}`);
  }
}

router.get('/', async (req, res) => {
  try {
    const cached = await getCachedPrices();
    if (cached) {
      return res.json({ success: true, data: { historical: cached, source: 'cache' } });
    }

    const historical = await fetchPricesFromYahoo();
    await setCachedPrices(historical);

    return res.json({ success: true, data: { historical, source: 'yahoo' } });
  } catch (error) {
    console.error('Energy prices fetch failed:', error);
    return res.status(500).json({ success: false, message: 'Unable to load historical energy prices' });
  }
});

router.get('/latest', async (req, res) => {
  try {
    const cached = await getCachedPrices();
    if (cached) {
      return res.json({ success: true, data: { historical: cached, source: 'cache' } });
    }

    const historical = await fetchPricesFromYahoo();
    await setCachedPrices(historical);

    return res.json({ success: true, data: { historical, source: 'yahoo' } });
  } catch (error) {
    console.error('Energy prices latest fetch failed:', error);
    return res.status(500).json({ success: false, message: 'Unable to load historical energy prices' });
  }
});

export default router;
