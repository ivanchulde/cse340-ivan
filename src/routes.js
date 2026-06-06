import express from 'express';

import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage, showOrganizationDetailsPage, showNewOrganizationForm, processNewOrganizationForm, organizationValidation, showEditOrganizationForm, processEditOrganizationForm} from './controllers/organizations.js';
import { showProjectsPage, showProjectDetailsPage, projectValidation, showNewProjectForm, processNewProjectForm} from './controllers/projects.js';
import { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm} from './controllers/categories.js';
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
router.get('/edit-organization/:id', showEditOrganizationForm); // Route for edit organization form
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm); // Route to handle edit organization form submission
router.get('/new-project', showNewProjectForm); // Route for new project form
router.post('/new-project', projectValidation, processNewProjectForm); // Route to handle new project form submission
router.get('/project/:projectId/assign-categories', showAssignCategoriesForm); // Route for assign categories form
router.post('/project/:projectId/assign-categories', processAssignCategoriesForm); // Route to handle assign categories form submission

export default router;