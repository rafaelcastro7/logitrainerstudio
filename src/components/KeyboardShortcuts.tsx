import { useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/i18n/useI18n';
import { X } from 'lucide-react';

const shortcuts = [
  { keys: ['Space'], action: { en: 'Play / Pause timeline', fr: 'Lecture / Pause timeline', es: 'Reproducir / Pausar timeline' } },
  { keys: ['←', '→'], action: { en: 'Seek ±1 second', fr: 'Chercher ±1 seconde', es: 'Buscar ±1 segundo' } },
  { keys: ['Home'], action: { en: 'Go to start', fr: 'Aller au début', es: 'Ir al inicio' } },
  { keys: ['End'], action: { en: 'Go to end', fr: 'Aller à la fin', es: 'Ir al final' } },
  { keys: ['+', '−'], action: { en: 'Zoom in / out', fr: 'Zoom avant / arrière', es: 'Acercar / Alejar' } },
  { keys: ['⌘K'], action: { en: 'Command Palette', fr: 'Palette de commandes', es: 'Paleta de comandos' } },
  { keys: ['⌘Z'], action: { en: 'Undo', fr: 'Annuler', es: 'Deshacer' } },
  { keys: ['⌘⇧Z'], action: { en: 'Redo', fr: 'Refaire', es: 'Rehacer' } },
  { keys: ['D'], action: { en: 'Duplicate selected clip', fr: 'Dupliquer le clip', es: 'Duplicar clip seleccionado' } },
  { keys: ['Del'], action: { en: 'Delete selected clip', fr: 'Supprimer le clip', es: 'Eliminar clip seleccionado' } },
  { keys: ['?'], action: { en: 'Toggle this overlay', fr: 'Afficher/masquer ce panneau', es: 'Mostrar/ocultar este panel' } },
];

export function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false);
  const { locale } = useI18n();

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
    if (e.key === '?' || (e.shiftKey && e.key === '/')) {
      e.preventDefault();
      setIsOpen((v) => !v);
    }
    if (e.key === 'Escape' && isOpen) setIsOpen(false);
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 backdrop-blur-xl"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md mx-4 rounded-lg border border-border bg-card overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h2 className="text-sm font-semibold text-foreground">
                {{ en: 'Keyboard Shortcuts', fr: 'Raccourcis Clavier', es: 'Atajos de Teclado' }[locale]}
              </h2>
              <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-4 space-y-2">
              {shortcuts.map(({ keys, action }) => (
                <div key={keys.join('')} className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">{action[locale]}</span>
                  <div className="flex items-center gap-1">
                    {keys.map((k) => (
                      <kbd key={k} className="rounded bg-secondary border border-border px-2 py-1 text-xs font-mono font-bold text-foreground">
                        {k}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border px-6 py-3">
              <p className="text-[10px] text-muted-foreground/50 font-mono text-center">
                {{ en: 'Press ? or Esc to close', fr: 'Appuyez ? ou Échap pour fermer', es: 'Presione ? o Esc para cerrar' }[locale]}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
