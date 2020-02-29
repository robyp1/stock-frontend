import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class  ErrorService {
  
  private _errorMsg : string

  constructor() { }

  set errorMsg (value: string){
    this._errorMsg = value
  }

  get errorMsg() :string {
    return this._errorMsg
  }
}
