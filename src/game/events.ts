import { createDebug, deleteDebug } from "engine/debug";
import { Jogo } from "engine/game";
import { GameObject } from "engine/gameobject";
import { Tela } from "engine/tela";
import Subject from "game/utils/observer";
import { Vetor } from "game/utils/vetor";
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
    }
    "Editor.hierarchy.remove": {
      gameObject: GameObject;
    }
  }
}

export default function Events() {
  Subject.listen("Game.play", () => {
    Jogo.iniciar();
  });
  Subject.listen("Game.pause", () => {
    Jogo.pausar();
  });
  Subject.listen("Game.stop", () => {
    Jogo.parar();
  });
  Subject.listen("Game.criar.display", (params) => {
    Jogo.novaTela(params.id);
  });
  Subject.listen("Game.deletar.display", (params) => {
    Jogo.deletarTela(params.id);
  });
  Subject.listen("Game.criar.debug", (params) => {
    const id = createDebug(params.debug);
    Subject.listen("Game.deletar.debug", () => {
      deleteDebug(id);
    });
  });
  Subject.listen("Game.criar.hierarchy", (params) => {
    Subject.listen("Game.hierarchy.add", ({ gameObject }) => {
      params.add(gameObject);
    });
    Subject.listen("Game.hierarchy.remove", ({ gameObject }) => {
      params.remove(gameObject);
    });
  });
  Subject.listen("Game.hierarchy.add", (payload) => {
    Subject.emit("Editor.hierarchy.add", payload)
  });
  Subject.listen("Game.hierarchy.remove", (payload) => {
    Subject.emit("Editor.hierarchy.remove", payload)
  });
  Subject.listen("Game.display.move", (params) => {
    const tela = Tela.telas.find((item) => item.id === params.id);
    if (!tela) {
      return;
    }
    tela.mover(params.delta, true);
  });
}
