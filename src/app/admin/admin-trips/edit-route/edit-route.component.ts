import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {forkJoin, Subscription} from 'rxjs';
import {Trip} from '@shared/models/trip.model';
import {GlobalsService} from '@shared/services/globals.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AutocompleteService} from '@shared/services/autocomplete.service';
import {AdminTripsService} from '@shared/services/admin-trips.service';
import {toast, updateTextFields} from '@smip/ngx-materialize';
// declare const moment: any;
import * as moment from 'moment';

// const Moment: any = (<any>moment).default || moment;

@Component({
  selector: 'app-edit-route',
  templateUrl: './edit-route.component.html',
  styleUrls: ['./edit-route.component.scss'],
})
export class EditRouteComponent implements OnInit, OnDestroy {

  form: FormGroup;
  subscription: Subscription;
  isLoaded = false;
  trip: Trip;
  id: string;
  deletedPoint;
  message: string;
  countries: {};


  constructor(
    public globals: GlobalsService,
    private _trips: AdminTripsService,
    private _route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private autocomleteService: AutocompleteService,
  ) {
  }

  get route(): FormArray {
    return this.form.get('route') as FormArray;
  }

  ngOnInit() {
    this.form = this.fb.group({
      route: this.fb.array([]),
    });
    this.id = this._route.snapshot.params['id'];
    this.subscription = forkJoin(
      this._trips.getTrip(+this.id, {route: 1}),
      this.autocomleteService.getCountries(),
    ).subscribe(results => {
      this.trip = results[0]['trip'];
      if (this.trip.trip_routes.length) {
        this.trip.trip_routes.forEach(item => {
          (<FormArray>this.form.controls.route).push(
            this.fb.group(
              {
                date_from: [item.date_from, [Validators.required]],
                date_until: [item.date_until, [Validators.required]],
                destination: [item.destination, [Validators.required]],
              },
              {validator: this.dateMoreValidator('date_from', 'date_until')},
            ),
          );
        });
      } else {
        (<FormArray>this.form.controls.route).push(
          this.fb.group(
            {
              date_from: [this.trip.date_from, [Validators.required]],
              date_until: [this.trip.date_from, [Validators.required]],
              destination: [null, [Validators.required]],
            },
            {validator: this.dateMoreValidator('date_from', 'date_until')},
          ),
        );
      }

      this.countries = results[1]['countries'].reduce((obj, item) => {
        obj[item] = null;
        return obj;
      }, {});
      this.isLoaded = true;
      setTimeout(() => {
        updateTextFields();
      }, 0);
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  removeRow(index) {
    this.deletedPoint = this.form.get('route.' + index);
    (<FormArray>this.form.controls.route).removeAt(index);
  }

  restoreLastDeleted() {
    (<FormArray>this.form.controls.route).push(this.deletedPoint);
    this.sortForm();
    this.deletedPoint = null;
    setTimeout(() => {
      updateTextFields();
    }, 0);
  }

  sortForm() {
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
  }

  dateHappened(date = '', addDay: number = 0) {
    return moment(date).add(addDay, 'd').isBefore();
  }


  onSubmit() {
    if (this.form.invalid) {
      Object.keys((<FormArray>this.form.controls.route).controls).forEach(row => {
        const rowControl = this.form.controls.route.get(row);
        rowControl.markAsTouched({onlySelf: true});
        Object.keys((<FormArray>rowControl).controls).forEach(field => {
          const control = rowControl.get(field);
          control.markAsTouched({onlySelf: true});
        });
      });
      return;
    }
    this._trips.editRoute(+this.id, this.form.value)
        .subscribe((data) => {
          toast({html: 'Маршрут успешно сохранён'});
        });

  }

  newRow() {
    this.sortForm();
    let nextDate = this.trip.date_from;
    if (this.form.value.route.length) {
      nextDate = moment(this.form.value.route[this.form.value.route.length - 1]['date_until']).add(1, 'd').format('YYYY-MM-DD').toString();
      console.log(this.form.value.route[this.form.value.route.length - 1]['date_until']);
    }
    (<FormArray>this.form.controls.route).push(this.fb.group({
      date_from: [nextDate, [Validators.required]],
      date_until: [nextDate, [Validators.required]],
      destination: [null, [Validators.required]],
    }, {validator: this.dateMoreValidator('date_from', 'date_until')}));

  }

  dateMoreValidator(key1: string, key2: string) {
    return (control: AbstractControl) => {
      const date_from = control.get(key1);
      const date_until = control.get(key2);
      if (moment(date_from.value).isAfter(date_until.value)) {
        return {
          validateDateMore: true,
        };
      }
      return null;
    };
  }

}
