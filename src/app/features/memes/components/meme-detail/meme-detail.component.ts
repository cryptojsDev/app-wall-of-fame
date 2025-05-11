import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface SocialMedia {
  telegram?: string;
  twitter?: string;
  website?: string;
}

interface Meme {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  likes: number;
  createdAt: Date;
  category: 'trending' | 'ai' | 'classic' | 'tech' | 'gaming';
  pumpFunLink?: string;
  author: string;
  tags?: string[];
  socialMedia?: SocialMedia;
}

@Component({
  selector: 'app-meme-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './meme-detail.component.html',
  styleUrls: ['./meme-detail.component.css']
})
export class MemeDetailComponent implements OnInit {
  meme: Meme | null = null;
  isLoading = true;
  commentText = '';
  comments: { id: number; author: string; text: string; createdAt: Date }[] = [
    {
      id: 1,
      author: 'User1',
      text: 'This is hilarious! 😂',
      createdAt: new Date('2024-03-15T10:30:00')
    },
    {
      id: 2,
      author: 'User2',
      text: 'I can totally relate to this!',
      createdAt: new Date('2024-03-15T11:15:00')
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Simulate loading meme data
    setTimeout(() => {
      const memeId = this.route.snapshot.paramMap.get('id');
      // TODO: Replace with actual API call
      this.meme = {
        id: memeId ? parseInt(memeId) : 1,
        title: 'When you finally fix that bug at 3 AM',
        imageUrl: 'https://picsum.photos/seed/meme1/800/600',
        likes: 1234,
        author: 'DevMaster',
        createdAt: new Date('2024-03-15'),
        description: 'That moment when you\'ve been debugging for hours and finally find the solution at 3 AM. Worth it!',
        category: 'trending',
        pumpFunLink: 'https://example.com/pump-fun-link',
        tags: ['programming', 'debugging', 'developer-life'],
        socialMedia: {
          telegram: 'https://t.me/devmaster',
          twitter: 'https://twitter.com/devmaster',
          website: 'https://devmaster.dev'
        }
      };
      this.isLoading = false;
    }, 1000);
  }

  hasSocialMedia(): boolean {
    return !!this.meme?.socialMedia && 
           (!!this.meme.socialMedia.telegram || 
            !!this.meme.socialMedia.twitter || 
            !!this.meme.socialMedia.website);
  }

  likeMeme() {
    if (this.meme) {
      this.meme.likes++;
    }
  }

  addComment() {
    if (this.commentText.trim()) {
      this.comments.unshift({
        id: this.comments.length + 1,
        author: 'CurrentUser', // TODO: Replace with actual user
        text: this.commentText,
        createdAt: new Date()
      });
      this.commentText = '';
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
} 