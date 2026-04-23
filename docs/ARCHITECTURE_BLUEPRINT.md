# Architecture Blueprint - Energy Crisis & Sustainability Tracker

This document provides production-quality architecture and team contracts for a 4-member parallel workflow.

## 1) Full Folder Structure (Frontend + Backend)

```text
FSD_MINI_PROJECT/
├── backend/
│   ├── .env.example
│   ├── package.json
│   ├── Dockerfile
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── config/
│   │   │   ├── env.js
│   │   │   ├── db.js
│   │   │   └── logger.js
│   │   ├── models/
│   │   │   ├── User.model.js
│   │   │   ├── EnergyPrice.model.js
│   │   │   ├── CountryDependency.model.js
│   │   │   └── ConflictEvent.model.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── users.controller.js
│   │   │   ├── energyPrices.controller.js
│   │   │   ├── supply.controller.js
│   │   │   ├── renewables.controller.js
│   │   │   ├── forecast.controller.js
│   │   │   └── admin.controller.js
│   │   ├── routes/
│   │   │   ├── index.js
│   │   │   ├── auth.routes.js
│   │   │   ├── users.routes.js
│   │   │   ├── energyPrices.routes.js
│   │   │   ├── supply.routes.js
│   │   │   ├── renewables.routes.js
│   │   │   ├── forecast.routes.js
│   │   │   ├── alerts.routes.js
│   │   │   └── admin.routes.js
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js
│   │   │   ├── role.middleware.js
│   │   │   ├── validate.middleware.js
│   │   │   ├── error.middleware.js
│   │   │   └── notFound.middleware.js
│   │   ├── validators/
│   │   │   ├── auth.validator.js
│   │   │   ├── user.validator.js
│   │   │   ├── energy.validator.js
│   │   │   └── upload.validator.js
│   │   ├── services/
│   │   │   ├── iea.service.js
│   │   │   ├── bpCsv.service.js
│   │   │   ├── forecast.service.js
│   │   │   ├── alert.service.js
│   │   │   └── reportExport.service.js
│   │   ├── socket/
│   │   │   └── priceSocket.js
│   │   ├── jobs/
│   │   │   └── refreshData.job.js
│   │   ├── scripts/
│   │   │   ├── seedEnergyPrices.js
│   │   │   └── ingestBpCsv.js
│   │   └── utils/
│   │       ├── apiError.js
│   │       ├── apiResponse.js
│   │       └── constants.js
│   └── uploads/
│       └── .gitkeep
├── frontend/
│   ├── .env.example
│   ├── package.json
│   ├── index.html
│   ├── Dockerfile
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── app/
│       │   └── store.js
│       ├── services/
│       │   ├── apiClient.js
│       │   ├── authApi.js
│       │   ├── energyApi.js
│       │   └── reportApi.js
│       ├── features/
│       │   ├── auth/
│       │   │   └── authSlice.js
│       │   ├── energy/
│       │   │   └── energySlice.js
│       │   ├── conflicts/
│       │   │   └── conflictSlice.js
│       │   └── alerts/
│       │       └── alertSlice.js
│       ├── pages/
│       │   ├── LoginPage.jsx
│       │   ├── RegisterPage.jsx
│       │   ├── DashboardPage.jsx
│       │   ├── MapPage.jsx
│       │   ├── ForecastPage.jsx
│       │   ├── ReportsPage.jsx
│       │   ├── AdminPanelPage.jsx
│       │   └── SettingsPage.jsx
│       ├── components/
│       │   ├── layout/
│       │   │   ├── Navbar.jsx
│       │   │   ├── Sidebar.jsx
│       │   │   ├── ProtectedRoute.jsx
│       │   │   └── RoleGuard.jsx
│       │   ├── charts/
│       │   │   ├── EnergyPriceLineChart.jsx
│       │   │   ├── RenewablesVsFossilChart.jsx
│       │   │   ├── ForecastChart.jsx
│       │   │   └── ConflictTimelineChart.jsx
│       │   ├── maps/
│       │   │   └── DependencyChoroplethMap.jsx
│       │   └── common/
│       │       ├── Loader.jsx
│       │       ├── KPIStatCard.jsx
│       │       └── ExportButtons.jsx
│       └── styles/
│           └── index.css
├── docs/
│   └── ARCHITECTURE_BLUEPRINT.md
├── docker-compose.yml
├── .gitignore
└── README.md
```

