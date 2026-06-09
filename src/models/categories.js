import db from './db.js'
// Helper function to get all categories
const getAllCategories = async () => {

    const query = `
        SELECT category_id, name
        FROM public.category
        ORDER BY name;
    `;

    const result = await db.query(query);

    return result.rows;
}
// Helper function to get category details by ID
const getCategoryDetails = async (id) => {
    const query = `
        SELECT
            category_id,
            name
        FROM public.category
        WHERE category_id = $1;
    `;
    const queryParams = [id];
    const result = await db.query(query, queryParams);
    return result.rows[0];
};
// Helper function to get categories assigned to a project
const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT
            c.category_id,
            c.name
        FROM category c
        JOIN service_project_category spc
            ON c.category_id = spc.category_id
        WHERE spc.project_id = $1;
    `;

    const queryParams = [projectId];
    const result = await db.query(query, queryParams);
    return result.rows;
};
// Helper function to assign a category to a project
const assignCategoryToProject = async (projectId, categoryId) => {

    const query = `
        INSERT INTO service_project_category
            (project_id, category_id)
        VALUES
            ($1, $2);
    `;

    const queryParams = [projectId, categoryId];

    await db.query(query, queryParams);
};
// Function to handle category assignments for a project
const updateCategoryAssignments = async (projectId, categoryIds) => {

    const deleteQuery = `
        DELETE FROM service_project_category
        WHERE project_id = $1;
    `;

    await db.query(deleteQuery, [projectId]);

    if (!categoryIds) {
        return;
    }

    const ids = Array.isArray(categoryIds)
        ? categoryIds
        : [categoryIds];

    for (const categoryId of ids) {
        await assignCategoryToProject(projectId, categoryId);
    }
};
// Function to create a new category
const createCategory = async (name) => {

    const query = `
        INSERT INTO category (name)
        VALUES ($1)
        RETURNING category_id;
    `;

    const result = await db.query(query, [name]);

    return result.rows[0].category_id;
};
// Additional function to update category details
const updateCategory = async (categoryId, name) => {

    const query = `
        UPDATE category
        SET name = $1
        WHERE category_id = $2
        RETURNING category_id;
    `;

    const result = await db.query(query, [name, categoryId]);

    if (result.rows.length === 0) {
        throw new Error('Category not found');
    }

    return result.rows[0].category_id;
};



export { getAllCategories, getCategoryDetails, getCategoriesByProjectId, updateCategoryAssignments, createCategory, updateCategory };