import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MemeCardComponent } from '../meme-card/meme-card.component';
import { FormsModule } from '@angular/forms';

interface Meme {
  id: number;
  title: string;
  imageUrl: string;
  likes: number;
  createdAt: Date;
  category: 'trending' | 'ai' | 'classic' | 'tech' | 'gaming';
  pumpFunLink?: string;
  author: string;
}

type FilterCategory = 'all' | Meme['category'];

interface Filter {
  id: FilterCategory;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-meme-grid',
  standalone: true,
  imports: [CommonModule, RouterModule, MemeCardComponent, FormsModule],
  templateUrl: './meme-grid.component.html',
  styleUrls: ['./meme-grid.component.css']
})
export class MemeGridComponent implements OnInit {
  isLoading = true;
  isRefreshing = false;
  activeFilter: FilterCategory = 'all';
  lastRefreshTime: Date | null = null;
  
  filters: Filter[] = [
    { id: 'all', label: 'All Memes', icon: 'bi-grid-3x3' },
    { id: 'trending', label: '🔥 Trending', icon: 'bi-fire' },
    { id: 'ai', label: '🤖 AI Generated', icon: 'bi-robot' },
    { id: 'tech', label: '💻 Tech', icon: 'bi-code-square' },
    { id: 'gaming', label: '🎮 Gaming', icon: 'bi-controller' },
    { id: 'classic', label: '⭐ Classic', icon: 'bi-star' }
  ];

  memes: Meme[] = [];

  constructor() {}

  ngOnInit(): void {
    this.loadMemes();
  }

  loadMemes(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.memes = [
        {
          id: 1,
          title: 'When you finally fix that bug',
          imageUrl: 'https://picsum.photos/400/400?random=1',
          likes: 42,
          createdAt: new Date('2024-03-15'),
          category: 'tech',
          pumpFunLink: 'https://pump.fun/my-token',
          author: 'DevMaster'
        },
        {
          id: 2,
          title: 'AI Generated Meme',
          imageUrl: 'https://picsum.photos/400/400?random=2',
          likes: 28,
          createdAt: new Date('2024-03-14'),
          category: 'ai',
          pumpFunLink: 'https://pump.fun/ai-token',
          author: 'AIArtist'
        },
        {
          id: 3,
          title: 'Classic Programming Meme',
          imageUrl: 'https://picsum.photos/400/400?random=3',
          likes: 156,
          createdAt: new Date('2024-03-13'),
          category: 'classic',
          author: 'CodeMaster'
        },
        {
          id: 4,
          title: 'Gaming Setup Goals',
          imageUrl: 'https://picsum.photos/400/400?random=4',
          likes: 89,
          createdAt: new Date('2024-03-12'),
          category: 'gaming',
          pumpFunLink: 'https://pump.fun/gaming-token',
          author: 'GamerPro'
        }
      ];
      this.isLoading = false;
      this.lastRefreshTime = new Date();
    }, 1000);
  }

  refreshMemes(): void {
    this.isRefreshing = true;
    setTimeout(() => {
      this.loadMemes();
      this.isRefreshing = false;
    }, 1000);
  }

  get filteredMemes(): Meme[] {
    if (this.activeFilter === 'all') {
      return this.memes;
    }
    return this.memes.filter(meme => meme.category === this.activeFilter);
  }

  setFilter(filter: FilterCategory) {
    this.activeFilter = filter;
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