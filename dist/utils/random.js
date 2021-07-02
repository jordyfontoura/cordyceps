import { Vetor } from "./vetor.js";
export var Aleatorizar;
(function (Aleatorizar) {
    /**
     * Retorna um inteiro entre o inicio e o (fim-1)
     * @param inicio Início
     * @param fim Fim exclusivo
     * @returns
     */
    function Int(inicio, fim) {
        return Math.floor(Math.random() * (fim - inicio));
    }
    Aleatorizar.Int = Int;
    function Item(lista) {
        return lista[Aleatorizar.Int(0, lista.length)];
    }
    Aleatorizar.Item = Item;
    const ids = [];
    function Id() {
        let id;
        do {
            id = Aleatorizar.Int(1000000, 1000000 * 10);
        } while (ids.includes(id));
        return id;
    }
    Aleatorizar.Id = Id;
    function Direção() {
        return Aleatorizar.Item([
            Vetor.Esquerda,
            Vetor.Direita,
            Vetor.Cima,
            Vetor.Baixo,
        ]);
    }
    Aleatorizar.Direção = Direção;
})(Aleatorizar || (Aleatorizar = {}));
