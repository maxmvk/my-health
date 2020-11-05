import {Injectable} from '@angular/core';
import {StorageStateEnum} from '../utils';

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {
  set(key: StorageStateEnum, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (err) {
      console.log('Error saving to localStorage', err)
    }
  }

  get(key: StorageStateEnum): any {
    try {
      return JSON.parse(localStorage.getItem(key))
    } catch (err) {
      console.log('Error getting data from localStorage', err)
      return null
    }
  }

  remove(key: StorageStateEnum): void {
    localStorage.removeItem(key);
  }
}
