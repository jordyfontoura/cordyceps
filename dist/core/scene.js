export class Cenário {
    constructor(nome, loader) {
        this.nome = nome;
        this.carregar = loader;
        Cenário.cenário[nome] = this;
    }
    static criar(nome, scene) {
        return new Cenário(nome, scene);
    }
}
Cenário.cenário = {};
