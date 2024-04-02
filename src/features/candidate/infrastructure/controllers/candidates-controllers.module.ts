import { Module } from '@nestjs/common';
import { CandidateController } from './candidate-controller';
import { CandidateDelete } from '../../application/candidate-delete';
import { CandidateList } from '../../application/candidate-list';
import { CandidateRegister } from '../../application/candidate-register';
import { CandidateUpdate } from '../../application/candidate-update';
import { CandidatesRepositoriesModule } from '../repositories/candidatesRepositoriesModule';
import { UserRepositoriesModule } from '../../../users/infrastructure/repositories/user-repositories.module';
import { SharedProvidersModule } from '../../../../shared/infrastructure/services/shared-providers.module';

@Module({
  providers: [
    CandidateDelete,
    CandidateList,
    CandidateRegister,
    CandidateUpdate,
  ],
  controllers: [CandidateController],
  imports: [CandidatesRepositoriesModule, UserRepositoriesModule, SharedProvidersModule],
})
export class CandidatesControllersModule {}
