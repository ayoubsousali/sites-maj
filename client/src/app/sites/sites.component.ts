import { Component, OnInit } from '@angular/core';
import { SiteService } from '../site.service';
import { Site } from '../site';


@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent implements OnInit {

  sites: Site[];
  site: Site;
  selectedSite: Site;


  toggleForm: boolean = false;

  nom: string;
  description: string;
  latitude: string;
  longitude: string;
  photo: String;


  constructor(private siteService: SiteService ) { }

  // ajouter site
  addSite() {
    const newSite =  {
      nom: this.nom,
      description: this.description,
      latitude: this.latitude,
      longitude: this.longitude,
      photo: this.photo
    }

    this.siteService.addSite(newSite)
    .subscribe(site => {
      this.sites.push(site);
      this.getSites(); // actualiser les sites

    });

  }


  // supprimer site
  deleteSite(id:any) {
    var sites = this.sites;
    this.siteService.deleteSite(id)
    .subscribe(data => {
      if(data.n == 1) {
        for(var i = 0; i < sites.length; i++) {
          if(sites[i]._id == id) {
            sites.splice(i, 1);
          }
        }
      }
    });
  }

  // afficher form modification
  showEditForm(site) {
    this.selectedSite = site;
    this.toggleForm = !this.toggleForm;
  }

  // modifier site
  editSite(form) {
    let newSite: Site = {
      _id: this.selectedSite._id,
      nom: form.value.nom,
      description: form.value.description,
      latitude: form.value.latitude,
      longitude: form.value.longitude,
      photo: form.value.photo
    }

    this.siteService.editSite(newSite)
    .subscribe(result => {
      console.log('site modifier, res precedent: ' + result);
      this.getSites(); // actualiser les sites
      this.toggleForm = !this.toggleForm; // cacher le form modifier
    })

  }

  getSites() {
    this.siteService.getSites()
    .subscribe( sites => this.sites = sites);
  }

  ngOnInit() {
    this.getSites();
  }


  // convertir l'image a base64
  handleFileSelect(evt) {
    const files = evt.target.files;
    const file = files[0];

    if (files && file) {
      const reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.photo = btoa(binaryString);
    this.selectedSite.photo = btoa(binaryString);
  }

}
