import { Injectable } from '@nestjs/common'
import { createClient } from '@supabase/supabase-js'

@Injectable()
export class QuestionsService {
  private supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  async findAll() {
    const { data, error } = await this.supabase
      .from('questions')
      .select('*')
      .limit(10)

    if (error) {
      throw new Error(error.message)
    }

    return data
  }

  async findOne(id: number) {
    const { data, error } = await this.supabase
      .from('questions')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return data
  }
}
