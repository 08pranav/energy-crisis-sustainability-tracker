import express from 'express';
import authRoutes from './auth.routes.js';
import usersRoutes from './users.routes.js';
import energyPricesRoutes from './energyPrices.routes.js';
import supplyRoutes from './supply.routes.js';
import renewablesRoutes from './renewables.routes.js';
import forecastRoutes from './forecast.routes.js';
import alertsRoutes from './alerts.routes.js';
import adminRoutes from './admin.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/energy-prices', energyPricesRoutes);
router.use('/supply', supplyRoutes);
router.use('/renewables', renewablesRoutes);
router.use('/forecast', forecastRoutes);
router.use('/alerts', alertsRoutes);
router.use('/admin', adminRoutes);

export default router;
