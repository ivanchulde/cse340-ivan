import express from 'express';

import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage, showOrganizationDetailsPage, showNewOrganizationForm, processNewOrganizationForm, organizationValidation} from './controllers/organizations.js';
import { showProjectsPage, showProjectDetailsPage} from './controllers/projects.js';
import { showCategoriesPage, showCategoryDetailsPage} from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';



const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
router.get('/test-error', testErrorPage); // error-handling routes
router.get('/organization/:id', showOrganizationDetailsPage); // Route for organization details page
router.get('/project/:id', showProjectDetailsPage); // Route for project details page
router.get('/category/:id', showCategoryDetailsPage); // Route for category details page
router.get('/new-organization', showNewOrganizationForm); // Route for new organization form
router.post('/new-organization', organizationValidation, processNewOrganizationForm); // Route to handle new organization form submission

export default router;