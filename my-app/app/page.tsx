import { Suspense } from 'react'

async function QuestionsList() {
  const res = await fetch('http://localhost:3000/api/questions', {
    cache: 'no-store',
  })
  const result = await res.json()

  if (!result.success) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded">
        <h2 className="text-red-700 font-bold">❌ خطا در دریافت سوالات</h2>
        <p className="text-red-600">{result.message}</p>
      </div>
    )
  }

  const questions = result.data || []

  if (questions.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
        <p className="text-yellow-700">⚠️ هنوز سوالی در دیتابیس وجود ندارد.</p>
        <p className="text-sm text-gray-500 mt-2">برای اضافه کردن سوال، از پنل ادمین استفاده کن.</p>
      </div>
    )
  }

  return (
    <ul className="space-y-2">
      {questions.map((q: any) => (
        <li key={q.id} className="p-3 bg-gray-50 rounded border">
          <p className="font-medium">{q.title || q.slug || `سوال شماره ${q.id}`}</p>
          <p className="text-sm text-gray-500">سختی: {q.difficulty || 'نامشخص'}</p>
        </li>
      ))}
    </ul>
  )
}

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">📚 لیست سوالات</h1>
      <Suspense fallback={<div className="text-gray-500">⏳ در حال بارگذاری سوالات...</div>}>
        <QuestionsList />
      </Suspense>
    </div>
  )
}
