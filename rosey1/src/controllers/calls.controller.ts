import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Call} from '../models';
import {CallRepository} from '../repositories';

export class CallsController {
  constructor(
    @repository(CallRepository)
    public callRepository : CallRepository,
  ) {}

  @post('/calls')
  @response(200, {
    description: 'Call model instance',
    content: {'application/json': {schema: getModelSchemaRef(Call)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Call, {
            title: 'NewCall',
            exclude: ['id'],
          }),
        },
      },
    })
    call: Omit<Call, 'id'>,
  ): Promise<Call> {
    return this.callRepository.create(call);
  }

  @get('/calls/count')
  @response(200, {
    description: 'Call model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Call) where?: Where<Call>,
  ): Promise<Count> {
    return this.callRepository.count(where);
  }

  @get('/calls')
  @response(200, {
    description: 'Array of Call model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Call, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Call) filter?: Filter<Call>,
  ): Promise<Call[]> {
    return this.callRepository.find(filter);
  }

  @patch('/calls')
  @response(200, {
    description: 'Call PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Call, {partial: true}),
        },
      },
    })
    call: Call,
    @param.where(Call) where?: Where<Call>,
  ): Promise<Count> {
    return this.callRepository.updateAll(call, where);
  }

  @get('/calls/{id}')
  @response(200, {
    description: 'Call model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Call, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Call, {exclude: 'where'}) filter?: FilterExcludingWhere<Call>
  ): Promise<Call> {
    return this.callRepository.findById(id, filter);
  }

  @patch('/calls/{id}')
  @response(204, {
    description: 'Call PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Call, {partial: true}),
        },
      },
    })
    call: Call,
  ): Promise<void> {
    await this.callRepository.updateById(id, call);
  }

  @put('/calls/{id}')
  @response(204, {
    description: 'Call PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() call: Call,
  ): Promise<void> {
    await this.callRepository.replaceById(id, call);
  }

  @del('/calls/{id}')
  @response(204, {
    description: 'Call DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.callRepository.deleteById(id);
  }
}
