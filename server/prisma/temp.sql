CREATE TABLE profile (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    profile_picture VARCHAR(255),
    creation_date TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    total_correct_answers INTEGER NOT NULL DEFAULT 0,
    total_incorrect_answers INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE mock_test (
    id SERIAL PRIMARY KEY,
    profile_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL DEFAULT ('Simulado ' || id),
    total_wrong_answers INTEGER NOT NULL DEFAULT 0,
    total_correct_answers INTEGER NOT NULL DEFAULT 0,
    time_limit INTEGER NOT NULL,
    creation_date TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (profile_id) REFERENCES profile(id)
);