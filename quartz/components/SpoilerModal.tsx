import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const SpoilerModal: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div class={`spoiler-modal ${displayClass ?? ""}`} id="spoiler-modal-container">
      <div class="spoiler-modal-content">
        <h2>⚠️ ALERTA GENERAL DE SPOILERS</h2>
        <p>
          Estás a punto de adentrarte en los archivos clasificados de Luzdeplata. Esta enciclopedia asume que el lector está al día con <strong>todas las obras publicadas del Cosmere</strong>.
        </p>
        <p>
          Navegar por estos archivos sin haber terminado las lecturas resultará en la revelación de secretos cósmicos y el destino de los personajes principales.
        </p>
        <button id="accept-spoilers-btn">Entendido, asumo el riesgo</button>
      </div>
    </div>
  )
}

SpoilerModal.css = `
.spoiler-modal {
  display: none;
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(5px);
  justify-content: center;
  align-items: center;
}

.spoiler-modal.active {
  display: flex;
}

.spoiler-modal-content {
  background-color: var(--light);
  color: var(--dark);
  padding: 2.5rem;
  border-radius: 12px;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
  border: 2px solid var(--tertiary);
}

.spoiler-modal-content h2 {
  color: #cc0000;
  margin-top: 0;
}

#accept-spoilers-btn {
  background-color: var(--tertiary);
  color: var(--light);
  border: none;
  padding: 12px 24px;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.2s ease;
}

#accept-spoilers-btn:hover {
  background-color: var(--secondary);
}
`

SpoilerModal.afterDOMLoaded = `
  const modal = document.getElementById('spoiler-modal-container');
  const btn = document.getElementById('accept-spoilers-btn');
  
  // MAGIA AQUÍ: Usamos sessionStorage para que se borre al cerrar la pestaña
  const hasAcceptedSpoilers = sessionStorage.getItem('cosmere_spoilers_accepted');
  
  if (!hasAcceptedSpoilers && modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  if (btn && modal) {
    btn.addEventListener('click', () => {
      // MAGIA AQUÍ TAMBIÉN: Guardamos en sessionStorage
      sessionStorage.setItem('cosmere_spoilers_accepted', 'true');
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
`

export default (() => SpoilerModal) satisfies QuartzComponentConstructor
