SET client_encoding = 'UTF8';

-- ============================================================
-- Portal IFTS 29 - Script de datos de prueba (seed)
-- ============================================================
-- Ejecutar despues de que TypeORM haya creado las tablas (synchronize: true).
-- Uso: psql -U postgres -d portal_ifts29 -f scripts/seed.sql
--
-- Contrasena de todos los usuarios: Password123!
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
(1, 'Carlos', 'Rodriguez', '30111222', 'admin@admin.com',
 '$2b$10$BuIUsgft/Z4f3zekEIaziuCGWUtEhutdj0yJ0FcspLvTMAku3YyQC',
 'ADMIN', NULL, NULL,
 '2025-01-05 08:00:00', '2025-01-05 08:00:00'),

-- MANAGEMENT (id=2)
(2, 'Patricia', 'Gomez', '28555666', 'management@management.com',
 '$2b$10$BuIUsgft/Z4f3zekEIaziuCGWUtEhutdj0yJ0FcspLvTMAku3YyQC',
 'MANAGEMENT', NULL, NULL,
 '2025-01-06 09:00:00', '2025-01-06 09:00:00'),

-- STAFF - Tutor academico (id=3)
(3, 'Roberto', 'Garcia', '32444555', 'staff@staff.com',
 '$2b$10$BuIUsgft/Z4f3zekEIaziuCGWUtEhutdj0yJ0FcspLvTMAku3YyQC',
 'STAFF', 'TUTOR', 'GRADE_ISSUE,EXAM_ISSUE,CORRELATIVITY_ISSUE,SUBJECT_CONTENT_ISSUE',
 '2025-01-10 10:00:00', '2025-01-10 10:00:00'),

-- STAFF - Tutor academico 2 (id=4)
(4, 'Laura', 'Sanchez', '31777888', 'staff2@staff.com',
 '$2b$10$BuIUsgft/Z4f3zekEIaziuCGWUtEhutdj0yJ0FcspLvTMAku3YyQC',
 'STAFF', 'TUTOR', 'GRADE_ISSUE,EXAM_ISSUE,SUBJECT_CONTENT_ISSUE',
 '2025-01-11 11:00:00', '2025-01-11 11:00:00'),

-- STAFF - Bedel institucional (id=5)
(5, 'Sofia', 'Ramirez', '33222111', 'staff.bedel@staff.com',
 '$2b$10$BuIUsgft/Z4f3zekEIaziuCGWUtEhutdj0yJ0FcspLvTMAku3YyQC',
 'STAFF', 'BEDEL', 'SUBJECT_EQUIVALENCY_REQUEST,GRADE_RECORD_CORRECTION_REQUEST,EXAM_CERTIFICATE_REQUEST,DEGREE_PROCESS_REQUEST,CLASS_SECTION_CHANGE_REQUEST',
 '2025-01-12 08:30:00', '2025-01-12 08:30:00'),

-- STAFF - Soporte tecnico (id=6)
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
(8, 'Maria', 'Lopez', '40123456', 'student@student.com',
 '$2b$10$BuIUsgft/Z4f3zekEIaziuCGWUtEhutdj0yJ0FcspLvTMAku3YyQC',
 'STUDENT', NULL, NULL,
 '2025-02-01 14:00:00', '2025-02-01 14:00:00'),

-- STUDENT (id=9)
(9, 'Juan', 'Perez', '41234567', 'student2@student.com',
 '$2b$10$BuIUsgft/Z4f3zekEIaziuCGWUtEhutdj0yJ0FcspLvTMAku3YyQC',
 'STUDENT', NULL, NULL,
 '2025-02-05 15:00:00', '2025-02-05 15:00:00'),

-- STUDENT (id=10)
(10, 'Ana', 'Martinez', '42345678', 'student3@student.com',
 '$2b$10$BuIUsgft/Z4f3zekEIaziuCGWUtEhutdj0yJ0FcspLvTMAku3YyQC',
 'STUDENT', NULL, NULL,
 '2025-02-10 10:00:00', '2025-02-10 10:00:00'),

