import { getAllProjects, getUpcomingProjects, getProjectDetails, createProject, updateProject, addVolunteer, removeVolunteer, isVolunteer, getVolunteerProjects} from '../models/projects.js';
import { getCategoriesByProjectId} from '../models/categories.js';
import { getAllOrganizations } from '../models/organizations.js';
import { body, validationResult } from 'express-validator';

const projectValidation = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 3, max: 200 })
        .withMessage('Title must be between 3 and 200 characters'),

    body('description')
        .trim()
        .notEmpty().withMessage('Description is required')
        .isLength({ max: 1000 })
        .withMessage('Description must be less than 1000 characters'),

    body('eventLocation')
        .trim()
        .notEmpty().withMessage('Location is required')
        .isLength({ max: 200 })
        .withMessage('Location must be less than 200 characters'),

    body('projectDate')
        .notEmpty().withMessage('Date is required')
        .isISO8601()
        .withMessage('Date must be a valid date format'),

    body('organizationId')
        .notEmpty().withMessage('Organization is required')
        .isInt()
        .withMessage('Organization must be a valid integer')
];

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';
 
    res.render('projects', { title, projects });
};
// New controller function to show project details page
const showProjectDetailsPage = async (req, res) => {

    const projectId = req.params.id;
    const project = await getProjectDetails(projectId);
    const categories = await getCategoriesByProjectId(projectId);

    let volunteerStatus = false;

    if (req.session.user) {
        volunteerStatus = await isVolunteer(
            projectId,
            req.session.user.user_id
        );
    }

    const title = 'Project Details';

    res.render('project', {
        title,
        project,
        categories,
        volunteerStatus
    });
};

const showNewProjectForm = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Add New Service Project';

    res.render('new-project', { title, organizations });
}

const processNewProjectForm = async (req, res) => {
    // Check for validation errors
    const results = validationResult(req);
    if (!results.isEmpty()) {
        // Validation failed - loop through errors
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the new organization form
        return res.redirect('/new-project');
    }
    
    // Extract form data from req.body
    const { title, description, eventLocation, projectDate, organizationId } = req.body;

    try {
        // Create the new project in the database
        const newProjectId = await createProject(title, description, eventLocation, projectDate, organizationId);

        req.flash('success', 'New service project created successfully!');
        res.redirect(`/project/${newProjectId}`);
    } catch (error) {
        console.error('Error creating new project:', error);
        req.flash('error', 'There was an error creating the service project.');
        res.redirect('/new-project');
    }
}

const showEditProjectForm = async (req, res) => {

    const projectId = req.params.id;

    const project = await getProjectDetails(projectId);

    const organizations = await getAllOrganizations();

    const title = 'Edit Service Project';

    res.render('edit-project', {
        title,
        project,
        organizations
    });
};


const processEditProjectForm = async (req, res) => {
    const projectId = req.params.id;

    // Check for validation errors
    const results = validationResult(req);

    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect('/edit-project/' + projectId);
    }

    const {
        title,
        description,
        eventLocation,
        projectDate,
        organizationId
    } = req.body;

    await updateProject(
        projectId,
        title,
        description,
        eventLocation,
        projectDate,
        organizationId
    );

    req.flash('success', 'Project updated successfully!');

    res.redirect(`/project/${projectId}`);
};
// New controller function to handle volunteering for a project
const volunteerForProject = async (req, res) => {

    const projectId = req.params.id;
    const userId = req.session.user.user_id;

    await addVolunteer(projectId, userId);

    req.flash('success', 'You are now volunteering for this project.');

    res.redirect(`/project/${projectId}`);
};
// New controller function to handle removing volunteer signup for a project
const removeVolunteerFromProject = async (req, res) => {

    const projectId = req.params.id;
    const userId = req.session.user.user_id;

    await removeVolunteer(projectId, userId);

    req.flash('success', 'Volunteer signup removed.');

    if (req.body.source === 'dashboard') {
        return res.redirect('/dashboard');
    }

    res.redirect(`/project/${projectId}`);
};

// Export any controller functions
export { showProjectsPage, showProjectDetailsPage, projectValidation, showNewProjectForm, processNewProjectForm, showEditProjectForm, processEditProjectForm, volunteerForProject, removeVolunteerFromProject };