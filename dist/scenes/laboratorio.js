import { Cenário } from "../engine/core/scene.js";
import { Formiga } from "../gameobjects/formiga.js";
import { Vetor } from "../engine/utils/vetor.js";
export default Cenário.criar('laboratorio', (jogo) => {
    for (let i = 0; i < 400; i++) {
        new Formiga(Vetor.Zero);
    }
});
