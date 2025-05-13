import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
// import { datadogRum } from '@datadog/browser-rum';

// datadogRum.init({
//   applicationId: '7ca4d7a1-8e94-4e96-978e-2279e085202e',
//   clientToken: 'pub6deb9409c330cc66e4052dc4697a6df3',
//   // `site` refers to the Datadog site parameter of your organization
//   // see https://docs.datadoghq.com/getting_started/site/
//   site: 'datadoghq.com',
//   service: 'teste-datadog',
//   env: 'PROD',
//   // Specify a version number to identify the deployed version of your application in Datadog
//   // version: '1.0.0',
//   sessionSampleRate: 100,
//   sessionReplaySampleRate: 0,
//   trackUserInteractions: true,
//   trackResources: true,
//   trackLongTasks: true,
//   defaultPrivacyLevel: 'mask-user-input',
// });

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
