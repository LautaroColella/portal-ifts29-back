-- ============================================================
-- Portal IFTS 29 - Script de datos de prueba (seed)
-- ============================================================
-- Ejecutar después de que TypeORM haya creado las tablas (synchronize: true).
-- Uso: psql -U postgres -d portal_ifts29 -f scripts/seed.sql
--
-- Contraseña de todos los usuarios: Password123!
-- ============================================================

-- Limpiar datos existentes (en orden por dependencias)
TRUNCATE TABLE notifications, ticket_history, messages, comments, tickets, users RESTART IDENTITY CASCADE;

-- ============================================================
-- USUARIOS
-- ============================================================
-- Hash bcrypt pre-generado (10 salt rounds):
--   "Password123!" → $2b$10$BuIUsgft/Z4f3zekEIaziuCGWUtEhutdj0yJ0FcspLvTMAku3YyQC

INSERT INTO users (id, "firstName", "lastName", dni, email, password, role, "staffType", "responsibleSubcategories", "createdAt", "updatedAt") VALUES
-- ADMIN (id=1)
(1, 'Carlos', 'Rodríguez', '30111222', 'admin@admin.com',
 '$2b$10$BuIUsgft/Z4f3zekEIaziuCGWUtEhutdj0yJ0FcspLvTMAku3YyQC',
 'ADMIN', NULL, NULL,
 '2025-01-05 08:00:00', '2025-01-05 08:00:00'),

-- MANAGEMENT (id=2)
(2, 'Patricia', 'Gómez', '28555666', 'management@management.com',
 '$2b$10$BuIUsgft/Z4f3zekEIaziuCGWUtEhutdj0yJ0FcspLvTMAku3YyQC',
 'MANAGEMENT', NULL, NULL,
 '2025-01-06 09:00:00', '2025-01-06 09:00:00'),

-- STAFF - Tutor académico (id=3)
(3, 'Roberto', 'García', '32444555', 'staff@staff.com',
 '$2b$10$BuIUsgft/Z4f3zekEIaziuCGWUtEhutdj0yJ0FcspLvTMAku3YyQC',
 'STAFF', 'TUTOR', 'GRADE_ISSUE,EXAM_ISSUE,CORRELATIVITY_ISSUE,SUBJECT_CONTENT_ISSUE',
 '2025-01-10 10:00:00', '2025-01-10 10:00:00'),

-- STAFF - Tutor académico 2 (id=4)
(4, 'Laura', 'Sánchez', '31777888', 'staff2@staff.com',
 '$2b$10$BuIUsgft/Z4f3zekEIaziuCGWUtEhutdj0yJ0FcspLvTMAku3YyQC',
 'STAFF', 'TUTOR', 'GRADE_ISSUE,EXAM_ISSUE,SUBJECT_CONTENT_ISSUE',
 '2025-01-11 11:00:00', '2025-01-11 11:00:00'),

-- STAFF - Bedel institucional (id=5)
(5, 'Sofía', 'Ramírez', '33222111', 'staff.bedel@staff.com',
 '$2b$10$BuIUsgft/Z4f3zekEIaziuCGWUtEhutdj0yJ0FcspLvTMAku3YyQC',
 'STAFF', 'BEDEL', 'SUBJECT_EQUIVALENCY_REQUEST,GRADE_RECORD_CORRECTION_REQUEST,EXAM_CERTIFICATE_REQUEST,DEGREE_PROCESS_REQUEST,CLASS_SECTION_CHANGE_REQUEST',
 '2025-01-12 08:30:00', '2025-01-12 08:30:00'),

-- STAFF - Soporte técnico (id=6)
(6, 'Diego', 'Herrera', '34666777', 'staff.tech@staff.com',
 '$2b$10$BuIUsgft/Z4f3zekEIaziuCGWUtEhutdj0yJ0FcspLvTMAku3YyQC',
 'STAFF', 'TECH_SUPPORT', 'MOODLE_PROBLEM,SIU_PROBLEM,WEBSITE_ERROR',
 '2025-01-13 09:00:00', '2025-01-13 09:00:00'),

-- STAFF - Coordinador (id=7)
(7, 'Miguel', 'Torres', '29888999', 'staff.coord@staff.com',
 '$2b$10$BuIUsgft/Z4f3zekEIaziuCGWUtEhutdj0yJ0FcspLvTMAku3YyQC',
 'STAFF', 'COORDINATOR', 'GENERAL_INQUIRY',
 '2025-01-14 10:00:00', '2025-01-14 10:00:00'),

-- STUDENT (id=8)
(8, 'María', 'López', '40123456', 'student@student.com',
 '$2b$10$BuIUsgft/Z4f3zekEIaziuCGWUtEhutdj0yJ0FcspLvTMAku3YyQC',
 'STUDENT', NULL, NULL,
 '2025-02-01 14:00:00', '2025-02-01 14:00:00'),

-- STUDENT (id=9)
(9, 'Juan', 'Pérez', '41234567', 'student2@student.com',
 '$2b$10$BuIUsgft/Z4f3zekEIaziuCGWUtEhutdj0yJ0FcspLvTMAku3YyQC',
 'STUDENT', NULL, NULL,
 '2025-02-05 15:00:00', '2025-02-05 15:00:00'),

-- STUDENT (id=10)
(10, 'Ana', 'Martínez', '42345678', 'student3@student.com',
 '$2b$10$BuIUsgft/Z4f3zekEIaziuCGWUtEhutdj0yJ0FcspLvTMAku3YyQC',
 'STUDENT', NULL, NULL,
 '2025-02-10 10:00:00', '2025-02-10 10:00:00'),

-- STUDENT (id=11)
(11, 'Luis', 'Fernández', '43456789', 'student4@student.com',
 '$2b$10$BuIUsgft/Z4f3zekEIaziuCGWUtEhutdj0yJ0FcspLvTMAku3YyQC',
 'STUDENT', NULL, NULL,
 '2025-02-15 11:00:00', '2025-02-15 11:00:00'),

-- STUDENT (id=12)
(12, 'Camila', 'Ruiz', '44567890', 'student5@student.com',
 '$2b$10$BuIUsgft/Z4f3zekEIaziuCGWUtEhutdj0yJ0FcspLvTMAku3YyQC',
 'STUDENT', NULL, NULL,
 '2025-03-01 09:00:00', '2025-03-01 09:00:00');

SELECT setval('users_id_seq', 12);

-- ============================================================
-- TICKETS
-- ============================================================

INSERT INTO tickets (id, title, description, status, category, subcategory, subject, commission, metadata, "createdAt", "updatedAt", "resolvedAt", "closedAt", "createdById", "assignedToId") VALUES

-- Ticket 1: Académico - Problema con nota (OPEN)
(1, 'No aparece mi calificación del parcial',
 'Rendí el primer parcial de Programación I el día 15/04 y todavía no aparece la nota en el sistema. Mis compañeros ya tienen la suya cargada.',
 'OPEN', 'ACADEMIC', 'GRADE_ISSUE', 'Programación I', '1K',
 NULL,
 '2025-05-01 10:30:00', '2025-05-01 14:00:00', NULL, NULL, 8, 3),

