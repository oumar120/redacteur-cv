import { Component, Input } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { NgFor, NgIf, NgClass, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-chrono',
  standalone: true,
  imports: [NgFor, NgIf,JsonPipe],
  templateUrl: './chrono.html',
  styleUrl: './chrono.css',
})
export class Chrono {
  @Input() form!: FormGroup;

get personal(): FormGroup | null {
    return this.form?.get('personal') as FormGroup ?? null;
  }

  get skillsControls(): FormGroup[] {
    return (this.form?.get('skills') as FormArray)?.controls as FormGroup[] || [];
  }
  get languagesControls(): FormGroup[] {
    return (this.form?.get('languages') as FormArray)?.controls as FormGroup[] || [];
  }
   get interestControls(): FormControl[] {
      return (this.form?.get('interest') as FormArray)?.controls as FormControl[] || [];
    }
  get experiencesControls(): FormGroup[] {
    return (this.form?.get('experiences') as FormArray)?.controls as FormGroup[] || [];
  }
  get formationsControls(): FormGroup[] {
    return (this.form?.get('formations') as FormArray)?.controls as FormGroup[] || [];
  }
  get profile():string{
    return this.form?.get('profile')?.value || '';
  }

}
