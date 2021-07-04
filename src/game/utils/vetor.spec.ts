import { Vetor } from "./vetor";

describe("Vetor", ()=>{
  it("contructor", ()=>{
    expect(new Vetor(0, 0).x).toEqual(0);
  })
})