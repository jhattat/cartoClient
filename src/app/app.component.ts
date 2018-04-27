// Ajouter OnInit pour effectuer des opérations à l'initialisation du composant.
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as L from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// Implémenter OnInit
export class AppComponent implements OnInit {

  // injection
  constructor(private http: HttpClient) {}

// Fonction d'initialisation du composant.
ngOnInit() {
  // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
  const theMap = L.map('map').setView([50.92253, 1.82223], 13);

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: 'Sample Map'
  }).addTo(theMap);

   const greenIcon = L.icon({
            iconUrl: 'assets/beer.png',
            iconSize: [38, 38] // size of the icon
  });

  this.http.get('http://localhost:5000/api/AZObs').subscribe((data: any) => {

    data.forEach(observation => {
       L.marker([observation.geo.longitude, observation.geo.latitude], {icon: greenIcon}).addTo(theMap);
    });
  });
}
}
