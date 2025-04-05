import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as L from 'leaflet';

interface RentalLocation {
  position: L.LatLngExpression;
  title: string;
  carsAvailable: number;
  address: string;
  pricePerDay: number;
}

@Component({
  selector: 'app-gooogle-map',
  templateUrl: './gooogle-map.component.html',
  styleUrls: ['./gooogle-map.component.css']
})
export class GooogleMapComponent implements OnInit {
  @ViewChild('map', { static: true }) mapContainer!: ElementRef;

  locations: RentalLocation[] = [
    {
      position: [37.7749, -122.4194], // San Francisco
      title: 'Rental Location 1',
      carsAvailable: 10,
      address: '123 Market St, San Francisco, CA',
      pricePerDay: 50
    },
    {
      position: [37.7849, -122.4294], // San Francisco
      title: 'Rental Location 2',
      carsAvailable: 8,
      address: '456 Mission St, San Francisco, CA',
      pricePerDay: 60
    }
  ];

  map!: L.Map;

  ngOnInit(): void {
    // Initialize the map
    this.map = L.map(this.mapContainer.nativeElement).setView([37.7749, -122.4194], 12); // Default center: San Francisco

    // Set up the OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Add markers for the rental locations
    this.locations.forEach(location => {
      const marker = L.marker(location.position)
        .addTo(this.map)
        .bindPopup(`
          <strong>${location.title}</strong>
          <p>${location.address}</p>
          <p>${location.carsAvailable} cars available</p>
          <p>$${location.pricePerDay} per day</p>
        `);
    });
  }
}