## 2) MongoDB Schema Definitions (Field Types + Validation)

### User
- name: String, required, trim, minLength 2, maxLength 80
- email: String, required, unique, lowercase, regex email format
- passwordHash: String, required
- role: String enum [admin, analyst], default analyst
- isActive: Boolean, default true
- lastLoginAt: Date, optional
- refreshTokenVersion: Number, default 0
- timestamps: true
- indexes: email unique

### EnergyPrice
- countryName: String, required, trim
- iso3: String, required, uppercase, length 3
- commodity: String enum [crude_oil, natural_gas, coal, electricity, lng, brent], required
- price: Number, required, min 0
- currency: String, default USD
- unit: String, required (barrel, mmbtu, ton, kwh)
- source: String enum [iea, bp, manual, simulated], required
- recordedAt: Date, required
- conflictEventId: ObjectId ref ConflictEvent, optional
- region: String, optional
- metadata: Mixed, optional
- timestamps: true
- indexes: iso3 + commodity + recordedAt desc

### CountryDependency
- countryName: String, required
- iso3: String, required, unique, uppercase, length 3
- region: String, required
- totalEnergyImportPct: Number, required, min 0, max 100
- fossilDependencyPct: Number, required, min 0, max 100
- renewableSharePct: Number, required, min 0, max 100
- majorSuppliers: Array of objects { country: String, sharePct: Number [0..100] }
- riskScore: Number, min 0, max 100
- year: Number, required
- source: String enum [iea, bp, merged], required
- timestamps: true
- indexes: iso3 unique, year

### ConflictEvent
- title: String, required, minLength 4, maxLength 180
- conflictType: String enum [war, sanctions, blockade, cyber, civil_unrest], required
- affectedCountriesIso3: [String], required, non-empty
- affectedCommodities: [String], default []
- startDate: Date, required
- endDate: Date, optional
- severity: String enum [low, medium, high, critical], required
- impactScore: Number, min 0, max 100, required
- summary: String, required, maxLength 2000
- sourceUrl: String, optional
- isActive: Boolean, default true
- timestamps: true
- indexes: isActive, severity, startDate desc

## 3) REST API Endpoint Definitions

All APIs are prefixed with /api.

### Auth + User Management

| Method | Path | Auth | Role | Description |
|---|---|---|---|---|
| POST | /auth/register | No | Public | Register analyst/admin user (admin creation restricted by invite key or admin token). |
| POST | /auth/login | No | Public | Login and return access + refresh tokens. |
| POST | /auth/refresh | Yes (refresh token) | Public | Issue new access token. |
| POST | /auth/logout | Yes | Admin/Analyst | Invalidate refresh token session. |
| GET | /auth/me | Yes | Admin/Analyst | Current user profile with role. |
| GET | /users | Yes | Admin | List users with pagination and filters. |
| GET | /users/:id | Yes | Admin | Get user detail. |
| PATCH | /users/:id | Yes | Admin | Update role or activation state. |
| DELETE | /users/:id | Yes | Admin | Soft-delete/deactivate user. |

### Energy Data + Analytics

| Method | Path | Auth | Role | Description |
|---|---|---|---|---|
| GET | /energy-prices | Yes | Admin/Analyst | Fetch historical prices with country/commodity/date filters. |
| GET | /energy-prices/latest | Yes | Admin/Analyst | Latest snapshot for dashboard KPIs. |
| GET | /energy-prices/:iso3/trend | Yes | Admin/Analyst | Country trend with optional conflict overlay. |
| GET | /supply/disruptions | Yes | Admin/Analyst | Supply disruption analytics by conflict events. |
| GET | /supply/dependencies | Yes | Admin/Analyst | Country dependency map payload (GeoJSON-join ready). |
| GET | /renewables/compare | Yes | Admin/Analyst | Renewable vs fossil trend comparison. |
| GET | /forecast/:iso3/:commodity | Yes | Admin/Analyst | Moving average / linear regression forecast series. |
| GET | /conflicts | Yes | Admin/Analyst | Conflict timeline list and filters. |
| GET | /conflicts/:id | Yes | Admin/Analyst | Detailed event with affected commodities. |

