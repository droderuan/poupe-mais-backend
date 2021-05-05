import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import * as Joi from 'joi';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth.guard';
import { RequestUpdateObjectiveDTO } from '../DTOs';
import { JoiValidationPipe } from '../Pipes/JoiValidation.pipe';
import { ObjectiveService } from '../Providers/objective.service';

@Controller('objectives')
export class ObjectiveController {
  constructor(private readonly objectiveService: ObjectiveService) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  list(@Request() request) {
    return this.objectiveService.list(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(
    new JoiValidationPipe(
      Joi.object({
        name: Joi.string().required(),
        quantity: Joi.number().default(0).required(),
      }),
    ),
  )
  @Post()
  create(@Body() body, @Request() request) {
    return this.objectiveService.create({ ...body, ...request.user });
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(
    new JoiValidationPipe(
      Joi.object({
        name: Joi.string().required(),
        quantity: Joi.number().required(),
        objective_id: Joi.string().required(),
        already_placed: Joi.number(),
      }),
    ),
  )
  @Put()
  update(@Body() body: RequestUpdateObjectiveDTO, @Request() request) {
    return this.objectiveService.update({ ...body, ...request.user });
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(
    new JoiValidationPipe(
      Joi.object({
        objectiveId: Joi.string().required(),
      }),
    ),
  )
  @Delete()
  delete(@Body() body, @Request() request) {
    return this.objectiveService.delete({ ...body, ...request.user });
  }
}
