import {Entity, model, property} from '@loopback/repository';

@model()
export class Call extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  timestamp: string;

  @property({
    type: 'string',
  })
  callingNumberId?: string;

  constructor(data?: Partial<Call>) {
    super(data);
  }
}

export interface CallRelations {
  // describe navigational properties here
}

export type CallWithRelations = Call & CallRelations;
