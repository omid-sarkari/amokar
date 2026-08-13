import { createClient } from '@/lib/supabase/server'

export default async function Home() {
  const supabase = createClient()
  
  // ✅ کوئری تست - فقط ۱ رکورد رو از جدول users می‌خونه
  // اگه جدول خالی باشه، خطا نمیده، فقط data = [] برمی‌گردونه
  const { data, error } = await supabase
    .from('users')   // ← این جدول حتماً وجود داره (توسط Supabase ساخته شده)
    .select('id')
    .limit(1)

  // مدیریت خطا
  if (error) {
    return (
      <div className='p-4 bg-red-50 border border-red-200 rounded'>
        <h2 className='text-red-700 font-bold'>❌ خطا در اتصال به Supabase</h2>
        <p className='text-red-600'>{error.message}</p>
        <details className='mt-2'>
          <summary className='cursor-pointer text-sm text-gray-600'>مشاهده جزئیات</summary>
          <pre className='mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto'>
            {JSON.stringify(error, null, 2)}
          </pre>
        </details>
      </div>
    )
  }

  // اگر به اینجا رسیدیم، یعنی اتصال برقراره (حتی اگه جدول خالی باشه)
  return (
    <div className='p-4'>
      <div className='bg-green-50 border border-green-200 rounded p-4 mb-4'>
        <h2 className='text-green-700 font-bold'>✅ اتصال به Supabase موفقیت‌آمیز بود!</h2>
        <p className='text-green-600'>
          تعداد رکوردهای موجود در جدول users: {data?.length || 0}
        </p>
        <p className='text-sm text-gray-500 mt-2'>
          (اگه صفر باشه، یعنی جدول خالی‌ست و این طبیعی‌ست برای شروع)
        </p>
      </div>
      <pre className='bg-gray-100 p-4 rounded overflow-auto'>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}