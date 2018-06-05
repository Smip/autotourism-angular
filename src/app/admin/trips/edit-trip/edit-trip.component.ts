import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Rx";

import {TripsService} from "../../../shared/services/trips.service";
import {Trip} from "../../../shared/models/trip.model";
import * as moment from 'moment';
import {fadeStateTrigger} from "../../../shared/animations/fade.animation";


@Component({
  selector: 'autotourism-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.scss'],
  animations: [ fadeStateTrigger ]
})
export class EditTripComponent implements OnInit {

  subscription: Subscription;
  isLoaded = false;
  trip: Trip;
  message:string;
  tripTypes = [{
    'value': 'draft',
    'label': 'Черновик'
  },{
    'value': 'plan',
    'label': 'План'
  },{
    'value': 'real',
    'label': 'Пробег'
  }];
  id: string;


  constructor(
    private tripService: TripsService,
    private route:ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if(this.id){
      this.subscription = this.tripService.getTrip(+this.id)
        .subscribe((data)=> {
          this.trip = data['response'];
          this.isLoaded = true;
        });
    }else{
      this.trip = new Trip(null, "", "", "", "draft", "", "", "", [], 0, false);
      this.isLoaded = true;
    }
  }

  ngOnDestroy() {
    if(this.subscription){
      this.subscription.unsubscribe()
    }

  }

  dateHappened(date = '', addDay:number = 0) {
    return moment(date).add(addDay, 'd').isBefore();
  }

  numberInArray(value:number, array:Array<number>){
    return array.indexOf(+value) === -1 ? false : true;
  }

  isValidDate(value: string){
    return moment(value).isValid() && value;
  }


  onSubmit(form: NgForm){
    if(this.id){
      this.tripService.editTrip(+this.id, form.value)
        .subscribe((data) => {
          if(data['response']){
            this.message = "Сохранения изменены!";
            setTimeout(()=>{
              this.message = null;
            },5000)
          }
        });
    }else {
      this.tripService.addTrip(form.value)
        .subscribe((data) => {
          this.router.navigate(["..", 'route', data['response']], {relativeTo:this.route});
        });
    }
  }

  goBack(): void {
    this.router.navigate(["/admin", 'trips']);
  }
}