-- Ticket 2: Técnico - Moodle (IN_PROGRESS)
(2, 'No puedo acceder a Moodle desde hace 3 días',
 'El sistema me rechaza las credenciales aunque estoy seguro de que son correctas. Probé restablecer la contraseña y sigue sin funcionar.',
 'IN_PROGRESS', 'TECHNICAL', 'MOODLE_PROBLEM', NULL, NULL,
 NULL,
 '2025-04-28 09:15:00', '2025-04-29 11:00:00', NULL, NULL, 9, 6),

-- Ticket 3: Institucional - Cambio de comisión (CLOSED)
(3, 'Solicitud de cambio de comisión por trabajo',
 'Necesito cambiar mi horario de clase de la comisión 2A a la 2K por conflicto laboral. Mi nuevo trabajo me exige estar de 14 a 18 hs.',
 'CLOSED', 'INSTITUTIONAL', 'CLASS_SECTION_CHANGE_REQUEST', 'Matemática II', '2A',
 '{"destinationCommission":"2K"}',
 '2025-04-20 16:00:00', '2025-04-25 10:00:00', '2025-04-24 15:00:00', '2025-04-25 10:00:00', 10, 5),

-- Ticket 4: Técnico - Error sitio web (IN_PROGRESS)
(4, 'Error al subir trabajos prácticos en el sitio',
 'El sistema no me permite subir archivos mayores a 5MB. Mi proyecto de Ingeniería de Software pesa 8MB y no puedo entregarlo.',
 'IN_PROGRESS', 'TECHNICAL', 'WEBSITE_ERROR', 'Ingeniería de Software', '3K',
 NULL,
 '2025-04-25 11:00:00', '2025-04-26 14:00:00', NULL, NULL, 11, 6),

-- Ticket 5: Institucional - Equivalencia (WAITING_FOR_STUDENT)
(5, 'Solicitud de equivalencia de Matemática I',
 'Aprobé Análisis Matemático I en la UTN con nota 8. Adjunto certificado analítico. Solicito la equivalencia para Matemática I del IFTS 29.',
 'WAITING_FOR_STUDENT', 'INSTITUTIONAL', 'SUBJECT_EQUIVALENCY_REQUEST', 'Matemática I', '1A',
 '{"institution":"UTN - FRBA","approvedSubject":"Análisis Matemático I","grade":"8"}',
 '2025-04-22 14:30:00', '2025-04-28 09:00:00', NULL, NULL, 12, 5),

-- Ticket 6: Académico - Problema con examen (OPEN)
(6, 'Error en la fecha de examen final publicada',
 'En el cronograma de exámenes figura que el final de Base de Datos es el 10/06, pero la profesora nos dijo en clase que es el 17/06. Hay una inconsistencia.',
 'OPEN', 'ACADEMIC', 'EXAM_ISSUE', 'Base de Datos', '2K',
 NULL,
 '2025-05-02 08:45:00', '2025-05-02 08:45:00', NULL, NULL, 9, 3),

-- Ticket 7: General - Consulta (RESOLVED)
(7, 'Consulta sobre inscripción a materias del segundo cuatrimestre',
 'Quisiera saber cuándo abre la inscripción a las materias del segundo cuatrimestre y si hay algún requisito adicional para Redes.',
 'RESOLVED', 'GENERAL', 'GENERAL_INQUIRY', NULL, NULL,
 NULL,
 '2025-04-15 17:00:00', '2025-04-18 10:00:00', '2025-04-18 10:00:00', NULL, 8, 7),

-- Ticket 8: Técnico - SIU (OPEN)
(8, 'SIU Guaraní no muestra materias aprobadas',
 'En el SIU Guaraní no aparecen las materias que aprobé este cuatrimestre. Ya pasaron 2 semanas desde que se cargaron las actas.',
 'OPEN', 'TECHNICAL', 'SIU_PROBLEM', NULL, NULL,
 NULL,
 '2025-05-03 13:00:00', '2025-05-03 13:00:00', NULL, NULL, 10, 6),

-- Ticket 9: Institucional - Certificado de examen (IN_PROGRESS)
(9, 'Solicitud de certificado de asistencia a examen',
 'Necesito un certificado que acredite que rendí el examen final de Programación II el día 20/04/2025 para presentar en mi trabajo.',
 'IN_PROGRESS', 'INSTITUTIONAL', 'EXAM_CERTIFICATE_REQUEST', 'Programación II', '2A',
 '{"examDate":"2025-04-20"}',
 '2025-04-21 09:00:00', '2025-04-23 11:00:00', NULL, NULL, 11, 5),

-- Ticket 10: Académico - Correlatividad (WAITING_FOR_THIRD_PARTY)
(10, 'No puedo inscribirme a Programación II',
 'El sistema no me deja inscribirme a Programación II diciendo que no tengo aprobada Programación I, pero ya la aprobé en diciembre.',
 'WAITING_FOR_THIRD_PARTY', 'ACADEMIC', 'CORRELATIVITY_ISSUE', 'Programación II', '2K',
 NULL,
 '2025-04-18 10:30:00', '2025-04-22 16:00:00', NULL, NULL, 12, 4),

-- Ticket 11: Institucional - Trámite de título (OPEN)
(11, 'Inicio de trámite de título de Técnico Superior',
 'Habiendo completado todas las materias de la carrera, solicito iniciar el trámite de mi título de Técnico Superior en Análisis de Sistemas.',
 'OPEN', 'INSTITUTIONAL', 'DEGREE_PROCESS_REQUEST', NULL, NULL,
 '{"gender":"M","birthDate":"1998-03-15","birthCountry":"Argentina","birthLocation":"CABA, Buenos Aires","lastYearCycle":"2025"}',
 '2025-05-04 11:00:00', '2025-05-04 11:00:00', NULL, NULL, 9, 5),

-- Ticket 12: Académico - Contenido de materia (CANCELLED)
(12, 'Diferencia entre programa y contenido dado en clase',
 'El programa oficial de Redes incluye IPv6, pero en clase no se vio nada de ese tema y el profesor dijo que no entra en el final.',
 'CANCELLED', 'ACADEMIC', 'SUBJECT_CONTENT_ISSUE', 'Redes', '3A',
 NULL,
 '2025-04-10 15:00:00', '2025-04-12 09:00:00', NULL, '2025-04-12 09:00:00', 10, 4),

-- Ticket 13: Institucional - Corrección de acta (RESOLVED)
(13, 'Corrección de nota en acta de examen',
 'En el acta de examen de Matemática II figura un 6, pero mi nota real fue un 8. El profesor confirmó el error.',
 'RESOLVED', 'INSTITUTIONAL', 'GRADE_RECORD_CORRECTION_REQUEST', 'Matemática II', '2A',
 '{"grade":"8","examDate":"2025-03-20"}',
 '2025-03-25 09:00:00', '2025-04-02 14:00:00', '2025-04-02 14:00:00', NULL, 8, 5),

