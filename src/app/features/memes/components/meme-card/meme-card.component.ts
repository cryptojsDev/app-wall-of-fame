import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Meme {
  id: string;
  title: string;
  imageUrl: string;
  likes: number;
  author: string;
  createdAt: Date;
}

@Component({
  selector: 'app-meme-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './meme-card.component.html',
  styleUrls: ['./meme-card.component.css']
})
export class MemeCardComponent {
  @Input() meme!: Meme;
} 