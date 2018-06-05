import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';
import {MembersService} from '../../../shared/services/members.service';
import {fadeStateTrigger} from '../../../shared/animations/fade.animation';
import {forkJoin} from 'rxjs/index';
import {AutocompleteService} from '../../../shared/services/autocomplete.service';


@Component({
  selector: 'autotourism-edit-members',
  templateUrl: './edit-members.component.html',
  styleUrls: ['./edit-members.component.scss'],
  animations: [ fadeStateTrigger ]
})
export class EditMembersComponent implements OnInit, OnDestroy {

  form: FormGroup;
  subscription: Subscription;
  isLoaded = false;
  members;
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
  message: string;


  constructor(
    private membersService: MembersService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private location: Location,
    private autocomleteService: AutocompleteService
  ) {

    this.form = this.fb.group({
      members: this.fb.array([])
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.subscription = forkJoin([
      this.membersService.getMembers(+this.id),
      this.autocomleteService.getNicks(),
      this.autocomleteService.getAutous(),
      this.autocomleteService.getCities(),
    ])
      .subscribe(results => {
        this.members = results[0]['response'];
        this.nicks = results[1]['response'];
        this.autous = results[2]['response'];
        this.cities = results[3]['response'];
        this.members.members.forEach(item => {
          (<FormArray>this.form.controls.members).push(this.fb.group({
            nick: [item.nick, [Validators.required]],
            number: [item.number],
            auto: [item.auto],
            city: [item.city, [Validators.required]]
          }));
        });
        this.form.controls.members.valueChanges.subscribe(val => {
          this.members.members = val;
        });
        this.isLoaded = true;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  removeRow(index) {
    this.deletedMember = this.form.get('members.' + index);
    (<FormArray>this.form.controls.members).removeAt(index);
  }

  restoreLastDeleted() {
    (<FormArray>this.form.controls.members).push(this.deletedMember);
    this.deletedMember = null;
  }


  onSubmit(form: NgForm) {
    this.membersService.editMembers(+this.id, form.value)
      .subscribe((data) => {
        if (data['response']) {
          this.message = 'Сохранения изменены!';
          setTimeout(() => {
            this.message = null;
          }, 5000);
        }
      });
  }

  onImportMembers(form: NgForm) {
    this.importedMembers = [];
    this.updatedMembers = [];
    this.errorRow = [];
    this.smallRow = [];
    const parsedRows = form.value['imported-members'].split(/\s*\n+/).map((row) => {
      return row.split(/\s{3,}|[\t]|[\s\-]{3}/);
    });

    parsedRows.forEach((el) => {
      if (el.length === 4) {
        if (['№', '#', '№  Экипажа', '№ Экипажа'].indexOf(el[0]) === -1) {
          if (!(<FormArray>this.form.controls.members).controls.some((memberControl) => {
            if (memberControl.value.nick.toLowerCase() === el[1].toLowerCase()) {
              this.updatedMembers.push(el[1]);
              memberControl.setValue({
                nick: el[1].trim(),
                number: el[0].trim(),
                auto: el[2].trim(),
                city: el[3].trim()
              });
              return true;
            }
          })) {
            this.importedMembers.push(el[1]);
            (<FormArray>this.form.controls.members).push(this.fb.group({
              nick: [el[1].trim(), [Validators.required]],
              number: [el[0].trim()],
              auto: [el[2].trim()],
              city: [el[3].trim(), [Validators.required]]
            }));
          }
        } else {
          this.headerRow.push(el.join(' - '));
        }
      } else if (el.length > 4) {
        this.errorRow.push(el.join(' - '));
      } else if (el.length === 1 && el[0] === '' ) {} else {
        this.smallRow.push(el.join(' - '));
      }
    });
    form.reset();
  }


  newRow() {
    (<FormArray>this.form.controls.members).push(this.fb.group({
      nick: [null, [Validators.required]],
      number: [null],
      auto: [null],
      city: [null, [Validators.required]]
    }));
  }

  goBack(): void {
    this.location.back();
  }


}
