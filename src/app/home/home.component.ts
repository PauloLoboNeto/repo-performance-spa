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

  ngAfterContentInit() {
    this.calcPerfTimeManual();
    this.calcPerfTimeUsingPerformanceAPI();
    (window as any).removeItens = () => {
      localStorage.removeItem('timeStoredPerformanceAPIDuration');
      localStorage.removeItem('timeStoredPerformanceAPIDomLoad');
      localStorage.removeItem('timeStored');
    }
  }

  private calcPerfTimeUsingPerformanceAPI() {
    const storedTimePerformanceAPIDuration = localStorage.getItem('timeStoredPerformanceAPIDuration');
    const storedTimePerformanceAPIDomLoad = localStorage.getItem('timeStoredPerformanceAPIDomLoad');

    if (!storedTimePerformanceAPIDuration) {
      const perfObserver = () => new PerformanceObserver((res) => {
        const listTimeDuration = Array<number>();
        const duracao = res.getEntries()[0].duration;
        console.log('duracao', duracao);
        listTimeDuration.push(duracao);
        localStorage.setItem('timeStoredPerformanceAPIDuration', JSON.stringify(listTimeDuration));
        
        console.log("25º Percentil duration:", this.calculatePercentile(listTimeDuration, 25));
        console.log("50º Percentil (Mediana) duration:", this.calculatePercentile(listTimeDuration, 50));
        console.log("75º Percentil duration:", this.calculatePercentile(listTimeDuration, 75));
        console.log("90º Percentil duration:", this.calculatePercentile(listTimeDuration, 90));
        console.log("95º Percentil duration:", this.calculatePercentile(listTimeDuration, 95));
      });
      perfObserver();
    }

    if (!storedTimePerformanceAPIDomLoad) {
      const perfObserver2 = () => new PerformanceObserver((res) => {
        const listTime = Array<number>();
        const domContentLoad = res.getEntries()[0].toJSON().domContentLoadedEventEnd;
        console.log('dom content load', domContentLoad);
        listTime.push(domContentLoad)
        localStorage.setItem('timeStoredPerformanceAPIDomLoad', JSON.stringify(listTime))
        console.log("25º Percentil dom load:", this.calculatePercentile(listTime, 25));
        console.log("50º Percentil (Mediana) dom load:", this.calculatePercentile(listTime, 50));
        console.log("75º Percentil dom load:", this.calculatePercentile(listTime, 75));
        console.log("90º Percentil dom load:", this.calculatePercentile(listTime, 90));
        console.log("95º Percentil dom load:", this.calculatePercentile(listTime, 95));
      });
      perfObserver2();
    } else {
      const perfObserver = () => new PerformanceObserver((res) => {
        const storedTimeDurationJson = JSON.parse(storedTimePerformanceAPIDuration!);
        const duracao = res.getEntries()[0].duration;
        console.log('duracao', duracao);
        storedTimeDurationJson.push(duracao)
        localStorage.setItem('timeStoredPerformanceAPIDuration', JSON.stringify(storedTimeDurationJson));

        console.log("25º Percentil duration:", this.calculatePercentile(storedTimeDurationJson, 25));
        console.log("50º Percentil (Mediana) duration:", this.calculatePercentile(storedTimeDurationJson, 50));
        console.log("75º Percentil duration:", this.calculatePercentile(storedTimeDurationJson, 75));
        console.log("90º Percentil duration:", this.calculatePercentile(storedTimeDurationJson, 90));
        console.log("95º Percentil duration:", this.calculatePercentile(storedTimeDurationJson, 95));
      });
      perfObserver();

      const perfObserver2 = () => new PerformanceObserver((res) => {
        const storedTimeDomLoadJson = JSON.parse(storedTimePerformanceAPIDomLoad!);
        const domContentLoad = res.getEntries()[0].toJSON().domContentLoadedEventEnd;
        console.log('dom content load', domContentLoad);
        storedTimeDomLoadJson.push(domContentLoad);
        localStorage.setItem('timeStoredPerformanceAPIDomLoad', JSON.stringify(storedTimeDomLoadJson));

        console.log("25º Percentil dom load:", this.calculatePercentile(storedTimeDomLoadJson, 25));
        console.log("50º Percentil (Mediana) dom load:", this.calculatePercentile(storedTimeDomLoadJson, 50));
        console.log("75º Percentil dom load:", this.calculatePercentile(storedTimeDomLoadJson, 75));
        console.log("90º Percentil dom load:", this.calculatePercentile(storedTimeDomLoadJson, 90));
        console.log("95º Percentil dom load:", this.calculatePercentile(storedTimeDomLoadJson, 95));

      });
      perfObserver2();
    }
  }

  private calcPerfTimeManual() {
    const storedTime = localStorage.getItem('timeStored');
    const timer = new Date().getTime() - (window as any).timePerformance;
    if (!storedTime) {
      console.log('perfomance manual: ', timer);
      const listTime = Array<number>();
      listTime.push(timer)
      localStorage.setItem('timeStored', JSON.stringify(listTime))
    } else {
      const storedTimeJson = JSON.parse(storedTime);
      console.log('perfomance manual: ', timer);
      storedTimeJson.push(timer);
      localStorage.setItem('timeStored', JSON.stringify(storedTimeJson))
    }

    const storedListTime = JSON.parse(localStorage.getItem('timeStored')!);

    console.log("25º Percentil:", this.calculatePercentile(storedListTime, 25));
    console.log("50º Percentil (Mediana):", this.calculatePercentile(storedListTime, 50));
    console.log("75º Percentil:", this.calculatePercentile(storedListTime, 75));
    console.log("90º Percentil:", this.calculatePercentile(storedListTime, 90));
    console.log("95º Percentil:", this.calculatePercentile(storedListTime, 95));
  }

  private calculatePercentile(arr: Array<any>, percentile: number) {
    // Passo 1: Ordenar o array em ordem crescente
    arr.sort((a, b) => a - b);

    // Passo 2: Calcular a posição do percentil
    const index = (percentile / 100) * (arr.length - 1);

    // Passo 3: Verificar se o índice é inteiro ou fracionário
    if (Math.floor(index) === index) {
      // Se o índice for um número inteiro, retornamos o valor diretamente
      return arr[index];
    } else {
      // Se o índice for fracionário, interpolamos entre os dois números adjacentes
      const lowerIndex = Math.floor(index);
      const upperIndex = Math.ceil(index);
      const fraction = index - lowerIndex;

      // Interpolação entre os dois valores
      return arr[lowerIndex] + (arr[upperIndex] - arr[lowerIndex]) * fraction;
    }
  }
}
