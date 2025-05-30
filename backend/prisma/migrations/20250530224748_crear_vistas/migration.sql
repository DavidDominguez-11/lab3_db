-- Crear vista vista_registro_habitos
CREATE OR REPLACE VIEW vista_registro_habitos AS
SELECT 
  rh.id AS registro_id,
  u.id AS usuario_id,
  u.nombre AS usuario_nombre,
  h.id AS habito_id,
  h.nombre AS habito_nombre,
  h.dificultad AS habito_dificultad,
  rh.fecha,
  rh.progreso
FROM registrohabito rh
JOIN usuario u ON rh."usuarioId" = u.id
JOIN habito h ON rh."habitoId" = h.id;

-- Crear vista vista_participacion_retos
CREATE OR REPLACE VIEW vista_participacion_retos AS
SELECT 
  pr.id AS participacion_id,
  u.id AS usuario_id,
  u.nombre AS usuario_nombre,
  r.id AS reto_id,
  r.nombre AS reto_nombre,
  r.fecha_inicio,
  r.fecha_fin,
  pr.completado
FROM participacionreto pr
JOIN usuario u ON pr."usuarioId" = u.id
JOIN reto r ON pr."retoId" = r.id;
