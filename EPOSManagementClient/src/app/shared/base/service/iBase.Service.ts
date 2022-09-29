import { Observable } from 'rxjs';
export interface IBaseService<T> {
  Get(): Observable<T[]>;
  GetById(id: number): Observable<T>;
  Create(t: T): Observable<T>;
  Update(id: number, t: T): Observable<any>;
  Delete(id: number): Observable<any>;
}
