export function forceMergeType<A, B=any>(obj: A|B): obj is B & A {
  return true;
}
export function forceType<A, B=any>(obj: A|B): obj is A {
  return true;
}