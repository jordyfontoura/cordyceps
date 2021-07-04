import { Jogo } from "engine/game";
import { GameObject } from "engine/gameobject";
import { Tela } from "engine/tela";
import Subject from "game/utils/observer";
import { Vetor } from "game/utils/vetor";
import { IRegistro } from "src/editor";
declare global {
  interface IObserversTypes {
    "Game.stop": {};
    "Game.play": {};
    "Game.pause": {};
    "Game.render": { executar: () => void };
    "Game.criar.display": {
      id: number;
    };
    "Game.deletar.display": {
      id: number;
    };
    "Game.criar.debug": {
      id: number;
      debug: (mensagem: string) => void;
    };
    "Game.deletar.debug": {
      id: number;
    };
    "Game.criar.hierarchy": {
      id: number;
      add: (gameObject: GameObject) => void;
      remove: (gameObject: GameObject) => void;
      update: (gameObject: GameObject) => void;
    };
    "Game.hierarchy.add": {
      gameObject: GameObject;
    };
    "Game.hierarchy.remove": {
      gameObject: GameObject;
    };
    "Game.deletar.hierarchy": {
      id: number;
    };
    "Game.display.move": {
      id: number;
      delta: Vetor;
    };
    "Editor.hierarchy.add": {
      gameObject: GameObject;
    };
    "Editor.hierarchy.remove": {
      gameObject: GameObject;
    };
    "Editor.registro.add": IRegistro;
    "Editor.display.zoom": {id: number, delta: number}
  }
}

export default function Events() {
  Subject.escutar("Game.play", () => {
    Jogo.iniciar();
  });
  Subject.escutar("Game.pause", () => {
    Jogo.pausar();
  });
  Subject.escutar("Game.stop", () => {
    Jogo.parar();
  });
  Subject.escutar("Game.criar.display", (params) => {
    Jogo.novaTela(params.id);
  });
  Subject.escutar("Game.deletar.display", (params) => {
    Jogo.deletarTela(params.id);
  });
  // Subject.escutar("Game.criar.debug", (params) => {
  //   const id = createDebug(params.debug);
  //   Subject.escutar("Game.deletar.debug", () => {
  //     deleteDebug(id);
  //   });
  // });
  Subject.escutar("Game.criar.hierarchy", (params) => {
    Subject.escutar("Game.hierarchy.add", ({ gameObject }) => {
      params.add(gameObject);
    });
    Subject.escutar("Game.hierarchy.remove", ({ gameObject }) => {
      params.remove(gameObject);
    });
  });
  Subject.escutar("Game.hierarchy.add", (payload) => {
    Subject.emitir("Editor.hierarchy.add", payload);
  });
  Subject.escutar("Game.hierarchy.remove", (payload) => {
    Subject.emitir("Editor.hierarchy.remove", payload);
  });
  Subject.escutar("Game.display.move", (params) => {
    const tela = Tela.telas.find((item) => item.id === params.id);
    if (!tela) {
      return;
    }
    tela.mover(params.delta, true);
  });
  Subject.escutar("Editor.display.zoom", (payload)=>{
    Tela.telas.forEach(tela=>{
      if (tela.id === payload.id) {
        tela.zoom(payload.delta)
      }
    });
  })
}
