import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  appName: string = 'ComelyText';

  setObjectToStorage(key: string, value: any): void {
    let localObject = localStorage[this.appName]
      ? JSON.parse(localStorage[this.appName])
      : {};
    localObject[key] = value;
    localStorage[this.appName] = JSON.stringify(localObject);
  }

  getObjectFromStorage(key: string): any {
    return localStorage[this.appName]
      ? JSON.parse(localStorage[this.appName])[key]
      : null;
  }

  deleteObjectFromStorage(key: string): void {
    let localObject = localStorage[this.appName]
      ? JSON.parse(localStorage[this.appName])
      : {};
    delete localObject[key];
    localStorage[this.appName] = JSON.stringify(localObject);
  }

  cleanLocalStorage(): void {
    if (localStorage[this.appName]) delete localStorage[this.appName];
  }

  objectExistBy(key: string): boolean {
    return this.getObjectFromStorage(key) ? true : false;
  }
}
