import { Cenário } from "../core/scene.js";
import { Formiga } from "../gameobjects/formiga.js";
import { Vetor } from "../utils/vetor.js";
export default Cenário.criar('laboratorio', (jogo) => {
    for (let i = 0; i < 200; i++) {
        new Formiga(Vetor.Zero);
    }
});
