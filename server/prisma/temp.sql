CREATE TYPE Difficulty AS ENUM ('fácil', 'médio', 'difícil');
CREATE TYPE MockTestType AS ENUM ('personalizado', 'automático', 'antigo');

CREATE TABLE profile (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    profile_picture VARCHAR(255),
    creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    total_correct_answers INTEGER NOT NULL DEFAULT 0,
    total_incorrect_answers INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE mock_test (
    id SERIAL PRIMARY KEY,
    profile_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    total_wrong_answers INTEGER NOT NULL DEFAULT 0,
    total_correct_answers INTEGER NOT NULL DEFAULT 0,
    time_limit INTEGER NOT NULL,
    time_spent INTEGER NOT NULL DEFAULT 0,
    creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    type MockTestType NOT NULL,
    FOREIGN KEY (profile_id) REFERENCES profile(id) ON DELETE CASCADE
);

CREATE TABLE question (
    id SERIAL PRIMARY KEY,
    question_text TEXT NOT NULL,
    question_year INTEGER NOT NULL, 
    total_answers INTEGER NOT NULL DEFAULT 0,
    total_answers_right INTEGER NOT NULL DEFAULT 0,
    difficulty Difficulty NOT NULL,
    hasImage BOOLEAN,
    additional_info TEXT,
    area_id INTEGER NOT NULL,
    question_creator VARCHAR(255),
    test_name VARCHAR(255),
    question_number INTEGER
);

CREATE TABLE question_mock_test (
    question_id INTEGER NOT NULL,
    mock_test_id INTEGER NOT NULL,
    answer_id INTEGER,
    FOREIGN KEY (answer_id) REFERENCES answer(id),
    FOREIGN KEY (question_id) REFERENCES question(id) ON DELETE CASCADE,
    FOREIGN KEY (mock_test_id) REFERENCES mock_test(id) ON DELETE CASCADE,
    PRIMARY KEY (question_id, mock_test_id)
);

CREATE TABLE answer (
    id SERIAL PRIMARY KEY,
    question_id INTEGER NOT NULL,
    answer TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL, 
    FOREIGN KEY (question_id) REFERENCES question(id) ON DELETE CASCADE
); 


CREATE TABLE area (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    parent_id INTEGER,
    FOREIGN KEY (parent_id) REFERENCES area(id)
);

CREATE TABLE area_profile (
    area_id INTEGER NOT NULL,
    profile_id INTEGER NOT NULL,
    total_correct_answers INTEGER NOT NULL DEFAULT 0,
    total_answers INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (area_id) REFERENCES area(id),
    FOREIGN KEY (profile_id) REFERENCES profile(id) ON DELETE CASCADE,
    PRIMARY KEY (area_id, profile_id)
);