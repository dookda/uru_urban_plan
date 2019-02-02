import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class DataProvider {

  private url: string = 'http://cgi.uru.ac.th:3000/api';

  constructor(public http: HttpClient) {
    console.log('Hello DataProvider Provider');
  }

  getFeature(lat: number, lng: number) {
    const url = 'http://cgi.uru.ac.th/geoserver/th/ows?service=WFS&version=1.0.0&request=GetFeature' +
      '&typeName=th:urban_4326' +
      '&CQL_FILTER=DWITHIN(geom,POINT(' + lng + '%20' + lat + '),5,meters)' +
      '&outputFormat=application%2Fjson';

    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe((res: any) => {
        resolve(res)
      }, (error) => {
        reject(error)
      })
    })
  }

  getPlace() {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + '/urbanPlace').subscribe((res: any) => {
        resolve(res);
      }, (error) => {
        reject(error)
      })
    })
  }

  addUrbanComment(data: any) {
    console.log(data);
    return new Promise((resolve, reject) => {
      this.http.post(this.url + '/addUrbanComment', data).subscribe((res: any) => {
        resolve(res)
      }, (error) => {
        reject(error)
      })
    })
  }

  getComment() {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + '/urbanSelect').subscribe((res: any) => {
        resolve(res);
      }, (error) => {
        reject(error)
      })
    })
  }

  addCommentReply(data: any) {
    console.log(data);
    return new Promise((resolve, reject) => {
      this.http.post(this.url + '/urbanCommentReply', data).subscribe((res: any) => {
        resolve(res)
      }, (error) => {
        reject(error)
      })
    })
  }

}
