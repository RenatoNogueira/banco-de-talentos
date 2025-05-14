export function toggleField(id: string, enable: boolean): void {
  const textarea = document.getElementById(id) as HTMLTextAreaElement | null;

  if (!textarea) return;

  textarea.disabled = !enable;

  if (!enable) {
    textarea.value = '';
    textarea.classList.remove('is-valid', 'is-invalid');
  } else {
    // Garante que a validação ocorra ao perder o foco
    textarea.addEventListener('blur', () => validateField(textarea));
  }
}

export function validateField(field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null): boolean {
  if (!field) return true;

  const isRequired = field.hasAttribute('required');
  const isValid = !isRequired || (!!field.value && field.value.trim() !== '');

  field.classList.remove('is-valid', 'is-invalid');

  if (isRequired) {
    field.classList.add(isValid ? 'is-valid' : 'is-invalid');
  }

  return isValid;
}
