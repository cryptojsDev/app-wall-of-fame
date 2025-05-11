import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

interface RoadmapStep {
  number: number;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app';
  roadmapSteps: RoadmapStep[] = [
    {
      number: 1,
      title: 'Create Token on PumpFun',
      description: 'Launch and deploy the cryptocurrency token on the PumpFun platform',
      status: 'completed'
    },
    {
      number: 2,
      title: 'Create Token Website',
      description: 'Develop a professional website showcasing the token and its features',
      status: 'in-progress'
    },
    {
      number: 3,
      title: 'Build Wall of Fame App',
      description: 'Create the Wall of Fame application to showcase token achievements',
      status: 'pending'
    },
    {
      number: 4,
      title: 'Deploy to Production Server',
      description: 'Set up and deploy the application to a production environment',
      status: 'pending'
    },
    {
      number: 5,
      title: 'Database Integration',
      description: 'Connect the application with a robust database system',
      status: 'pending'
    }
  ];
}
