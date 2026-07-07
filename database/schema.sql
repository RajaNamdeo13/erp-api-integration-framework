CREATE TABLE IF NOT EXISTS financial_records (

    id SERIAL PRIMARY KEY,

    invoice_number VARCHAR(50),

    customer_name VARCHAR(100),

    amount DECIMAL(10,2),

    currency VARCHAR(10),

    status VARCHAR(20),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);