-- STUDENT (id=11)
(11, 'Luis', 'Fernandez', '43456789', 'student4@student.com',
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

-- Ticket 1: Academico - Problema con nota (OPEN)
(1, 'No aparece mi calificacion del parcial',
 'Rendi el primer parcial de Programacion I el dia 15/04 y todavia no aparece la nota en el sistema. Mis companeros ya tienen la suya cargada.',
 'OPEN', 'ACADEMIC', 'GRADE_ISSUE', 'Programacion I', '1K',
 NULL,
 '2025-05-01 10:30:00', '2025-05-01 14:00:00', NULL, NULL, 8, 3),

-- Ticket 2: Tecnico - Moodle (IN_PROGRESS)
(2, 'No puedo acceder a Moodle desde hace 3 dias',
 'El sistema me rechaza las credenciales aunque estoy seguro de que son correctas. Probe restablecer la contrasena y sigue sin funcionar.',
 'IN_PROGRESS', 'TECHNICAL', 'MOODLE_PROBLEM', NULL, NULL,
 NULL,
 '2025-04-28 09:15:00', '2025-04-29 11:00:00', NULL, NULL, 9, 6),

-- Ticket 3: Institucional - Cambio de comision (CLOSED)
(3, 'Solicitud de cambio de comision por trabajo',
 'Necesito cambiar mi horario de clase de la comision 2A a la 2K por conflicto laboral. Mi nuevo trabajo me exige estar de 14 a 18 hs.',
 'CLOSED', 'INSTITUTIONAL', 'CLASS_SECTION_CHANGE_REQUEST', 'Matematica II', '2A',
 '{"destinationCommission":"2K"}',
 '2025-04-20 16:00:00', '2025-04-25 10:00:00', '2025-04-24 15:00:00', '2025-04-25 10:00:00', 10, 5),

-- Ticket 4: Tecnico - Error sitio web (IN_PROGRESS)
(4, 'Error al subir trabajos practicos en el sitio',
 'El sistema no me permite subir archivos mayores a 5MB. Mi proyecto de Ingenieria de Software pesa 8MB y no puedo entregarlo.',
 'IN_PROGRESS', 'TECHNICAL', 'WEBSITE_ERROR', 'Ingenieria de Software', '3K',
 NULL,
 '2025-04-25 11:00:00', '2025-04-26 14:00:00', NULL, NULL, 11, 6),

-- Ticket 5: Institucional - Equivalencia (WAITING_FOR_STUDENT)
(5, 'Solicitud de equivalencia de Matematica I',
 'Aprobe Analisis Matematico I en la UTN con nota 8. Adjunto certificado analitico. Solicito la equivalencia para Matematica I del IFTS 29.',
 'WAITING_FOR_STUDENT', 'INSTITUTIONAL', 'SUBJECT_EQUIVALENCY_REQUEST', 'Matematica I', '1A',
 '{"institution":"UTN - FRBA","approvedSubject":"Analisis Matematico I","grade":"8"}',
 '2025-04-22 14:30:00', '2025-04-28 09:00:00', NULL, NULL, 12, 5),

-- Ticket 6: Academico - Problema con examen (OPEN)
(6, 'Error en la fecha de examen final publicada',
 'En el cronograma de examenes figura que el final de Base de Datos es el 10/06, pero la profesora nos dijo en clase que es el 17/06. Hay una inconsistencia.',
 'OPEN', 'ACADEMIC', 'EXAM_ISSUE', 'Base de Datos', '2K',
 NULL,
 '2025-05-02 08:45:00', '2025-05-02 08:45:00', NULL, NULL, 9, 3),

-- Ticket 7: General - Consulta (RESOLVED)
(7, 'Consulta sobre inscripcion a materias del segundo cuatrimestre',
 'Quisiera saber cuando abre la inscripcion a las materias del segundo cuatrimestre y si hay algun requisito adicional para Redes.',
 'RESOLVED', 'GENERAL', 'GENERAL_INQUIRY', NULL, NULL,
 NULL,
 '2025-04-15 17:00:00', '2025-04-18 10:00:00', '2025-04-18 10:00:00', NULL, 8, 7),

-- Ticket 8: Tecnico - SIU (OPEN)
(8, 'SIU Guarani no muestra materias aprobadas',
 'En el SIU Guarani no aparecen las materias que aprobe este cuatrimestre. Ya pasaron 2 semanas desde que se cargaron las actas.',
 'OPEN', 'TECHNICAL', 'SIU_PROBLEM', NULL, NULL,
 NULL,
 '2025-05-03 13:00:00', '2025-05-03 13:00:00', NULL, NULL, 10, 6),

-- Ticket 9: Institucional - Certificado de examen (IN_PROGRESS)
(9, 'Solicitud de certificado de asistencia a examen',
 'Necesito un certificado que acredite que rendi el examen final de Programacion II el dia 20/04/2025 para presentar en mi trabajo.',
 'IN_PROGRESS', 'INSTITUTIONAL', 'EXAM_CERTIFICATE_REQUEST', 'Programacion II', '2A',
 '{"examDate":"2025-04-20"}',
 '2025-04-21 09:00:00', '2025-04-23 11:00:00', NULL, NULL, 11, 5),

-- Ticket 10: Academico - Correlatividad (WAITING_FOR_THIRD_PARTY)
(10, 'No puedo inscribirme a Programacion II',
 'El sistema no me deja inscribirme a Programacion II diciendo que no tengo aprobada Programacion I, pero ya la aprobe en diciembre.',
 'WAITING_FOR_THIRD_PARTY', 'ACADEMIC', 'CORRELATIVITY_ISSUE', 'Programacion II', '2K',
 NULL,
 '2025-04-18 10:30:00', '2025-04-22 16:00:00', NULL, NULL, 12, 4),

-- Ticket 11: Institucional - Tramite de titulo (OPEN)
(11, 'Inicio de tramite de titulo de Tecnico Superior',
 'Habiendo completado todas las materias de la carrera, solicito iniciar el tramite de mi titulo de Tecnico Superior en Analisis de Sistemas.',
 'OPEN', 'INSTITUTIONAL', 'DEGREE_PROCESS_REQUEST', NULL, NULL,
 '{"gender":"M","birthDate":"1998-03-15","birthCountry":"Argentina","birthLocation":"CABA, Buenos Aires","lastYearCycle":"2025"}',
 '2025-05-04 11:00:00', '2025-05-04 11:00:00', NULL, NULL, 9, 5),

-- Ticket 12: Academico - Contenido de materia (CANCELLED)
(12, 'Diferencia entre programa y contenido dado en clase',
 'El programa oficial de Redes incluye IPv6, pero en clase no se vio nada de ese tema y el profesor dijo que no entra en el final.',
 'CANCELLED', 'ACADEMIC', 'SUBJECT_CONTENT_ISSUE', 'Redes', '3A',
 NULL,
 '2025-04-10 15:00:00', '2025-04-12 09:00:00', NULL, '2025-04-12 09:00:00', 10, 4),

-- Ticket 13: Institucional - Correccion de acta (RESOLVED)
(13, 'Correccion de nota en acta de examen',
 'En el acta de examen de Matematica II figura un 6, pero mi nota real fue un 8. El profesor confirmo el error.',
 'RESOLVED', 'INSTITUTIONAL', 'GRADE_RECORD_CORRECTION_REQUEST', 'Matematica II', '2A',
 '{"grade":"8","examDate":"2025-03-20"}',
 '2025-03-25 09:00:00', '2025-04-02 14:00:00', '2025-04-02 14:00:00', NULL, 8, 5),

-- Ticket 14: General - Consulta (CLOSED)
(14, 'Horarios de atencion de bedelia en vacaciones',
 'Quisiera saber los horarios de atencion de bedelia durante el receso de invierno para hacer un tramite presencial.',
 'CLOSED', 'GENERAL', 'GENERAL_INQUIRY', NULL, NULL,
 NULL,
 '2025-04-05 12:00:00', '2025-04-08 16:00:00', '2025-04-07 10:00:00', '2025-04-08 16:00:00', 11, 7),

-- Ticket 15: Tecnico - Moodle (RESOLVED)
(15, 'No puedo ver los materiales del aula virtual',
 'Los materiales de Ingenieria de Software que subio el profesor no me aparecen en el aula de Moodle. Mis companeros si los pueden ver.',
 'RESOLVED', 'TECHNICAL', 'MOODLE_PROBLEM', 'Ingenieria de Software', '3K',
 NULL,
 '2025-04-12 08:00:00', '2025-04-14 17:00:00', '2025-04-14 17:00:00', NULL, 12, 6),

-- Ticket 16: Academico - Nota incorrecta (OPEN)
(16, 'Nota del TP grupal no refleja mi participacion',
 'En el TP grupal de Programacion II me pusieron un 4 pero yo hice la mayor parte del trabajo. Tengo los commits de Git como prueba.',
 'OPEN', 'ACADEMIC', 'GRADE_ISSUE', 'Programacion II', '2K',
 NULL,
 '2025-05-05 09:00:00', '2025-05-05 09:00:00', NULL, NULL, 10, 3),

-- Ticket 17: Tecnico - SIU (IN_PROGRESS)
(17, 'No puedo generar el certificado analitico desde el SIU',
 'Cuando intento generar el certificado analitico parcial desde el SIU Guarani, me aparece un error que dice "Servicio no disponible". Ya lo intente en distintos horarios.',
 'IN_PROGRESS', 'TECHNICAL', 'SIU_PROBLEM', NULL, NULL,
 NULL,
 '2025-05-06 10:15:00', '2025-05-07 09:00:00', NULL, NULL, 11, 6),

-- Ticket 18: Institucional - Certificado (RESOLVED)
(18, 'Solicitud de certificado de alumno regular',
 'Necesito un certificado de alumno regular para presentar en ANSES y renovar la beca Progresar.',
 'RESOLVED', 'INSTITUTIONAL', 'EXAM_CERTIFICATE_REQUEST', NULL, NULL,
 NULL,
 '2025-04-08 11:00:00', '2025-04-11 14:00:00', '2025-04-11 14:00:00', NULL, 8, 5),

-- Ticket 19: Academico - Contenido (OPEN)
(19, 'Falta de material bibliografico en el campus',
 'El profesor de Sistemas Operativos menciono que subiria apuntes y guias de ejercicios al campus virtual, pero a la fecha no hay nada cargado.',
 'OPEN', 'ACADEMIC', 'SUBJECT_CONTENT_ISSUE', 'Sistemas Operativos', '2K',
 NULL,
 '2025-05-07 14:30:00', '2025-05-07 14:30:00', NULL, NULL, 9, 4),

-- Ticket 20: Tecnico - Web (CLOSED)
(20, 'La pagina de horarios no carga correctamente',
 'La seccion de horarios de cursada en la web del instituto muestra una tabla vacia. Otros companeros tienen el mismo problema.',
 'CLOSED', 'TECHNICAL', 'WEBSITE_ERROR', NULL, NULL,
 NULL,
 '2025-03-20 08:00:00', '2025-03-28 10:00:00', '2025-03-26 15:00:00', '2025-03-28 10:00:00', 12, 6),

-- Ticket 21: General - Consulta (RESOLVED)
(21, 'Consulta sobre becas disponibles para estudiantes',
 'Quisiera saber si el instituto tiene algun convenio de becas o programa de ayuda economica para estudiantes que trabajan.',
 'RESOLVED', 'GENERAL', 'GENERAL_INQUIRY', NULL, NULL,
 NULL,
 '2025-04-01 16:00:00', '2025-04-03 11:00:00', '2025-04-03 11:00:00', NULL, 10, 7),

-- Ticket 22: Institucional - Tramite titulo (WAITING_FOR_STUDENT)
(22, 'Documentacion pendiente para tramite de titulo',
 'Inicie el tramite de titulo hace un mes y me dijeron que falta documentacion. No me queda claro que documentos debo presentar.',
 'WAITING_FOR_STUDENT', 'INSTITUTIONAL', 'DEGREE_PROCESS_REQUEST', NULL, NULL,
 NULL,
 '2025-04-25 09:00:00', '2025-04-30 10:00:00', NULL, NULL, 11, 5),

-- Ticket 23: Academico - Examen (IN_PROGRESS)
(23, 'Mesa de examen no aparece en el cronograma',
 'La mesa de examen de Estadistica de julio no figura en el cronograma publicado, pero el profesor confirmo que va a haber mesa.',
 'IN_PROGRESS', 'ACADEMIC', 'EXAM_ISSUE', 'Estadistica', '1K',
 NULL,
 '2025-05-08 08:00:00', '2025-05-09 11:00:00', NULL, NULL, 8, 3),

-- Ticket 24: Tecnico - Moodle (RESOLVED)
(24, 'Error al entregar trabajo practico en Moodle',
 'Intente subir el TP de Laboratorio II en formato .zip y Moodle me dice que el formato no esta permitido, aunque el profesor pidio que sea en .zip.',
 'RESOLVED', 'TECHNICAL', 'MOODLE_PROBLEM', 'Laboratorio II', '2K',
 NULL,
 '2025-04-15 09:30:00', '2025-04-17 14:00:00', '2025-04-17 14:00:00', NULL, 9, 6),

-- Ticket 25: Institucional - Correccion acta (IN_PROGRESS)
(25, 'Error en acta de cursada - figura ausente',
 'En el acta de cursada de Ingles II figuro como ausente en el segundo parcial, pero yo lo rendi y aprobe con 7. Tengo el examen corregido.',
 'IN_PROGRESS', 'INSTITUTIONAL', 'GRADE_RECORD_CORRECTION_REQUEST', 'Ingles II', '2K',
 '{"grade":"7","examType":"segundo parcial"}',
 '2025-05-01 08:00:00', '2025-05-03 10:00:00', NULL, NULL, 12, 5),

-- Ticket 26: Academico - Correlatividad (OPEN)
(26, 'Sistema no reconoce materia aprobada por equivalencia',
 'Obtuve la equivalencia de Matematica I pero el sistema de correlatividades no la reconoce y no me deja inscribirme a Matematica II.',
 'OPEN', 'ACADEMIC', 'CORRELATIVITY_ISSUE', 'Matematica II', '2K',
 NULL,
 '2025-05-09 10:00:00', '2025-05-09 10:00:00', NULL, NULL, 10, 4),

-- Ticket 27: Tecnico - SIU (WAITING_FOR_THIRD_PARTY)
(27, 'SIU no permite inscripcion a final',
 'Quiero inscribirme al final de Programacion I pero el SIU me dice que el periodo de inscripcion esta cerrado, aunque segun el cronograma deberia estar abierto.',
 'WAITING_FOR_THIRD_PARTY', 'TECHNICAL', 'SIU_PROBLEM', 'Programacion I', '1K',
 NULL,
 '2025-05-03 07:30:00', '2025-05-05 09:00:00', NULL, NULL, 8, 6),

-- Ticket 28: Institucional - Cambio comision (CLOSED)
(28, 'Cambio de comision por superposicion horaria',
 'Tengo superposicion horaria entre Redes (3A) y Laboratorio III (3K). Solicito cambio de comision de Redes.',
 'CLOSED', 'INSTITUTIONAL', 'CLASS_SECTION_CHANGE_REQUEST', 'Redes', '3A',
 '{"destinationCommission":"3K"}',
 '2025-03-15 10:00:00', '2025-03-22 16:00:00', '2025-03-20 14:00:00', '2025-03-22 16:00:00', 11, 5),

-- Ticket 29: General - Consulta (CANCELLED)
(29, 'Consulta sobre biblioteca virtual',
 'Queria saber si el instituto tiene acceso a alguna biblioteca virtual con libros de programacion.',
 'CANCELLED', 'GENERAL', 'GENERAL_INQUIRY', NULL, NULL,
 NULL,
 '2025-04-02 13:00:00', '2025-04-03 08:00:00', NULL, '2025-04-03 08:00:00', 9, 7),

-- Ticket 30: Institucional - Equivalencia (OPEN)
(30, 'Solicitud de equivalencia de Ingles I',
 'Tengo el First Certificate in English (FCE) de Cambridge. Solicito equivalencia de Ingles I presentando este certificado internacional.',
 'OPEN', 'INSTITUTIONAL', 'SUBJECT_EQUIVALENCY_REQUEST', 'Ingles I', '1K',
 '{"institution":"Cambridge","certificate":"FCE","level":"B2"}',
 '2025-05-10 11:00:00', '2025-05-10 11:00:00', NULL, NULL, 10, 5);

SELECT setval('tickets_id_seq', 30);

-- ============================================================
-- COMMENTS
-- ============================================================

INSERT INTO comments (id, content, "createdAt", "ticketId", "authorId") VALUES
-- Ticket 1
(1, 'Quiero aclarar que el examen fue presencial en la sede de Av. Triunvirato.', '2025-05-01 11:00:00', 1, 8),
(2, 'Agrego que mi numero de legajo es 2024-1234.', '2025-05-01 15:00:00', 1, 8),

-- Ticket 2
(3, 'Probe tambien desde otro navegador y el problema persiste.', '2025-04-28 14:00:00', 2, 9),
(4, 'Quiero agregar que tambien intente desde el celular sin exito.', '2025-04-29 08:00:00', 2, 9),

-- Ticket 3
(5, 'Adjunte por email el certificado laboral como respaldo.', '2025-04-21 10:00:00', 3, 10),

-- Ticket 5
(6, 'El certificado analitico lo envie por email a bedelia tambien.', '2025-04-23 09:00:00', 5, 12),

-- Ticket 7
(7, 'Muchas gracias por la informacion, me fue muy util.', '2025-04-18 11:00:00', 7, 8),

-- Ticket 9
(8, 'Necesito el certificado antes del viernes si es posible.', '2025-04-22 08:00:00', 9, 11),

-- Ticket 10
(9, 'Adjunto captura de pantalla del SIU donde muestra Prog I aprobada.', '2025-04-19 11:00:00', 10, 12),

-- Ticket 13
(10, 'El profesor Garcia me confirmo por email que la nota es 8.', '2025-03-26 10:00:00', 13, 8),

-- Ticket 16
(11, 'Tengo los commits en GitHub que demuestran que hice el 80% del codigo del TP.', '2025-05-05 10:00:00', 16, 10),

-- Ticket 17
(12, 'Probe desde la red del instituto y desde mi casa, mismo error.', '2025-05-06 14:00:00', 17, 11),

-- Ticket 22
(13, 'Me acerque a bedelia pero me dijeron que lo gestione por aca.', '2025-04-26 09:00:00', 22, 11),

-- Ticket 23
(14, 'El profesor Martinez me confirmo por WhatsApp que la mesa esta aprobada.', '2025-05-08 12:00:00', 23, 8),

-- Ticket 25
(15, 'Adjunto foto del examen corregido con la nota 7 y la firma del profesor.', '2025-05-01 10:00:00', 25, 12),

-- Ticket 26
(16, 'La equivalencia fue aprobada por resolucion N° 2025-0234.', '2025-05-09 12:00:00', 26, 10),

-- Ticket 30
(17, 'Adjunto copia escaneada del certificado FCE.', '2025-05-10 14:00:00', 30, 10);

SELECT setval('comments_id_seq', 17);

-- ============================================================
-- MESSAGES (privados entre staff)
-- ============================================================

INSERT INTO messages (id, content, "createdAt", "ticketId", "authorId") VALUES
-- Ticket 1 (asignado a Roberto Garcia - id=3)
(1, 'Buen dia Maria. Estoy verificando con el profesor la carga de notas. Te aviso a la brevedad.', '2025-05-01 14:00:00', 1, 3),

-- Ticket 2 (asignado a Diego Herrera - id=6)
(2, 'Hola Juan, estamos revisando tu cuenta en Moodle. ¿Podrias indicarme tu nombre de usuario?', '2025-04-29 11:00:00', 2, 6),
(3, 'Encontre el problema: tu cuenta estaba deshabilitada por inactividad. Ya la reactive, proba ingresar de nuevo.', '2025-04-29 16:00:00', 2, 6),

-- Ticket 3 (asignado a Sofia Ramirez - id=5)
(4, 'Recibimos tu solicitud. El cambio a la comision 2K esta aprobado, efectivo desde la semana que viene.', '2025-04-24 15:00:00', 3, 5),

-- Ticket 4 (asignado a Diego Herrera - id=6)
(5, 'Estamos al tanto del problema. Vamos a aumentar el limite de subida a 15MB. Esperamos tenerlo listo manana.', '2025-04-26 14:00:00', 4, 6),

-- Ticket 5 (asignado a Sofia Ramirez - id=5)
(6, 'Camila, necesitamos que nos envies el certificado analitico original legalizado. ¿Podes acercarlo a bedelia?', '2025-04-28 09:00:00', 5, 5),

-- Ticket 7 (asignado a Miguel Torres - id=7)
(7, 'La inscripcion al segundo cuatrimestre abre el 15/07. Para Redes necesitas tener Programacion II aprobada.', '2025-04-17 14:00:00', 7, 7),
(8, 'Te confirmo que no hay requisitos adicionales mas alla de las correlatividades.', '2025-04-18 10:00:00', 7, 7),

-- Ticket 9 (asignado a Sofia Ramirez - id=5)
(9, 'Luis, el certificado esta siendo procesado. Lo tendremos listo para el jueves.', '2025-04-23 11:00:00', 9, 5),

-- Ticket 10 (asignado a Laura Sanchez - id=4)
(10, 'Camila, ya contactamos al area de Sistemas Academicos para que revisen la correlatividad en el SIU. Estamos esperando su respuesta.', '2025-04-22 16:00:00', 10, 4),

-- Ticket 13 (asignado a Sofia Ramirez - id=5)
(11, 'Maria, ya contactamos al profesor para que firme la rectificacion del acta.', '2025-03-28 10:00:00', 13, 5),
(12, 'El acta fue corregida exitosamente. La nota 8 ya figura en el sistema.', '2025-04-02 14:00:00', 13, 5),

-- Ticket 14 (asignado a Miguel Torres - id=7)
(13, 'Los horarios de bedelia en vacaciones de invierno son de lunes a viernes de 10 a 14 hs.', '2025-04-07 10:00:00', 14, 7),

-- Ticket 15 (asignado a Diego Herrera - id=6)
(14, 'Camila, revise tu acceso al aula. Estabas inscripta en una seccion equivocada. Ya te movi al aula correcta.', '2025-04-14 12:00:00', 15, 6),
(15, 'Confirmame si ahora podes ver los materiales.', '2025-04-14 12:05:00', 15, 6),

-- Ticket 16 (asignado a Roberto Garcia - id=3)
(16, 'Ana, voy a revisar con el profesor la evaluacion del TP grupal. Te comento a la brevedad.', '2025-05-05 14:00:00', 16, 3),

-- Ticket 17 (asignado a Diego Herrera - id=6)
(17, 'Luis, ya abrimos un ticket con el equipo de SIU Guarani a nivel central. Estamos esperando respuesta.', '2025-05-07 09:00:00', 17, 6),

-- Ticket 18 (asignado a Sofia Ramirez - id=5)
(18, 'Maria, tu certificado de alumno regular ya esta listo. Podes retirarlo por bedelia.', '2025-04-11 14:00:00', 18, 5),

-- Ticket 19 (asignado a Laura Sanchez - id=4)
(19, 'Juan, voy a contactar al profesor de SO para consultarle sobre el material. Te aviso.', '2025-05-08 09:00:00', 19, 4),

-- Ticket 20 (asignado a Diego Herrera - id=6)
(20, 'El problema era un error en el CSS de la tabla. Ya fue corregido.', '2025-03-26 15:00:00', 20, 6),

-- Ticket 21 (asignado a Miguel Torres - id=7)
(21, 'Ana, el instituto tiene convenio con la beca Progresar y tambien con el programa Potenciar Trabajo. Te paso los links de inscripcion por email.', '2025-04-03 11:00:00', 21, 7),

-- Ticket 22 (asignado a Sofia Ramirez - id=5)
(22, 'Luis, necesitamos que presentes: fotocopia del DNI, certificado analitico de secundario legalizado, y 2 fotos 4x4.', '2025-04-30 10:00:00', 22, 5),

-- Ticket 23 (asignado a Roberto Garcia - id=3)
(23, 'Maria, ya contacte a la coordinacion de la carrera. Estan verificando con la direccion de estudios.', '2025-05-09 11:00:00', 23, 3),

-- Ticket 24 (asignado a Diego Herrera - id=6)
(24, 'Juan, el formato .zip fue habilitado en la configuracion de Moodle. Ya podes subir tu TP.', '2025-04-17 14:00:00', 24, 6),

-- Ticket 25 (asignado a Sofia Ramirez - id=5)
(25, 'Camila, ya contactamos al profesor para que rectifique el acta de cursada.', '2025-05-03 10:00:00', 25, 5),

-- Ticket 27 (asignado a Diego Herrera - id=6)
(26, 'Maria, el periodo de inscripcion efectivamente estaba cerrado por error. Contactamos al equipo de SIU para que lo reabran.', '2025-05-05 09:00:00', 27, 6),

-- Ticket 28 (asignado a Sofia Ramirez - id=5)
(27, 'Luis, el cambio de comision fue aprobado. A partir de la semana que viene cursas Redes en la comision 3K.', '2025-03-20 14:00:00', 28, 5);

SELECT setval('messages_id_seq', 27);

-- ============================================================
-- TICKET HISTORY
-- ============================================================

INSERT INTO ticket_history (id, action, "oldValue", "newValue", description, "createdAt", "ticketId", "performedById") VALUES
-- Ticket 1
(1, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-05-01 10:30:00', 1, 8),
(2, 'ASSIGNED_CHANGED', NULL, 'Roberto Garcia', 'Responsable asignado: Roberto Garcia', '2025-05-01 10:30:00', 1, 8),

-- Ticket 2
(3, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-04-28 09:15:00', 2, 9),
(4, 'ASSIGNED_CHANGED', NULL, 'Diego Herrera', 'Responsable asignado: Diego Herrera', '2025-04-28 09:15:00', 2, 9),
(5, 'STATUS_CHANGED', 'OPEN', 'IN_PROGRESS', 'Estado cambiado de Abierto a En progreso', '2025-04-29 11:00:00', 2, 6),
(6, 'MESSAGE_ADDED', NULL, NULL, 'Mensaje agregado', '2025-04-29 11:00:00', 2, 6),
(7, 'COMMENT_ADDED', NULL, NULL, 'Comentario agregado', '2025-04-29 08:00:00', 2, 9),

-- Ticket 3
(8, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-04-20 16:00:00', 3, 10),
(9, 'ASSIGNED_CHANGED', NULL, 'Sofia Ramirez', 'Responsable asignado: Sofia Ramirez', '2025-04-20 16:00:00', 3, 10),
(10, 'STATUS_CHANGED', 'OPEN', 'IN_PROGRESS', 'Estado cambiado de Abierto a En progreso', '2025-04-22 09:00:00', 3, 5),
(11, 'STATUS_CHANGED', 'IN_PROGRESS', 'RESOLVED', 'Estado cambiado de En progreso a Resuelto', '2025-04-24 15:00:00', 3, 5),
(12, 'STATUS_CHANGED', 'RESOLVED', 'CLOSED', 'Estado cambiado de Resuelto a Cerrado', '2025-04-25 10:00:00', 3, 5),

-- Ticket 4
(13, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-04-25 11:00:00', 4, 11),
(14, 'ASSIGNED_CHANGED', NULL, 'Diego Herrera', 'Responsable asignado: Diego Herrera', '2025-04-25 11:00:00', 4, 11),
(15, 'STATUS_CHANGED', 'OPEN', 'IN_PROGRESS', 'Estado cambiado de Abierto a En progreso', '2025-04-26 14:00:00', 4, 6),

-- Ticket 5
(16, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-04-22 14:30:00', 5, 12),
(17, 'ASSIGNED_CHANGED', NULL, 'Sofia Ramirez', 'Responsable asignado: Sofia Ramirez', '2025-04-22 14:30:00', 5, 12),
(18, 'STATUS_CHANGED', 'OPEN', 'IN_PROGRESS', 'Estado cambiado de Abierto a En progreso', '2025-04-25 10:00:00', 5, 5),
(19, 'STATUS_CHANGED', 'IN_PROGRESS', 'WAITING_FOR_STUDENT', 'Estado cambiado de En progreso a Esperando al estudiante', '2025-04-28 09:00:00', 5, 5),

-- Ticket 6
(20, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-05-02 08:45:00', 6, 9),
(21, 'ASSIGNED_CHANGED', NULL, 'Roberto Garcia', 'Responsable asignado: Roberto Garcia', '2025-05-02 08:45:00', 6, 9),

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
(29, 'ASSIGNED_CHANGED', NULL, 'Sofia Ramirez', 'Responsable asignado: Sofia Ramirez', '2025-04-21 09:00:00', 9, 11),
(30, 'STATUS_CHANGED', 'OPEN', 'IN_PROGRESS', 'Estado cambiado de Abierto a En progreso', '2025-04-23 11:00:00', 9, 5),

-- Ticket 10
(31, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-04-18 10:30:00', 10, 12),
(32, 'ASSIGNED_CHANGED', NULL, 'Laura Sanchez', 'Responsable asignado: Laura Sanchez', '2025-04-18 10:30:00', 10, 12),
(33, 'STATUS_CHANGED', 'OPEN', 'IN_PROGRESS', 'Estado cambiado de Abierto a En progreso', '2025-04-20 09:00:00', 10, 4),
(34, 'STATUS_CHANGED', 'IN_PROGRESS', 'WAITING_FOR_THIRD_PARTY', 'Estado cambiado de En progreso a Esperando a un tercero', '2025-04-22 16:00:00', 10, 4),

-- Ticket 11
(35, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-05-04 11:00:00', 11, 9),
(36, 'ASSIGNED_CHANGED', NULL, 'Sofia Ramirez', 'Responsable asignado: Sofia Ramirez', '2025-05-04 11:00:00', 11, 9),

-- Ticket 12
(37, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-04-10 15:00:00', 12, 10),
(38, 'ASSIGNED_CHANGED', NULL, 'Laura Sanchez', 'Responsable asignado: Laura Sanchez', '2025-04-10 15:00:00', 12, 10),
(39, 'STATUS_CHANGED', 'OPEN', 'CANCELLED', 'Estado cambiado de Abierto a Cancelado', '2025-04-12 09:00:00', 12, 10),

-- Ticket 13
(40, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-03-25 09:00:00', 13, 8),
(41, 'ASSIGNED_CHANGED', NULL, 'Sofia Ramirez', 'Responsable asignado: Sofia Ramirez', '2025-03-25 09:00:00', 13, 8),
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
(54, 'ASSIGNED_CHANGED', NULL, 'Roberto Garcia', 'Responsable asignado: Roberto Garcia', '2025-05-05 09:00:00', 16, 10),

-- Ticket 17
(55, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-05-06 10:15:00', 17, 11),
(56, 'ASSIGNED_CHANGED', NULL, 'Diego Herrera', 'Responsable asignado: Diego Herrera', '2025-05-06 10:15:00', 17, 11),
(57, 'STATUS_CHANGED', 'OPEN', 'IN_PROGRESS', 'Estado cambiado de Abierto a En progreso', '2025-05-07 09:00:00', 17, 6),

-- Ticket 18
(58, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-04-08 11:00:00', 18, 8),
(59, 'ASSIGNED_CHANGED', NULL, 'Sofia Ramirez', 'Responsable asignado: Sofia Ramirez', '2025-04-08 11:00:00', 18, 8),
(60, 'STATUS_CHANGED', 'OPEN', 'IN_PROGRESS', 'Estado cambiado de Abierto a En progreso', '2025-04-09 10:00:00', 18, 5),
(61, 'STATUS_CHANGED', 'IN_PROGRESS', 'RESOLVED', 'Estado cambiado de En progreso a Resuelto', '2025-04-11 14:00:00', 18, 5),

-- Ticket 19
(62, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-05-07 14:30:00', 19, 9),
(63, 'ASSIGNED_CHANGED', NULL, 'Laura Sanchez', 'Responsable asignado: Laura Sanchez', '2025-05-07 14:30:00', 19, 9),

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
(74, 'ASSIGNED_CHANGED', NULL, 'Sofia Ramirez', 'Responsable asignado: Sofia Ramirez', '2025-04-25 09:00:00', 22, 11),
(75, 'STATUS_CHANGED', 'OPEN', 'IN_PROGRESS', 'Estado cambiado de Abierto a En progreso', '2025-04-28 09:00:00', 22, 5),
(76, 'STATUS_CHANGED', 'IN_PROGRESS', 'WAITING_FOR_STUDENT', 'Estado cambiado de En progreso a Esperando al estudiante', '2025-04-30 10:00:00', 22, 5),

-- Ticket 23
(77, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-05-08 08:00:00', 23, 8),
(78, 'ASSIGNED_CHANGED', NULL, 'Roberto Garcia', 'Responsable asignado: Roberto Garcia', '2025-05-08 08:00:00', 23, 8),
(79, 'STATUS_CHANGED', 'OPEN', 'IN_PROGRESS', 'Estado cambiado de Abierto a En progreso', '2025-05-09 11:00:00', 23, 3),

-- Ticket 24
(80, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-04-15 09:30:00', 24, 9),
(81, 'ASSIGNED_CHANGED', NULL, 'Diego Herrera', 'Responsable asignado: Diego Herrera', '2025-04-15 09:30:00', 24, 9),
(82, 'STATUS_CHANGED', 'OPEN', 'IN_PROGRESS', 'Estado cambiado de Abierto a En progreso', '2025-04-16 10:00:00', 24, 6),
(83, 'STATUS_CHANGED', 'IN_PROGRESS', 'RESOLVED', 'Estado cambiado de En progreso a Resuelto', '2025-04-17 14:00:00', 24, 6),

-- Ticket 25
(84, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-05-01 08:00:00', 25, 12),
(85, 'ASSIGNED_CHANGED', NULL, 'Sofia Ramirez', 'Responsable asignado: Sofia Ramirez', '2025-05-01 08:00:00', 25, 12),
(86, 'STATUS_CHANGED', 'OPEN', 'IN_PROGRESS', 'Estado cambiado de Abierto a En progreso', '2025-05-03 10:00:00', 25, 5),

-- Ticket 26
(87, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-05-09 10:00:00', 26, 10),
(88, 'ASSIGNED_CHANGED', NULL, 'Laura Sanchez', 'Responsable asignado: Laura Sanchez', '2025-05-09 10:00:00', 26, 10),

-- Ticket 27
(89, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-05-03 07:30:00', 27, 8),
(90, 'ASSIGNED_CHANGED', NULL, 'Diego Herrera', 'Responsable asignado: Diego Herrera', '2025-05-03 07:30:00', 27, 8),
(91, 'STATUS_CHANGED', 'OPEN', 'IN_PROGRESS', 'Estado cambiado de Abierto a En progreso', '2025-05-04 09:00:00', 27, 6),
(92, 'STATUS_CHANGED', 'IN_PROGRESS', 'WAITING_FOR_THIRD_PARTY', 'Estado cambiado de En progreso a Esperando a un tercero', '2025-05-05 09:00:00', 27, 6),

-- Ticket 28
(93, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-03-15 10:00:00', 28, 11),
(94, 'ASSIGNED_CHANGED', NULL, 'Sofia Ramirez', 'Responsable asignado: Sofia Ramirez', '2025-03-15 10:00:00', 28, 11),
(95, 'STATUS_CHANGED', 'OPEN', 'IN_PROGRESS', 'Estado cambiado de Abierto a En progreso', '2025-03-17 09:00:00', 28, 5),
(96, 'STATUS_CHANGED', 'IN_PROGRESS', 'RESOLVED', 'Estado cambiado de En progreso a Resuelto', '2025-03-20 14:00:00', 28, 5),
(97, 'STATUS_CHANGED', 'RESOLVED', 'CLOSED', 'Estado cambiado de Resuelto a Cerrado', '2025-03-22 16:00:00', 28, 5),

-- Ticket 29
(98, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-04-02 13:00:00', 29, 9),
(99, 'ASSIGNED_CHANGED', NULL, 'Miguel Torres', 'Responsable asignado: Miguel Torres', '2025-04-02 13:00:00', 29, 9),
(100, 'STATUS_CHANGED', 'OPEN', 'CANCELLED', 'Estado cambiado de Abierto a Cancelado', '2025-04-03 08:00:00', 29, 9),

-- Ticket 30
(101, 'TICKET_CREATED', NULL, NULL, 'Ticket creado', '2025-05-10 11:00:00', 30, 10),
(102, 'ASSIGNED_CHANGED', NULL, 'Sofia Ramirez', 'Responsable asignado: Sofia Ramirez', '2025-05-10 11:00:00', 30, 10);

SELECT setval('ticket_history_id_seq', 102);

-- ============================================================
-- NOTIFICATIONS
-- ============================================================

INSERT INTO notifications (id, message, type, read, "createdAt", "ticketId", "recipientId") VALUES
-- Notificaciones para admin (id=1)
(1, 'Nuevo ticket #11 creado: Inicio de tramite de titulo de Tecnico Superior', 'TICKET_CREATED', false, '2025-05-04 11:00:00', 11, 1),
(2, 'Nuevo ticket #8 creado: SIU Guarani no muestra materias aprobadas', 'TICKET_CREATED', true, '2025-05-03 13:00:00', 8, 1),
(3, 'Nuevo ticket #6 creado: Error en la fecha de examen final publicada', 'TICKET_CREATED', true, '2025-05-02 08:45:00', 6, 1),

-- Notificaciones para staff Roberto Garcia (id=3)
(4, 'Nuevo ticket #1 asignado: No aparece mi calificacion del parcial', 'TICKET_CREATED', false, '2025-05-01 10:30:00', 1, 3),
(5, 'Nuevo ticket #6 asignado: Error en la fecha de examen final publicada', 'TICKET_CREATED', false, '2025-05-02 08:45:00', 6, 3),
(6, 'Nuevo comentario en ticket #1', 'COMMENT_ADDED', false, '2025-05-01 11:00:00', 1, 3),

-- Notificaciones para staff Diego Herrera (id=6)
(7, 'Nuevo ticket #2 asignado: No puedo acceder a Moodle desde hace 3 dias', 'TICKET_CREATED', true, '2025-04-28 09:15:00', 2, 6),
(8, 'Nuevo comentario en ticket #2', 'COMMENT_ADDED', true, '2025-04-28 14:00:00', 2, 6),
(9, 'Nuevo ticket #8 asignado: SIU Guarani no muestra materias aprobadas', 'TICKET_CREATED', false, '2025-05-03 13:00:00', 8, 6),
(10, 'Nuevo ticket #4 asignado: Error al subir trabajos practicos en el sitio', 'TICKET_CREATED', true, '2025-04-25 11:00:00', 4, 6),

-- Notificaciones para staff Sofia Ramirez (id=5)
(11, 'Nuevo ticket #5 asignado: Solicitud de equivalencia de Matematica I', 'TICKET_CREATED', true, '2025-04-22 14:30:00', 5, 5),
(12, 'Nuevo comentario en ticket #5', 'COMMENT_ADDED', true, '2025-04-23 09:00:00', 5, 5),
(13, 'Nuevo ticket #11 asignado: Inicio de tramite de titulo de Tecnico Superior', 'TICKET_CREATED', false, '2025-05-04 11:00:00', 11, 5),

-- Notificaciones para estudiante Maria Lopez (id=8)
(14, 'Nuevo ticket #1 creado: No aparece mi calificacion del parcial', 'TICKET_CREATED', true, '2025-05-01 10:30:00', 1, 8),
(15, 'Nuevo mensaje en ticket #1', 'MESSAGE_ADDED', false, '2025-05-01 14:00:00', 1, 8),
(16, 'Ticket #13 cambio estado a Resuelto', 'STATUS_CHANGED', true, '2025-04-02 14:00:00', 13, 8),

-- Notificaciones para estudiante Juan Perez (id=9)
(17, 'Nuevo ticket #2 creado: No puedo acceder a Moodle desde hace 3 dias', 'TICKET_CREATED', true, '2025-04-28 09:15:00', 2, 9),
(18, 'Nuevo mensaje en ticket #2', 'MESSAGE_ADDED', false, '2025-04-29 11:00:00', 2, 9),
(19, 'Nuevo mensaje en ticket #2', 'MESSAGE_ADDED', false, '2025-04-29 16:00:00', 2, 9),

-- Notificaciones para estudiante Camila Ruiz (id=12)
(20, 'Ticket #5 cambio estado a Esperando Estudiante', 'STATUS_CHANGED', false, '2025-04-28 09:00:00', 5, 12),
(21, 'Nuevo mensaje en ticket #5', 'MESSAGE_ADDED', false, '2025-04-28 09:00:00', 5, 12),
(22, 'Ticket #15 cambio estado a Resuelto', 'STATUS_CHANGED', true, '2025-04-14 17:00:00', 15, 12),

-- Notificaciones de tickets 16-30
(23, 'Nuevo ticket #16 creado: Nota del TP grupal no refleja mi participacion', 'TICKET_CREATED', false, '2025-05-05 09:00:00', 16, 1),
(24, 'Se te asigno el ticket #16', 'ASSIGNED_CHANGED', false, '2025-05-05 09:00:00', 16, 3),
(25, 'Nuevo ticket #17 creado: No puedo generar el certificado analitico desde el SIU', 'TICKET_CREATED', false, '2025-05-06 10:15:00', 17, 1),
(26, 'Se te asigno el ticket #17', 'ASSIGNED_CHANGED', false, '2025-05-06 10:15:00', 17, 6),
(27, 'El ticket #17 cambio a: En Proceso', 'STATUS_CHANGED', false, '2025-05-07 09:00:00', 17, 11),
(28, 'Ticket #18 cambio estado a Resuelto', 'STATUS_CHANGED', true, '2025-04-11 14:00:00', 18, 8),
(29, 'Nuevo ticket #19 creado: Falta de material bibliografico en el campus', 'TICKET_CREATED', false, '2025-05-07 14:30:00', 19, 1),
(30, 'Se te asigno el ticket #19', 'ASSIGNED_CHANGED', false, '2025-05-07 14:30:00', 19, 4),
(31, 'Ticket #21 cambio estado a Resuelto', 'STATUS_CHANGED', true, '2025-04-03 11:00:00', 21, 10),
(32, 'Nuevo mensaje en ticket #21', 'MESSAGE_ADDED', true, '2025-04-03 11:00:00', 21, 10),
(33, 'El ticket #22 cambio a: Esperando Estudiante', 'STATUS_CHANGED', false, '2025-04-30 10:00:00', 22, 11),
(34, 'Nuevo mensaje en ticket #22', 'MESSAGE_ADDED', false, '2025-04-30 10:00:00', 22, 11),
(35, 'Se te asigno el ticket #23', 'ASSIGNED_CHANGED', false, '2025-05-08 08:00:00', 23, 3),
(36, 'El ticket #23 cambio a: En Proceso', 'STATUS_CHANGED', false, '2025-05-09 11:00:00', 23, 8),
(37, 'Ticket #24 cambio estado a Resuelto', 'STATUS_CHANGED', true, '2025-04-17 14:00:00', 24, 9),
(38, 'Nuevo comentario en ticket #25', 'COMMENT_ADDED', false, '2025-05-01 10:00:00', 25, 5),
(39, 'Se te asigno el ticket #26', 'ASSIGNED_CHANGED', false, '2025-05-09 10:00:00', 26, 4),
(40, 'El ticket #27 cambio a: Esperando Terceros', 'STATUS_CHANGED', false, '2025-05-05 09:00:00', 27, 8),
(41, 'Nuevo ticket #30 creado: Solicitud de equivalencia de Ingles I', 'TICKET_CREATED', false, '2025-05-10 11:00:00', 30, 1),
(42, 'Se te asigno el ticket #30', 'ASSIGNED_CHANGED', false, '2025-05-10 11:00:00', 30, 5);

SELECT setval('notifications_id_seq', 42);

-- ============================================================
-- FIN DEL SEED — 12 usuarios, 30 tickets, 17 comentarios, 27 mensajes, 102 historial, 42 notificaciones
-- ============================================================
-- Credenciales de prueba (contrasena: Password123! para todos):
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
