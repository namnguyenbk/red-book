import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.css']
})
export class ImageViewComponent implements OnInit {
  @Input() src : Array<string>;
  // src = [
  //   "https://firebasestorage.googleapis.com/v0/b/redbook-c0408.appspot.com/o/0efgggjfn03s?alt=media&token=3f994393-3185-4c3b-8f06-6286781e1101",
  //   "https://firebasestorage.googleapis.com/v0/b/redbook-c0408.appspot.com/o/q5e3hdy2yme?alt=media&token=069a7e77-073c-4be7-ae1d-bc440b31f8ec"
  // ]
  isZoom : boolean;
  current : string;
  constructor() { }

  ngOnInit() {
    if(this.src[0] === undefined){
      this.src[0] = "https://firebasestorage.googleapis.com/v0/b/redbook-c0408.appspot.com/o/flat-design-house-houses-and-tractor-on-village-vector-17714026.jpg?alt=media&token=238b84d9-eb36-47dc-a136-53eb2aa91c24"
      this.src[1] = "https://firebasestorage.googleapis.com/v0/b/redbook-c0408.appspot.com/o/flat-design-house-houses-and-tractor-on-village-vector-17714026.jpg?alt=media&token=238b84d9-eb36-47dc-a136-53eb2aa91c24"
    }
  }

  display( index){
    if(index == "1"){
      this.current = this.src[0];
    }
    if(index == "2"){
      this.current = this.src[1];
    }
  }

  zoom(index){
    this.isZoom = true;
    if(index == "1"){
      this.current = this.src[0];
    }
    if(index == "2"){
      this.current = this.src[1];
    }

  }

  handleCancel(){
    this.isZoom = false;
  }
  handleOk(){
    this.isZoom = false;
  }

}
