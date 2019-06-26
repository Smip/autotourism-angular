import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {forkJoin, Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AutocompleteService} from '@shared/services/autocomplete.service';
import {AdminTripsService} from '@shared/services/admin-trips.service';
import {Trip} from '@shared/models/trip.model';
import {toast, updateTextFields} from '@smip/ngx-materialize';

@Component({
  selector: 'app-edit-members',
  templateUrl: './edit-members.component.html',
  styleUrls: ['./edit-members.component.scss'],
})
export class EditMembersComponent implements OnInit, OnDestroy {


  form: FormGroup;
  subscription: Subscription;
  isLoaded = false;
  trip: Trip;
  id: string;
  deletedMember;
  importedMembers = [];
  updatedMembers = [];
  errorRow = [];
  smallRow = [];
  headerRow = [];
  nicks;
  autous;
  cities;

  constructor(
    private _trips: AdminTripsService,
    private _route: ActivatedRoute,
    private fb: FormBuilder,
    private autocomleteService: AutocompleteService,
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      members: this.fb.array([]),
    });
    this.id = this._route.snapshot.params['id'];
    this.subscription = forkJoin(
      this._trips.getTrip(+this.id, {members: 1}),
      this.autocomleteService.getNicks(),
      this.autocomleteService.getAutous(),
      this.autocomleteService.getCities(),
    )
      .subscribe(results => {
        this.trip = results[0]['trip'];
        this.nicks = results[1]['nicknames'].reduce((obj, item) => {
          obj[item] = null;
          return obj;
        }, {});
        this.autous = results[2]['cars'].reduce((obj, item) => {
          obj[item] = null;
          return obj;
        }, {});
        this.cities = results[3]['cities'].reduce((obj, item) => {
          obj[item] = null;
          return obj;
        }, {});
        if (this.trip.members.length) {
          this.trip.members.forEach(item => {
            (<FormArray>this.form.controls.members).push(this.fb.group({
              nick: [item.nick, [Validators.required]],
              number: [item.number],
              auto: [item.auto],
              city: [item.city, [Validators.required]],
            }));
          });
        } else {
          (<FormArray>this.form.controls.members).push(this.fb.group({
            nick: [null, [Validators.required]],
            number: [null],
            auto: [null],
            city: [null, [Validators.required]],
          }));
        }
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
    this.deletedMember = this.form.get('members.' + index);
    (<FormArray>this.form.controls.members).removeAt(index);
  }

  restoreLastDeleted() {
    (<FormArray>this.form.controls.members).push(this.deletedMember);
    this.deletedMember = null;
    setTimeout(() => {
      updateTextFields();
    }, 0);
  }


  onSubmit() {
    if (this.form.invalid) {
      Object.keys((<FormArray>this.form.controls.members).controls).forEach(row => {
        const rowControl = this.form.controls.members.get(row);
        rowControl.markAsTouched({onlySelf: true});
        Object.keys((<FormArray>rowControl).controls).forEach(field => {
          const control = rowControl.get(field);
          control.markAsTouched({onlySelf: true});
        });
      });
      return;
    }
    this._trips.editMembers(+this.id, this.form.value)
        .subscribe((data) => {
          toast({html: 'Список экипажей успешно сохранён'});
        });
  }

  onImportMembers(form: NgForm) {
    this.importedMembers = [];
    this.updatedMembers = [];
    this.errorRow = [];
    this.smallRow = [];
    const parsedRows = form.value['imported-members'].split(/\s*\n+\s*/).map((row) => {
      return row.split(/\s{3,}|[\t]|[\s\-]{3}/);
    });

    parsedRows.forEach((el) => {
      if (el.length === 4) {
        if (['№', '#', '№  Экипажа', '№ Экипажа'].indexOf(el[0]) === -1) {
          if (!(<FormArray>this.form.controls.members).controls.some((memberControl) => {
            if (memberControl.value.nick && memberControl.value.nick.toLowerCase() === el[1].toLowerCase()) {
              this.updatedMembers.push(el[1]);
              memberControl.setValue({
                nick: el[1].trim(),
                number: el[0].trim(),
                auto: el[2].trim(),
                city: el[3].trim(),
              });
              return true;
            }
          })) {
            this.importedMembers.push(el[1]);
            (<FormArray>this.form.controls.members).push(this.fb.group({
              nick: [el[1].trim(), [Validators.required]],
              number: [el[0].trim()],
              auto: [el[2].trim()],
              city: [el[3].trim(), [Validators.required]],
            }));
          }
        } else {
          this.headerRow.push(el.join(' - '));
        }
      } else if (el.length > 4) {
        this.errorRow.push(el.join(' - '));
      } else if (el.length === 1 && el[0] === '') {
      } else {
        this.smallRow.push(el.join(' - '));
      }
    });
    form.reset();
    setTimeout(() => {
      updateTextFields();
    }, 0);
  }


  newRow() {
    (<FormArray>this.form.controls.members).push(this.fb.group({
      nick: [null, [Validators.required]],
      number: [null],
      auto: [null],
      city: [null, [Validators.required]],
    }));
  }


}
