export function média(...valores: number[]) {
  return valores.reduce((a, b) => a + b, 0) / valores.length;
}
export function somatorio(...valores: number[]) {
  return valores.reduce((a, b) => a + b, 0);
}
export function distribuir(valor: number) {
  return 1 / (1 + valor * valor);
}
