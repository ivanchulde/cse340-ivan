import {getAllCategories, getCategoryDetails, getCategoriesByProjectId, updateCategoryAssignments } from '../models/categories.js';

import {getProjectDetails, getProjectsByCategoryId} from '../models/projects.js';

// Define any controller functions
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', { title, categories });
};  

const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    const category = await getCategoryDetails(categoryId);
    const projects = await getProjectsByCategoryId(categoryId);
    const title = category.name;

    res.render('category', {
        title,
        category,
        projects
    });
};

const showAssignCategoriesForm = async (req, res) => {

    const projectId = req.params.projectId;

    const project = await getProjectDetails(projectId);

    const categories = await getAllCategories();

    const assignedCategories =
        await getCategoriesByProjectId(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', {
        title,
        project,
        categories,
        assignedCategories
    });
};

const processAssignCategoriesForm = async (req, res) => {

    const projectId = req.params.projectId;

    const categoryIds = req.body.categoryIds;

    await updateCategoryAssignments(
        projectId,
        categoryIds
    );

    req.flash(
        'success',
        'Categories updated successfully!'
    );

    res.redirect(`/project/${projectId}`);
};


// Export any controller functions
export { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm };