export type Locale = 'en' | 'fr' | 'es';

export const translations = {
  // ─── Global ──────────────────────────────────────────────────────
  'app.name': { en: 'LogiTrainer', fr: 'LogiTrainer', es: 'LogiTrainer' },
  'app.subtitle': { en: 'AI Studio 2.0 Pro', fr: 'AI Studio 2.0 Pro', es: 'AI Studio 2.0 Pro' },
  'app.tagline': { en: 'Dark Cinematic Industrial Video IDE', fr: 'IDE Vidéo Industriel Cinématique', es: 'IDE de Video Cinematográfico Industrial' },
  'app.version': { en: 'v2.0.0 • Neural Engine Ready', fr: 'v2.0.0 • Moteur Neuronal Prêt', es: 'v2.0.0 • Motor Neural Listo' },
  'status.online': { en: 'ONLINE', fr: 'EN LIGNE', es: 'EN LÍNEA' },
  'status.scenes': { en: 'scenes', fr: 'scènes', es: 'escenas' },
  'status.calls': { en: 'calls', fr: 'appels', es: 'llamadas' },

  // ─── Navigation ──────────────────────────────────────────────────
  'nav.architect': { en: 'Architect', fr: 'Architecte', es: 'Arquitecto' },
  'nav.architect.sub': { en: 'Script & Scenes', fr: 'Script & Scènes', es: 'Guión & Escenas' },
  'nav.studio': { en: 'Studio', fr: 'Studio', es: 'Estudio' },
  'nav.studio.sub': { en: 'Asset Generation', fr: 'Génération d\'Assets', es: 'Generación de Assets' },
  'nav.timeline': { en: 'Timeline', fr: 'Chronologie', es: 'Línea de Tiempo' },
  'nav.timeline.sub': { en: 'Edit & Compose', fr: 'Éditer & Composer', es: 'Editar & Componer' },
  'nav.assistant': { en: 'Neural Assistant', fr: 'Assistant Neuronal', es: 'Asistente Neural' },

  // ─── Welcome ─────────────────────────────────────────────────────
  'welcome.feature.script': { en: 'AI Script Generation', fr: 'Génération de Scripts IA', es: 'Generación de Guiones IA' },
  'welcome.feature.script.desc': { en: 'Multi-scene scripts from a single brief', fr: 'Scripts multi-scènes à partir d\'un brief', es: 'Guiones multi-escena desde un brief' },
  'welcome.feature.assets': { en: 'Asset Orchestration', fr: 'Orchestration d\'Assets', es: 'Orquestación de Assets' },
  'welcome.feature.assets.desc': { en: 'Image, audio & video generation in one flow', fr: 'Génération image, audio & vidéo en un flux', es: 'Generación de imagen, audio y video en un flujo' },
  'welcome.feature.timeline': { en: 'Timeline Editor', fr: 'Éditeur de Chronologie', es: 'Editor de Línea de Tiempo' },
  'welcome.feature.timeline.desc': { en: 'Canvas-based editing with multi-track support', fr: 'Édition canvas avec support multi-piste', es: 'Edición canvas con soporte multi-pista' },
  'welcome.feature.neural': { en: 'Neural Assistant', fr: 'Assistant Neuronal', es: 'Asistente Neural' },
  'welcome.feature.neural.desc': { en: 'AI copilot for creative direction', fr: 'Copilote IA pour la direction créative', es: 'Copiloto IA para dirección creativa' },
  'welcome.init': { en: 'Initialize Project', fr: 'Initialiser le Projet', es: 'Inicializar Proyecto' },
  'welcome.new': { en: 'New Project', fr: 'Nouveau Projet', es: 'Nuevo Proyecto' },
  'welcome.name': { en: 'Name your video production', fr: 'Nommez votre production vidéo', es: 'Nombre su producción de video' },
  'welcome.placeholder': { en: 'e.g. Cyberpunk Coffee Ad', fr: 'ex. Pub Café Cyberpunk', es: 'ej. Anuncio Café Cyberpunk' },
  'welcome.back': { en: 'Back', fr: 'Retour', es: 'Volver' },
  'welcome.create': { en: 'Create & Enter', fr: 'Créer & Entrer', es: 'Crear & Entrar' },

  // ─── Architect ───────────────────────────────────────────────────
  'architect.title': { en: 'Script Architect', fr: 'Architecte de Script', es: 'Arquitecto de Guión' },
  'architect.desc': { en: 'Describe your video concept. AI will generate a multi-scene script using', fr: 'Décrivez votre concept vidéo. L\'IA générera un script multi-scènes avec', es: 'Describe tu concepto de video. La IA generará un guión multi-escena usando' },
  'architect.placeholder': { en: 'A commercial for a cyberpunk coffee shop with neon aesthetics...', fr: 'Une publicité pour un café cyberpunk avec une esthétique néon...', es: 'Un comercial para una cafetería cyberpunk con estética neón...' },
  'architect.generate': { en: 'Generate Script', fr: 'Générer le Script', es: 'Generar Guión' },
  'architect.generating': { en: 'Generating...', fr: 'Génération...', es: 'Generando...' },
  'architect.empty': { en: 'No scenes yet. Enter a brief and generate your script.', fr: 'Pas encore de scènes. Entrez un brief et générez votre script.', es: 'Sin escenas aún. Ingrese un brief y genere su guión.' },
  'architect.genscript': { en: 'Generating script...', fr: 'Génération du script...', es: 'Generando guión...' },
  'architect.using': { en: 'Using', fr: 'Utilisant', es: 'Usando' },
  'architect.visual': { en: 'Visual', fr: 'Visuel', es: 'Visual' },
  'architect.voiceover': { en: 'Voiceover', fr: 'Voix Off', es: 'Voz en Off' },

  // ─── Studio ──────────────────────────────────────────────────────
  'studio.title': { en: 'Asset Studio', fr: 'Studio d\'Assets', es: 'Estudio de Assets' },
  'studio.desc': { en: 'Generate assets using', fr: 'Générer des assets avec', es: 'Generar assets usando' },
  'studio.genall': { en: 'Generate All Images', fr: 'Générer Toutes les Images', es: 'Generar Todas las Imágenes' },
  'studio.empty': { en: 'Generate a script in the Architect first.', fr: 'Générez d\'abord un script dans l\'Architecte.', es: 'Genere primero un guión en el Arquitecto.' },
  'studio.view': { en: 'View', fr: 'Voir', es: 'Ver' },
  'studio.edit': { en: 'Edit', fr: 'Éditer', es: 'Editar' },
  'studio.working': { en: 'Working...', fr: 'En cours...', es: 'Trabajando...' },
  'studio.gen': { en: 'Gen', fr: 'Gén', es: 'Gen' },

  // ─── Timeline ────────────────────────────────────────────────────
  'timeline.play': { en: 'Play/Pause', fr: 'Lecture/Pause', es: 'Reproducir/Pausa' },
  'timeline.start': { en: 'Go to start', fr: 'Aller au début', es: 'Ir al inicio' },
  'timeline.end': { en: 'Go to end', fr: 'Aller à la fin', es: 'Ir al final' },
  'timeline.addscenes': { en: 'Add Scenes to Timeline', fr: 'Ajouter les Scènes', es: 'Agregar Escenas al Timeline' },
  'timeline.seek': { en: 'Seek ±1s', fr: 'Chercher ±1s', es: 'Buscar ±1s' },
  'timeline.zoom': { en: 'Zoom', fr: 'Zoom', es: 'Zoom' },
  'timeline.video.empty': { en: 'Video Track Empty', fr: 'Piste Vidéo Vide', es: 'Pista de Video Vacía' },
  'timeline.audio.empty': { en: 'Audio Track Empty', fr: 'Piste Audio Vide', es: 'Pista de Audio Vacía' },

  // ─── Chat ────────────────────────────────────────────────────────
  'chat.title': { en: 'Neural Assistant', fr: 'Assistant Neuronal', es: 'Asistente Neural' },
  'chat.empty': { en: 'Ask me about your project, script ideas, or creative direction.', fr: 'Demandez-moi sur votre projet, idées de script ou direction créative.', es: 'Pregúntame sobre tu proyecto, ideas de guión o dirección creativa.' },
  'chat.powered': { en: 'Powered by', fr: 'Propulsé par', es: 'Impulsado por' },
  'chat.placeholder': { en: 'Ask the Neural Assistant...', fr: 'Demandez à l\'Assistant Neuronal...', es: 'Pregunta al Asistente Neural...' },

  // ─── Image Lab ───────────────────────────────────────────────────
  'imagelab.title': { en: 'Image Lab', fr: 'Labo Image', es: 'Lab de Imagen' },
  'imagelab.edit': { en: 'Edit Image', fr: 'Éditer l\'Image', es: 'Editar Imagen' },
  'imagelab.edit.placeholder': { en: 'e.g. Make it night time, add rain...', fr: 'ex. Passer en nuit, ajouter de la pluie...', es: 'ej. Hacerlo de noche, agregar lluvia...' },
  'imagelab.apply': { en: 'Apply Edit', fr: 'Appliquer', es: 'Aplicar Edición' },
  'imagelab.editing': { en: 'Editing...', fr: 'Édition...', es: 'Editando...' },
  'imagelab.analyze': { en: 'Analyze', fr: 'Analyser', es: 'Analizar' },
  'imagelab.analyze.btn': { en: 'Analyze Composition', fr: 'Analyser la Composition', es: 'Analizar Composición' },
  'imagelab.analyzing': { en: 'Analyzing...', fr: 'Analyse...', es: 'Analizando...' },
  'imagelab.history': { en: 'Edit History', fr: 'Historique', es: 'Historial' },
  'imagelab.noedits': { en: 'No edits yet', fr: 'Pas encore d\'éditions', es: 'Sin ediciones aún' },
  'imagelab.preview': { en: 'Preview', fr: 'Aperçu', es: 'Vista Previa' },

  // ─── API Panel ───────────────────────────────────────────────────
  'api.title': { en: 'API Management', fr: 'Gestion des API', es: 'Gestión de APIs' },
  'api.subtitle': { en: 'Multi-Provider AI Configuration', fr: 'Configuration IA Multi-Fournisseur', es: 'Configuración IA Multi-Proveedor' },
  'api.totalcalls': { en: 'Total Calls', fr: 'Appels Totaux', es: 'Llamadas Totales' },
  'api.success': { en: 'Success Rate', fr: 'Taux de Succès', es: 'Tasa de Éxito' },
  'api.latency': { en: 'Avg Latency', fr: 'Latence Moy.', es: 'Latencia Prom.' },
  'api.errors': { en: 'Errors', fr: 'Erreurs', es: 'Errores' },
  'api.models': { en: 'Models', fr: 'Modèles', es: 'Modelos' },
  'api.providers': { en: 'Providers', fr: 'Fournisseurs', es: 'Proveedores' },
  'api.logs': { en: 'Logs', fr: 'Journaux', es: 'Registros' },
  'api.select': { en: 'Select which AI model to use for each task', fr: 'Sélectionnez le modèle IA pour chaque tâche', es: 'Seleccione qué modelo IA usar para cada tarea' },
  'api.reset': { en: 'Reset Defaults', fr: 'Réinitialiser', es: 'Restablecer' },
  'api.clearlogs': { en: 'Clear Logs', fr: 'Effacer', es: 'Limpiar' },
  'api.nocalls': { en: 'No API calls yet. Start generating to see logs here.', fr: 'Pas d\'appels API. Commencez à générer pour voir les logs.', es: 'Sin llamadas API. Comience a generar para ver registros.' },
  'api.logged': { en: 'API calls logged', fr: 'appels API enregistrés', es: 'llamadas API registradas' },

  // ─── Log Console ─────────────────────────────────────────────────
  'log.title': { en: 'System Log', fr: 'Journal Système', es: 'Registro del Sistema' },
  'log.empty': { en: 'No logs yet', fr: 'Pas encore de logs', es: 'Sin registros aún' },

  // ─── Common ──────────────────────────────────────────────────────
  'common.scene': { en: 'Scene', fr: 'Scène', es: 'Escena' },
  'common.image': { en: 'Image', fr: 'Image', es: 'Imagen' },
  'common.audio': { en: 'Audio', fr: 'Audio', es: 'Audio' },
  'common.video': { en: 'Video', fr: 'Vidéo', es: 'Video' },
  'common.generating': { en: 'Generating...', fr: 'Génération...', es: 'Generando...' },
} as const;

export type TranslationKey = keyof typeof translations;
