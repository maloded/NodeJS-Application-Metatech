DROP DATABASE IF EXISTS application;
DROP USER IF EXISTS mess;
CREATE USER mess WITH PASSWORD 'messenger';
CREATE DATABASE application OWNER mess;    
