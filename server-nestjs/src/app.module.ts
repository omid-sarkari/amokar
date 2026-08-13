import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TestController } from './test.controller'
import { QuestionsModule } from './questions/questions.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    QuestionsModule,
  ],
  controllers: [TestController],
  providers: [],
})
export class AppModule {}
