import SignupForm from '@/components/customers/sign-up'
import { Suspense } from 'react'

function Signup() {
  return (
    <div>
        <Suspense fallback={null}>
        <SignupForm />
      </Suspense>
    </div>
  )
}

export default Signup