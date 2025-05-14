export function previewFoto(input: HTMLInputElement, miniaturaId: string): void {
  const file = input.files?.[0];
  const miniatura = document.getElementById(miniaturaId) as HTMLImageElement;

  if (file && file.type.match('image.*')) {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (!e.target?.result) return;
      miniatura.src = e.target.result as string;
      miniatura.classList.add('visible');

      // Redimensionar e cortar imagem para proporção 3x4
      setTimeout(() => {
        const img = new Image();
        img.onload = () => {
          const targetRatio = 3 / 4;
          const sourceRatio = img.width / img.height;
          let newWidth, newHeight;

          if (sourceRatio > targetRatio) {
            newHeight = img.height;
            newWidth = img.height * targetRatio;
          } else {
            newWidth = img.width;
            newHeight = img.width / targetRatio;
          }

          const canvas = document.createElement('canvas');
          canvas.width = 75;
          canvas.height = 100;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            const offsetX = (img.width - newWidth) / 2;
            const offsetY = (img.height - newHeight) / 2;

            ctx.drawImage(
              img,
              offsetX, offsetY, newWidth, newHeight,
              0, 0, 75, 100
            );
            miniatura.src = canvas.toDataURL('image/jpeg', 0.9);
          }
        };
        img.src = e.target?.result as string;
      }, 100);
    };

    reader.readAsDataURL(file);
  } else {
    miniatura.classList.remove('visible');
    miniatura.src = '';
  }
}
