import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  
  // ۱. بررسی احراز هویت
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  // ۲. بررسی نقش ادمین (با fallback امن)
  const { data: userRole, error } = await supabase
    .from('user_roles')
    .select('role_id, roles(name)')
    .eq('user_id', user.id)
    .single()

  // اگر خطا یا نقش نامعتبر بود -> دسترسی غیرمجاز
  if (error || !userRole || userRole.roles.name !== 'admin') {
    redirect('/') // یا یک صفحه‌ی اختصاصی "دسترسی غیرمجاز"
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* نوار کناری (فعلاً خالی، بعداً کاملش می‌کنیم) */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-6">📊 پنل ادمین</h2>
        <nav className="space-y-2">
          <a href="/admin/dashboard" className="block p-2 hover:bg-gray-100 rounded">📈 داشبورد</a>
          <a href="/admin/questions" className="block p-2 hover:bg-gray-100 rounded">📚 سوالات</a>
          <a href="/admin/users" className="block p-2 hover:bg-gray-100 rounded">👥 کاربران</a>
        </nav>
      </aside>
      
      {/* محتوای اصلی */}
      <main className="flex-1 overflow-y-auto p-6 bg-white">
        {children}
      </main>
    </div>
  )
}
