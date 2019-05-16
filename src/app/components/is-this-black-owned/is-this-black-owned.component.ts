/**
 * IsThisBlackOwnedComponent
 */
import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {GoogleTextService} from '../../services/google-text.service';
import {BusinessProfileService} from '../../services/business-profile/business-profile.service';

@Component({
  selector: 'app-is-this-black-owned',
  templateUrl: './is-this-black-owned.component.html',
  styleUrls: ['./is-this-black-owned.component.css']
})

export class IsThisBlackOwnedComponent implements OnInit {
  /** Variable "showWebCam" is a boolean representing whether or not to utilize the device's webcam. */
  public showWebcam = true;
  /** Variable "allowCameraSwitch" is a boolean representing whether or not the camera can take a picture. */
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  /** Variable "deviceId" is a string representing the ID of the current device using a camera. Used for temporary identification. */
  public deviceId: string;
  /** Variable "videoOptions" are [[MediaTrackConstraints]] used to determine the dimensions of the camera view of the user. */
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  /** Variable "loading" is a boolean determining whether or not the loading image shows. */
  public loading = false;
  /** Variable "businessFound" is a boolean representing whether or not a business has been found in the database. */
  public businessFound = false;
  /** Variable "businessNotFound" is a boolean representing the fact that a business has not been found. If this is set to true,
   * a warning that the business hasn't been found pops up briefly to communicate this to the user.
   */
  public businessNotFound = false;
  /** Variable "business" represents a business object that is displayed when the camera takes a picture,
   * the google vision api reads this, and the database is queried for the closest business matching the detected text.
   */
  public business: any;
  /** Variable "showBusinessSummary" is a boolean deciding whether or not businessSummary view is displayed. */
  public showBusinessSummary = false;

  constructor(private googleTextService: GoogleTextService, private businessProfileService: BusinessProfileService) { }
  public errors: WebcamInitError[] = [];
  /** Variable "webcamImage" represents the latest picture taken. */
  public webcamImage: WebcamImage = null;
  /** Variable "webcamImageInfo" includes information regarding the recently taken photo. */
  public webcamImageInfo: any;
  /** Variable "trigger" is the trigger for the webcam taking a picture. */
  private trigger: Subject<void> = new Subject<void>();
  /**
   * Variable "nextWebcam" switches to next / previous / a specific webcam.
   * The boolean value determines whether or not the next or previous camera is used.
   * "nextWebcam" can also be a string, representing the deviceId.
   */
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  public ngOnInit(): void {
    this.loading = true;
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      })
      .then(() => {
        this.loading = false;
      });
  }

  /**
   * @description Function triggerSnapshot calls the "next" method of "trigger", calling for a picture to be taken.
   * Loading starts, and the webcam disappears while the Google Vision API is queried, and the server answers.
   */
  public triggerSnapshot(): void {
    this.trigger.next();
    this.businessNotFound = false;
    this.loading = true;
    this.showWebcam = false;
  }

  /**
   * @description Function toggleWebcam toggles whether or not the webcam is shown.
   */
  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  /**
   * @description Function handleInitError takes in an error in the case that there is an issue loading the webcam,
   * and pushes it into the errors array.
   * @param error Argument "error" is similar to an event handler function, called if there's any issue loading the webcam.
   */
  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  /**
   * @description Function showNextWebcam takes in direction or device ID, and chooses that device/direction to iterate through devices, to.
   * @param directionOrDeviceId DirectionOrDeviceId takes either a boolean representing which direction to iterate through
   * webcams, or a string that tells which device to use to take pictures.
   *  true => move forward through devices
   *  false => move backwards through devices
   *  string => move to device with given deviceId
   */
  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    this.nextWebcam.next(directionOrDeviceId);
  }

  /**
   * @description handleImage takes in a webcamImage on trigger, calls the googleTextService to check whether or not
   * the business is in the database, handles the cases where the business is not found, if it is, handles that by presenting
   * the user with the choice of navigating to that businesses' profile.
   * @param webcamImage WebcamImage is the image taken by the user, to be processed.
   */
  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.webcamImageInfo = this.webcamImage.imageAsBase64;
    this.googleTextService.isBusinessVerified({img: webcamImage.imageAsBase64}).subscribe((businesses) => {
      // run an each loop over businesses lats/longs, returning the business with the
      // lowest distance from current user's location
        if (businesses !== 'Business Not Found, Please Try Again' && businesses.length !== 0) {
        const closestBusiness: any = businesses.reduce((closestBiz: any, business: any) => {
        if (this.getClosestBusiness(business.latitude, business.longitude)
        < this.getClosestBusiness(closestBiz.latitude, closestBiz.longitude)) {
          return business;
        }
        return closestBiz;
      });
        this.loading = false;
        this.business = closestBusiness;
        this.allowCameraSwitch = false;
        this.businessNotFound = false;
        this.showBusiness();
      } else {
        this.businessNotFound = true;
        setTimeout(() => {
          this.businessNotFound = false;
        }, 3000);
        setTimeout(() => {
        this.loading = false;
        this.showWebcam = true;
        }, 500);
      }
    });
  }

    /**
     * @description Function getClosestBusiness takes in a businesses' latitude and longitude and returns the distance
     * the business is from the user's current location.
     *
     * @param businessLat Businesses' latitude.
     * @param businessLong Businesses' longitude.
     */
  public getClosestBusiness(businessLat: any, businessLong: any) {
    let userCurrentLat: number;
    let userCurrentLong: number;
    let distance: number;
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      userCurrentLat = position.coords.latitude * Math.PI / 180;
      userCurrentLong = position.coords.longitude * Math.PI / 180;
      businessLat = businessLat * Math.PI / 180;
      businessLong = businessLong * Math.PI / 180;
      const x: number = (businessLong - userCurrentLong) * Math.cos((userCurrentLat + businessLat) / 2);
      const y: number = (businessLat - userCurrentLat);
      distance = Math.sqrt(x * x + y * y) * 6371;
    });
  }
    return distance;
  }

  /**
   * @description Function changeBusinessProfile calls the businessProfileService method "changeProfile", to change
   * the business-profile component's displayed business to, before navigating to the business profile component.
   * @param biz Biz is the business to change the business-profile component's displayed business to.
   */
  public changeBusinessProfile(biz) {
  this.businessProfileService.changeProfile(biz);
  }

  /**
   * @description Function returnToCameraView displays the webcam, allows pictures to be taken, and removes the
   * displayed business summary.
   */
  public returnToCameraView() {
    this.showWebcam = true;
    this.allowCameraSwitch = true;
    this.showBusinessSummary = false;
  }

  /**
   * @description Function showBusiness shows the business summary if a business has been found.
   */
  public showBusiness() {
    if (this.business) {
      this.businessFound = true;
      this.showBusinessSummary = true;
    }
  }

  /**
   * @description Function cameraWasSwitched sets the deviceId variable.
   * @param deviceId DeviceId is the Id of the device switched to. This device is the one which is responsible for taking pictures.
   */
  public cameraWasSwitched(deviceId: string): void {
    this.deviceId = deviceId;
  }

  /**
   * @description Function triggerObservable calls trigger, taking a picture.
   */
  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  /**
   * @description Function nextWebcamObservable switches to the next device available to take picture.
   */
  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }
}
