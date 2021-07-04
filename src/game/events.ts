import { createDebug, deleteDebug } from "engine/debug";
import { Jogo } from "engine/game";
import { GameObject } from "engine/gameobject";
import { Tela } from "engine/tela";
import Subject from "game/utils/observer";
import { Vetor } from "game/utils/vetor";
declare global {
  interface IObserversTypes {
    "Game.stop": { id: "Game.stop"; params: undefined };
    "Game.play": { id: "Game.play"; params: undefined };
    "Game.pause": { id: "Game.pause"; params: undefined };
    "Game.render": { id: "Game.render"; params: { executar: () => void } };
    "Game.criar.display": {
      id: "Game.criar.display";
      params: { id: number };
    };
    "Game.deletar.display": {
      id: "Game.criar.display";
      params: { id: number };
    };
    "Game.criar.debug": {
      id: "Game.criar.debug";
      params: { id: number; debug: (mensagem: string) => void };
    };
    "Game.deletar.debug": {
      id: "Game.deletar.debug";
      params: { id: number };
    };
    "Game.criar.hierarchy": {
      id: "Game.criar.hierarchy";
      params: {
        id: number;
        add: (gameObject: GameObject) => void;
        remove: (gameObject: GameObject) => void;
        update: (gameObject: GameObject) => void;
      };
    };
    "Game.hierarchy.add": {
      id: "Game.hierarchy.add";
      params: {
        gameObject: GameObject;
      }
    };
    "Game.hierarchy.remove": {
      id: "Game.hierarchy.remove";
      params: {
        gameObject: GameObject;
      }
    };
    "Game.deletar.hierarchy": {
      id: "Game.criar.hierarchy";
      params: {
        id: number;
      };
    };
    "Game.display.move": {
      id: "Game.display.move",
      params: {
        id: number;
        delta: Vetor;
      }
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
  Subject.listen("Game.criar.display", ({ params }) => {
    Jogo.novaTela(params.id);
  });
  Subject.listen("Game.deletar.display", ({ params }) => {
    Jogo.deletarTela(params.id);
  });
  Subject.listen("Game.criar.debug", ({ params }) => {
    const id = createDebug(params.debug);
    Subject.listen("Game.deletar.debug", () => {
      deleteDebug(id);
    });
  });
  Subject.listen("Game.criar.hierarchy", ({params})=>{
    Subject.listen("Game.hierarchy.add", ({params: {gameObject}})=>{
      params.add(gameObject);
    })
    Subject.listen("Game.hierarchy.remove", ({params: {gameObject}})=>{
      params.remove(gameObject);
    })
  })
  Subject.listen("Game.display.move", ({params})=>{
    const tela = Tela.telas.find(item=>item.id === params.id);
    if (!tela) {
      return;
    }
    tela.mover(params.delta, true);
  })
  
}
