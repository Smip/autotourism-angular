import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Trip} from '@shared/models/trip.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminTripsService} from '@shared/services/admin-trips.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GlobalsService} from '@shared/services/globals.service';
import {toast, updateTextFields} from '@smip/ngx-materialize';
// declare const moment: any;
import * as moment from 'moment';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.scss'],
})
export class EditTripComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  isLoaded = false;
  tripTypes = [{
    'value': 'draft',
    'label': 'Черновик',
  }, {
    'value': 'plan',
    'label': 'План',
  }, {
    'value': 'real',
    'label': 'Пробег',
  }];
  id: string;
  form: FormGroup;

  constructor(
    private _trips: AdminTripsService,
    private route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    public globals: GlobalsService,
    private _router: Router,
  ) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.subscription = this._trips.getTrip(+this.id)
                              .subscribe((response) => {
                                this.form = this.getForm(response['trip']);
                                this.isLoaded = true;
                                setTimeout(() => {
                                  updateTextFields();
                                }, 0);
                              });
    } else {
      this.form = this.getForm();
      this.isLoaded = true;
    }

  }

  getForm(trip: Trip = new Trip()) {
    return this._formBuilder.group({
        'number': [trip.number],
        'name': [trip.name, Validators.required],
        'type': [trip.type, Validators.required],
        'date_from': [trip.date_from, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)],
        'date_until': [trip.date_until, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)],
        'registration_open_from': [trip.registration_open_from, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)],
        'registration_open_to': [trip.registration_open_to, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)],
        'link_to_registration': [trip.link_to_registration],
      },
      {
        validator: [
          this.dateMoreThen('date_from', 'date_until'),
          this.dateMoreThen('registration_open_from', 'registration_open_to'),
        ],
      },
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }
  }

  dateMoreThen(lessDateControlName, moreDateControlName) {
    return (control: AbstractControl) => {
      const lessDate = control.get(lessDateControlName);
      const moreDate = control.get(moreDateControlName);
      if (this.isValidDate(lessDate.value) && this.isValidDate(moreDate.value)) {
        if (moment(lessDate.value) <= moment(moreDate.value)) {
          return null;
        } else {
          return {[`${moreDateControlName}_more_then_${lessDateControlName}`]: true};
        }
      }
      return null;
    };
  }

  isValidDate(value: string) {
    return value && moment(value).isValid();
  }

  dateHappened(date = '', addDay: number = 0) {
    if (!date) {
      return true;
    }
    return moment(date).add(addDay, 'd').isBefore();
  }

  onSubmit() {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({onlySelf: true});
      });
      return;
    }
    if (this.id) {
      this._trips.editTrip(+this.id, this.form.value).subscribe(
        response => {
          toast({html: 'Пробег успешно изменён'});
        },
        error => {

        },
      );
    } else {
      this._trips.addTrip(this.form.value).subscribe(
        response => {
          toast({html: 'Пробег успешно создан'});
          this._router.navigate(['/admin', 'trips', response['trip'].id]);
        },
        error => {

        },
      );

    }

  }

}
