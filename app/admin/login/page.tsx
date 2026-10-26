import { redirect } from 'next/navigation'

// Admins now sign in on the same page as everyone else.
export default function AdminLoginPage() {
  redirect('/login?next=/admin')
}
