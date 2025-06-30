DROP TABLE IF EXISTS property CASCADE;
DROP TABLE IF EXISTS admin CASCADE;
DROP TYPE IF EXISTS property_type_enum CASCADE;
DROP TYPE IF EXISTS operation_enum CASCADE;

CREATE TYPE property_type_enum AS ENUM (
    'casa',
    'departamento',
    'campo',
    'duplex',
    'local_comercial',
    'terreno'
);

CREATE TYPE operation_enum AS ENUM (
    'alquiler',
    'venta'
);

CREATE TABLE property (
                          id_property SERIAL PRIMARY KEY,
                          direction TEXT,
                          description TEXT,
                          price INTEGER,
                          property_type_id_property_type property_type_enum NOT NULL,
                          categoria_id_category operation_enum NOT NULL
);

CREATE TABLE admin (
                       id_admin SERIAL PRIMARY KEY,
                       admin_email VARCHAR(255) NOT NULL,
                       admin_password VARCHAR(255) NOT NULL
);

INSERT INTO admin (admin_email, admin_password) VALUES
    ('admin@inmobiliaria.com', 'password123');

INSERT INTO property (
    direction,
    description,
    price,
    property_type_id_property_type,
    categoria_id_category
) VALUES
      ('Av. Libertador 1234, San Isidro',
       'Casa familiar con jardín amplio',
       285000,
       'casa',
       'venta'),
      ('Gorriti 4567, Palermo',
       'Departamento moderno 2 ambientes',
       120000,
       'departamento',
       'alquiler'),
      ('Ruta Provincial 41 Km 15, Chascomús',
       'Campo de 5 hectáreas con casa',
       450000,
       'campo',
       'venta'),
      ('Los Jazmines 890, Pilar',
       'Duplex en barrio cerrado',
       195000,
       'duplex',
       'venta'),
      ('San Martín 2234, Tandil',
       'Local comercial céntrico',
       85000,
       'local_comercial',
       'alquiler');

SELECT
    id_property,
    direction,
    price,
    property_type_id_property_type as tipo,
    categoria_id_category as operacion
FROM property;