import { Injectable } from '@nestjs/common';
import { CandidateCVRepository } from '../domain/CandidateCVRepository';
import { Filters, Operators } from '@zertifier/criteria/dist/Filters';
import { Filter, FilterGroup } from '@zertifier/criteria';
import { Orders } from '@zertifier/criteria/dist/Orders';
import { CandidateCV } from '../domain/CandidateCV';
import { ByCandidateCVId } from '../domain/ByCandidateCVId';
import { BadRequestError } from '../../../shared/domain/ApplicationError/BadRequestError';
import { UserRepository } from '../../users/domain/UserRepository/UserRepository';
import { UserCriteria } from '../../users/domain/UserRepository/UserCriteria';
import { UserRole } from '../../users/domain/UserRole';
import { UserNotFound } from '../../users/domain/UserRepository/UserNotFound';

@Injectable()
export class CandidateRegister {
  constructor(
    private candidateRepository: CandidateCVRepository,
    private userRepository: UserRepository,
  ) {}

  public async run(params: {
    candidateId: string;
    description: string;
    studies: Array<{
      name: string;
      school: string;
      startDate: string;
      endDate?: string;
    }>;
    softSkills: Array<string>;
    name: string;
    lastname: string;
    location: string;
    languages: Array<{
      language: string;
      level: string;
      academicTitle: string;
    }>;
    jobExperiences: Array<{
      position: string;
      company: string;
      description?: string;
      startDate: string;
      endDate?: string;
    }>;
  }) {
    const candidateCV = await CandidateCV.create({
      candidateId: params.candidateId,
      description: params.description,
      studies: params.studies,
      softSkills: params.softSkills,
      name: params.name,
      lastname: params.lastname,
      location: params.location,
      languages: params.languages,
      jobExperiences: params.jobExperiences.map((j) => ({
        ...j,
        description: j.description || '',
      })),
    });

    const result = await this.candidateRepository.search(
      new ByCandidateCVId(candidateCV.id),
    );
    if (result) {
      throw new BadRequestError(
        `Candidate CV with id ${candidateCV.id.value} already exists`,
      );
    }

    const users = await this.userRepository.search(
      new UserCriteria({
        filters: Filters.create([
          FilterGroup.create([
            Filter.create('id', Operators.EQUAL, candidateCV.candidateId.value),
            Filter.create('role', Operators.EQUAL, UserRole.CANDIDATE.value),
          ]),
        ]),
        orders: Orders.EMPTY(),
      }),
    );
    if (!users) {
      throw new UserNotFound(
        `Candidate with id ${candidateCV.candidateId.value} not found`,
      );
    }
    await this.candidateRepository.save(candidateCV);
  }
}
