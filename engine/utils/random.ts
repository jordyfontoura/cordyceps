import { Vetor } from "./vetor";

const Aleatorizar = {
  /**
   * Retorna um inteiro entre o inicio e o (fim-1)
   * @param inicio Início
   * @param fim Fim exclusivo
   * @returns
   */
  Int(inicio: number, fim: number) {
    return inicio + Math.floor(Math.random() * (fim - inicio));
  },
  Item(lista: any[]) {
    return lista[Aleatorizar.Int(0, lista.length)];
  },
  ids: {'default': []} as Record<string, number[]>,
  Id(group: string='default'): number {
    let id;
    if (!(group in this.ids)) {
      this.ids[group] = [];
    }
    do {
      id = Aleatorizar.Int(1000000, 1000000 * 10);
    } while (this.ids[group].includes(id));
    this.ids[group].push(id);
    return id;
  },
  Direção() {
    return Aleatorizar.Item([
      Vetor.Esquerda,
      Vetor.Direita,
      Vetor.Cima,
      Vetor.Baixo,
    ]);
  },
  Index(probabilidades: number[]){
    let soma = 0;
    let resultado = 0;
    let total = probabilidades.reduce((a, b)=>a+b, 0);
    const escolha = Math.random() * total;
    for (let i = 0; i < probabilidades.length; i++) {
      if (escolha <= soma) {
        return resultado;
      }
      resultado = i;
      soma += probabilidades[i];
    }
    return probabilidades.length-1;
  },
  Chance(chance: number): boolean {
    return Math.random() < chance;
  },
};
export default Aleatorizar;