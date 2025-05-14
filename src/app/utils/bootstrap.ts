declare const bootstrap: any;

export function inicializarPopovers(): void {
  const popoverTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="popover"]'));
  popoverTriggerList.forEach(popoverTriggerEl => {
    new bootstrap.Popover(popoverTriggerEl);
  });
}
