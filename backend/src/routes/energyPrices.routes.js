import express from 'express';
import YahooFinance from 'yahoo-finance2';
import { env } from '../config/env.js';

const router = express.Router();
const CACHE_KEY = 'prices:latest';
const CACHE_TTL_SECONDS = 3600;

const yahooFinance = new YahooFinance();

async function deleteCachedPrices() {
  if (!env.upstashRedisUrl || !env.upstashRedisToken) {
    return;
  }

  const url = `${env.upstashRedisUrl}/del/${encodeURIComponent(CACHE_KEY)}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${env.upstashRedisToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    console.warn('Unable to delete cached prices on startup:', response.status);
  }
}

(async function flushCacheOnStartup() {
  try {
    if (env.upstashRedisUrl && env.upstashRedisToken) {
      await deleteCachedPrices();
      console.log('Energy price cache flushed on startup');
    }
  } catch (error) {
    console.warn('Cache flush startup failed:', error);
  }
})();

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
      yahooFinance.historical('BZ=F', { period1: startDate, period2: endDate, interval: '1d' }),
      yahooFinance.historical('CL=F', { period1: startDate, period2: endDate, interval: '1d' })
    ]);

    if (!Array.isArray(brentHistory) || !Array.isArray(wtiHistory)) {
      throw new Error('Yahoo Finance returned invalid historical data');
    }

    const brentMap = new Map();
    brentHistory.forEach(item => {
      const date = item?.date instanceof Date ? item.date.toISOString().split('T')[0] : String(item?.date || '');
      brentMap.set(date, item?.close ?? null);
    });

    const wtiMap = new Map();
    wtiHistory.forEach(item => {
      const date = item?.date instanceof Date ? item.date.toISOString().split('T')[0] : String(item?.date || '');
      wtiMap.set(date, item?.close ?? null);
    });

    const allDates = new Set([...brentMap.keys(), ...wtiMap.keys()]);
    const data = Array.from(allDates)
      .filter((date) => date)
      .sort()
      .map(date => ({
        date,
        brent: brentMap.get(date) ?? null,
        wti: wtiMap.get(date) ?? null
      }));

    if (data.length < 20) {
      throw new Error(`Expected at least 20 historical points, got ${data.length}`);
    }

    return data;
  } catch (error) {
    throw new Error(`Yahoo Finance API error: ${error.message}`);
  }
}

router.get('/', async (req, res) => {
  try {
    const forceRefresh = req.query.force === 'true' || req.query.force === '1';
    if (forceRefresh) {
      await deleteCachedPrices();
    }

    const cached = forceRefresh ? null : await getCachedPrices();
    if (cached) {
      return res.json({ success: true, data: cached, source: 'cache' });
    }

    const data = await fetchPricesFromYahoo();
    await setCachedPrices(data);

    return res.json({ success: true, data, source: 'yahoo' });
  } catch (error) {
    console.error('Energy prices fetch failed:', error);
    return res.status(500).json({ success: false, message: 'Unable to load historical energy prices' });
  }
});

router.get('/latest', async (req, res) => {
  try {
    const forceRefresh = req.query.force === 'true' || req.query.force === '1';
    if (forceRefresh) {
      await deleteCachedPrices();
    }

    const cached = forceRefresh ? null : await getCachedPrices();
    if (cached) {
      return res.json({ success: true, data: cached, source: 'cache' });
    }

    const data = await fetchPricesFromYahoo();
    await setCachedPrices(data);

    return res.json({ success: true, data, source: 'yahoo' });
  } catch (error) {
    console.error('Energy prices latest fetch failed:', error);
    return res.status(500).json({ success: false, message: 'Unable to load historical energy prices' });
  }
});

export default router;
