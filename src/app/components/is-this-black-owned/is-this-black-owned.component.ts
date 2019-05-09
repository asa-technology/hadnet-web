import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {GoogleTextService} from '../../services/google-text.service';


@Component({
  selector: 'app-is-this-black-owned',
  templateUrl: './is-this-black-owned.component.html',
  styleUrls: ['./is-this-black-owned.component.css']
})
export class IsThisBlackOwnedComponent implements OnInit {
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public loading = false;
  public businessFound = false;
  public businessNotFound = false;
  constructor(private googleTextService: GoogleTextService) { }



  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;
public webcamImageInfo: any;
  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  public ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  public triggerSnapshot(): void {
    this.loading = true;
    this.toggleWebcam();
    this.trigger.next();
    setTimeout(() => {
      this.loading = false;
      this.businessNotFound = true;
      this.toggleWebcam();
    }, 3000);
    setTimeout(() => {
      this.businessNotFound = false;
    }, 10000);
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.log('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
    this.webcamImageInfo = this.webcamImage.imageAsBase64;
    this.googleTextService.isBusinessVerified({img: webcamImage.imageAsBase64}).subscribe((businesses) => {
      console.log(businesses, 'response from server');
      // if(navigator.geolocation){
      //   navigator.geolocation.getCurrentPosition((position) => {
      //     let lat = position.coords.latitude;
      //     let long = position.coords.longitude;
      //     console.log(lat, 'this is lat');
      //     console.log(long, 'this is long');
      //   });
      // }
    });
  }




  public getClosestBusinessDistance(busLat: any, busLong: any) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let userLat = position.coords.latitude * Math.PI / 180;
        let userLong = position.coords.longitude * Math.PI / 180;
        busLat = busLat * Math.PI / 180;
        busLong = busLong * Math.PI / 180;
        console.log(userLat, 'this is lat');
        console.log(userLong, 'this is long');
        let x = (busLong - userLong) * Math.cos((userLat + busLat) / 2);
        let y = (busLat - userLat);
        return Math.sqrt(x * x + y * y) * 6371;
      });
    }
  }

  public getClosestBusiness(businesses: any): void {
    let minDif = 99999;
    let closest;
  
    for (let i = 0; i < businesses.length; i++) {
    let dif = this.getClosestBusinessDistance(businesses[i][1], businesses[i][2]);
      if (dif < minDif) {
        closest = i;
        minDif = dif;
      }
    }
    alert(businesses[closest]);
  }





  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }
}
