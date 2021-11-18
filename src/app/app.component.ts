import { Component, OnInit } from "@angular/core";
import * as L from "leaflet";
import "@geoman-io/leaflet-geoman-free";
import "leaflet-routing-machine";
import "leaflet-control-geocoder";
import "leaflet.icon.glyph";
import { Map, latLng, tileLayer, Layer, marker, icon } from "leaflet";
import "leaflet-routing-machine";
import Geocoder from "leaflet-control-geocoder";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js";
import "leaflet-control-geocoder";
import { geocoder } from "leaflet-control-geocoder/dist/control";
import "leaflet/dist/leaflet.css";
import * as Routing from "leaflet-routing-machine/index";
@Component({
  selector: "app-root",
  template: `
    <div
      class="map"
      leaflet
      [leafletOptions]="options"
      (leafletMapReady)="onMapReady($event)"
    ></div>
  `,
  styles: [
    `
      .map {
        height: 100%;
        padding: 0;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  // ngOnInit(): void {
  //   var map = L.map("map").setView([11.1271, 78.6569], 5);

  //   L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  //     attribution: "© OpenStreetMap contributors",
  //   }).addTo(map);

  //   L.Routing.control({
  //     //   waypoints: [null],
  //     waypoints: [],
  //     routeWhileDragging: true,
  //     show: true,
  //     geocoder: (L.Control as any).Geocoder.nominatim(),
  //     autoRoute: true,
  //   }).addTo(map);
  // }
  // map!: L.Map;

  ngOnInit() {}

  // layersControl = {
  //   baseLayers: {
  //     "Open Street Map": L.tileLayer(
  //       "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  //       { maxZoom: 18, attribution: "..." }
  //     ),
  //     "Open Cycle Map": L.tileLayer(
  //       "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
  //       { maxZoom: 18, attribution: "..." }
  //     ),
  //   },
  //   overlays: {
  //     "Big Circle": L.circle([46.95, -122], { radius: 5000 }),
  //     "Big Square": L.polygon([
  //       [46.8, -121.55],
  //       [46.9, -121.55],
  //       [46.9, -121.7],
  //       [46.8, -121.7],
  //     ]),
  //   },
  // };

  // options = {
  //   layers: [this.layersControl.baseLayers["Open Street Map"]],
  //   zoom: 5,
  //   // center: L.latLng(78.4, 11.2),
  // };

  // options = {
  //   layers: [
  //     tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  //       maxZoom: 18,
  //       attribution: "Open Street Map",
  //       opacity: 0.7,
  //     }),
  //   ],
  //   // center: [36.9, 30.642],
  //   zoom: 5,
  //   center: latLng({ lat: 20.5937, lng: 78.9629 }),
  //   attributionControl: false,
  // };

  // layersControl = {
  //   Position: "bottom",
  //   baseLayers: {
  //     "Open Street Map": L.tileLayer(
  //       "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  //       { maxZoom: 18, attribution: "..." }
  //     ),

  //     "Google Hybrid": L.tileLayer(
  //       "http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
  //       {
  //         maxZoom: 20,
  //         subdomains: ["mt0", "mt1", "mt2", "mt3"],
  //       }
  //     ),
  //     "Google Street": L.tileLayer(
  //       "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
  //       {
  //         maxZoom: 20,
  //         subdomains: ["mt0", "mt1", "mt2", "mt3"],
  //       }
  //     ),
  //   },
  //   overlays: {},
  // };

  onMapReady(map: L.Map) {
    /*     map.pm.addControls({
      position: 'topleft'
    }); */
    // }
    const waypoints = [L.latLng(12.7409, 77.8253), L.latLng(28.7041, 77.1025)];
    L.Routing.control({
      router: L.Routing.osrmv1({
        serviceUrl: "http://207.180.217.113:5000/route/v1",
        profile: "driving",
        useHints: false,
      }),
      plan: L.Routing.plan(waypoints, {
        createMarker(i, wp) {
          return L.marker(wp.latLng, {
            draggable: true,
            icon: (L.icon as any).glyph({ glyph: String.fromCharCode(65 + i) }),
          });
        },
        geocoder: (L.Control as any).Geocoder.nominatim(),
        routeWhileDragging: true,
      }),
      waypoints,
      routeWhileDragging: true,
      show: true,
      showAlternatives: true,
    }).addTo(map);

    // const waypoint = [L.latLng(12.9165, 79.1325), L.latLng(12.6825, 78.6167)];
    // L.Routing.control({
    //   router: L.Routing.osrmv1({
    //     serviceUrl: "http://207.180.217.113:5000/route/v1",
    //     profile: "car",
    //     useHints: false,
    //   }),
    //   plan: L.Routing.plan(waypoint, {
    //     createMarker(i, wp) {
    //       return L.marker(wp.latLng, {
    //         draggable: true,
    //         icon: (L.icon as any).glyph({ glyph: String.fromCharCode(65 + i) }),
    //       });
    //     },
    //     geocoder: (L.Control as any).Geocoder.nominatim(),
    //     routeWhileDragging: true,
    //   }),
    //   waypoints,
    //   routeWhileDragging: true,
    //   show: true,
    //   showAlternatives: true,
    // }).addTo(map);
  }

  // options = {
  //   layers: [
  //     tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  //       maxZoom: 18,
  //       attribution: "Open Street Map",
  //       opacity: 0.7,
  //     }),
  //   ],
  //   // center: [36.9, 30.642],
  //   zoom: 5,
  //   center: latLng({ lat: 20.5937, lng: 78.9629 }),
  //   attributionControl: false,
  // };

  // layersControl = {
  //   Position: "bottom",
  //   baseLayers: {
  //     "Open Street Map": L.tileLayer(
  //       "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  //       { maxZoom: 18, attribution: "..." }
  //     ),

  //     "Google Hybrid": L.tileLayer(
  //       "http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
  //       {
  //         maxZoom: 20,
  //         subdomains: ["mt0", "mt1", "mt2", "mt3"],
  //       }
  //     ),
  //     "Google Street": L.tileLayer(
  //       "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
  //       {
  //         maxZoom: 20,
  //         subdomains: ["mt0", "mt1", "mt2", "mt3"],
  //       }
  //     ),
  //   },
  //   overlays: {},
  // };
  options = {
    layers: [
      tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }),
    ],
    zoom: 7,
    center: latLng([46.879966, -121.726909]),
  };
}
