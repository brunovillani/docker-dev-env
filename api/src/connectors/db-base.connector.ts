import { environment } from 'src/environment/environment';
import { FilterQuery, MongoClient, OptionalId } from 'mongodb';
import { forkJoin, from, of, throwError } from 'rxjs';
import { switchMap, catchError, take } from 'rxjs/operators';

export class DbBase {
  private collectionName;
  constructor(collection: string) {
    this.collectionName = collection;
  }

  protected findOne<T>(filter: FilterQuery<T>) {
    return this.connectToCollection<T>().pipe(
      take(1),
      switchMap(([collection, connection]) => {
        return forkJoin([from(collection.findOne(filter)), of(connection)]);
      }),
      switchMap(([el, connection]) => {
        connection.close();
        return of(el);
      })
    );
  }

  protected findMany<T>(filter: FilterQuery<T>) {
    return this.connectToCollection<T>().pipe(
      take(1),
      switchMap(([collection, connection]) => {
        return forkJoin([from(collection.find(filter).toArray()), of(connection)]);
      }),
      switchMap(([el, connection]) => {
        connection.close();
        return of(el);
      })
    );
  }

  protected addOne<T>(element: T) {
    return this.connectToCollection<T>().pipe(
      take(1),
      switchMap(([collection, connection]) => {
        return forkJoin([from(collection.insertOne(element as OptionalId<T>)), of(connection)]);
      }),
      switchMap(([el, connection]) => {
        connection.close();
        return of(el);
      })
    );
  }

  protected removeOne<T>(filter: FilterQuery<T>) {
    return this.connectToCollection<T>().pipe(
      take(1),
      switchMap(([collection, connection]) => {
        return forkJoin([from(collection.findOneAndDelete(filter)), of(connection)]);
      }),
      switchMap(([el, connection]) => {
        connection.close();
        return of(el);
      })
    );
  }

  private connectToCollection<T>() {
    return from(MongoClient.connect(environment.db_url)).pipe(
      switchMap((connection) => {
        return forkJoin([of(connection.db(environment.db_instance)), of(connection)]);
      }),
      switchMap(([db, connection]) => {
        return forkJoin([of(db.collection<T>(this.collectionName)), of(connection)]);
      }),
      catchError((error) => {
        return throwError(error);
      }),
    );
  }
}
