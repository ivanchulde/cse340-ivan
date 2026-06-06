import db from './db.js'

const getAllCategories = async () => {

    const query = `
        SELECT category_id, name
        FROM public.category
        ORDER BY name;
    `;

    const result = await db.query(query);

    return result.rows;
}

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

export { getAllCategories, getCategoryDetails, getCategoriesByProjectId, updateCategoryAssignments };