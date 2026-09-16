import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavDashboardComponent } from '../../shared/nav-dashboard/nav-dashboard.component';

@Component({
  imports: [RouterOutlet, NavDashboardComponent],
  selector: 'app-dashboard',
  styleUrl: './dashboard.component.css',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent { }
