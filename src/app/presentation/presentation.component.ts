import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent implements OnInit {
  user: any;     
  errorMessage: string = '';      



  constructor(private service: UsersService) {}

  ngOnInit(): void {
    this.getInfoUser();
    
  }

  getInfoUser(): void {
    this.service.getInfoUser().subscribe({
      next: (response) => {
        this.user = response;
        console.log("User:", this.user);
      },
      error: (error) => {
        this.errorMessage = error.message;
        console.error('Error fetching user:', error);
      }
    });
  }

 
}
