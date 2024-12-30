import {Entity, model, property, hasMany} from '@loopback/repository';
import {Call} from './call.model';

@model()
export class CallingNumber extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  callingNumber: string;

  @hasMany(() => Call)
  calls: Call[];

  constructor(data?: Partial<CallingNumber>) {
    super(data);
  }
}

export interface CallingNumberRelations {
  // describe navigational properties here
}

export type CallingNumberWithRelations = CallingNumber & CallingNumberRelations;
