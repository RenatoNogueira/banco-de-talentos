export class FileValidator {
  static validTypes: string[] = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  static validateFile(input: HTMLInputElement): boolean {
    const file = input.files ? input.files[0] : null;

    if (!file) {
      return true; // Se não tiver arquivo, considera válido
    }

    const isValid = FileValidator.validTypes.includes(file.type);

    if (!isValid) {
      input.classList.add('is-invalid');
      input.value = ''; // Limpa o campo se inválido
    } else {
      input.classList.remove('is-invalid');
    }

    return isValid;
  }
}
