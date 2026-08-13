import { Controller, Get, Param } from '@nestjs/common'
import { QuestionsService } from './questions.service'

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  async findAll() {
    try {
      const data = await this.questionsService.findAll()
      return {
        success: true,
        data: data,
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
      }
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.questionsService.findOne(Number(id))
      return {
        success: true,
        data: data,
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
      }
    }
  }
}