-- Ticket 14: General - Consulta (CLOSED)
(14, 'Horarios de atención de bedelía en vacaciones',
 'Quisiera saber los horarios de atención de bedelía durante el receso de invierno para hacer un trámite presencial.',
 'CLOSED', 'GENERAL', 'GENERAL_INQUIRY', NULL, NULL,
 NULL,
 '2025-04-05 12:00:00', '2025-04-08 16:00:00', '2025-04-07 10:00:00', '2025-04-08 16:00:00', 11, 7),

-- Ticket 15: Técnico - Moodle (RESOLVED)
(15, 'No puedo ver los materiales del aula virtual',
 'Los materiales de Ingeniería de Software que subió el profesor no me aparecen en el aula de Moodle. Mis compañeros sí los pueden ver.',
 'RESOLVED', 'TECHNICAL', 'MOODLE_PROBLEM', 'Ingeniería de Software', '3K',
 NULL,
 '2025-04-12 08:00:00', '2025-04-14 17:00:00', '2025-04-14 17:00:00', NULL, 12, 6),

-- Ticket 16: Académico - Nota incorrecta (OPEN)
(16, 'Nota del TP grupal no refleja mi participación',
 'En el TP grupal de Programación II me pusieron un 4 pero yo hice la mayor parte del trabajo. Tengo los commits de Git como prueba.',
 'OPEN', 'ACADEMIC', 'GRADE_ISSUE', 'Programación II', '2K',
 NULL,
 '2025-05-05 09:00:00', '2025-05-05 09:00:00', NULL, NULL, 10, 3),

-- Ticket 17: Técnico - SIU (IN_PROGRESS)
(17, 'No puedo generar el certificado analítico desde el SIU',
 'Cuando intento generar el certificado analítico parcial desde el SIU Guaraní, me aparece un error que dice "Servicio no disponible". Ya lo intenté en distintos horarios.',
 'IN_PROGRESS', 'TECHNICAL', 'SIU_PROBLEM', NULL, NULL,
 NULL,
 '2025-05-06 10:15:00', '2025-05-07 09:00:00', NULL, NULL, 11, 6),

-- Ticket 18: Institucional - Certificado (RESOLVED)
(18, 'Solicitud de certificado de alumno regular',
 'Necesito un certificado de alumno regular para presentar en ANSES y renovar la beca Progresar.',
 'RESOLVED', 'INSTITUTIONAL', 'EXAM_CERTIFICATE_REQUEST', NULL, NULL,
 NULL,
 '2025-04-08 11:00:00', '2025-04-11 14:00:00', '2025-04-11 14:00:00', NULL, 8, 5),

-- Ticket 19: Académico - Contenido (OPEN)
(19, 'Falta de material bibliográfico en el campus',
 'El profesor de Sistemas Operativos mencionó que subiría apuntes y guías de ejercicios al campus virtual, pero a la fecha no hay nada cargado.',
 'OPEN', 'ACADEMIC', 'SUBJECT_CONTENT_ISSUE', 'Sistemas Operativos', '2K',
 NULL,
 '2025-05-07 14:30:00', '2025-05-07 14:30:00', NULL, NULL, 9, 4),

-- Ticket 20: Técnico - Web (CLOSED)
(20, 'La página de horarios no carga correctamente',
 'La sección de horarios de cursada en la web del instituto muestra una tabla vacía. Otros compañeros tienen el mismo problema.',
 'CLOSED', 'TECHNICAL', 'WEBSITE_ERROR', NULL, NULL,
 NULL,
 '2025-03-20 08:00:00', '2025-03-28 10:00:00', '2025-03-26 15:00:00', '2025-03-28 10:00:00', 12, 6),

-- Ticket 21: General - Consulta (RESOLVED)
(21, 'Consulta sobre becas disponibles para estudiantes',
 'Quisiera saber si el instituto tiene algún convenio de becas o programa de ayuda económica para estudiantes que trabajan.',
 'RESOLVED', 'GENERAL', 'GENERAL_INQUIRY', NULL, NULL,
 NULL,
 '2025-04-01 16:00:00', '2025-04-03 11:00:00', '2025-04-03 11:00:00', NULL, 10, 7),

-- Ticket 22: Institucional - Trámite título (WAITING_FOR_STUDENT)
(22, 'Documentación pendiente para trámite de título',
 'Inicié el trámite de título hace un mes y me dijeron que falta documentación. No me queda claro qué documentos debo presentar.',
 'WAITING_FOR_STUDENT', 'INSTITUTIONAL', 'DEGREE_PROCESS_REQUEST', NULL, NULL,
 NULL,
 '2025-04-25 09:00:00', '2025-04-30 10:00:00', NULL, NULL, 11, 5),

-- Ticket 23: Académico - Examen (IN_PROGRESS)
(23, 'Mesa de examen no aparece en el cronograma',
 'La mesa de examen de Estadística de julio no figura en el cronograma publicado, pero el profesor confirmó que va a haber mesa.',
 'IN_PROGRESS', 'ACADEMIC', 'EXAM_ISSUE', 'Estadística', '1K',
 NULL,
 '2025-05-08 08:00:00', '2025-05-09 11:00:00', NULL, NULL, 8, 3),

-- Ticket 24: Técnico - Moodle (RESOLVED)
(24, 'Error al entregar trabajo práctico en Moodle',
 'Intenté subir el TP de Laboratorio II en formato .zip y Moodle me dice que el formato no está permitido, aunque el profesor pidió que sea en .zip.',
 'RESOLVED', 'TECHNICAL', 'MOODLE_PROBLEM', 'Laboratorio II', '2K',
 NULL,
 '2025-04-15 09:30:00', '2025-04-17 14:00:00', '2025-04-17 14:00:00', NULL, 9, 6),

-- Ticket 25: Institucional - Corrección acta (IN_PROGRESS)
(25, 'Error en acta de cursada - figura ausente',
 'En el acta de cursada de Inglés II figuro como ausente en el segundo parcial, pero yo lo rendí y aprobé con 7. Tengo el examen corregido.',
 'IN_PROGRESS', 'INSTITUTIONAL', 'GRADE_RECORD_CORRECTION_REQUEST', 'Inglés II', '2K',
 '{"grade":"7","examType":"segundo parcial"}',
 '2025-05-01 08:00:00', '2025-05-03 10:00:00', NULL, NULL, 12, 5),

-- Ticket 26: Académico - Correlatividad (OPEN)
(26, 'Sistema no reconoce materia aprobada por equivalencia',
 'Obtuve la equivalencia de Matemática I pero el sistema de correlatividades no la reconoce y no me deja inscribirme a Matemática II.',
 'OPEN', 'ACADEMIC', 'CORRELATIVITY_ISSUE', 'Matemática II', '2K',
 NULL,
 '2025-05-09 10:00:00', '2025-05-09 10:00:00', NULL, NULL, 10, 4),

-- Ticket 27: Técnico - SIU (WAITING_FOR_THIRD_PARTY)
(27, 'SIU no permite inscripción a final',
 'Quiero inscribirme al final de Programación I pero el SIU me dice que el período de inscripción está cerrado, aunque según el cronograma debería estar abierto.',
 'WAITING_FOR_THIRD_PARTY', 'TECHNICAL', 'SIU_PROBLEM', 'Programación I', '1K',
 NULL,
 '2025-05-03 07:30:00', '2025-05-05 09:00:00', NULL, NULL, 8, 6),