### Alerts + Realtime + Exports

| Method | Path | Auth | Role | Description |
|---|---|---|---|---|
| GET | /alerts | Yes | Admin/Analyst | Alert rules currently breached. |
| POST | /alerts/rules | Yes | Admin | Create threshold rule. |
| PATCH | /alerts/rules/:id | Yes | Admin | Update threshold rule. |
| DELETE | /alerts/rules/:id | Yes | Admin | Delete threshold rule. |
| GET | /reports/export.csv | Yes | Admin/Analyst | CSV export for selected filters. |
| GET | /reports/export.pdf | Yes | Admin/Analyst | PDF report generation. |
| WS | /ws/prices | Yes | Admin/Analyst | Live-ish updates via websocket stream. |
| GET | /prices/live | Yes | Admin/Analyst | Polling endpoint alternative to websocket. |

### Admin Data Ingestion

| Method | Path | Auth | Role | Description |
|---|---|---|---|---|
| POST | /admin/upload | Yes | Admin | Upload CSV dataset for ingestion. |
| POST | /admin/ingest/iea | Yes | Admin | Trigger IEA API sync job. |
| POST | /admin/ingest/bp | Yes | Admin | Trigger BP CSV normalization/import job. |
| GET | /admin/ingestion-jobs | Yes | Admin | List ingestion logs and statuses. |

## 4) Redux State Shape

```js
{
  auth: {
    user: { id, name, email, role, isActive } | null,
    accessToken: string | null,
    refreshToken: string | null,
    isAuthenticated: boolean,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null
  },
  energy: {
    latest: [],
    historical: {},
    renewablesVsFossil: [],
    forecast: {},
    filters: {
      countryIso3: 'all',
      commodity: 'all',
      from: null,
      to: null
    },
    kpis: {
      totalCountries: 0,
      globalPriceIndex: 0,
      disruptionCount: 0
    },
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null
  },
  conflict: {
    events: [],
    selectedEventId: null,
    timelineRange: { from: null, to: null },
    overlayEnabled: true,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null
  },
  alerts: {
    rules: [],
    activeAlerts: [],
    lastTriggeredAt: null,
    notificationPrefs: { email: false, inApp: true },
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null
  }
}
```

## 5) Team Breakdown (File/Feature Ownership)

