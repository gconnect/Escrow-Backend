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
} from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RequestEntity } from '../request/entities/request.entity';
import { UpdateRequestDto } from './dto/update-request.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('request')
@Controller('request')
export class RequestController {
  [x: string]: any;
  constructor(private readonly requestService: RequestService) {}

  @ApiBody({ type: CreateRequestDto })
  @ApiOperation({ summary: 'Create Request' })
  @ApiResponse({
    status: 201,
    description: 'Request successfully created!',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Post()
  @ApiCreatedResponse({ type: RequestEntity })
  async create(@Body() createRequestDto: CreateRequestDto) {
    return await this.requestService.create(createRequestDto);
  }

  // fetch all requests
  @Get()
  @ApiOkResponse({ type: RequestEntity, isArray: true })
  async findAll() {
    return await this.requestService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: RequestEntity, isArray: false })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.requestService.findOne(id);
  }

  // update a request

  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
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
    return await this.requestService.update(id, updates);
  }

  // delete a request
  @Delete(':id')
  @ApiOkResponse({ type: RequestEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.requestService.remove(id);
  }

  // delete all request
  @Delete()
  @ApiOkResponse({ type: RequestEntity })
  async removeAll() {
    return this.requestService.removeAll();
  }
}
