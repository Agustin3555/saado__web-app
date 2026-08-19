import './Toaster.css'
import { Toaster as SonnerToaster } from 'sonner'

export const Toaster = () => {
  return (
    <SonnerToaster
      className="cmp-toaster"
      position="bottom-center"
      expand={true}
      duration={4000}
      toastOptions={{
        classNames: {
          error: 'error',
          warning: 'warning',
        },
      }}
    />
  )
}
