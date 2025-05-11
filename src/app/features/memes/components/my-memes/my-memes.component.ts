import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import Swal from 'sweetalert2';

interface Meme {
  id: number;
  title: string;
  imageUrl: string;
  likes: number;
  createdAt: Date;
  userId: number;
}

@Component({
  selector: 'app-my-memes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-memes.component.html',
  styleUrls: ['./my-memes.component.css']
})
export class MyMemesComponent implements OnInit {
  userMemes: Meme[] = [];
  isLoading = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserMemes();
  }

  loadUserMemes(): void {
    this.isLoading = true;
    // Simular carga de datos
    setTimeout(() => {
      // Mock data - en producción esto vendría del backend
      this.userMemes = [
        {
          id: 1,
          title: 'My First Meme',
          imageUrl: 'https://picsum.photos/400/400?random=1',
          likes: 42,
          createdAt: new Date('2024-03-15'),
          userId: 1
        },
        {
          id: 2,
          title: 'Coding Life',
          imageUrl: 'https://picsum.photos/400/400?random=2',
          likes: 28,
          createdAt: new Date('2024-03-14'),
          userId: 1
        }
      ];
      this.isLoading = false;
    }, 1000);
  }

  navigateToMemeDetail(memeId: number): void {
    this.router.navigate(['/memes', memeId]);
  }

  async deleteMeme(memeId: number): Promise<void> {
    const meme = this.userMemes.find(m => m.id === memeId);
    if (!meme) return;

    const result = await Swal.fire({
      title: 'Are you sure?',
      html: `
        <p>You are about to delete <strong>${meme.title}</strong></p>
        <p>This will:</p>
        <ul class="text-start">
          <li>Permanently delete the meme</li>
          <li>Remove all associated comments</li>
          <li>Delete all likes and reactions</li>
        </ul>
        <p class="text-danger">This action cannot be undone!</p>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'swal2-dark',
        title: 'swal2-dark',
        htmlContainer: 'swal2-dark',
        confirmButton: 'swal2-dark',
        cancelButton: 'swal2-dark'
      }
    });

    if (result.isConfirmed) {
      // Simular eliminación
      this.userMemes = this.userMemes.filter(m => m.id !== memeId);
      
      await Swal.fire({
        title: 'Deleted!',
        text: 'Your meme has been permanently deleted.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
        customClass: {
          popup: 'swal2-dark',
          title: 'swal2-dark',
          htmlContainer: 'swal2-dark'
        }
      });
    }
  }
} 