| Person | Primary Scope | Files/Modules Owned | API/Contract Dependency |
|---|---|---|---|
| Person 1 (Backend Core & Auth) | Auth, users, security, validation, middleware | backend/src/app.js, backend/src/middleware/*, backend/src/routes/auth.routes.js, backend/src/routes/users.routes.js, backend/src/models/User.model.js, backend/src/validators/auth.validator.js, backend/src/validators/user.validator.js | Defines JWT format + role claims consumed by frontend authSlice and apiClient interceptor |
| Person 2 (Data Pipeline & API Integration) | Ingestion, normalization, analytics endpoints, scheduler, realtime feed | backend/src/services/iea.service.js, backend/src/services/bpCsv.service.js, backend/src/services/forecast.service.js, backend/src/routes/energyPrices.routes.js, backend/src/routes/supply.routes.js, backend/src/routes/renewables.routes.js, backend/src/routes/admin.routes.js, backend/src/jobs/refreshData.job.js, backend/src/socket/priceSocket.js, backend/src/models/EnergyPrice.model.js, backend/src/models/CountryDependency.model.js, backend/src/models/ConflictEvent.model.js | Publishes stable response DTOs consumed by energySlice/conflictSlice/chart components |
| Person 3 (Frontend Core & Auth UI) | App shell, auth pages, protected routing, Redux setup | frontend/src/app/store.js, frontend/src/features/auth/authSlice.js, frontend/src/features/energy/energySlice.js, frontend/src/features/conflicts/conflictSlice.js, frontend/src/services/apiClient.js, frontend/src/components/layout/*, frontend/src/pages/LoginPage.jsx, frontend/src/pages/RegisterPage.jsx, frontend/src/pages/DashboardPage.jsx, frontend/src/pages/SettingsPage.jsx | Depends on auth/user API contract and returns tokens with role claim |
| Person 4 (Visualization & Maps) | Charts, map, timeline, forecast view, export UI, responsive styles | frontend/src/components/charts/*, frontend/src/components/maps/DependencyChoroplethMap.jsx, frontend/src/components/common/ExportButtons.jsx, frontend/src/pages/MapPage.jsx, frontend/src/pages/ForecastPage.jsx, frontend/src/pages/ReportsPage.jsx, frontend/src/pages/AdminPanelPage.jsx, frontend/src/styles/index.css | Depends on energy/supply/conflict/report API DTOs; no direct auth logic changes |

Parallelization Rule: each person works in owned modules and only changes shared contracts via pull request + team approval.

## 6) Suggested Git Workflow (4-Person Team)

### Branching Strategy
- main: production-ready branch
- develop: integration branch for sprint work
- feature/personX-short-task: personal task branch (example: feature/p2-iea-ingestion)
- release/v0.x.y: optional stabilization branch before demo

### Daily Flow
1. Pull latest develop.
2. Create or update feature branch.
3. Commit atomic changes with conventional commit style.
4. Push and open PR to develop.
5. At least 1 teammate review required; 2 for shared contract changes.
6. Merge with squash.
7. Run integration smoke test on develop daily.

### Commit Naming
- feat(auth): add refresh token rotation
- feat(energy): add trend endpoint filters
- fix(frontend): handle 401 token refresh race
- docs(cep): map wp4 websocket design choice

### Protection Rules
- No direct push to main/develop.
- Required checks: lint + tests + build.
- CODEOWNERS for person-owned folders.

## 7) CEP Mapping Table (WP1-WP7)

| WP | Requirement | Implementation Evidence |
|---|---|---|
| WP1 | MERN, API design, JWT, DB modeling | React+Redux frontend, Express REST backend, MongoDB schemas (User/EnergyPrice/CountryDependency/ConflictEvent), JWT auth with refresh flow |
| WP2 | Trade-offs (performance vs security, scalability vs cost) | Rate-limit + helmet + Joi validation, lean Mongoose queries + indexed fields, polling fallback when websocket infra cost is high |
| WP3 | Design decisions and justification | MongoDB chosen for heterogeneous time-series/event documents; REST chosen over GraphQL due to simpler role middleware, cacheability, and team learning curve |
| WP4 | Realtime + map interactivity | /ws/prices websocket stream + /prices/live polling; D3 choropleth with GeoJSON and conflict overlay markers |
| WP5 | REST standards + JWT + validation + centralized errors | Versioned REST routes, bearer token middleware, Joi validators per route, global error middleware and API response envelope |
| WP6 | Role-based behavior (Admin vs Analyst) | Backend role guard middleware + frontend RoleGuard component; admin-only ingestion/user-management, analyst read/export scope |
| WP7 | Full integration of frontend/backend/db/external APIs | React dashboard consumes Express APIs; MongoDB persistence; IEA/BP ingestion pipelines; charts/maps visualize integrated data |

## 8) Environment Variables (.env templates)

Use these templates:
- backend/.env.example
- frontend/.env.example

Both templates are committed and should be copied to .env locally. Never commit real secrets.

## API Contract Notes for Parallel Integration

- All responses should follow:
  - success: boolean
  - message: string
  - data: object | array
  - meta: optional pagination/diagnostic
- Time fields should be ISO-8601.
- Country code canonical format: ISO3 uppercase.
- Commodity canonical keys: crude_oil, natural_gas, coal, electricity, lng, brent.

## Trade-off Notes (for report viva)

- REST over GraphQL: lower operational complexity for a 4-member academic team, easier endpoint-level authorization, straightforward caching.
- MongoDB over SQL: flexible schema supports mixed external datasets and evolving conflict metadata.
- WebSocket + polling hybrid: websocket for live dashboards, polling fallback for network/proxy constraints.
- Security posture: strong bcrypt rounds + short-lived access tokens + refresh rotation + rate limiting.
