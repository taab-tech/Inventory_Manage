import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Post } from './post';
import { catchError } from 'rxjs/operators';
import { Items } from '../models/items.model';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
// import * as EventEmitter from 'events';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private snackbarConfig: MatSnackBarConfig = {
    panelClass: ['custom-snackbar'],
    duration: 2000,
    verticalPosition: 'top',
    horizontalPosition: 'center'
  };
  private apiURL = "https://jsonplaceholder.typicode.com";
  private URL = `http://httpbin.org/post`

  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json; charset=UTF-8'
    })
  }
  // @Output() editItems: EventEmitter<Items> = new EventEmitter()
  editItems= new Subject<any>();
  editItems$= this.editItems.asObservable();
  items: Items[] = new Array<Items>();

  createItems: Items = new Items();
  constructor(private httpClient: HttpClient, public snackbar: MatSnackBar) {
    this.items = [
      {
        'itemName': 'Chudi', 'itemCode': 1, 'description': 'Full Sleeve', 'purchaseAmnt': 420, 'sellAmnt': 500,'index':1
      }
    ]
  }
  showMessage(message: string) {
    this.snackbar.open(message, '', this.snackbarConfig);
  }

  getAll(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.apiURL + '/posts/')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  check(post: any): Observable<Post> {
    return this.httpClient.post<Post>(this.URL, post, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  create(post: any): Observable<Post> {
    this.items.push(post);
    return this.httpClient.post<Post>(this.apiURL + '/posts/', JSON.stringify(post), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  find(id: string | number): Observable<Post> {
    return this.httpClient.get<Post>(this.apiURL + '/posts/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  view() {
    return this.httpClient.get<Post>(`http://httpbin.org/get`)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  update(id: string | number, post: any): Observable<Post> {
    return this.httpClient.put<Post>(this.apiURL + '/posts/' + id, JSON.stringify(post), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  delete(id: string) {
    return this.httpClient.delete<Post>(this.apiURL + '/posts/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }


  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}




