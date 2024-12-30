import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  CallingNumber,
  Call,
} from '../models';
import {CallingNumberRepository} from '../repositories';

export class CallingNumberCallController {
  constructor(
    @repository(CallingNumberRepository) protected callingNumberRepository: CallingNumberRepository,
  ) { }

  @get('/calling-numbers/{id}/calls', {
    responses: {
      '200': {
        description: 'Array of CallingNumber has many Call',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Call)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Call>,
  ): Promise<Call[]> {
    return this.callingNumberRepository.calls(id).find(filter);
  }

  @post('/calling-numbers/{id}/calls', {
    responses: {
      '200': {
        description: 'CallingNumber model instance',
        content: {'application/json': {schema: getModelSchemaRef(Call)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof CallingNumber.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Call, {
            title: 'NewCallInCallingNumber',
            exclude: ['id'],
            optional: ['callingNumberId']
          }),
        },
      },
    }) call: Omit<Call, 'id'>,
  ): Promise<Call> {
    return this.callingNumberRepository.calls(id).create(call);
  }

  @patch('/calling-numbers/{id}/calls', {
    responses: {
      '200': {
        description: 'CallingNumber.Call PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Call, {partial: true}),
        },
      },
    })
    call: Partial<Call>,
    @param.query.object('where', getWhereSchemaFor(Call)) where?: Where<Call>,
  ): Promise<Count> {
    return this.callingNumberRepository.calls(id).patch(call, where);
  }

  @del('/calling-numbers/{id}/calls', {
    responses: {
      '200': {
        description: 'CallingNumber.Call DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Call)) where?: Where<Call>,
  ): Promise<Count> {
    return this.callingNumberRepository.calls(id).delete(where);
  }
}
