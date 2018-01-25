import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Site } from './site';
import 'rxjs/add/operator/map';


@Injectable()
export class SiteService {

  constructor(private http: Http) { }

  // get sites
  getSites() {
    return this.http.get('http://localhost:3000/api/sites')
    .map(res => res.json());
  }

  // ajouter site
  addSite(newSite) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/site', newSite, {headers: headers})
    .map(res => res.json());
  }

  // modifier site
  editSite(newSite) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/api/site/' + newSite._id, newSite, {headers: headers})
    .map(res => res.json());
  }

  // supprimer site
  deleteSite(id) {
    return this.http.delete('http://localhost:3000/api/site/' + id)
    .map(res => res.json());
  }
}
