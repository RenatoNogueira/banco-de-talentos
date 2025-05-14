import { Component } from '@angular/core';
import { FileValidator } from '../utils/file-validation';

@Component({
  selector: 'app-curriculum',
  standalone: true,
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.css']
})
export class CurriculumComponent {
  isArquivoInvalido = false;

  onCurriculoChange(event: Event): void {
  const input = event.target as HTMLInputElement;
  FileValidator.validateFile(input);

  const file = input.files?.[0]; // Extract the file from the input
  const validTypes = ['application/pdf', 'application/msword']; // Define valid file types

  if (file && !validTypes.includes(file.type)) {
    this.isArquivoInvalido = true;
    input.value = ''; // limpa o input
  } else {
    this.isArquivoInvalido = false;
  }
  }
}
