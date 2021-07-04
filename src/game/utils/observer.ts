declare global{
  interface IObserversTypes{
    'Exemplo': {id: 'Exemplo', params: {nome: string, description: string}};
  }
}
type Ks<T=string> = T extends keyof IObserversTypes ? IObserversTypes[T] : {id: string, params: any}

const middlewares: {
  [K in string]: ((args: Ks<K>)=>any)[]
} = {};
export function emit<T extends keyof IObserversTypes>(id :T, params: IObserversTypes[T]['params']) {
  console.debug(`Emit: ${id} Payload: ${JSON.stringify(params)}`)
  if (id in middlewares || middlewares[id]) {
    return middlewares[id].map(fn=>{
      try {
        return fn({id, params})
      } catch (error) {
        console.log(`Middleware ${id} Error:`)
        console.log(error)
        return {error};
      }
    });
  }
}
export function listen<T extends keyof IObserversTypes>(id: T, value: (args: IObserversTypes[T])=>void) {
  if(!(id in middlewares) || !Object.keys(middlewares).includes(id)){
    middlewares[id] = [];
  }
  if (!middlewares[id].includes(value as (args: {id: string, params: any})=>void)) {
    middlewares[id].push(value as (args: {id: string, params: any})=>void);
  }
  return middlewares[id].length - 1;
}

const Subject = {
  emit, listen
}
export default Subject;