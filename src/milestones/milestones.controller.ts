import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MilestonesService } from './milestones.service';
import { MilestoneEntity } from 'src/milestones/entities/milestone.entity';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateMilestoneDto } from 'src/milestones/dtos/create-milestone.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminGuard } from 'src/utils/admin.guard';
import { id } from 'ethers';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('milestones')
@Controller('milestones')
export class MilestonesController {
  constructor(private readonly milestoneService: MilestonesService) {}

  @ApiBody({ type: MilestoneEntity })
  @ApiOperation({ summary: 'Create Milestone' })
  @ApiResponse({
    status: 201,
    description: 'Milestone successfully created!',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Post()
  @ApiCreatedResponse({ type: MilestoneEntity })
  async create(@Body() createMilestoneDto: CreateMilestoneDto) {
    return await this.milestoneService.create(createMilestoneDto);
  }
  
  @Get('requests/:id')
  @ApiOkResponse({ type: MilestoneEntity, isArray: true })
  async findRequestMilestones(@Param('id', ParseIntPipe) id: number) {
    return await this.milestoneService.findRequestMilestones(id);
  }

  // fetch all requests
  @Get()
  @ApiOkResponse({ type: MilestoneEntity, isArray: true })
  async findAll() {
    return await this.milestoneService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: MilestoneEntity, isArray: false })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.milestoneService.findOne(id);
  }

  // update a request

  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @Patch(':id')
  @ApiOkResponse({
    type: MilestoneEntity,
    isArray: false,
  })
  @ApiBody({ type: MilestoneEntity })
  @ApiCreatedResponse({ type: MilestoneEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updates: { [key: string]: any },
  ) {
    return await this.milestoneService.update(id, updates);
  }

  // delete a request
  @Delete(':id')
  @ApiOkResponse({ type: MilestoneEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.milestoneService.remove(id);
  }

  // delete all request
  @UseGuards(AdminGuard)
  @Delete()
  @ApiOkResponse({ type: MilestoneEntity })
  async removeAll() {
    return this.milestoneService.removeAll();
  }
}
