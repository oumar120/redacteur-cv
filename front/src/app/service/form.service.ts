import { Injectable, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  editingIndex: Record<string,number> = {};
  backups: Record<string,any[]> = {};
  selectedModel = signal('circulaire');  
  // preview state: false = form view (or split on desktop), true = preview-only
  preview = signal(false);

  togglePreview() { this.preview.update(v => !v); }

  // factories to create form groups/controls (accept optional data)
  private factories = {
    skills: (d?: any) => new FormGroup({ name: new FormControl(d?.name ?? ''), level: new FormControl(d?.level ?? 0) }),
    formations: (d?: any) =>
      new FormGroup({
        diploma: new FormControl(d?.diploma ?? ''), establishment: new FormControl(d?.establishment ?? ''), city: new FormControl(d?.city ?? ''),
        startMonth: new FormControl(d?.startMonth ?? ''), startYear: new FormControl(d?.startYear ?? ''),
        endMonth: new FormControl(d?.endMonth ?? ''), endYear: new FormControl(d?.endYear ?? ''), ongoing: new FormControl(d?.ongoing ?? false),
        description: new FormControl(d?.description ?? ''),
      }),
    experiences: (d?: any) =>
      new FormGroup({
        title: new FormControl(d?.title ?? ''), employer: new FormControl(d?.employer ?? ''), city: new FormControl(d?.city ?? ''),
        startMonth: new FormControl(d?.startMonth ?? ''), startYear: new FormControl(d?.startYear ?? ''),
        endMonth: new FormControl(d?.endMonth ?? ''), endYear: new FormControl(d?.endYear ?? ''), ongoing: new FormControl(d?.ongoing ?? false),
        description: new FormControl(d?.description ?? ''),
      }),
    languages: (d?: any) => new FormGroup({ language: new FormControl(d?.language ?? ''), level: new FormControl(d?.level ?? '') }),
    interest: (d?: any) => new FormControl(d ?? ''),
  };

  // Reactive form structure
  form = new FormGroup({
    personal: new FormGroup({
      prenom: new FormControl(''),
      nom: new FormControl(''),
      email: new FormControl('', [Validators.email]),
      phone: new FormControl(''),
      address: new FormControl(''),
      postalCode: new FormControl(''),
      city: new FormControl(''),
    }),
    profile: new FormControl(''),
    skills: new FormArray<FormGroup>([]),
    formations: new FormArray<FormGroup>([]),
    drafts: new FormGroup({
      formations: this.factories['formations'](),
      experiences: this.factories['experiences'](),
      skills: this.factories['skills'](),
      languages: this.factories['languages'](),
      interest: this.factories['interest'](),
    }), // placeholder for future use
    experiences: new FormArray<FormGroup>([]),
    languages: new FormArray<FormGroup>([]),
    interest: new FormArray<FormControl>([]),
  });

  // Getter for all form arrays
getArray(section: keyof typeof this.factories): FormArray {
    return this.form.get(section) as FormArray;
  }

//Fonctions generiques pour les form arrays
  add(section: keyof typeof this.factories, data?: any) {
    const group = this.factories[section](data);
    this.getArray(section).push(group);
    this.form.get(`drafts.${section}`)?.reset(); // reset draft after adding
    console.log(this.getArray(section).controls.forEach(ctrl => console.log(ctrl.value)));
  }
  remove(section: keyof typeof this.factories, i: number) { this.getArray(section).removeAt(i); }

  // Start editing a skill: keep a backup of current values
  startEdit(section: keyof typeof this.factories, i: number) {
    const g = this.getArray(section).at(i) as FormGroup;
    this.backups[section] = this.backups[section] || [];
    this.backups[section][i] = JSON.parse(JSON.stringify(g.value)); // attention aux Date/objets
    this.editingIndex[section] = i;
  }

  // Save changes and exit edit mode
  save(section: keyof typeof this.factories, i: number) {
    // form controls already updated live; just clear edit state
    this.editingIndex[section] = -1;
    this.backups[section][i] = null;
  }

  // Cancel edit and restore backup
  cancelEdit(section: keyof typeof this.factories, i: number) {
    const g = this.getArray(section).at(i) as FormGroup;
    const backup = this.backups[section][i];
    if (backup) {
      g.patchValue(backup);
    }
    this.editingIndex[section] = -1;
    this.backups[section][i] = null;
  }
  // retourne les mois (1..12) avec étiquettes en français
months = [
  'Janvier','Février','Mars','Avril','Mai','Juin',
  'Juillet','Août','Septembre','Octobre','Novembre','Décembre'
].map((label,i)=>({ value: i+1, label }));

years = (() => {
  const current = new Date().getFullYear();
  return Array.from({length:100}, (_,i)=> current - i);
})();
}
