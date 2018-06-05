import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {Subscription} from "rxjs/Rx";
import {Trip} from "../../../shared/models/trip.model";
import {TripsService} from "../../../shared/services/trips.service";
import {ActivatedRoute, Router} from "@angular/router";
import * as moment from 'moment';
import {fadeStateTrigger} from "../../../shared/animations/fade.animation";
import {forkJoin} from "rxjs/index";
import {AutocompleteService} from "../../../shared/services/autocomplete.service";


@Component({
  selector: 'autotourism-edit-route',
  templateUrl: './edit-route.component.html',
  styleUrls: ['./edit-route.component.scss'],
  animations: [ fadeStateTrigger ]
})
export class EditRouteComponent implements OnInit {

  form: FormGroup;
  subscription: Subscription;
  isLoaded = false;
  trip: Trip;
  id: string;
  deletedPoint;
  message:string;
  countries;


  constructor(
    private tripService: TripsService,
    private route:ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private autocomleteService: AutocompleteService
  ) {
    this.form = this.fb.group({
      route: this.fb.array([])
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.subscription = forkJoin([this.tripService.getTrip(+this.id), this.autocomleteService.getCountries()])
      .subscribe(results => {
        this.trip = results[0]['response'];
        this.trip.route.forEach(item => {
          (<FormArray>this.form.controls.route).push(this.fb.group({
            date_from: [item.date_from, [Validators.required]],
            date_until: [item.date_until, [Validators.required]],
            destination: [item.destination, [Validators.required]]
          }, {validator: this.dateMoreValidator('date_from', 'date_until')}));
        });
        this.form.controls.route.valueChanges.subscribe(val => {
          this.trip.route = val;
        });
        this.countries = results[1]['response'];
        this.isLoaded = true;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }


  removeRow(index) {
    this.deletedPoint = this.form.get('route.'+index);
    (<FormArray>this.form.controls.route).removeAt(index);
  }

  restoreLastDeleted() {
    (<FormArray>this.form.controls.route).push(this.deletedPoint);
    (<FormArray>this.form.controls.route).controls = (<FormArray>this.form.controls.route).controls.sort((a: any, b: any) => {
      const aValue = a.controls['date_from'].value;
      const bValue = b.controls['date_from'].value;
      if (moment(aValue) < moment(bValue)) {
        return -1;
      } else if (moment(aValue) > moment(bValue)) {
        return 1;
      } else {
        return 0;
      }
    });
    this.deletedPoint = null;
  }

  dateHappened(date = '', addDay:number = 0) {
    return moment(date).add(addDay, 'd').isBefore();
  }


  onSubmit(form: NgForm){
    this.tripService.editRoute(+this.id, form.value)
      .subscribe((data) => {
        if(data['response']){
          this.message = "Сохранения изменены!";
          setTimeout(()=>{
            this.message = null;
          },5000)
        }
      });

  }

  newRow(){
    let nextDate = null;
    if(this.trip.route.length > 0){
      nextDate = moment(this.trip.route[this.trip.route.length-1]['date_until']).add(1, 'd').format("YYYY-MM-DD").toString();
     }
    (<FormArray>this.form.controls.route).push(this.fb.group({
      date_from: [nextDate, [Validators.required]],
      date_until: [nextDate, [Validators.required]],
      destination: [null, [Validators.required]]
    },{validator: this.dateMoreValidator('date_from', 'date_until')}));
  }

  dateMoreValidator(key1:string,key2:string){
    return (group: FormGroup): {[key: string]: any} => {
      let date_from = group.controls[key1];
      let date_until = group.controls[key2];
      if (moment(date_from.value).isAfter(date_until.value)) {
        console.log(date_from.value, date_until.value, "isAfter");
        return {
          validateDateMore: true
        };
      }
    }
  }
  goBack(): void {
    this.router.navigate(["/admin", 'trips']);
  }
}