-- Ticket 28: Institucional - Cambio comisión (CLOSED)
(28, 'Cambio de comisión por superposición horaria',
 'Tengo superposición horaria entre Redes (3A) y Laboratorio III (3K). Solicito cambio de comisión de Redes.',
 'CLOSED', 'INSTITUTIONAL', 'CLASS_SECTION_CHANGE_REQUEST', 'Redes', '3A',
 '{"destinationCommission":"3K"}',
 '2025-03-15 10:00:00', '2025-03-22 16:00:00', '2025-03-20 14:00:00', '2025-03-22 16:00:00', 11, 5),

-- Ticket 29: General - Consulta (CANCELLED)
(29, 'Consulta sobre biblioteca virtual',
 'Quería saber si el instituto tiene acceso a alguna biblioteca virtual con libros de programación.',
 'CANCELLED', 'GENERAL', 'GENERAL_INQUIRY', NULL, NULL,
 NULL,
 '2025-04-02 13:00:00', '2025-04-03 08:00:00', NULL, '2025-04-03 08:00:00', 9, 7),

-- Ticket 30: Institucional - Equivalencia (OPEN)
(30, 'Solicitud de equivalencia de Inglés I',
 'Tengo el First Certificate in English (FCE) de Cambridge. Solicito equivalencia de Inglés I presentando este certificado internacional.',
 'OPEN', 'INSTITUTIONAL', 'SUBJECT_EQUIVALENCY_REQUEST', 'Inglés I', '1K',
 '{"institution":"Cambridge","certificate":"FCE","level":"B2"}',
 '2025-05-10 11:00:00', '2025-05-10 11:00:00', NULL, NULL, 10, 5);

SELECT setval('tickets_id_seq', 30);

-- ============================================================
-- COMMENTS
-- ============================================================

INSERT INTO comments (id, content, "createdAt", "ticketId", "authorId") VALUES
-- Ticket 1
(1, 'Quiero aclarar que el examen fue presencial en la sede de Av. Triunvirato.', '2025-05-01 11:00:00', 1, 8),
(2, 'Agrego que mi número de legajo es 2024-1234.', '2025-05-01 15:00:00', 1, 8),

-- Ticket 2
(3, 'Probé también desde otro navegador y el problema persiste.', '2025-04-28 14:00:00', 2, 9),
(4, 'Quiero agregar que también intenté desde el celular sin éxito.', '2025-04-29 08:00:00', 2, 9),

-- Ticket 3
(5, 'Adjunté por email el certificado laboral como respaldo.', '2025-04-21 10:00:00', 3, 10),

-- Ticket 5
(6, 'El certificado analítico lo envié por email a bedelía también.', '2025-04-23 09:00:00', 5, 12),

-- Ticket 7
(7, 'Muchas gracias por la información, me fue muy útil.', '2025-04-18 11:00:00', 7, 8),

-- Ticket 9
(8, 'Necesito el certificado antes del viernes si es posible.', '2025-04-22 08:00:00', 9, 11),

-- Ticket 10
(9, 'Adjunto captura de pantalla del SIU donde muestra Prog I aprobada.', '2025-04-19 11:00:00', 10, 12),

-- Ticket 13
(10, 'El profesor García me confirmó por email que la nota es 8.', '2025-03-26 10:00:00', 13, 8),

-- Ticket 16
(11, 'Tengo los commits en GitHub que demuestran que hice el 80% del código del TP.', '2025-05-05 10:00:00', 16, 10),

-- Ticket 17
(12, 'Probé desde la red del instituto y desde mi casa, mismo error.', '2025-05-06 14:00:00', 17, 11),

-- Ticket 22
(13, 'Me acerqué a bedelía pero me dijeron que lo gestione por acá.', '2025-04-26 09:00:00', 22, 11),

-- Ticket 23
(14, 'El profesor Martínez me confirmó por WhatsApp que la mesa está aprobada.', '2025-05-08 12:00:00', 23, 8),

-- Ticket 25
(15, 'Adjunto foto del examen corregido con la nota 7 y la firma del profesor.', '2025-05-01 10:00:00', 25, 12),

-- Ticket 26
(16, 'La equivalencia fue aprobada por resolución N° 2025-0234.', '2025-05-09 12:00:00', 26, 10),

-- Ticket 30
(17, 'Adjunto copia escaneada del certificado FCE.', '2025-05-10 14:00:00', 30, 10);

SELECT setval('comments_id_seq', 17);

-- ============================================================
-- MESSAGES (privados entre staff)
-- ============================================================

INSERT INTO messages (id, content, "createdAt", "ticketId", "authorId") VALUES
-- Ticket 1 (asignado a Roberto García - id=3)
(1, 'Buen día María. Estoy verificando con el profesor la carga de notas. Te aviso a la brevedad.', '2025-05-01 14:00:00', 1, 3),

-- Ticket 2 (asignado a Diego Herrera - id=6)
(2, 'Hola Juan, estamos revisando tu cuenta en Moodle. ¿Podrías indicarme tu nombre de usuario?', '2025-04-29 11:00:00', 2, 6),
(3, 'Encontré el problema: tu cuenta estaba deshabilitada por inactividad. Ya la reactivé, probá ingresar de nuevo.', '2025-04-29 16:00:00', 2, 6),

-- Ticket 3 (asignado a Sofía Ramírez - id=5)
(4, 'Recibimos tu solicitud. El cambio a la comisión 2K está aprobado, efectivo desde la semana que viene.', '2025-04-24 15:00:00', 3, 5),

-- Ticket 4 (asignado a Diego Herrera - id=6)
(5, 'Estamos al tanto del problema. Vamos a aumentar el límite de subida a 15MB. Esperamos tenerlo listo mañana.', '2025-04-26 14:00:00', 4, 6),

-- Ticket 5 (asignado a Sofía Ramírez - id=5)
(6, 'Camila, necesitamos que nos envíes el certificado analítico original legalizado. ¿Podés acercarlo a bedelía?', '2025-04-28 09:00:00', 5, 5),

-- Ticket 7 (asignado a Miguel Torres - id=7)
(7, 'La inscripción al segundo cuatrimestre abre el 15/07. Para Redes necesitás tener Programación II aprobada.', '2025-04-17 14:00:00', 7, 7),
(8, 'Te confirmo que no hay requisitos adicionales más allá de las correlatividades.', '2025-04-18 10:00:00', 7, 7),

-- Ticket 9 (asignado a Sofía Ramírez - id=5)
(9, 'Luis, el certificado está siendo procesado. Lo tendremos listo para el jueves.', '2025-04-23 11:00:00', 9, 5),

-- Ticket 10 (asignado a Laura Sánchez - id=4)
(10, 'Camila, ya contactamos al área de Sistemas Académicos para que revisen la correlatividad en el SIU. Estamos esperando su respuesta.', '2025-04-22 16:00:00', 10, 4),

