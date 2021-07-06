import { Aleatorizar } from "game/core";

type ISubjectBasePayload = { $id: number };
type ISubjectPayload<T, IOT=IObserversTypes> = T extends keyof IOT
  ? IOT[T]
  : ISubjectBasePayload;
declare global {
  interface IObserversTypes {}
}
type IExecutor = {
  $id: number;
  listen: (payload: any & ISubjectBasePayload) => void;
};
let observers: {
  [K in string]: { [ID in number]: IExecutor };
} = {};

export function emitir<T extends keyof IObserversTypes, IOT=IObserversTypes>(
  signal: T,
  payload?: ISubjectPayload<T, IOT>
) {
  const listeners = observers[signal];
  for (const id in listeners) {
    if (Object.prototype.hasOwnProperty.call(listeners, id)) {
      const listener = listeners[id];
      listener.listen(payload || { $id: id });
    }
  }
}
export function escutar<T extends keyof IObserversTypes, IOT=IObserversTypes>(
  signal: T,
  listen: (payload: ISubjectPayload<T, IOT> & ISubjectBasePayload) => void,
  id: number = Aleatorizar.Id("observers")
) {
  if (!(signal in observers)) {
    observers[signal] = {};
  }
  observers[signal][id] = {
    $id: id,
    listen,
  };
  return id;
}
export function remover<T extends keyof IObserversTypes>(
  signal: T,
  id?: number
) {
  if (!(signal in observers)) {
    return;
  }
  if (!id) {
    observers[signal] = {};
    return;
  }
  delete observers[signal][id];
}
declare global{
  export type IObserversBase = {
    [x: string]: any;
  } 
}
export class ObserverPattern<IObservers extends IObserversBase> {
  private observers: {
    [K in string]: { [ID in number]: IExecutor };
  } = {};
  emitir<T extends keyof IObservers>(
    signal: T,
    payload?: ISubjectPayload<T, IObservers>
  ) {
    const listeners = this.observers[signal as string];
    for (const id in listeners) {
      if (Object.prototype.hasOwnProperty.call(listeners, id)) {
        const listener = listeners[id];
        listener.listen(payload || { $id: id });
      }
    }
  }
  escutar<T extends keyof IObservers>(
    signal: T,
    listen: (payload: ISubjectPayload<T, IObservers> & ISubjectBasePayload) => void,
    id: number = Aleatorizar.Id("observers")
  ) {
    if (!(signal in this.observers)) {
      this.observers[signal as string] = {};
    }
    this.observers[signal as string][id] = {
      $id: id,
      listen,
    };
    return id;
  }
  removerEscuta<T extends keyof IObservers>(
    signal: T,
    id?: number
  ) {
    if (!(signal in this.observers)) {
      return;
    }
    if (!id) {
      this.observers[signal as string] = {};
      return;
    }
    delete this.observers[signal as string][id];
  }
}

// declare global{
//   interface IObserversTypes{
//     'Exemplo': {id: 'Exemplo', params: {nome: string, description: string}};
//   }
// }
// type Ks<T=string> = T extends keyof IObserversTypes ? IObserversTypes[T] : {id: string, params: any}

// const middlewares: {
//   [K in string]: ((args: Ks<K>)=>any)[]
// } = {};
// export function emit<T extends keyof IObserversTypes>(id :T, params: IObserversTypes[T]['params']) {
//   console.debug(`Emit: ${id} Payload: ${JSON.stringify(params)}`)
//   if (id in middlewares || middlewares[id]) {
//     return middlewares[id].map(fn=>{
//       try {
//         return fn({id, params})
//       } catch (error) {
//         console.log(`Middleware ${id} Error:`)
//         console.log(error)
//         return {error};
//       }
//     });
//   }
// }
// export function listen<T extends keyof IObserversTypes>(id: T, value: (args: IObserversTypes[T])=>void) {
//   if(!(id in middlewares) || !Object.keys(middlewares).includes(id)){
//     middlewares[id] = [];
//   }
//   if (!middlewares[id].includes(value as (args: {id: string, params: any})=>void)) {
//     middlewares[id].push(value as (args: {id: string, params: any})=>void);
//   }
//   return middlewares[id].length - 1;
// }

const Subject = {
  emitir,
  escutar,
  remover,
};
export default Subject;
