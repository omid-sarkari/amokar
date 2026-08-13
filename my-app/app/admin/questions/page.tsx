import { createClient } from '@/lib/supabase/server'

export default async function AdminQuestionsPage() {
  const supabase = createClient()
  
  const { data: questions } = await supabase
    .from('questions')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📚 مدیریت سوالات</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + سوال جدید
        </button>
      </div>

      {questions?.length === 0 ? (
        <div className="bg-yellow-50 p-4 rounded border">
          <p>⚠️ هنوز سوالی در دیتابیس وجود ندارد.</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {questions?.map((q: any) => (
            <li key={q.id} className="p-3 bg-gray-50 rounded border flex justify-between items-center">
              <div>
                <p className="font-medium">{q.slug || `سوال شماره ${q.id}`}</p>
                <p className="text-sm text-gray-500">سختی: {q.difficulty || 'نامشخص'}</p>
              </div>
              <div className="space-x-2">
                <button className="text-blue-600 hover:underline">ویرایش</button>
                <button className="text-red-600 hover:underline">حذف</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
