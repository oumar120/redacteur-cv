import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormService } from '../service/form.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-personnal',
  standalone: true,
  imports: [NgIf,ReactiveFormsModule],
  templateUrl: './personnal.html',
  styleUrl: './personnal.css',
})
export class Personnal {
formService = inject(FormService);
get personal() {
    return this.formService.form.get('personal') as FormGroup;
  }
  // ajoute un control dynamique sous personal (clé unique)
addPersonalField(key: string, value: any = '') {
  const pg = this.personal;
  if (!pg.contains(key)) {
    pg.addControl(key, new FormControl(value));
  }
}

// supprime un control dynamique
removePersonalField(key: string) {
  const pg = this.personal;
  if (pg.contains(key)) {
    pg.removeControl(key);
  }
}
}
