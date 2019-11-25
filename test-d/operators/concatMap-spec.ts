import { of, Observable } from 'rxjs';
import { expectType, expectError } from 'tsd';
import { concatMap } from 'rxjs/operators';

it('should infer correctly', () => {
  expectType<Observable<boolean>>(of(1, 2, 3).pipe(concatMap(p => of(Boolean(p)))));
});

it('should support a projector that takes an index', () => {
  expectType<Observable<boolean>>(of(1, 2, 3).pipe(concatMap((p, index) => of(Boolean(p)))));
});

it('should infer correctly by using the resultSelector first parameter', () => {
  expectType<Observable<number>>(of(1, 2, 3).pipe(concatMap(p => of(Boolean(p)), a => a)));
});

it('should infer correctly by using the resultSelector second parameter', () => {
  expectType<Observable<boolean>>(of(1, 2, 3).pipe(concatMap(p => of(Boolean(p)), (a, b) => b)));
});

it('should support a resultSelector that takes an inner index', () => {
  expectType<Observable<number>>(of(1, 2, 3).pipe(concatMap(p => of(Boolean(p)), (a, b, innnerIndex) => a)));
});

it('should support a resultSelector that takes an inner and outer index', () => {
  expectType<Observable<number>>(of(1, 2, 3).pipe(concatMap(p => of(Boolean(p)), (a, b, innnerIndex, outerIndex) => a)));
});

it('should support an undefined resultSelector', () => {
  expectType<Observable<boolean>>(of(1, 2, 3).pipe(concatMap(p => of(Boolean(p)), undefined)));
});

it('should support union-type projections', () => {
  expectType<Observable<string | number>>(of(Math.random()).pipe(concatMap(n => n > 0.5 ? of('life') : of(42))));
});

it('should enforce types', () => {
  expectError(of(1, 2, 3).pipe(concatMap()));
});

it('should enforce the return type', () => {
  expectError(of(1, 2, 3).pipe(concatMap(p => p)));
});
