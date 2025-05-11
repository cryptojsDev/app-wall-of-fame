import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface UserMeme {
  id: number;
  title: string;
  imageUrl: string;
  likes: number;
  createdAt: Date;
  category: 'trending' | 'ai' | 'classic' | 'tech' | 'gaming';
  pumpFunLink?: string;
}

interface UserInfo {
  username: string;
  email: string;
  createdAt: Date;
  pumpFunLink?: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userMemes: UserMeme[] = [];
  userInfo: UserInfo = {
    username: '',
    email: '',
    createdAt: new Date(),
    pumpFunLink: ''
  };
  isLoading = true;
  showEmail = false;
  showUsername = false;
  pumpFunForm: FormGroup;
  isEditingPumpFun = false;
  stats = {
    totalMemes: 0,
    totalLikes: 0,
    mostPopularCategory: ''
  };

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.pumpFunForm = this.fb.group({
      pumpFunLink: ['', [
        Validators.pattern(/^https:\/\/pump\.fun\/[a-zA-Z0-9-]+$/)
      ]]
    });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.isLoading = true;
    // Simular carga de datos
    setTimeout(() => {
      // Mock data - en producción esto vendría del backend
      this.userInfo = {
        username: 'cryptouser123',
        email: 'crypto@example.com',
        createdAt: new Date('2024-01-15'),
        pumpFunLink: 'https://pump.fun/my-token'
      };

      this.userMemes = [
        {
          id: 1,
          title: 'My First Meme',
          imageUrl: 'https://picsum.photos/400/400?random=1',
          likes: 42,
          createdAt: new Date('2024-03-15'),
          category: 'tech',
          pumpFunLink: 'https://pump.fun/my-token'
        },
        {
          id: 2,
          title: 'Coding Life',
          imageUrl: 'https://picsum.photos/400/400?random=2',
          likes: 28,
          createdAt: new Date('2024-03-14'),
          category: 'ai',
          pumpFunLink: 'https://pump.fun/my-token'
        },
        {
          id: 3,
          title: 'Gaming Setup',
          imageUrl: 'https://picsum.photos/400/400?random=3',
          likes: 156,
          createdAt: new Date('2024-03-13'),
          category: 'gaming',
          pumpFunLink: 'https://pump.fun/my-token'
        }
      ];

      // Inicializar el formulario con el link existente
      this.pumpFunForm.patchValue({
        pumpFunLink: this.userInfo.pumpFunLink
      });

      // Calcular estadísticas
      this.calculateStats();
      this.isLoading = false;
    }, 1000);
  }

  toggleEditPumpFun(): void {
    this.isEditingPumpFun = !this.isEditingPumpFun;
    if (!this.isEditingPumpFun) {
      // Resetear el formulario si se cancela la edición
      this.pumpFunForm.patchValue({
        pumpFunLink: this.userInfo.pumpFunLink
      });
    }
  }

  savePumpFunLink(): void {
    if (this.pumpFunForm.valid) {
      const newLink = this.pumpFunForm.get('pumpFunLink')?.value;
      // Aquí iría la llamada al backend para guardar el link
      this.userInfo.pumpFunLink = newLink;
      // Actualizar también los memes con el nuevo link
      this.userMemes = this.userMemes.map(meme => ({
        ...meme,
        pumpFunLink: newLink
      }));
      this.isEditingPumpFun = false;
    }
  }

  getPumpFunLinkError(): string {
    const control = this.pumpFunForm.get('pumpFunLink');
    if (control?.errors?.['pattern']) {
      return 'Please enter a valid pump.fun URL (e.g., https://pump.fun/my-token)';
    }
    return '';
  }

  toggleEmail(): void {
    this.showEmail = !this.showEmail;
  }

  toggleUsername(): void {
    this.showUsername = !this.showUsername;
  }

  getMaskedText(text: string): string {
    return '*'.repeat(text.length);
  }

  private calculateStats(): void {
    this.stats.totalMemes = this.userMemes.length;
    this.stats.totalLikes = this.userMemes.reduce((sum, meme) => sum + meme.likes, 0);
    
    // Calcular categoría más popular
    const categoryCount = this.userMemes.reduce((acc, meme) => {
      acc[meme.category] = (acc[meme.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    this.stats.mostPopularCategory = Object.entries(categoryCount)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'none';
  }

  getCategoryIcon(category: string): string {
    const icons: Record<string, string> = {
      'trending': '🔥',
      'ai': '🤖',
      'classic': '👑',
      'tech': '💻',
      'gaming': '🎮'
    };
    return icons[category] || '📷';
  }
} 