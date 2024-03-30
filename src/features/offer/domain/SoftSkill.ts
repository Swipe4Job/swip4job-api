import { InvalidArgument } from '../../../shared/domain/InvalidArgument';
import { StringValueObject } from '../../../shared/domain/ValueObject/StringValueObject';

export class SoftSkill extends StringValueObject {
  public static readonly COMMUNICATION = new SoftSkill('COMMUNICATION');
  public static readonly LEADERSHIP = new SoftSkill('LEADERSHIP');
  public static readonly TEAMWORK = new SoftSkill('TEAMWORK');
  public static readonly PROBLEM_SOLVING = new SoftSkill('PROBLEM_SOLVING');
  public static readonly TIME_MANAGEMENT = new SoftSkill('TIME_MANAGEMENT');
  public static readonly ADAPTABILITY = new SoftSkill('ADAPTABILITY');
  public static readonly CREATIVITY = new SoftSkill('CREATIVITY');
  public static readonly CRITICAL_THINKING = new SoftSkill(
    'CRITICAL_THINKING',
  );
  public static readonly DECISION_MAKING = new SoftSkill('DECISION_MAKING');
  public static readonly ATTENTION_TO_DETAIL = new SoftSkill(
    'ATTENTION_TO_DETAIL',
  );
  public static readonly ORGANIZATION = new SoftSkill('ORGANIZATION');
  public static readonly NEGOTIATION = new SoftSkill('NEGOTIATION');
  public static readonly EMOTIONAL_INTELLIGENCE = new SoftSkill(
    'EMOTIONAL_INTELLIGENCE',
  );
  public static readonly FLEXIBILITY = new SoftSkill('FLEXIBILITY');
  public static readonly STRESS_MANAGEMENT = new SoftSkill(
    'STRESS_MANAGEMENT',
  );
  public static readonly NETWORKING = new SoftSkill('NETWORKING');
  public static readonly CONFLICT_RESOLUTION = new SoftSkill(
    'CONFLICT_RESOLUTION',
  );
  public static readonly ANALYTICAL_SKILLS = new SoftSkill(
    'ANALYTICAL_SKILLS',
  );
  public static readonly CUSTOMER_SERVICE = new SoftSkill('CUSTOMER_SERVICE');
  private static readonly allowedValues = [
    SoftSkill.COMMUNICATION,
    SoftSkill.LEADERSHIP,
    SoftSkill.TEAMWORK,
    SoftSkill.PROBLEM_SOLVING,
    SoftSkill.TIME_MANAGEMENT,
    SoftSkill.ADAPTABILITY,
    SoftSkill.CREATIVITY,
    SoftSkill.CRITICAL_THINKING,
    SoftSkill.DECISION_MAKING,
    SoftSkill.ATTENTION_TO_DETAIL,
    SoftSkill.ORGANIZATION,
    SoftSkill.NEGOTIATION,
    SoftSkill.EMOTIONAL_INTELLIGENCE,
    SoftSkill.FLEXIBILITY,
    SoftSkill.STRESS_MANAGEMENT,
    SoftSkill.NETWORKING,
    SoftSkill.CONFLICT_RESOLUTION,
    SoftSkill.ANALYTICAL_SKILLS,
    SoftSkill.CUSTOMER_SERVICE,
  ];

  protected constructor(value: string) {
    super(value);
  }

  public static from(value: string) {
    for (const allowedValue of SoftSkill.allowedValues) {
      if (value === allowedValue.value) {
        return allowedValue;
      }
    }
    throw new InvalidArgument(
      `Invalid soft skill. Allowed values [${SoftSkill.allowedValues.join(
        ', ',
      )}]`,
    );
  }
}
