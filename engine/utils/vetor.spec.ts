import { Vetor } from "./vetor";

describe("Vetor", ()=>{
  test("contructor", ()=>{
    let [x, y] = [Math.random(), Math.random()];
    let vetor = new Vetor(x, y);
    expect(vetor.x).toEqual(x);
    expect(vetor.y).toEqual(y);
  })
  test("igual", ()=>{
    let [x, y] = [Math.random(), Math.random()];
    let vetor = new Vetor(x, y);
    expect(vetor.igual(new Vetor(x, y))).toBe(true);
    expect(new Vetor(x, y).igual(vetor)).toBe(true);
  })
  test("add", ()=>{
    let [x1, y1] = [Math.random(), Math.random()];
    let [x2, y2] = [Math.random(), Math.random()];
    let u = new Vetor(x1, y1);
    let v = new Vetor(x2, y2);
    let w = u.add(v);
    expect(w.igual(new Vetor(x1+x2, y1+y2))).toBe(true);
    w = v.add(u);
    expect(w.igual(new Vetor(x1+x2, y1+y2))).toBe(true);
  })
  test("sub", ()=>{
    let [x1, y1] = [Math.random(), Math.random()];
    let [x2, y2] = [Math.random(), Math.random()];
    let u = new Vetor(x1, y1);
    let v = new Vetor(x2, y2);
    let w = u.sub(v);
    expect(w.igual(new Vetor(x1-x2, y1-y2))).toBe(true);
    w = v.sub(u);
    expect(w.igual(new Vetor(x2-x1, y2-y1))).toBe(true);
  })
  test("mul", ()=>{
    // TODO
  })
  test("div", ()=>{
    // TODO
  })
  test("magnitude", ()=>{
    // TODO
  })
  test("distância", ()=>{
    // TODO
  })
})