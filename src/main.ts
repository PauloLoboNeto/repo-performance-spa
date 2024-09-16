import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: 'a686f0c7-6447-4e5f-8e2a-2dbf609d12ee',
    clientToken: 'pubedb4ce399e57bd5b3ac37dbe05b6cba7',
    // `site` refers to the Datadog site parameter of your organization
    // see https://docs.datadoghq.com/getting_started/site/
    site: 'us5.datadoghq.com',
    service: 'teste-datadog',
    env: 'PROD',
    // Specify a version number to identify the deployed version of your application in Datadog
    // version: '1.0.0',
    sessionSampleRate: 100,
    sessionReplaySampleRate: 0,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: 'mask-user-input',
});

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
