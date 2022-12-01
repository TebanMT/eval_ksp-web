import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {

  apiUrl: string;
  httpLink: any;

  constructor(private webApiService: WebApiService) {
    this.apiUrl = environment.url;
    this.httpLink = {
      getAllEmployee: this.apiUrl + "/employe",
      deleteEmployeeById: this.apiUrl + "/employe",
      getEmployeeDetailById: this.apiUrl + "/employe",
      saveEmployee: this.apiUrl + "/employe"
    }
  }

  public getAllEmployee(): Observable<any> {
    return this.webApiService.get(this.httpLink.getAllEmployee);
  }
  public deleteEmployeeById(employeId: any): Observable<any> {
    return this.webApiService.delete(this.httpLink.deleteEmployeeById + '/' + employeId);
  }
  public getEmployeeDetailById(model: any): Observable<any> {
    return this.webApiService.get(this.httpLink.getEmployeeDetailById + '/' + model);
  }
  public saveEmployee(model: any, ben: any): Observable<any> {
    console.log(model,ben);
    let data = {"employe":model, "beneficiary":[ben]}
    console.log(data);
    return this.webApiService.post(this.httpLink.saveEmployee, data);
  }
  public updateEmployee(model: any, employeId: any): Observable<any> {
    let data = {"employe":model}
    return this.webApiService.update(this.httpLink.saveEmployee+'/'+employeId, model);
  }
}