-- Ticket 13 (asignado a Sofía Ramírez - id=5)
(11, 'María, ya contactamos al profesor para que firme la rectificación del acta.', '2025-03-28 10:00:00', 13, 5),
(12, 'El acta fue corregida exitosamente. La nota 8 ya figura en el sistema.', '2025-04-02 14:00:00', 13, 5),

-- Ticket 14 (asignado a Miguel Torres - id=7)
(13, 'Los horarios de bedelía en vacaciones de invierno son de lunes a viernes de 10 a 14 hs.', '2025-04-07 10:00:00', 14, 7),

-- Ticket 15 (asignado a Diego Herrera - id=6)
(14, 'Camila, revisé tu acceso al aula. Estabas inscripta en una sección equivocada. Ya te moví al aula correcta.', '2025-04-14 12:00:00', 15, 6),
(15, 'Confirmame si ahora podés ver los materiales.', '2025-04-14 12:05:00', 15, 6),

-- Ticket 16 (asignado a Roberto García - id=3)
(16, 'Ana, voy a revisar con el profesor la evaluación del TP grupal. Te comento a la brevedad.', '2025-05-05 14:00:00', 16, 3),

-- Ticket 17 (asignado a Diego Herrera - id=6)
(17, 'Luis, ya abrimos un ticket con el equipo de SIU Guaraní a nivel central. Estamos esperando respuesta.', '2025-05-07 09:00:00', 17, 6),

-- Ticket 18 (asignado a Sofía Ramírez - id=5)
(18, 'María, tu certificado de alumno regular ya está listo. Podés retirarlo por bedelía.', '2025-04-11 14:00:00', 18, 5),

-- Ticket 19 (asignado a Laura Sánchez - id=4)
(19, 'Juan, voy a contactar al profesor de SO para consultarle sobre el material. Te aviso.', '2025-05-08 09:00:00', 19, 4),

-- Ticket 20 (asignado a Diego Herrera - id=6)
(20, 'El problema era un error en el CSS de la tabla. Ya fue corregido.', '2025-03-26 15:00:00', 20, 6),

-- Ticket 21 (asignado a Miguel Torres - id=7)
(21, 'Ana, el instituto tiene convenio con la beca Progresar y también con el programa Potenciar Trabajo. Te paso los links de inscripción por email.', '2025-04-03 11:00:00', 21, 7),

-- Ticket 22 (asignado a Sofía Ramírez - id=5)
(22, 'Luis, necesitamos que presentes: fotocopia del DNI, certificado analítico de secundario legalizado, y 2 fotos 4x4.', '2025-04-30 10:00:00', 22, 5),

-- Ticket 23 (asignado a Roberto García - id=3)
(23, 'María, ya contacté a la coordinación de la carrera. Están verificando con la dirección de estudios.', '2025-05-09 11:00:00', 23, 3),

-- Ticket 24 (asignado a Diego Herrera - id=6)
(24, 'Juan, el formato .zip fue habilitado en la configuración de Moodle. Ya podés subir tu TP.', '2025-04-17 14:00:00', 24, 6),

-- Ticket 25 (asignado a Sofía Ramírez - id=5)
(25, 'Camila, ya contactamos al profesor para que rectifique el acta de cursada.', '2025-05-03 10:00:00', 25, 5),

-- Ticket 27 (asignado a Diego Herrera - id=6)
(26, 'María, el período de inscripción efectivamente estaba cerrado por error. Contactamos al equipo de SIU para que lo reabran.', '2025-05-05 09:00:00', 27, 6),

-- Ticket 28 (asignado a Sofía Ramírez - id=5)
(27, 'Luis, el cambio de comisión fue aprobado. A partir de la semana que viene cursás Redes en la comisión 3K.', '2025-03-20 14:00:00', 28, 5);

SELECT setval('messages_id_seq', 27);

-- ============================================================
-- TICKET HISTORY
-- ============================================================

