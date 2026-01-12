import { ApiService } from './../service/api.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, model } from '@angular/core';
import { ReactiveFormsModule,  } from '@angular/forms';
import { FormService } from '../service/form.service';
import { Personnal } from '../personnal/personnal';
import { Formation } from '../formation/formation';
import { Profil } from '../profil/profil';
import { Skill } from '../skill/skill';
import { Experience } from '../experience/experience';
import { Langue } from '../langue/langue';
import { Interest } from '../interest/interest';

@Component({
  selector: 'app-cv-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule,NgClass,NgFor,Personnal,Formation,Profil,Skill,Experience,Langue,Interest],
  templateUrl: './cv-form.html',
  styleUrl: './cv-form.css',
})
export class CvForm {
  showPersonal = false;
  showProfile = false;
  showSkills = false;
  showFormation = false;
  showExperience = false;
  showLanguages = false;
  showInterests = false;
  addingSkill = true;
  formService = inject(FormService);
  apiService = inject(ApiService);

  // Edition state for skills
  

  // Example submit
  onSubmit() {
 
  }

  togglePersonal() {
    this.showPersonal = !this.showPersonal;
  }

  toggleProfile() {
    this.showProfile = !this.showProfile;
  }

  toggleSkills() {
    this.showSkills = !this.showSkills;
  }

  toggleFormation() {
    this.showFormation = !this.showFormation;
  }
  toggleExperience() {
    this.showExperience = !this.showExperience;
  }

  toggleLanguages() {
    this.showLanguages = !this.showLanguages;
  }

  toggleInterests() {
    this.showInterests = !this.showInterests;
  }

  // Map numeric level (0-100) to human label
 saveCv() {
    const cvData = {
      personal: this.formService.form.get('personal')?.value,
      profile: this.formService.form.get('profile')?.value,
      skills: this.formService.form.get('skills')?.value,
      formations: this.formService.form.get('formations')?.value,
      experiences: this.formService.form.get('experiences')?.value,
      languages: this.formService.form.get('languages')?.value,
      interest: this.formService.form.get('interest')?.value,
      model: this.formService.selectedModel(),
    };
    this.apiService.saveCv(cvData).subscribe(response => {
      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'cv.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Error saving CV:', error);
    });
    // Here you can add the logic to send cvData to your backend or save it as needed
  }
}

