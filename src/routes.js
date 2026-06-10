import express from 'express';
import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage, showOrganizationDetailsPage, showNewOrganizationForm, processNewOrganizationForm, organizationValidation, showEditOrganizationForm, processEditOrganizationForm} from './controllers/organizations.js';
import { showProjectsPage, showProjectDetailsPage, projectValidation, showNewProjectForm, processNewProjectForm, showEditProjectForm, processEditProjectForm} from './controllers/projects.js';
import { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm, categoryValidation, showNewCategoryForm, processNewCategoryForm, showEditCategoryForm, processEditCategoryForm} from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';
import { showUserRegistrationForm, processUserRegistrationForm, showLoginForm, processLoginForm, processLogout, requireLogin,showDashboard, requireRole} from './controllers/users.js';



const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
router.get('/test-error', testErrorPage); // error-handling routes
router.get('/organization/:id', showOrganizationDetailsPage); // Route for organization details page
router.get('/project/:id', showProjectDetailsPage); // Route for project details page
router.get('/category/:id', showCategoryDetailsPage); // Route for category details page
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm); // Route for new organization form
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm); // Route to handle new organization form submission
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm); // Route for edit organization form
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm); // Route to handle edit organization form submission
router.get('/new-project', requireRole('admin'), showNewProjectForm); // Route for new project form
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm); // Route to handle new project form submission
router.get('/project/:projectId/assign-categories', requireRole('admin'), showAssignCategoriesForm); // Route for assign categories form
router.post('/project/:projectId/assign-categories', requireRole('admin'), processAssignCategoriesForm); // Route to handle assign categories form submission
router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm); // Route for edit project form
router.post('/edit-project/:id', requireRole('admin'), projectValidation, processEditProjectForm); // Route to handle edit project form submission
router.get('/new-category', requireRole('admin'), showNewCategoryForm); // Route for new category form
router.post('/new-category', requireRole('admin'), categoryValidation, processNewCategoryForm); // Route to handle new category form submission
router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm); // Route for edit category form
router.post('/edit-category/:id', requireRole('admin'), categoryValidation, processEditCategoryForm); // Route to handle edit category form submission
router.get('/register', showUserRegistrationForm); // Route for user registration form
router.post('/register', processUserRegistrationForm); // Route to handle user registration form submission
router.get('/login', showLoginForm); // Route for login form
router.post('/login', processLoginForm); // Route to handle login form submission
router.get('/logout', processLogout); // Route to handle user logout
router.get('/dashboard', requireLogin, showDashboard); // Route for user dashboard (protected route)

export default router;