import { NgClass, NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormService } from '../service/form.service';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { Chrono } from '../models/chrono/chrono';

@Component({
  selector: 'app-cv-preview',
  standalone: true,
  imports: [NgFor,NgIf,NgClass,NgSwitch,NgSwitchCase,NgSwitchDefault,Chrono],
  templateUrl: './cv-preview.html',
  styleUrl: './cv-preview.css',
})
export class CvPreview {
  formService = inject(FormService);
  
}
