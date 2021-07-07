import { restringir } from "./math";

describe("Math", ()=>{
  test("restringir", ()=>{
    expect(restringir(-100, 0, 10)).toBe(0);
    expect(restringir(-10, 0, 10)).toBe(0);
    expect(restringir(0, 0, 10)).toBe(0);
    expect(restringir(1, 0, 10)).toBe(1);
    expect(restringir(5, 0, 10)).toBe(5);
    expect(restringir(9, 0, 10)).toBe(9);
    expect(restringir(10, 0, 10)).toBe(10);
    expect(restringir(11, 0, 10)).toBe(10);
    expect(restringir(100, 0, 10)).toBe(10);
  })
})