INSERT INTO ticket_history (id, action, "oldValue", "newValue", description, "createdAt", "ticketId", "performedById") VALUES
-- Ticket 1
(1, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-05-01 10:30:00', 1, 8),
(2, 'ASSIGNED_CHANGED', NULL, 'Roberto García', 'Responsable asignado: Roberto García', '2025-05-01 10:30:00', 1, 8),

-- Ticket 2
(3, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-04-28 09:15:00', 2, 9),
(4, 'ASSIGNED_CHANGED', NULL, 'Diego Herrera', 'Responsable asignado: Diego Herrera', '2025-04-28 09:15:00', 2, 9),
(5, 'STATUS_CHANGED', 'OPEN', 'IN_PROGRESS', 'Estado cambiado de Abierto a En progreso', '2025-04-29 11:00:00', 2, 6),
(6, 'MESSAGE_ADDED', NULL, NULL, 'Mensaje agregado', '2025-04-29 11:00:00', 2, 6),
(7, 'COMMENT_ADDED', NULL, NULL, 'Comentario agregado', '2025-04-29 08:00:00', 2, 9),

-- Ticket 3
(8, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-04-20 16:00:00', 3, 10),
(9, 'ASSIGNED_CHANGED', NULL, 'Sofía Ramírez', 'Responsable asignado: Sofía Ramírez', '2025-04-20 16:00:00', 3, 10),
(10, 'STATUS_CHANGED', 'OPEN', 'IN_PROGRESS', 'Estado cambiado de Abierto a En progreso', '2025-04-22 09:00:00', 3, 5),
(11, 'STATUS_CHANGED', 'IN_PROGRESS', 'RESOLVED', 'Estado cambiado de En progreso a Resuelto', '2025-04-24 15:00:00', 3, 5),
(12, 'STATUS_CHANGED', 'RESOLVED', 'CLOSED', 'Estado cambiado de Resuelto a Cerrado', '2025-04-25 10:00:00', 3, 5),

-- Ticket 4
(13, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-04-25 11:00:00', 4, 11),
(14, 'ASSIGNED_CHANGED', NULL, 'Diego Herrera', 'Responsable asignado: Diego Herrera', '2025-04-25 11:00:00', 4, 11),
(15, 'STATUS_CHANGED', 'OPEN', 'IN_PROGRESS', 'Estado cambiado de Abierto a En progreso', '2025-04-26 14:00:00', 4, 6),

-- Ticket 5
(16, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-04-22 14:30:00', 5, 12),
(17, 'ASSIGNED_CHANGED', NULL, 'Sofía Ramírez', 'Responsable asignado: Sofía Ramírez', '2025-04-22 14:30:00', 5, 12),
(18, 'STATUS_CHANGED', 'OPEN', 'IN_PROGRESS', 'Estado cambiado de Abierto a En progreso', '2025-04-25 10:00:00', 5, 5),
(19, 'STATUS_CHANGED', 'IN_PROGRESS', 'WAITING_FOR_STUDENT', 'Estado cambiado de En progreso a Esperando al estudiante', '2025-04-28 09:00:00', 5, 5),

-- Ticket 6
(20, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-05-02 08:45:00', 6, 9),
(21, 'ASSIGNED_CHANGED', NULL, 'Roberto García', 'Responsable asignado: Roberto García', '2025-05-02 08:45:00', 6, 9),

-- Ticket 7
(22, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-04-15 17:00:00', 7, 8),
(23, 'ASSIGNED_CHANGED', NULL, 'Miguel Torres', 'Responsable asignado: Miguel Torres', '2025-04-15 17:00:00', 7, 8),
(24, 'STATUS_CHANGED', 'OPEN', 'IN_PROGRESS', 'Estado cambiado de Abierto a En progreso', '2025-04-17 14:00:00', 7, 7),
(25, 'STATUS_CHANGED', 'IN_PROGRESS', 'RESOLVED', 'Estado cambiado de En progreso a Resuelto', '2025-04-18 10:00:00', 7, 7),

-- Ticket 8
(26, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-05-03 13:00:00', 8, 10),
(27, 'ASSIGNED_CHANGED', NULL, 'Diego Herrera', 'Responsable asignado: Diego Herrera', '2025-05-03 13:00:00', 8, 10),

-- Ticket 9
(28, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-04-21 09:00:00', 9, 11),
(29, 'ASSIGNED_CHANGED', NULL, 'Sofía Ramírez', 'Responsable asignado: Sofía Ramírez', '2025-04-21 09:00:00', 9, 11),
(30, 'STATUS_CHANGED', 'OPEN', 'IN_PROGRESS', 'Estado cambiado de Abierto a En progreso', '2025-04-23 11:00:00', 9, 5),

-- Ticket 10
(31, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-04-18 10:30:00', 10, 12),
(32, 'ASSIGNED_CHANGED', NULL, 'Laura Sánchez', 'Responsable asignado: Laura Sánchez', '2025-04-18 10:30:00', 10, 12),
(33, 'STATUS_CHANGED', 'OPEN', 'IN_PROGRESS', 'Estado cambiado de Abierto a En progreso', '2025-04-20 09:00:00', 10, 4),
(34, 'STATUS_CHANGED', 'IN_PROGRESS', 'WAITING_FOR_THIRD_PARTY', 'Estado cambiado de En progreso a Esperando a un tercero', '2025-04-22 16:00:00', 10, 4),

-- Ticket 11
(35, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-05-04 11:00:00', 11, 9),
(36, 'ASSIGNED_CHANGED', NULL, 'Sofía Ramírez', 'Responsable asignado: Sofía Ramírez', '2025-05-04 11:00:00', 11, 9),

-- Ticket 12
(37, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-04-10 15:00:00', 12, 10),
(38, 'ASSIGNED_CHANGED', NULL, 'Laura Sánchez', 'Responsable asignado: Laura Sánchez', '2025-04-10 15:00:00', 12, 10),
(39, 'STATUS_CHANGED', 'OPEN', 'CANCELLED', 'Estado cambiado de Abierto a Cancelado', '2025-04-12 09:00:00', 12, 10),

-- Ticket 13
(40, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-03-25 09:00:00', 13, 8),
(41, 'ASSIGNED_CHANGED', NULL, 'Sofía Ramírez', 'Responsable asignado: Sofía Ramírez', '2025-03-25 09:00:00', 13, 8),
(42, 'STATUS_CHANGED', 'OPEN', 'IN_PROGRESS', 'Estado cambiado de Abierto a En progreso', '2025-03-28 10:00:00', 13, 5),
(43, 'STATUS_CHANGED', 'IN_PROGRESS', 'RESOLVED', 'Estado cambiado de En progreso a Resuelto', '2025-04-02 14:00:00', 13, 5),

-- Ticket 14
(44, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-04-05 12:00:00', 14, 11),
(45, 'ASSIGNED_CHANGED', NULL, 'Miguel Torres', 'Responsable asignado: Miguel Torres', '2025-04-05 12:00:00', 14, 11),
(46, 'STATUS_CHANGED', 'OPEN', 'IN_PROGRESS', 'Estado cambiado de Abierto a En progreso', '2025-04-07 10:00:00', 14, 7),
(47, 'STATUS_CHANGED', 'IN_PROGRESS', 'RESOLVED', 'Estado cambiado de En progreso a Resuelto', '2025-04-07 10:00:00', 14, 7),
(48, 'STATUS_CHANGED', 'RESOLVED', 'CLOSED', 'Estado cambiado de Resuelto a Cerrado', '2025-04-08 16:00:00', 14, 7),

-- Ticket 15
(49, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-04-12 08:00:00', 15, 12),
(50, 'ASSIGNED_CHANGED', NULL, 'Diego Herrera', 'Responsable asignado: Diego Herrera', '2025-04-12 08:00:00', 15, 12),
(51, 'STATUS_CHANGED', 'OPEN', 'IN_PROGRESS', 'Estado cambiado de Abierto a En progreso', '2025-04-14 12:00:00', 15, 6),
(52, 'STATUS_CHANGED', 'IN_PROGRESS', 'RESOLVED', 'Estado cambiado de En progreso a Resuelto', '2025-04-14 17:00:00', 15, 6),

-- Ticket 16
(53, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-05-05 09:00:00', 16, 10),
(54, 'ASSIGNED_CHANGED', NULL, 'Roberto García', 'Responsable asignado: Roberto García', '2025-05-05 09:00:00', 16, 10),

-- Ticket 17
(55, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-05-06 10:15:00', 17, 11),
(56, 'ASSIGNED_CHANGED', NULL, 'Diego Herrera', 'Responsable asignado: Diego Herrera', '2025-05-06 10:15:00', 17, 11),
(57, 'STATUS_CHANGED', 'OPEN', 'IN_PROGRESS', 'Estado cambiado de Abierto a En progreso', '2025-05-07 09:00:00', 17, 6),

-- Ticket 18
(58, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-04-08 11:00:00', 18, 8),
(59, 'ASSIGNED_CHANGED', NULL, 'Sofía Ramírez', 'Responsable asignado: Sofía Ramírez', '2025-04-08 11:00:00', 18, 8),
(60, 'STATUS_CHANGED', 'OPEN', 'IN_PROGRESS', 'Estado cambiado de Abierto a En progreso', '2025-04-09 10:00:00', 18, 5),
(61, 'STATUS_CHANGED', 'IN_PROGRESS', 'RESOLVED', 'Estado cambiado de En progreso a Resuelto', '2025-04-11 14:00:00', 18, 5),

-- Ticket 19
(62, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-05-07 14:30:00', 19, 9),
(63, 'ASSIGNED_CHANGED', NULL, 'Laura Sánchez', 'Responsable asignado: Laura Sánchez', '2025-05-07 14:30:00', 19, 9),

-- Ticket 20
(64, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-03-20 08:00:00', 20, 12),
(65, 'ASSIGNED_CHANGED', NULL, 'Diego Herrera', 'Responsable asignado: Diego Herrera', '2025-03-20 08:00:00', 20, 12),
(66, 'STATUS_CHANGED', 'OPEN', 'IN_PROGRESS', 'Estado cambiado de Abierto a En progreso', '2025-03-22 09:00:00', 20, 6),
(67, 'STATUS_CHANGED', 'IN_PROGRESS', 'RESOLVED', 'Estado cambiado de En progreso a Resuelto', '2025-03-26 15:00:00', 20, 6),
(68, 'STATUS_CHANGED', 'RESOLVED', 'CLOSED', 'Estado cambiado de Resuelto a Cerrado', '2025-03-28 10:00:00', 20, 6),

-- Ticket 21
(69, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-04-01 16:00:00', 21, 10),
(70, 'ASSIGNED_CHANGED', NULL, 'Miguel Torres', 'Responsable asignado: Miguel Torres', '2025-04-01 16:00:00', 21, 10),
(71, 'STATUS_CHANGED', 'OPEN', 'IN_PROGRESS', 'Estado cambiado de Abierto a En progreso', '2025-04-02 10:00:00', 21, 7),
(72, 'STATUS_CHANGED', 'IN_PROGRESS', 'RESOLVED', 'Estado cambiado de En progreso a Resuelto', '2025-04-03 11:00:00', 21, 7),

-- Ticket 22
(73, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-04-25 09:00:00', 22, 11),
(74, 'ASSIGNED_CHANGED', NULL, 'Sofía Ramírez', 'Responsable asignado: Sofía Ramírez', '2025-04-25 09:00:00', 22, 11),
(75, 'STATUS_CHANGED', 'OPEN', 'IN_PROGRESS', 'Estado cambiado de Abierto a En progreso', '2025-04-28 09:00:00', 22, 5),
(76, 'STATUS_CHANGED', 'IN_PROGRESS', 'WAITING_FOR_STUDENT', 'Estado cambiado de En progreso a Esperando al estudiante', '2025-04-30 10:00:00', 22, 5),

-- Ticket 23
(77, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-05-08 08:00:00', 23, 8),
(78, 'ASSIGNED_CHANGED', NULL, 'Roberto García', 'Responsable asignado: Roberto García', '2025-05-08 08:00:00', 23, 8),
(79, 'STATUS_CHANGED', 'OPEN', 'IN_PROGRESS', 'Estado cambiado de Abierto a En progreso', '2025-05-09 11:00:00', 23, 3),

-- Ticket 24
(80, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-04-15 09:30:00', 24, 9),
(81, 'ASSIGNED_CHANGED', NULL, 'Diego Herrera', 'Responsable asignado: Diego Herrera', '2025-04-15 09:30:00', 24, 9),
(82, 'STATUS_CHANGED', 'OPEN', 'IN_PROGRESS', 'Estado cambiado de Abierto a En progreso', '2025-04-16 10:00:00', 24, 6),
(83, 'STATUS_CHANGED', 'IN_PROGRESS', 'RESOLVED', 'Estado cambiado de En progreso a Resuelto', '2025-04-17 14:00:00', 24, 6),

-- Ticket 25
(84, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-05-01 08:00:00', 25, 12),
(85, 'ASSIGNED_CHANGED', NULL, 'Sofía Ramírez', 'Responsable asignado: Sofía Ramírez', '2025-05-01 08:00:00', 25, 12),
(86, 'STATUS_CHANGED', 'OPEN', 'IN_PROGRESS', 'Estado cambiado de Abierto a En progreso', '2025-05-03 10:00:00', 25, 5),

-- Ticket 26
(87, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-05-09 10:00:00', 26, 10),
(88, 'ASSIGNED_CHANGED', NULL, 'Laura Sánchez', 'Responsable asignado: Laura Sánchez', '2025-05-09 10:00:00', 26, 10),

-- Ticket 27
(89, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-05-03 07:30:00', 27, 8),
(90, 'ASSIGNED_CHANGED', NULL, 'Diego Herrera', 'Responsable asignado: Diego Herrera', '2025-05-03 07:30:00', 27, 8),
(91, 'STATUS_CHANGED', 'OPEN', 'IN_PROGRESS', 'Estado cambiado de Abierto a En progreso', '2025-05-04 09:00:00', 27, 6),
(92, 'STATUS_CHANGED', 'IN_PROGRESS', 'WAITING_FOR_THIRD_PARTY', 'Estado cambiado de En progreso a Esperando a un tercero', '2025-05-05 09:00:00', 27, 6),

-- Ticket 28
(93, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-03-15 10:00:00', 28, 11),
(94, 'ASSIGNED_CHANGED', NULL, 'Sofía Ramírez', 'Responsable asignado: Sofía Ramírez', '2025-03-15 10:00:00', 28, 11),
(95, 'STATUS_CHANGED', 'OPEN', 'IN_PROGRESS', 'Estado cambiado de Abierto a En progreso', '2025-03-17 09:00:00', 28, 5),
(96, 'STATUS_CHANGED', 'IN_PROGRESS', 'RESOLVED', 'Estado cambiado de En progreso a Resuelto', '2025-03-20 14:00:00', 28, 5),
(97, 'STATUS_CHANGED', 'RESOLVED', 'CLOSED', 'Estado cambiado de Resuelto a Cerrado', '2025-03-22 16:00:00', 28, 5),

-- Ticket 29
(98, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-04-02 13:00:00', 29, 9),
(99, 'ASSIGNED_CHANGED', NULL, 'Miguel Torres', 'Responsable asignado: Miguel Torres', '2025-04-02 13:00:00', 29, 9),
(100, 'STATUS_CHANGED', 'OPEN', 'CANCELLED', 'Estado cambiado de Abierto a Cancelado', '2025-04-03 08:00:00', 29, 9),

-- Ticket 30
(101, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-05-10 11:00:00', 30, 10),
(102, 'ASSIGNED_CHANGED', NULL, 'Sofía Ramírez', 'Responsable asignado: Sofía Ramírez', '2025-05-10 11:00:00', 30, 10);

SELECT setval('ticket_history_id_seq', 102);

-- ============================================================
-- NOTIFICATIONS
-- ============================================================

INSERT INTO notifications (id, message, type, read, "createdAt", "ticketId", "recipientId") VALUES
-- Notificaciones para admin (id=1)
(1, 'Nuevo ticket #11 creado: Inicio de trámite de título de Técnico Superior', 'TICKET_CREATED', false, '2025-05-04 11:00:00', 11, 1),
(2, 'Nuevo ticket #8 creado: SIU Guaraní no muestra materias aprobadas', 'TICKET_CREATED', true, '2025-05-03 13:00:00', 8, 1),
(3, 'Nuevo ticket #6 creado: Error en la fecha de examen final publicada', 'TICKET_CREATED', true, '2025-05-02 08:45:00', 6, 1),

-- Notificaciones para staff Roberto García (id=3)
(4, 'Nuevo ticket #1 asignado: No aparece mi calificación del parcial', 'TICKET_CREATED', false, '2025-05-01 10:30:00', 1, 3),
(5, 'Nuevo ticket #6 asignado: Error en la fecha de examen final publicada', 'TICKET_CREATED', false, '2025-05-02 08:45:00', 6, 3),
(6, 'Nuevo comentario en ticket #1', 'COMMENT_ADDED', false, '2025-05-01 11:00:00', 1, 3),

-- Notificaciones para staff Diego Herrera (id=6)
(7, 'Nuevo ticket #2 asignado: No puedo acceder a Moodle desde hace 3 días', 'TICKET_CREATED', true, '2025-04-28 09:15:00', 2, 6),
(8, 'Nuevo comentario en ticket #2', 'COMMENT_ADDED', true, '2025-04-28 14:00:00', 2, 6),
(9, 'Nuevo ticket #8 asignado: SIU Guaraní no muestra materias aprobadas', 'TICKET_CREATED', false, '2025-05-03 13:00:00', 8, 6),
(10, 'Nuevo ticket #4 asignado: Error al subir trabajos prácticos en el sitio', 'TICKET_CREATED', true, '2025-04-25 11:00:00', 4, 6),

-- Notificaciones para staff Sofía Ramírez (id=5)
(11, 'Nuevo ticket #5 asignado: Solicitud de equivalencia de Matemática I', 'TICKET_CREATED', true, '2025-04-22 14:30:00', 5, 5),
(12, 'Nuevo comentario en ticket #5', 'COMMENT_ADDED', true, '2025-04-23 09:00:00', 5, 5),
(13, 'Nuevo ticket #11 asignado: Inicio de trámite de título de Técnico Superior', 'TICKET_CREATED', false, '2025-05-04 11:00:00', 11, 5),

-- Notificaciones para estudiante María López (id=8)
(14, 'Nuevo ticket #1 creado: No aparece mi calificación del parcial', 'TICKET_CREATED', true, '2025-05-01 10:30:00', 1, 8),
(15, 'Nuevo mensaje en ticket #1', 'MESSAGE_ADDED', false, '2025-05-01 14:00:00', 1, 8),
(16, 'Ticket #13 cambió estado a Resuelto', 'STATUS_CHANGED', true, '2025-04-02 14:00:00', 13, 8),

-- Notificaciones para estudiante Juan Pérez (id=9)
(17, 'Nuevo ticket #2 creado: No puedo acceder a Moodle desde hace 3 días', 'TICKET_CREATED', true, '2025-04-28 09:15:00', 2, 9),
(18, 'Nuevo mensaje en ticket #2', 'MESSAGE_ADDED', false, '2025-04-29 11:00:00', 2, 9),
(19, 'Nuevo mensaje en ticket #2', 'MESSAGE_ADDED', false, '2025-04-29 16:00:00', 2, 9),

-- Notificaciones para estudiante Camila Ruiz (id=12)
(20, 'Ticket #5 cambió estado a Esperando Estudiante', 'STATUS_CHANGED', false, '2025-04-28 09:00:00', 5, 12),
(21, 'Nuevo mensaje en ticket #5', 'MESSAGE_ADDED', false, '2025-04-28 09:00:00', 5, 12),
(22, 'Ticket #15 cambió estado a Resuelto', 'STATUS_CHANGED', true, '2025-04-14 17:00:00', 15, 12),

-- Notificaciones de tickets 16-30
(23, 'Nuevo ticket #16 creado: Nota del TP grupal no refleja mi participación', 'TICKET_CREATED', false, '2025-05-05 09:00:00', 16, 1),
(24, 'Se te asignó el ticket #16', 'ASSIGNED_CHANGED', false, '2025-05-05 09:00:00', 16, 3),
(25, 'Nuevo ticket #17 creado: No puedo generar el certificado analítico desde el SIU', 'TICKET_CREATED', false, '2025-05-06 10:15:00', 17, 1),
(26, 'Se te asignó el ticket #17', 'ASSIGNED_CHANGED', false, '2025-05-06 10:15:00', 17, 6),
(27, 'El ticket #17 cambió a: En Proceso', 'STATUS_CHANGED', false, '2025-05-07 09:00:00', 17, 11),
(28, 'Ticket #18 cambió estado a Resuelto', 'STATUS_CHANGED', true, '2025-04-11 14:00:00', 18, 8),
(29, 'Nuevo ticket #19 creado: Falta de material bibliográfico en el campus', 'TICKET_CREATED', false, '2025-05-07 14:30:00', 19, 1),
(30, 'Se te asignó el ticket #19', 'ASSIGNED_CHANGED', false, '2025-05-07 14:30:00', 19, 4),
(31, 'Ticket #21 cambió estado a Resuelto', 'STATUS_CHANGED', true, '2025-04-03 11:00:00', 21, 10),
(32, 'Nuevo mensaje en ticket #21', 'MESSAGE_ADDED', true, '2025-04-03 11:00:00', 21, 10),
(33, 'El ticket #22 cambió a: Esperando Estudiante', 'STATUS_CHANGED', false, '2025-04-30 10:00:00', 22, 11),
(34, 'Nuevo mensaje en ticket #22', 'MESSAGE_ADDED', false, '2025-04-30 10:00:00', 22, 11),
(35, 'Se te asignó el ticket #23', 'ASSIGNED_CHANGED', false, '2025-05-08 08:00:00', 23, 3),
(36, 'El ticket #23 cambió a: En Proceso', 'STATUS_CHANGED', false, '2025-05-09 11:00:00', 23, 8),
(37, 'Ticket #24 cambió estado a Resuelto', 'STATUS_CHANGED', true, '2025-04-17 14:00:00', 24, 9),
(38, 'Nuevo comentario en ticket #25', 'COMMENT_ADDED', false, '2025-05-01 10:00:00', 25, 5),
(39, 'Se te asignó el ticket #26', 'ASSIGNED_CHANGED', false, '2025-05-09 10:00:00', 26, 4),
(40, 'El ticket #27 cambió a: Esperando Terceros', 'STATUS_CHANGED', false, '2025-05-05 09:00:00', 27, 8),
(41, 'Nuevo ticket #30 creado: Solicitud de equivalencia de Inglés I', 'TICKET_CREATED', false, '2025-05-10 11:00:00', 30, 1),
(42, 'Se te asignó el ticket #30', 'ASSIGNED_CHANGED', false, '2025-05-10 11:00:00', 30, 5);

SELECT setval('notifications_id_seq', 42);

-- ============================================================
-- FIN DEL SEED — 12 usuarios, 30 tickets, 17 comentarios, 27 mensajes, 102 historial, 42 notificaciones
-- ============================================================
-- Credenciales de prueba (contraseña: Password123! para todos):
-- ┌─────────────────────────────────┬──────────────────┐
-- │ Email                           │ Rol              │
-- ├─────────────────────────────────┼──────────────────┤
-- │ admin@admin.com                 │ ADMIN            │
-- │ management@management.com       │ MANAGEMENT       │
-- │ staff@staff.com                 │ STAFF/TUTOR      │
-- │ staff2@staff.com                │ STAFF/TUTOR      │
-- │ staff.bedel@staff.com           │ STAFF/BEDEL      │
-- │ staff.tech@staff.com            │ STAFF/TECH       │
-- │ staff.coord@staff.com           │ STAFF/COORDINATOR│
-- │ student@student.com             │ STUDENT          │
-- │ student2@student.com            │ STUDENT          │
-- │ student3@student.com            │ STUDENT          │
-- │ student4@student.com            │ STUDENT          │
-- │ student5@student.com            │ STUDENT          │
-- └─────────────────────────────────┴──────────────────┘
