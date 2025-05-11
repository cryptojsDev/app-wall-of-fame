import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import Swal from 'sweetalert2';

interface UploadMemeForm {
  title: string;
  description: string;
  category: 'trending' | 'ai' | 'classic' | 'tech' | 'gaming';
  tags: string;
  imageFile: File | null;
}

@Component({
  selector: 'app-upload-meme',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './upload-meme.component.html',
  styleUrls: ['./upload-meme.component.css']
})
export class UploadMemeComponent implements OnInit {
  uploadForm: FormGroup;
  isUploading = false;
  previewUrl: string | null = null;
  categories = [
    { value: 'trending', label: '🔥 Trending' },
    { value: 'ai', label: '🤖 AI Generated' },
    { value: 'classic', label: '👑 Classic' },
    { value: 'tech', label: '💻 Tech' },
    { value: 'gaming', label: '🎮 Gaming' }
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.uploadForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      category: ['', Validators.required],
      tags: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s,]+$/)]],
      imageFile: [null, Validators.required]
    });
  }

  ngOnInit(): void {}

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        Swal.fire({
          title: 'Invalid file type',
          text: 'Please select an image file (JPEG, PNG, GIF)',
          icon: 'error',
          customClass: {
            popup: 'swal2-dark',
            title: 'swal2-dark',
            htmlContainer: 'swal2-dark'
          }
        });
        return;
      }

      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          title: 'File too large',
          text: 'Please select an image smaller than 5MB',
          icon: 'error',
          customClass: {
            popup: 'swal2-dark',
            title: 'swal2-dark',
            htmlContainer: 'swal2-dark'
          }
        });
        return;
      }

      this.uploadForm.patchValue({ imageFile: file });
      
      // Crear preview
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.uploadForm.valid) {
      this.isUploading = true;

      // Simular subida de archivo
      setTimeout(() => {
        const formData = this.uploadForm.value;
        console.log('Uploading meme:', formData);

        // Simular éxito
        Swal.fire({
          title: 'Success!',
          text: 'Your meme has been uploaded successfully',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
          customClass: {
            popup: 'swal2-dark',
            title: 'swal2-dark',
            htmlContainer: 'swal2-dark'
          }
        }).then(() => {
          this.router.navigate(['/my-memes']);
        });

        this.isUploading = false;
      }, 2000);
    } else {
      // Marcar todos los campos como touched para mostrar errores
      Object.keys(this.uploadForm.controls).forEach(key => {
        const control = this.uploadForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.uploadForm.get(controlName);
    if (!control?.errors || !control.touched) return '';

    if (control.errors['required']) return 'This field is required';
    if (control.errors['minlength']) return `Minimum length is ${control.errors['minlength'].requiredLength} characters`;
    if (control.errors['maxlength']) return `Maximum length is ${control.errors['maxlength'].requiredLength} characters`;
    if (control.errors['pattern']) return 'Only letters, numbers, spaces and commas are allowed';

    return 'Invalid input';
  }
} 