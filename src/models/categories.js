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

export { getAllCategories, getCategoryDetails, getCategoriesByProjectId };