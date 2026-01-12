import { Component, inject } from '@angular/core';
import { CvForm } from "../cv-form/cv-form";
import { CvPreview } from "../cv-preview/cv-preview";
import { NgClass, NgIf } from '@angular/common';
import { FormService } from '../service/form.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CvForm, CvPreview, NgClass, NgIf],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
formService = inject(FormService);
}
