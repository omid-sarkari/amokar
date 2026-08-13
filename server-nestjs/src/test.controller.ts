import { Controller, Get } from '@nestjs/common'
import { createClient } from '@supabase/supabase-js'

@Controller('test')
export class TestController {
  @Get()
  async testConnection() {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data, error } = await supabase
      .from('users')
      .select('id')
      .limit(1)

    if (error) {
      return {
        success: false,
        message: error.message,
      }
    }

    return {
      success: true,
      message: '✅ اتصال به Supabase موفقیت‌آمیز بود',
      data: data,
    }
  }
}
