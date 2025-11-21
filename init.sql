USE gimnasio;

SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'socio',
    created_at DATETIME(3),
    updated_at DATETIME(3)
);

-- Crear tabla de actividades
CREATE TABLE IF NOT EXISTS activities (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    instructor VARCHAR(255) NOT NULL,
    day VARCHAR(50) NOT NULL,
    schedule VARCHAR(50) NOT NULL,
    duration_minutes INT NOT NULL,
    capacity INT NOT NULL,
    image_url VARCHAR(500),
    created_at DATETIME(3),
    updated_at DATETIME(3)
);

-- Crear tabla de inscripciones
CREATE TABLE IF NOT EXISTS enrollments (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    activity_id BIGINT UNSIGNED NOT NULL,
    enrolled_at DATETIME(3),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE
);

-- Usuario admin (password: admin123)
INSERT INTO users (email, password_hash, first_name, last_name, role, created_at, updated_at)
VALUES (
    'admin@gimnasio.com',
    '240be518fabd2724ddb6f04eeb9d5b0b9e9c0e3e4e0f4f1f9f5e4d4c3b2a1908',
    'Admin',
    'Sistema',
    'admin',
    NOW(),
    NOW()
);

-- Usuario socio (password: socio123)
INSERT INTO users (email, password_hash, first_name, last_name, role, created_at, updated_at)
VALUES (
    'socio@gimnasio.com',
    'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f',
    'Juan',
    'Pérez',
    'socio',
    NOW(),
    NOW()
);

-- Actividades de ejemplo
INSERT INTO activities (title, description, category, instructor, day, schedule, duration_minutes, capacity, image_url, created_at, updated_at)
VALUES 
    ('Spinning Intensivo', 'Clase de spinning de alta intensidad para quemar calorías', 'spinning', 'María García', 'Lunes', '09:00', 45, 20, 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48', NOW(), NOW()),
    ('Funcional Full Body', 'Entrenamiento funcional para todo el cuerpo', 'funcional', 'Carlos López', 'Martes', '10:00', 60, 15, 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b', NOW(), NOW()),
    ('MMA Principiantes', 'Introducción a las artes marciales mixtas', 'mma', 'Roberto Díaz', 'Miércoles', '18:00', 90, 12, 'https://images.unsplash.com/photo-1555597673-b21d5c935865', NOW(), NOW()),
    ('Yoga Relajación', 'Sesión de yoga para reducir el estrés', 'yoga', 'Ana Martínez', 'Jueves', '08:00', 60, 25, 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b', NOW(), NOW()),
    ('CrossFit WOD', 'Workout of the day de CrossFit', 'crossfit', 'Pedro Sánchez', 'Viernes', '17:00', 50, 18, 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb', NOW(), NOW());