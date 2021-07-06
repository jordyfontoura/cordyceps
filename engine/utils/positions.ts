import { Vetor } from "./vetor";

export function menorDistância<T>(
  origem: Vetor,
  items: T[],
  extrair: (item: T) => Vetor = (i: unknown) => i as Vetor
): { de: Vetor; para: T; distância: number } {
  const resultado = {
    de: origem,
    para: items[0],
    distância: Infinity,
  };
  for (let i = 0; i < items.length; i++) {
    const distância = extrair(items[i]).distância(origem);
    if (distância < resultado.distância) {
      resultado.para = items[i];
      resultado.distância = distância;
    }
  }
  return resultado;
}
export function maiorDistância<T>(
  origem: Vetor,
  items: T[],
  extrair: (item: T) => Vetor = (i: unknown) => i as Vetor
): { de: Vetor; para: T; distância: number } {
  const resultado = {
    de: origem,
    para: items[0],
    distância: Infinity,
  };
  for (let i = 0; i < items.length; i++) {
    const distância = extrair(items[i]).distância(origem);
    if (distância > resultado.distância) {
      resultado.para = items[i];
      resultado.distância = distância;
    }
  }
  return resultado;
}

export function depth<T, K=any>(
  root: T,
  extract: ((node: T) => T[]),
  action: (node: T) => K
): K[] {
  let result: K[]=[];
  const childrens = extract(root);
  if (childrens.length) {
    result = childrens.map(children=>depth<T,K>(children, extract, action)).flat(Infinity) as K[];
  }
  result.push(action(root));
  return result;
}
