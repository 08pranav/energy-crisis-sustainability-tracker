# API Catalog

This is the full API surface needed for the Energy Crisis & Sustainability Tracker MVP.

## Auth
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/refresh
- POST /api/auth/logout
- GET /api/auth/me

## Users
- GET /api/users
- GET /api/users/:id
- PATCH /api/users/:id
- DELETE /api/users/:id

## Energy Prices
- GET /api/energy-prices
- GET /api/energy-prices/latest
- GET /api/energy-prices/:iso3/trend
- GET /api/energy-prices/live

## Supply / Dependency / Conflict
- GET /api/supply/disruptions
- GET /api/supply/dependencies
- GET /api/conflicts
- GET /api/conflicts/:id

## Renewables
- GET /api/renewables/compare

## Forecasting
- GET /api/forecast/:iso3/:commodity

## Alerts
- GET /api/alerts
- POST /api/alerts/rules
- PATCH /api/alerts/rules/:id
- DELETE /api/alerts/rules/:id

## Admin / Ingestion
- POST /api/admin/upload
- POST /api/admin/ingest/iea
- POST /api/admin/ingest/bp
- GET /api/admin/ingestion-jobs

## Realtime
- WS /ws/prices
- GET /api/energy-prices/live
- GET /api/energy-prices/prices/live

## Report Export
- GET /api/reports/export.csv
- GET /api/reports/export.pdf
