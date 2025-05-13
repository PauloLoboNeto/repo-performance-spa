import { AfterContentInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterContentInit {

  ngOnInit(){
    // console.log('aqui', (window as any).timePerformance)
  }

  ngAfterContentInit() {

  }
    // datadogRum.addDurationVital("p90", {startTime:  (window as any).timePerformance, duration: arg[arg.length - 1 ]})
    
}
