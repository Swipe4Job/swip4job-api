import { Injectable } from '@nestjs/common';
import { CandidateCVRepository } from '../../../domain/CandidateCVRepository';
import { CandidateCVCriteria } from '../../../domain/CandidateCVCriteria';
import { CandidateCV } from '../../../domain/CandidateCV';
import { PrismaProvider } from '../../../../../shared/infrastructure/services/prisma-client/prisma-provider.service';
import { PrismaCriteriaService } from '../../../../../shared/infrastructure/services/PrismaCriteria/PrismaCriteriaService';
import { UserId } from '../../../../users/domain/UserID/UserId';
import { CandidateCVId } from '../../../domain/CandidateCVId';
import { Study } from '../../../domain/Studies';
import { SoftSkill } from '../../../../offer/domain/SoftSkill';
import { JobExperience } from '../../../domain/JobExperience';
import { LanguageSkill } from '../../../domain/LanguageSkill';
import { BadRequestError } from '../../../../../shared/domain/ApplicationError/BadRequestError';
import { ByCandidateCVId } from '../../../domain/ByCandidateCVId';
import { CandidateName } from '../../../domain/CandidateName';
import { CandidateLocation } from '../../../domain/CandidateLocation';
import { CandidateLastName } from '../../../domain/CandidateLastName';
import { CandidateDescription } from '../../../domain/CandidateDescription';

@Injectable()
export class PrismaCandidateCvRepository implements CandidateCVRepository {
  constructor(
    private prismaProvider: PrismaProvider,
    private prismaCriteria: PrismaCriteriaService,
  ) {}

  async delete(criteria: CandidateCVCriteria): Promise<void> {
    const filters = this.prismaCriteria.convertFilters(criteria.filters);
    await this.prismaProvider.candidateCV.deleteMany({ where: filters });
  }

  async find(criteria: CandidateCVCriteria): Promise<CandidateCV[]> {
    const result = await this.search(criteria);
    if (!result) {
      throw new BadRequestError('Candidate CV not found');
    }
    return result;
  }

  async save(cv: CandidateCV): Promise<void> {
    const result = await this.search(new ByCandidateCVId(cv.id));
    if (result) {
      await this.prismaProvider.candidateCV.updateMany({
        data: {
          candidateId: cv.candidateId.value,
          description: cv.description.value,
          softSkills: JSON.stringify(
            Array.from(cv.softSkills).map((s) => s.value),
          ),
          name: cv.name.value,
          lastname: cv.lastname.value,
          location: cv.location.value,
          studies: JSON.stringify(cv.studies),
          languages: JSON.stringify(cv.languages.map((l) => l.serialize())),
          jobExperiences: JSON.stringify(
            cv.jobExperiences.map((j) => j.serialize()),
          ),
        },
        where: {
          id: cv.id.value,
        },
      });
    } else {
      await this.prismaProvider.candidateCV.createMany({
        data: {
          candidateId: cv.candidateId.value,
          description: cv.description.value,
          softSkills: JSON.stringify(
            Array.from(cv.softSkills).map((s) => s.value),
          ),
          name: cv.name.value,
          lastname: cv.lastname.value,
          location: cv.location.value,
          studies: JSON.stringify(cv.studies),
          languages: JSON.stringify(cv.languages.map((l) => l.serialize())),
          jobExperiences: JSON.stringify(
            cv.jobExperiences.map((j) => j.serialize()),
          ),
          id: cv.id.value,
        },
      });
    }
  }

  async search(
    criteria: CandidateCVCriteria,
  ): Promise<CandidateCV[] | undefined> {
    const filters = this.prismaCriteria.convertFilters(criteria.filters);

    const result = await this.prismaProvider.candidateCV.findMany({
      where: filters,
    });

    if (!result.length) {
      return;
    }

    return result.map((r) => {
      return new CandidateCV({
        candidateId: new UserId(r.candidateId),
        id: new CandidateCVId(r.id),
        name: new CandidateName(r.name),
        lastname: new CandidateLastName(r.lastname),
        location: new CandidateLocation(r.location),
        studies: (JSON.parse(r.studies) as any[]).map((s) =>
          Study.fromJSONString(s),
        ),
        description: new CandidateDescription(r.description),
        softSkills: new Set(
          (JSON.parse(r.softSkills) as string[]).map((s) => SoftSkill.from(s)),
        ),
        jobExperiences: (JSON.parse(r.jobExperiences) as any[]).map((j) =>
          JobExperience.formJSON(j),
        ),
        languages: (JSON.parse(r.languages) as any[]).map((l) =>
          LanguageSkill.fromJSON(l),
        ),
      });
    });
  }
}
