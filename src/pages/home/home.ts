import { CommentPage } from './../comment/comment';
import { ContactPage } from './../contact/contact';
import { DescPage } from './../desc/desc';
import { Component } from '@angular/core';
import { NavController, ModalController, Platform, LoadingController } from 'ionic-angular';
import * as L from 'leaflet';

import { DataProvider } from './../../providers/data/data';
import { Geolocation } from '@ionic-native/geolocation';
import { PlacePage } from '../place/place';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public map: L.map;

  public roads: any;
  public hybrid: any;
  public terrain: any;
  public urban: any;

  public lyrGroup: any;
  public marker: any;


  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public dataProvider: DataProvider,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public geolocation: Geolocation
  ) {

  }

  ionViewDidLoad() {
    this.loadMap();
  }

  async loadMap() {
    this.map = L.map('map', {
      center: [17.697, 100.015],
      zoom: 14,
      zoomControl: false,
      attributionControl: false,
    })

    // h = roads only; m = standard roadmap; p = terrain; r = somehow altered roadmap; s = satellite only; t = terrain only; y = hybrid;

    this.roads = L.tileLayer('http://{s}.google.com/vt/lyrs=r&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    })

    this.hybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    })

    this.terrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    })




    // overlay
    const url = 'http://cgi.uru.ac.th/geoserver/th/ows?';
    this.urban = L.tileLayer.wms(url, {
      layers: 'th:urban_4326',
      format: 'image/png',
      transparent: true,
      opacity: 0.5,
      // CQL_FILTER: 'prov_code=63',
      zIndex: 3
    });

    // const huadong_border4326 = 
    L.tileLayer.wms(url, {
      layers: 'th:huadong_border4326',
      format: 'image/png',
      transparent: true,
      opacity: 0.5,
      // CQL_FILTER: 'prov_code=63',
      zIndex: 3
    }).addTo(this.map);

    const pacel = L.tileLayer.wms('http://125.25.43.70:8081/geoserver/WMSDOL/wms?', {
      layers: 'WMSDOL:MV_SPARCEL_47',
      format: 'image/png',
      transparent: true,
      opacity: 0.5,
      // CQL_FILTER: 'prov_code=63',
      zIndex: 3
    });


    const huadong_build4326 = L.tileLayer.wms(url, {
      layers: 'th:huadong_build4326',
      format: 'image/png',
      transparent: true,
      opacity: 0.5,
      // CQL_FILTER: 'prov_code=63',
      zIndex: 3
    });


    const huadong_flood4326 = L.tileLayer.wms(url, {
      layers: 'th:huadong_flood4326',
      format: 'image/png',
      transparent: true,
      opacity: 0.5,
      // CQL_FILTER: 'prov_code=63',
      zIndex: 3
    });

    const hd_flood2_2_4326 = L.tileLayer.wms(url, {
      layers: 'th:hd_flood2_2_4326',
      format: 'image/png',
      transparent: true,
      opacity: 0.5,
      // CQL_FILTER: 'prov_code=63',
      zIndex: 3
    });

    const hd_flood_canal2_4326 = L.tileLayer.wms(url, {
      layers: 'th:hd_flood_canal2_4326',
      format: 'image/png',
      transparent: true,
      opacity: 0.5,
      // CQL_FILTER: 'prov_code=63',
      zIndex: 3
    });

    const huadong_loc4326 = L.tileLayer.wms(url, {
      layers: 'th:huadong_loc4326',
      format: 'image/png',
      transparent: true,
      opacity: 0.9,
      // CQL_FILTER: 'prov_code=63',
      zIndex: 3
    });

    const huadong_road4326 = L.tileLayer.wms(url, {
      layers: 'th:huadong_road4326',
      format: 'image/png',
      transparent: true,
      opacity: 0.5,
      // CQL_FILTER: 'prov_code=63',
      zIndex: 3
    });

    const mb_comment = L.tileLayer.wms(url, {
      layers: 'th:mb_comment',
      format: 'image/png',
      transparent: true,
      opacity: 0.9,
      // CQL_FILTER: 'prov_code=63',
      zIndex: 3
    });

    const img = './../../assets/imgs/hs.png';

    var imageBounds = [[17.6839909239999997, 99.9921335850000048], [17.7149772970000008, 100.0331209819999998]];
    const hs = L.imageOverlay(img, imageBounds, {
      opacity: 0.6,
      zIndex: 5
    });


    // this.lyrGroup = {
    //   lyr: [
    //     { name: 'ขอบเขตตำบล', lyr: 'ud_tam', wms: this.urban.addTo(this.map), type: 'overlay', 'isChecked': true },
    //     { name: 'แผนที่ถนน', lyr: 'roads', wms: this.roads.addTo(this.map), type: 'base', 'isChecked': false },
    //     { name: 'แผนที่ผสม', lyr: 'hybrid', wms: this.hybrid, type: 'base', 'isChecked': true },
    //     { name: 'แผนที่ภูมิประเทศ', lyr: 'terrain', wms: this.terrain, type: 'base', 'isChecked': false },
    //   ]
    // }

    const baseLayers = {
      'แผนที่ถนน': this.roads.addTo(this.map),
      'แผนที่ภาพจากดาวเทียม': this.hybrid,
      'แผนที่ภูมิประเทศ': this.terrain
    }

    const overlay = {
      'ผังกฎกระทรวงผังเมืองรวม': hs.addTo(this.map),
      'การใช้ประโยชน์ที่ดิน': this.urban.addTo(this.map),
      'แปลงที่ดิน': pacel,
      'อาคาร': huadong_build4326.addTo(this.map),
      'พื้นที่น้ำท่วม': hd_flood2_2_4326,
      'เส้นทางน้ำ': hd_flood_canal2_4326,
      'ถนน': huadong_road4326.addTo(this.map),
      'สถานที่สำคัญ': huadong_loc4326.addTo(this.map),
      'แสดงความคิดเห็น': mb_comment.addTo(this.map)
    }

    L.control.layers(baseLayers, overlay, { position: 'topright' }).addTo(this.map);

    this.map.on('click', (e: any) => {
      this.getData(e.latlng.lat, e.latlng.lng);
    })
  }

  async  getData(lat: number, lng: number) {
    await this.dataProvider.getFeature(lat, lng).then((res: any) => {

      if (res.totalFeatures > 0) {
        const feature: FeatureObj = {
          code: res.features[0].properties.code,
          lat: lat,
          lng: lng,
          list: res.features[0].properties.list,
          no: res.features[0].properties.no,
          type: res.features[0].properties.type,
          rmk: res.features[0].properties.rmk,
          area: res.features[0].properties.area
        }
        this.gotoDesc(feature);
      }
      // console.log(feature)
      // res.totalFeatures > 0 ? this.gotoDesc(feature) : console.log('no feature');
    })
  }

  showLocation() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      showBackdrop: false
    });
    loading.present();

    const myIcon = L.icon({
      iconUrl: 'assets/icon/map-marker.png',
      iconSize: [32, 32],
      iconAnchor: [22, 34],
      popupAnchor: [-3, -26]
    });

    let pos = [];

    this.platform.ready().then(() => {
      let watch = this.geolocation.watchPosition();


      watch.subscribe((res) => {
        pos = [res.coords.latitude, res.coords.longitude];
        // this.lat = res.coords.latitude;
        // this.lon = res.coords.longitude;

        console.log(pos);

        this.removeMarker();
        // this.reportProvider.setLocation(this.lat, this.lon);
        this.map.setView(pos, 16);
        this.marker = L.marker(pos, {
          icon: myIcon,
          draggable: true,
          iconName: 'myPoint'
        }).addTo(this.map);

        loading.dismiss();
        this.marker.on('dragend', function (e) {
          pos = [e.target._latlng.lat, e.target._latlng.lng];
          console.log(pos);
        });
      });
    })
  }

  removeMarker() {
    this.map.eachLayer((lyr) => {
      // console.log(lyr);
      if (lyr.options.iconName == 'myPoint') {
        this.map.removeLayer(lyr);
      }
    })
  }

  gotoDesc(feature: any) {
    const modal = this.modalCtrl.create(DescPage, { feature: feature });
    modal.present();
  }

  gotoContact() {
    const modal = this.modalCtrl.create(ContactPage);
    modal.present();
  }

  gotoComment() {
    const modal = this.modalCtrl.create(CommentPage);
    modal.present();
  }

  gotoPlace() {
    const modal = this.modalCtrl.create(PlacePage);
    modal.onDidDismiss((res: any) => {
      console.log(res);
      if (res) {
        this.map.setView([res.y1, res.x1], 17);
      }
    })
    modal.present();
  }

}

export interface FeatureObj {
  code?: string;
  lat?: number;
  lng?: number;
  list?: string;
  no?: number;
  type?: string;
  rmk?: string;
  area?: number;
}
