-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

-- ========================================
-- Create the Service Project Table
-- ========================================

CREATE TABLE service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    event_location VARCHAR(150) NOT NULL,
    project_date DATE NOT NULL,

    CONSTRAINT fk_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
        ON DELETE CASCADE
);

-- ========================================
-- INSERT sample data: Service Projects
-- ========================================


INSERT INTO service_project
(organization_id, title, description, event_location, project_date)
VALUES

-- BrightFuture Builders (organization_id = 1)
(1, 'Community Park Renovation',
 'Renovating public parks using sustainable materials and volunteer labor.',
 'Portland, OR',
 '2026-06-10'),

(1, 'Affordable Housing Build',
 'Constructing affordable housing units for low-income families.',
 'Seattle, WA',
 '2026-07-15'),

(1, 'Bridge Repair Initiative',
 'Repairing damaged pedestrian bridges in rural communities.',
 'Boise, ID',
 '2026-08-05'),

(1, 'School Playground Upgrade',
 'Building safer playgrounds for elementary schools.',
 'Spokane, WA',
 '2026-09-12'),

(1, 'Neighborhood Cleanup Project',
 'Cleaning and restoring neglected neighborhood spaces.',
 'Salem, OR',
 '2026-10-01'),

-- GreenHarvest Growers (organization_id = 2)
(2, 'Urban Garden Workshop',
 'Teaching urban residents how to grow vegetables sustainably.',
 'Denver, CO',
 '2026-05-20'),

(2, 'Community Compost Program',
 'Launching compost collection and education programs.',
 'Austin, TX',
 '2026-06-18'),

(2, 'Rooftop Farming Initiative',
 'Creating rooftop gardens in downtown apartment buildings.',
 'Chicago, IL',
 '2026-07-22'),

(2, 'Youth Agriculture Camp',
 'Educating youth about sustainable agriculture practices.',
 'Phoenix, AZ',
 '2026-08-14'),

(2, 'Neighborhood Greenhouse Project',
 'Building small greenhouses for local food production.',
 'San Diego, CA',
 '2026-09-30'),

-- UnityServe Volunteers (organization_id = 3)
(3, 'Food Bank Volunteer Day',
 'Organizing volunteers to distribute food to families in need.',
 'Miami, FL',
 '2026-06-25'),

(3, 'Senior Support Program',
 'Helping senior citizens with home maintenance and errands.',
 'Atlanta, GA',
 '2026-07-11'),

(3, 'Community Clothing Drive',
 'Collecting and distributing clothing donations.',
 'Nashville, TN',
 '2026-08-09'),

(3, 'Disaster Relief Coordination',
 'Coordinating volunteers for emergency disaster response.',
 'Houston, TX',
 '2026-09-18'),

(3, 'Holiday Meal Service',
 'Providing meals for families during the holiday season.',
 'Charlotte, NC',
 '2026-12-20');

-- ========================================
-- Create the Category Table
-- ========================================

 CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- ========================================
-- Create the Service Project Category Junction Table
-- ========================================

CREATE TABLE service_project_category (
    project_id INT NOT NULL,
    category_id INT NOT NULL,

    PRIMARY KEY (project_id, category_id),

    CONSTRAINT fk_project
        FOREIGN KEY (project_id)
        REFERENCES service_project(project_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_category
        FOREIGN KEY (category_id)
        REFERENCES category(category_id)
        ON DELETE CASCADE
);

-- ========================================
-- Insert sample data into Category Table
-- ========================================

INSERT INTO category (name)
VALUES
('Community Service'),
('Sustainability'),
('Education');

-- ========================================
-- Insert sample data into Service Project Category Junction Table
-- ========================================


INSERT INTO service_project_category
(project_id, category_id)
VALUES
(1,1),
(1,2),
(2,1),
(3,1),
(4,3),
(5,1),
(6,2),
(7,2),
(8,3),
(9,2),
(10,2),
(11,1),
(12,3),
(13,1),
(14,2),
(15,1);