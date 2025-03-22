import { SignIn } from '@clerk/clerk-react'

export const Login = () => {
  return (
    <div className='w-full h-[calc(100vh-80px)]'>
      <div className='flex items-center justify-center py-20'>
        <SignIn signUpUrl='/register' />
      </div>
    </div>
  )
}
