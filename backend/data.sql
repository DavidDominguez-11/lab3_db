INSERT INTO usuario (nombre, email)
SELECT
  'Usuario ' || i,
  'usuario' || i || '@correo.com'
FROM generate_series(1, 30) AS i;

INSERT INTO habito (nombre, dificultad)
VALUES
  ('Beber agua', 'Facil'),
  ('Leer 20 min', 'Medio'),
  ('Ejercicio', 'Dificil');

INSERT INTO registro_habito (usuario_id, habito_id, progreso)
SELECT
  u.id,
  h.id,
  jsonb_build_object('dias_consecutivos', (random() * 29 + 1)::int, 'meta', 30)
FROM (
  SELECT id, row_number() OVER () as rn FROM usuario ORDER BY id
) u
JOIN (
  SELECT id, row_number() OVER () as rn FROM habito ORDER BY id
) h
ON (u.rn % 3) + 1 = h.rn;

INSERT INTO reto (nombre, fecha_inicio, fecha_fin)
SELECT
  'Reto ' || i,
  CURRENT_DATE - i,
  CURRENT_DATE + 10
FROM generate_series(1, 5) AS i;

INSERT INTO participacion_reto (usuario_id, reto_id, completado)
SELECT
  u.id,
  r.id,
  (random() < 0.5)
FROM (
  SELECT id, row_number() OVER () as rn FROM usuario ORDER BY id
) u
JOIN (
  SELECT id, row_number() OVER () as rn FROM reto ORDER BY id
) r
ON (u.rn % 5) + 1 = r.rn;
