import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  NotFoundException,
  ParseIntPipe,
  Patch,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateRequestDto } from './dtos/create-request.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RequestEntity } from './entities/request.entity';
import { UpdateRequestDto } from './dtos/update-request.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RequestsService } from './requests.service';
import { AdminGuard } from 'src/utils/admin.guard';
import { get } from 'http';
import { SERVICE_TYPES } from 'src/utils/constants';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('requests')
@Controller('requests')
export class RequestsController {
  [x: string]: any;
  constructor(private readonly requestsService: RequestsService) {}

  @ApiBody({ type: CreateRequestDto })
  @ApiOperation({ summary: 'Create Request' })
  @ApiResponse({
    status: 201,
    description: 'Request successfully created!',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiCreatedResponse({ type: RequestEntity })
  @ApiOkResponse({ type: RequestEntity })
  @Post()
  async create(@Body() createRequestDto: CreateRequestDto) {
    return await this.requestsService.create(createRequestDto);
  }

  @Get('users/:id')
  @ApiOkResponse({ type: RequestEntity, isArray: true })
  async findUserRequests(@Param('id', ParseIntPipe) id: number) {
    return await this.requestsService.findUserRequests(id);
  }

  // fetch all requests
  @Get()
  @ApiOkResponse({ type: RequestEntity, isArray: true })
  async findAll() {
    return await this.requestsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: RequestEntity, isArray: false })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.requestsService.findOne(id);
  }

  // update a request
  @Patch(':id')
  @ApiOkResponse({
    type: RequestEntity,
    isArray: false,
  })
  @ApiBody({ type: UpdateRequestDto })
  @ApiCreatedResponse({ type: RequestEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updates: { [key: string]: any },
  ) {
    return await this.requestsService.update(id, updates);
  }

  @ApiOkResponse({ type: Array<string>, isArray: true })
  @Get('service-types')
  serviceTypes() {
    return this.requestsService.serviceTypes();
  }

  @ApiOkResponse({ type: Array<string>, isArray: true })
  @Get('request-status')
  requestStatus() {
    return this.requestsService.requestStatus();
  }

  // delete a request
  @Delete(':id')
  @ApiOkResponse({ type: RequestEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.requestsService.remove(id);
  }

  // delete all request
  @UseGuards(AdminGuard)
  @ApiOkResponse({ type: RequestEntity })
  @Delete()
  async removeAll() {
    return this.requestsService.removeAll();
  }
}
