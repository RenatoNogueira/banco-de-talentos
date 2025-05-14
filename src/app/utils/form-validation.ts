export function showToast(
  message: string,
  isSuccess: boolean,
  options: { duration?: number } = {}
): void {
  const duration = options.duration ?? 5000; // Valor padrão de 5 segundos

  const toastContainer = document.getElementById('toast-container') || document.createElement('div');
  toastContainer.id = 'toast-container';
  toastContainer.style.position = 'fixed';
  toastContainer.style.top = '20px';
  toastContainer.style.right = '20px';
  toastContainer.style.zIndex = '9999';

  if (!document.getElementById('toast-container')) {
    document.body.appendChild(toastContainer);
  }

  const toastEl = document.createElement('div');
  toastEl.className = `toast show align-items-center text-white bg-${isSuccess ? 'success' : 'danger'}`;
  toastEl.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
  toastEl.style.opacity = '0';
  toastEl.style.transform = 'translateX(100%)';
  toastEl.role = 'alert';
  toastEl.setAttribute('aria-live', 'assertive');
  toastEl.setAttribute('aria-atomic', 'true');

toastEl.innerHTML = `
  <div class="d-flex custom-toast">
    <div class="toast-body">
      ${message}
    </div>
    <button type="button" class="btn-close btn-close-white me-2 m-auto" aria-label="Close"></button>
  </div>
`;

  toastContainer.appendChild(toastEl);

  // Animação de entrada
  setTimeout(() => {
    toastEl.style.opacity = '1';
    toastEl.style.transform = 'translateX(0)';
  }, 10);

  // Configura o temporizador de desaparecimento para este toast específico
  let timeoutId: number;

  const startFadeOut = () => {
    // Limpa qualquer timeout existente
    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = window.setTimeout(() => {
      toastEl.style.opacity = '0';
      toastEl.style.transform = 'translateX(100%)';

      setTimeout(() => {
        toastEl.remove();
      }, 500);
    }, duration);
  };

  // Configura o botão de fechar
  const closeButton = toastEl.querySelector('.btn-close');
  closeButton?.addEventListener('click', () => {
    toastEl.style.opacity = '0';
    toastEl.style.transform = 'translateX(100%)';
    if (timeoutId) clearTimeout(timeoutId);
    setTimeout(() => toastEl.remove(), 500);
  });

  // Inicia o temporizador para fechar automaticamente
  startFadeOut();

  // Pausa o desaparecimento quando o mouse está sobre o toast
  toastEl.addEventListener('mouseenter', () => {
    if (timeoutId) clearTimeout(timeoutId);
    toastEl.style.opacity = '1';
  });

  // Retoma o desaparecimento quando o mouse sai do toast
  toastEl.addEventListener('mouseleave', () => {
    startFadeOut();
  });
}

export function validateField(field: HTMLInputElement | HTMLSelectElement | null): boolean {
  if (!field) return true;

  const isRequired = field.hasAttribute('required');
  const isValid = !isRequired || (!!field.value && field.value.trim() !== '');

  field.classList.remove('is-valid', 'is-invalid');

  if (isRequired) {
    field.classList.add(isValid ? 'is-valid' : 'is-invalid');

    if (!isValid) {
      // Busca a mensagem do invalid-feedback ou usa um padrão
      const feedbackElement = field.nextElementSibling?.classList.contains('invalid-feedback')
        ? field.nextElementSibling
        : field.closest('.form-group')?.querySelector('.invalid-feedback');

      const errorMessage = feedbackElement?.textContent?.trim() ||
                         field.getAttribute('data-error-message') ||
                         `O campo ${field.name || ''} é obrigatório`;

      showToast(errorMessage, false);
    }
  }

  return isValid;
}

export function validateRadioGroup(name: string): boolean {
  const radios = document.querySelectorAll(`input[name="${name}"]`) as NodeListOf<HTMLInputElement>;
  const container = radios[0]?.closest('.form-check-inline')?.parentElement;

  if (!container) return true;

  const isRequired = radios[0]?.hasAttribute('required');
  const isChecked = Array.from(radios).some(radio => radio.checked);

  container.classList.remove('is-valid', 'is-invalid');

  if (isRequired) {
    container.classList.add(isChecked ? 'is-valid' : 'is-invalid');

    if (!isChecked) {
      // Busca a mensagem do invalid-feedback ou usa um padrão
      const feedbackElement = container.querySelector('.invalid-feedback');
      const groupName = radios[0]?.getAttribute('data-name') || name;
      const errorMessage = feedbackElement?.textContent?.trim() ||
                         `Selecione uma opção para ${groupName}`;

      showToast(errorMessage, false);
    }
  }

  return !isRequired || isChecked;
}

export function toggleSkillFields(possuiName: string): void {
  const prefix = possuiName.split('_')[0];
  const possuiSim = document.querySelector(`input[name="${possuiName}"][value="sim"]`) as HTMLInputElement;
  const possuiNao = document.querySelector(`input[name="${possuiName}"][value="nao"]`) as HTMLInputElement;
  const nivelRadios = document.querySelectorAll(`input[name="${prefix}_nivel"]`) as NodeListOf<HTMLInputElement>;
  const comentarioInput = document.querySelector(`input[name="${prefix}_comentario"]`) as HTMLInputElement;

  function updateFields() {
    const isDisabled = possuiNao.checked;

    nivelRadios.forEach(radio => {
      radio.disabled = isDisabled;
      if (isDisabled) {
        radio.checked = false;
        radio.classList.remove('is-valid', 'is-invalid');
      }
    });

    comentarioInput.disabled = isDisabled;
    if (isDisabled) {
      comentarioInput.value = '';
      comentarioInput.classList.remove('is-valid', 'is-invalid');
    } else {
      comentarioInput.addEventListener('blur', () => validateField(comentarioInput));
    }

    validateRadioGroup(possuiName);
    nivelRadios.forEach(radio => validateField(radio));
    validateField(comentarioInput);
  }

  possuiSim?.addEventListener('change', updateFields);
  possuiNao?.addEventListener('change', updateFields);
  updateFields();
}
