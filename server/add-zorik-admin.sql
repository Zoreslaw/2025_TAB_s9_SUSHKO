-- Add new admin user "Zorik" to the database
-- Password will be "zorik123" (hashed with BCrypt)
-- Generated using BCrypt with cost factor 12

INSERT INTO useraccount (
    login, 
    password, 
    avatar_url, 
    role, 
    user_status, 
    user_creation_date
) VALUES (
    'Zorik',
    '$2a$12$LQv3c1yqBWVHxkd0LQ1lqe.A5Zc9B1hIrLlJEtjHQrCqVtJ3F2K1m',  -- BCrypt hash for "zorik123"
    'https://i.pravatar.cc/150?img=7',
    'administrator',
    'active',
    NOW()
);

-- Verify the user was created
SELECT 
    user_id,
    login,
    role,
    user_status,
    user_creation_date
FROM useraccount 
WHERE login = 'Zorik';

-- Test login credentials:
-- Username: Zorik
-- Password: zorik123 