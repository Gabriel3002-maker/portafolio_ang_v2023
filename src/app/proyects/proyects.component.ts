import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.css']
})
export class ProyectsComponent implements OnInit {
  projects: any = [];
  errorMessage: string = '';
  typescript: any = [];
  python: any = [];
  shell: any = [];
  html: any = [];
  sharp:any = [];
  allProjects: any = [];
  isLoading = true;


  constructor(private service: UsersService) {}

  ngOnInit(): void {
    this.getInfoProjects();
  }

  getInfoProjects(): void {
    this.service.getInfoProyects().subscribe({
      next: (response) => {
        this.projects = response;
        this.allProjects = response; // Guardamos todos los proyectos
        console.log("Projects:", this.projects);
        this.isLoading = false;
        this.filterProjects(); // Filtramos por lenguaje
      },
      error: (error) => {
        this.errorMessage = error.message;
        console.error('Error fetching projects:', error);
      }
    });
  }

  // Método para filtrar proyectos según lenguaje
  filterProjects(): void {
    this.typescript = this.allProjects.filter((project: any) => project.language === 'TypeScript');
    this.python = this.allProjects.filter((project: any) => project.language === 'Python');
    this.shell = this.allProjects.filter((project:any)=> project.language === 'Shell');
    this.html = this.allProjects.filter((project:any)=> project.language === 'HTML');
    this.sharp = this.allProjects.filter((project:any)=> project.language === 'C#');

  }
}
