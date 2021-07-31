import { Vetor } from "./vetor";

const INSIDE = 0
const OUTSIDE = 1

export default class Polygon extends Array<Vetor>{

  Contem(ponto: Vetor): number;
  Contem(p: Vetor)
  {
    let counter = 0;
    let i: number;
    let xinters: number;
    let p1: Vetor,p2: Vetor;
    const len  = this.length;
  
    p1 = this[0];
    for (i=1;i<=len;i++) {
      p2 = this[i % len];
      if (p.y > Math.min(p1.y,p2.y)) {
        if (p.y <= Math.max(p1.y,p2.y)) {
          if (p.x <= Math.max(p1.x,p2.x)) {
            if (p1.y !== p2.y) {
              xinters = (p.y-p1.y)*(p2.x-p1.x)/(p2.y-p1.y)+p1.x;
              if (p1.x === p2.x || p.x <= xinters)
                counter++;
            }
          }
        }
      }
      p1 = p2;
    }
  
    if (counter % 2 === 0)
      return(OUTSIDE);
    else
      return(INSIDE);
  }
}

