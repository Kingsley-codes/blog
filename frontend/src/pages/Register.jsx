import { SignUp } from '@clerk/clerk-react'

export const Register = () => {
  return (
    <div className='w-full h-[calc(100vh-80px)]'>
      <div className='flex items-center justify-center py-20'>
        <SignUp signInUrl='/login' />
      </div>
    </div>
  )
}


