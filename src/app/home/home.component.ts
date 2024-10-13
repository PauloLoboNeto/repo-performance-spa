import { AfterContentInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { datadogRum } from '@datadog/browser-rum';

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
        listTimeDuration.push(duracao);
        localStorage.setItem('timeStoredPerformanceAPIDuration', JSON.stringify(listTimeDuration));
        this.printPercentil(listTimeDuration, '1');
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
        this.printPercentil(listTime, '2');
      });
      perfObserver2();
    } else {
      const perfObserver = () => new PerformanceObserver((res) => {
        const storedTimeDurationJson = JSON.parse(storedTimePerformanceAPIDuration!);
        const duracao = res.getEntries()[0].duration;
        storedTimeDurationJson.push(duracao)
        localStorage.setItem('timeStoredPerformanceAPIDuration', JSON.stringify(storedTimeDurationJson));
        this.printPercentil(storedTimeDurationJson, '3');
      });
      perfObserver();

      const perfObserver2 = () => new PerformanceObserver((res) => {
        const storedTimeDomLoadJson = JSON.parse(storedTimePerformanceAPIDomLoad!);
        const domContentLoad = res.getEntries()[0].toJSON().domContentLoadedEventEnd;
        storedTimeDomLoadJson.push(domContentLoad);
        localStorage.setItem('timeStoredPerformanceAPIDomLoad', JSON.stringify(storedTimeDomLoadJson));
        this.printPercentil(storedTimeDomLoadJson, '4');

      });
      perfObserver2();
    }
  }

  private calcPerfTimeManual() {
    const storedTime = localStorage.getItem('timeStored');
    const timer = new Date().getTime() - (window as any).timePerformance;
    if (!storedTime) {
      const listTime = Array<number>();
      listTime.push(timer)
      localStorage.setItem('timeStored', JSON.stringify(listTime))
    } else {
      const storedTimeJson = JSON.parse(storedTime);
      storedTimeJson.push(timer);
      localStorage.setItem('timeStored', JSON.stringify(storedTimeJson))
    }

    const storedListTime = JSON.parse(localStorage.getItem('timeStored')!);
    this.printPercentil(storedListTime, '5');
  }

  private printPercentil(arg: Array<any>, description: string) {
    datadogRum.addDurationVital("p90", {startTime:  (window as any).timePerformance, duration: arg[arg.length - 1 ]})
    console.log('atual:', arg, arg[arg.length - 1])
    console.log("25º Percentil:", description , this.calculatePercentile(arg, 25));
    console.log("50º Percentil (Mediana):", description, this.calculatePercentile(arg, 50));
    console.log("75º Percentil:",description, this.calculatePercentile(arg, 75));
    console.log("90º Percentil:",description, this.calculatePercentile(arg, 90));
    console.log("95º Percentil:",description, this.calculatePercentile(arg, 95));
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
