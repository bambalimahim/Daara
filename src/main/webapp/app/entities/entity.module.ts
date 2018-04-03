import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DaaraEleveModule } from './eleve/eleve.module';
import { DaaraClasseModule } from './classe/classe.module';
import { DaaraInscritModule } from './inscrit/inscrit.module';
import { DaaraNiveauModule } from './niveau/niveau.module';
import { DaaraNiveauEtudModule } from './niveau-etud/niveau-etud.module';
import { DaaraParentModule } from './parent/parent.module';
import { DaaraMaitreModule } from './maitre/maitre.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        DaaraEleveModule,
        DaaraClasseModule,
        DaaraInscritModule,
        DaaraNiveauModule,
        DaaraNiveauEtudModule,
        DaaraParentModule,
        DaaraMaitreModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DaaraEntityModule {}
