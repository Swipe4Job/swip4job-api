import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CriteriaCodec } from '../../../../shared/infrastructure/services/criteria-codec/CriteriaCodec';
import { HttpResponse } from '../../../../shared/infrastructure/HttpResponse';
import { UserId } from '../../../users/domain/UserID/UserId';
import { CandidateRegister } from '../../application/candidate-register';
import { CandidateList } from '../../application/candidate-list';
import { CandidateUpdate } from '../../application/candidate-update';
import { CandidateDelete } from '../../application/candidate-delete';
import { CandidateListResponseDTO } from './DTOS/CandidateListResponseDTO';
import { CandidateRegisterDTO } from './DTOS/CandidateRegisterDTO';
import { CandidateCV } from '../../domain/CandidateCV';
import { CandidateCVId } from '../../domain/CandidateCVId';
import { CandidateDescription } from '../../domain/CandidateDescription';
import { Study } from '../../domain/Studies';
import { SoftSkill } from '../../../offer/domain/SoftSkill';
import { CandidateName } from '../../domain/CandidateName';
import { CandidateLastName } from '../../domain/CandidateLastName';
import { CandidateLocation } from '../../domain/CandidateLocation';
import { LanguageSkill } from '../../domain/LanguageSkill';
import { JobExperience } from '../../domain/JobExperience';
import { CandidateCVCriteria } from '../../domain/CandidateCVCriteria';

@ApiTags('candidate')
@Controller('candidate')
export class CompanyController {
  constructor(
    private candidateCVCreate: CandidateRegister,
    private criteriaCodec: CriteriaCodec,
    private listCandidates: CandidateList,
    private candidateUpdate: CandidateUpdate,
    private candidateDelete: CandidateDelete,
  ) {}

  //read
  @Get()
  async getCandidateCVs(@Query('criteria') encodedCriteria: string) {
    const candidateCriteria = encodedCriteria
      ? CandidateCVCriteria.fromCriteria(
          this.criteriaCodec.decode(encodedCriteria),
        )
      : CandidateCVCriteria.NONE();
    const candidates = await this.listCandidates.run(candidateCriteria);
    return HttpResponse.success('Candidate fetched successfully').withData(
      candidates.map((candidate) => new CandidateListResponseDTO(candidate)),
    );
  }

  //create --> en general
  @Post('')
  async createCandidateCV(@Body() body: CandidateRegisterDTO) {
    await this.candidateCVCreate.run(body);
    return HttpResponse.success('Candidate created successfully');
  }

  @Put(':id')
  async updateCandidateCV(
    @Body() body: CandidateRegisterDTO,
    @Param('id') id: string,
  ) {
    const candidate = new CandidateCV({
      id: new CandidateCVId(id),
      candidateId: new UserId(body.candidateId),
      description: new CandidateDescription(body.description),
      studies: body.studies.map(
        (s) =>
          new Study({
            name: s.name,
            school: s.school,
            startDate: new Date(s.startDate),
            endDate: s.endDate ? new Date(s.endDate) : undefined,
          }),
      ),
      softSkills: new Set<SoftSkill>(
        body.softSkills.map((s) => SoftSkill.from(s)),
      ),
      name: new CandidateName(body.name),
      lastname: new CandidateLastName(body.lastname),
      location: new CandidateLocation(body.location),
      languages: body.languages.map((l) => new LanguageSkill(l)),
      jobExperiences: body.jobExperiences.map(
        (j) =>
          new JobExperience({
            company: j.company,
            startDate: new Date(j.startDate),
            endDate: j.endDate ? new Date(j.endDate) : undefined,
            description: j.description || '',
            position: j.position,
          }),
      ),
    });
    await this.candidateUpdate.run(candidate);
  }

  @Delete()
  async deleteCandidateCV(@Query('criteria') encodedCriteria: string) {
    const candidateCriteria = encodedCriteria
      ? CandidateCVCriteria.fromCriteria(
          this.criteriaCodec.decode(encodedCriteria),
        )
      : CandidateCVCriteria.NONE();
    await this.candidateDelete.run(candidateCriteria);
  }
}
