import {NgModule} from '@angular/core';
import {MetaLoader, MetaModule, MetaStaticLoader, PageTitlePositioning} from '@ngx-meta/core';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';

export function metaFactory(translate: TranslateService): MetaLoader {
  return new MetaStaticLoader({
    callback: (key: string): Observable<string | Object> => translate.get(key),
    pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
    pageTitleSeparator: ' | ',
    applicationName: 'Автотуризм без границ',
    defaults: {
      title: 'Автотуризм без границ',
      description: '«Автотуризм без границ» - это клуб любителей автопутешествий, движение,' +
        ' созданное в 2010 году чтобы объединить всех, кто любит дорогу и хорошую компанию.',
      'og:site_name': 'Автотуризм без границ',
      'og:title': 'Автотуризм без границ',
      'og:type': 'website',
      'og:locale': 'ru_RU',
      'og:locale:alternate': [
        {code: 'en', name: 'English', culture: 'en-US'},
        {code: 'ru', name: 'Русский', culture: 'ru-RU'},
        {code: 'uk', name: 'Українська', culture: 'uk-UA'},
      ]
        .map((lang: any) => lang.culture)
        .toString(),
    },
  });
}

@NgModule({
  imports: [
    MetaModule.forRoot({
      provide: MetaLoader,
      useFactory: metaFactory,
      deps: [TranslateService],
    }),
  ],
})
export class SharedMetaModule {
}
