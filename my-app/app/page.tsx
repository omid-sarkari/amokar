import { createClient } from '@/lib/supabase/server'

export default async function Home() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('questions')
    .select('id, title, difficulty')
    .limit(5)

  if (error) {
    return (
      <div className='p-4 bg-red-50 border border-red-200 rounded'>
        <h2 className='text-red-700 font-bold'>❌ خطا در اتصال به Supabase</h2>
        <p className='text-red-600'>{error.message}</p>
      </div>
    )
  }

  return (
    <div className='p-4'>
      <div className='bg-green-50 border border-green-200 rounded p-4 mb-4'>
        <h2 className='text-green-700 font-bold'>✅ اتصال موفق</h2>
        <p className='text-green-600'>تعداد: {data.length || 0}</p>
      </div>
      <pre className='bg-gray-100 p-4 rounded'>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
