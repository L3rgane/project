DROP DATABASE IF EXISTS catering_db;
CREATE DATABASE catering_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE catering_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('customer','admin') NOT NULL DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE foods (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT DEFAULT NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_food_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT DEFAULT NULL,
    customer_name VARCHAR(100) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    address TEXT NOT NULL,
    event_date DATE NOT NULL,
    event_type ENUM('Wedding','Festival','Birthday','Business event','Private party') NOT NULL DEFAULT 'Wedding',
    total DECIMAL(10,2) NOT NULL DEFAULT 0,
    status ENUM('pending','confirmed','completed','cancelled') NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_order_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    food_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_item_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT fk_item_food FOREIGN KEY (food_id) REFERENCES foods(id) ON DELETE CASCADE
) ENGINE=InnoDB;

INSERT INTO categories (name) VALUES
('Wedding Menu'),
('Festival Food'),
('Moroccan Specials'),
('Desserts'),
('Drinks');

INSERT INTO foods (category_id, name, description, price, image) VALUES
(1, 'Royal Couscous', 'Traditional couscous for wedding celebrations.', 120.00, 'royal-couscous.jpg'),
(1, 'Chicken Pastilla', 'Sweet and savory pastilla with almonds.', 85.00, 'chicken-pastilla.jpg'),
(2, 'Mini Tacos', 'Perfect snack station for festivals and events.', 35.00, 'mini-tacos.jpg'),
(3, 'Mechoui Platter', 'Premium Moroccan roasted lamb platter.', 180.00, 'mechoui-platter.jpg'),
(4, 'Baklava Box', 'Honey and nut pastries for your guests.', 50.00, 'baklava.jpg'),
(5, 'Mint Tea', 'Fresh Moroccan mint tea service.', 15.00, 'mint-tea.jpg');

INSERT INTO users (name, email, password, role) VALUES
('Admin', 'admin@catering.com', '$2y$12$d6q.TiA.X6C3WFwZDHFbI.Ju4SVMIS0lsi8XNCn1lqAi4zgSDxwlS', 'admin');
