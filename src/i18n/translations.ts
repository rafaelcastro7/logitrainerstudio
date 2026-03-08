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
  'welcome.about': { en: 'About', fr: 'À Propos', es: 'Acerca de' },

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

  // ─── API Task Labels (for API Management Panel) ───────────────
  'api.task.scriptGeneration': { en: 'Script Generation', fr: 'Génération de Script', es: 'Generación de Guión' },
  'api.task.scriptGeneration.desc': { en: 'AI model for generating video scripts from briefs', fr: 'Modèle IA pour générer des scripts vidéo à partir de briefs', es: 'Modelo IA para generar guiones de video desde briefs' },
  'api.task.chatAssistant': { en: 'Chat Assistant', fr: 'Assistant Chat', es: 'Asistente de Chat' },
  'api.task.chatAssistant.desc': { en: 'Neural Assistant conversation model', fr: 'Modèle de conversation de l\'Assistant Neuronal', es: 'Modelo de conversación del Asistente Neural' },
  'api.task.imageGeneration': { en: 'Image Generation', fr: 'Génération d\'Images', es: 'Generación de Imágenes' },
  'api.task.imageGeneration.desc': { en: 'Model for creating scene visuals', fr: 'Modèle pour créer les visuels de scènes', es: 'Modelo para crear visuales de escenas' },
  'api.task.imageAnalysis': { en: 'Image Analysis', fr: 'Analyse d\'Images', es: 'Análisis de Imágenes' },
  'api.task.imageAnalysis.desc': { en: 'Composition & lighting analysis', fr: 'Analyse de composition et d\'éclairage', es: 'Análisis de composición e iluminación' },
  'api.task.imageEdit': { en: 'Image Editing', fr: 'Édition d\'Images', es: 'Edición de Imágenes' },
  'api.task.imageEdit.desc': { en: 'Edit existing images with AI', fr: 'Éditer des images existantes avec l\'IA', es: 'Editar imágenes existentes con IA' },

  // ─── Log Console ─────────────────────────────────────────────────
  'log.title': { en: 'System Log', fr: 'Journal Système', es: 'Registro del Sistema' },
  'log.empty': { en: 'No logs yet', fr: 'Pas encore de logs', es: 'Sin registros aún' },

  // ─── Common ──────────────────────────────────────────────────────
  'common.scene': { en: 'Scene', fr: 'Scène', es: 'Escena' },
  'common.image': { en: 'Image', fr: 'Image', es: 'Imagen' },
  'common.audio': { en: 'Audio', fr: 'Audio', es: 'Audio' },
  'common.video': { en: 'Video', fr: 'Vidéo', es: 'Video' },
  'common.generating': { en: 'Generating...', fr: 'Génération...', es: 'Generando...' },

  // ─── About Page ──────────────────────────────────────────────────
  'about.back': { en: '← Back to Studio', fr: '← Retour au Studio', es: '← Volver al Estudio' },
  'about.label': { en: 'About the Platform', fr: 'À Propos de la Plateforme', es: 'Acerca de la Plataforma' },
  'about.hero.desc': {
    en: 'A next-generation AI-powered video production IDE that transforms creative briefs into fully produced video content through intelligent scene decomposition, multi-modal asset generation, and professional timeline editing.',
    fr: 'Un IDE de production vidéo de nouvelle génération propulsé par l\'IA qui transforme les briefs créatifs en contenu vidéo complet grâce à la décomposition intelligente de scènes, la génération d\'assets multi-modaux et l\'édition professionnelle sur timeline.',
    es: 'Un IDE de producción de video de nueva generación impulsado por IA que transforma briefings creativos en contenido de video completo mediante descomposición inteligente de escenas, generación de assets multimodal y edición profesional en línea de tiempo.',
  },
  'about.stat.models': { en: 'AI Models', fr: 'Modèles IA', es: 'Modelos IA' },
  'about.stat.providers': { en: 'Providers', fr: 'Fournisseurs', es: 'Proveedores' },
  'about.stat.languages': { en: 'Languages', fr: 'Langues', es: 'Idiomas' },
  'about.stat.possibilities': { en: 'Possibilities', fr: 'Possibilités', es: 'Posibilidades' },

  'about.what.label': { en: 'The Vision', fr: 'La Vision', es: 'La Visión' },
  'about.what.title': {
    en: 'From Brief to Final Cut — All in One IDE',
    fr: 'Du Brief au Montage Final — Tout en Un IDE',
    es: 'Del Brief al Corte Final — Todo en Un IDE',
  },
  'about.what.p1': {
    en: 'LogiTrainer AI Studio reimagines the video production pipeline. Instead of juggling multiple tools for scripting, image generation, voiceover, and editing, everything lives in a single, purpose-built environment. Write a brief, and the AI Architect decomposes it into production-ready scenes with visual prompts and voiceover scripts.',
    fr: 'LogiTrainer AI Studio réinvente le pipeline de production vidéo. Au lieu de jongler entre plusieurs outils pour le scripting, la génération d\'images, la voix off et le montage, tout vit dans un seul environnement dédié. Écrivez un brief, et l\'Architecte IA le décompose en scènes prêtes à produire avec des prompts visuels et des scripts de voix off.',
    es: 'LogiTrainer AI Studio reimagina el pipeline de producción de video. En lugar de hacer malabares con múltiples herramientas para guión, generación de imágenes, narración y edición, todo vive en un único entorno dedicado. Escriba un brief, y el Arquitecto IA lo descompone en escenas listas para producción con prompts visuales y guiones de narración.',
  },
  'about.what.p2': {
    en: 'The Asset Studio then generates images, audio, and video for each scene using state-of-the-art AI models from Google and OpenAI. Finally, the Timeline Editor lets you arrange, trim, and compose your final production with frame-accurate precision.',
    fr: 'Le Studio d\'Assets génère ensuite images, audio et vidéo pour chaque scène en utilisant des modèles IA de pointe de Google et OpenAI. Enfin, l\'Éditeur de Timeline vous permet d\'organiser, couper et composer votre production finale avec une précision à l\'image près.',
    es: 'El Estudio de Assets luego genera imágenes, audio y video para cada escena usando modelos de IA de última generación de Google y OpenAI. Finalmente, el Editor de Timeline le permite organizar, recortar y componer su producción final con precisión de fotograma.',
  },

  // About workflow steps
  'about.step.1': { en: 'Script Architect → AI generates scenes', fr: 'Architecte de Script → L\'IA génère les scènes', es: 'Arquitecto de Guión → La IA genera escenas' },
  'about.step.2': { en: 'Asset Studio → Images, audio, video', fr: 'Studio d\'Assets → Images, audio, vidéo', es: 'Estudio de Assets → Imágenes, audio, video' },
  'about.step.3': { en: 'Timeline → Multi-track editing', fr: 'Timeline → Montage multi-piste', es: 'Timeline → Edición multi-pista' },
  'about.step.4': { en: 'Neural Assistant → Creative copilot', fr: 'Assistant Neuronal → Copilote créatif', es: 'Asistente Neural → Copiloto creativo' },

  'about.modules.label': { en: 'Core Modules', fr: 'Modules Principaux', es: 'Módulos Principales' },
  'about.modules.title': { en: 'Six Integrated Modules', fr: 'Six Modules Intégrés', es: 'Seis Módulos Integrados' },
  'about.module.architect': { en: 'Script Architect', fr: 'Architecte de Script', es: 'Arquitecto de Guión' },
  'about.module.architect.desc': {
    en: 'AI-powered scene decomposition. Enter a creative brief and get a structured, multi-scene script with visual prompts, voiceover text, and timing.',
    fr: 'Décomposition de scènes par IA. Entrez un brief créatif et obtenez un script structuré multi-scènes avec prompts visuels, texte de voix off et timing.',
    es: 'Descomposición de escenas por IA. Ingrese un brief creativo y obtenga un guión estructurado multi-escena con prompts visuales, texto de narración y temporización.',
  },
  'about.module.studio': { en: 'Asset Studio', fr: 'Studio d\'Assets', es: 'Estudio de Assets' },
  'about.module.studio.desc': {
    en: 'Generate images, audio narration, and video clips for each scene. Batch generation with real-time progress tracking and error recovery.',
    fr: 'Générez images, narration audio et clips vidéo pour chaque scène. Génération par lots avec suivi en temps réel et récupération d\'erreurs.',
    es: 'Genere imágenes, narración de audio y clips de video para cada escena. Generación por lotes con seguimiento en tiempo real y recuperación de errores.',
  },
  'about.module.timeline': { en: 'Timeline Editor', fr: 'Éditeur de Timeline', es: 'Editor de Timeline' },
  'about.module.timeline.desc': {
    en: 'Canvas-based multi-track editor with frame-accurate playhead, keyboard shortcuts, zoom control, and waveform visualization.',
    fr: 'Éditeur multi-piste canvas avec curseur précis à l\'image, raccourcis clavier, contrôle de zoom et visualisation de forme d\'onde.',
    es: 'Editor multi-pista basado en canvas con cabezal preciso al fotograma, atajos de teclado, control de zoom y visualización de forma de onda.',
  },
  'about.module.assistant': { en: 'Neural Assistant', fr: 'Assistant Neuronal', es: 'Asistente Neural' },
  'about.module.assistant.desc': {
    en: 'AI copilot with streaming chat, markdown rendering, and creative guidance for script refinement, prompt engineering, and production decisions.',
    fr: 'Copilote IA avec chat en streaming, rendu markdown et guidance créative pour le raffinement de script, l\'ingénierie de prompt et les décisions de production.',
    es: 'Copiloto IA con chat en streaming, renderizado markdown y guía creativa para refinamiento de guión, ingeniería de prompts y decisiones de producción.',
  },
  'about.module.imagelab': { en: 'Image Lab', fr: 'Labo Image', es: 'Lab de Imagen' },
  'about.module.imagelab.desc': {
    en: 'Advanced image editing and analysis. Edit generated images with text prompts and analyze composition, lighting, and color palette with AI vision.',
    fr: 'Édition et analyse d\'images avancées. Éditez les images générées avec des prompts texte et analysez composition, éclairage et palette avec la vision IA.',
    es: 'Edición y análisis avanzado de imágenes. Edite imágenes generadas con prompts de texto y analice composición, iluminación y paleta de colores con visión IA.',
  },
  'about.module.api': { en: 'API Management', fr: 'Gestion des API', es: 'Gestión de APIs' },
  'about.module.api.desc': {
    en: 'Multi-provider model selection with performance dashboards, latency tracking, call logs, and per-task model configuration.',
    fr: 'Sélection de modèles multi-fournisseurs avec tableaux de performance, suivi de latence, journaux d\'appels et configuration par tâche.',
    es: 'Selección de modelos multi-proveedor con dashboards de rendimiento, seguimiento de latencia, registros de llamadas y configuración por tarea.',
  },

  'about.ai.label': { en: 'AI Infrastructure', fr: 'Infrastructure IA', es: 'Infraestructura IA' },
  'about.ai.title': { en: 'Multi-Provider AI Engine', fr: 'Moteur IA Multi-Fournisseur', es: 'Motor IA Multi-Proveedor' },
  'about.ai.desc': {
    en: 'Choose the best model for each task. Switch providers instantly with zero configuration.',
    fr: 'Choisissez le meilleur modèle pour chaque tâche. Changez de fournisseur instantanément sans configuration.',
    es: 'Elija el mejor modelo para cada tarea. Cambie de proveedor instantáneamente sin configuración.',
  },

  'about.tech.label': { en: 'Technology', fr: 'Technologie', es: 'Tecnología' },
  'about.tech.title': { en: 'Built on Modern Standards', fr: 'Construit sur des Standards Modernes', es: 'Construido sobre Estándares Modernos' },

  'about.cap.label': { en: 'Capabilities', fr: 'Capacités', es: 'Capacidades' },
  'about.cap.title': { en: 'What You Can Create', fr: 'Ce Que Vous Pouvez Créer', es: 'Lo Que Puede Crear' },
  'about.cap.1.title': { en: 'Cinematic Visuals', fr: 'Visuels Cinématiques', es: 'Visuales Cinematográficos' },
  'about.cap.1.desc': {
    en: 'Generate photorealistic and stylized images for each scene with customizable aspect ratios, styles, and AI-powered editing.',
    fr: 'Générez des images photoréalistes et stylisées pour chaque scène avec des ratios, styles et édition IA personnalisables.',
    es: 'Genere imágenes fotorrealistas y estilizadas para cada escena con relaciones de aspecto, estilos y edición IA personalizables.',
  },
  'about.cap.2.title': { en: 'AI Voiceover & Audio', fr: 'Voix Off & Audio IA', es: 'Narración y Audio IA' },
  'about.cap.2.desc': {
    en: 'Text-to-speech narration with multiple voice options. Professional audio generation synced to your scene timing.',
    fr: 'Narration text-to-speech avec options de voix multiples. Génération audio professionnelle synchronisée au timing de vos scènes.',
    es: 'Narración text-to-speech con múltiples opciones de voz. Generación de audio profesional sincronizada con el timing de sus escenas.',
  },
  'about.cap.3.title': { en: 'Professional Editing', fr: 'Montage Professionnel', es: 'Edición Profesional' },
  'about.cap.3.desc': {
    en: 'Multi-track timeline with drag, zoom, keyboard shortcuts, and frame-accurate playback. Compose your final production with precision.',
    fr: 'Timeline multi-piste avec glisser, zoom, raccourcis clavier et lecture précise à l\'image. Composez votre production finale avec précision.',
    es: 'Timeline multi-pista con arrastre, zoom, atajos de teclado y reproducción precisa al fotograma. Componga su producción final con precisión.',
  },
  'about.cap.4.title': { en: 'Multilingual Interface', fr: 'Interface Multilingue', es: 'Interfaz Multilingüe' },
  'about.cap.4.desc': {
    en: 'Full English, French, and Spanish support across the entire interface. Auto-detects your browser language on first visit.',
    fr: 'Support complet anglais, français et espagnol sur toute l\'interface. Détection automatique de la langue de votre navigateur.',
    es: 'Soporte completo en inglés, francés y español en toda la interfaz. Detecta automáticamente el idioma de su navegador.',
  },

  'about.cta.title': { en: 'Ready to Create?', fr: 'Prêt à Créer ?', es: '¿Listo para Crear?' },
  'about.cta.desc': {
    en: 'Start your next video production with the most advanced AI-powered creative IDE available.',
    fr: 'Commencez votre prochaine production vidéo avec l\'IDE créatif propulsé par IA le plus avancé disponible.',
    es: 'Comience su próxima producción de video con el IDE creativo más avanzado impulsado por IA disponible.',
  },
  'about.cta.btn': { en: 'Launch Studio', fr: 'Lancer le Studio', es: 'Abrir Estudio' },
} as const;

export type TranslationKey = keyof typeof translations;
