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
  sharp: any = [];
  allProjects: any = [];
  isLoading = true;


  constructor(private service: UsersService) { }

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

  // Método para filtrar proyectos según lenguaje y tópicos (topics)
  filterProjects(): void {
    // Helper para buscar en topics de manera segura
    const hasTopic = (project: any, keywords: string[]) => {
      const topics = project.topics || [];
      // Combinamos keywords + language del proyecto para una búsqueda más amplia
      const searchTerms = [...topics, project.language?.toLowerCase()].filter(Boolean);
      return keywords.some(k => searchTerms.some(t => t?.includes(k)));
    };

    // Python & Odoo: Incluye Python, Odoo, Django, AI, Data Science
    this.python = this.allProjects.filter((project: any) =>
      project.language === 'Python' ||
      hasTopic(project, ['python', 'odoo', 'django', 'flask', 'ai', 'artificial-intelligence', 'machine-learning', 'pandas'])
    );

    // Mobile & TypeScript: Incluye Angular, TS, Ionic, Mobile
    this.typescript = this.allProjects.filter((project: any) =>
      project.language === 'TypeScript' ||
      hasTopic(project, ['typescript', 'angular', 'ionic', 'react', 'mobile', 'android', 'ios', 'javascript'])
    );

    // Backend & C#: Incluye C#, .NET
    this.sharp = this.allProjects.filter((project: any) =>
      project.language === 'C#' ||
      hasTopic(project, ['c#', 'csharp', '.net', 'dotnet', 'aspnet', 'backend'])
    );

    // Scripts & IA & DevOps: Incluye Shell, Docker, Bash y proyectos de IA/Scripting generales
    this.shell = this.allProjects.filter((project: any) =>
      project.language === 'Shell' ||
      project.language === 'Dockerfile' ||
      hasTopic(project, ['shell', 'bash', 'docker', 'dockerfile', 'script', 'automation', 'devops', 'ubuntu', 'linux'])
    );

    // Sitios Simples: HTML, CSS
    this.html = this.allProjects.filter((project: any) =>
      project.language === 'HTML' ||
      project.language === 'CSS' ||
      hasTopic(project, ['html', 'css', 'landing', 'website', 'portfolio'])
    );
  }
}
