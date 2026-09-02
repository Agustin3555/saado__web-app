import './Login.css'
import { useLocation } from 'wouter'
import { useSubmitAction } from '@/shared/hooks/useSubmitAction.hook'
import { useAuthStore } from '@/shared/store/useAuth.store'
import { Button, Field, GlobalConfigButton, Input } from '@/shared/components'
import { publicInstance } from '@/infra/http/axios/instances'

export const Login = () => {
  const [, setLocation] = useLocation()
  const email = useAuthStore(s => s.email)
  const login = useAuthStore(s => s.login)

  const { actionState, handleSubmit } = useSubmitAction(
    async ({ formValues }) => {
      const data = {
        email: formValues.get.string('email')!,
        password: formValues.get.string('password')!,
      }

      const response = await publicInstance.post<{ accessToken: string }>(
        'auth/login',
        data,
      )

      login({ email: data.email, token: response.data.accessToken })
      setLocation('/admin')
    },
  )

  return (
    <div className="cmp-login">
      <header>
        <GlobalConfigButton />
      </header>
      <div className="container">
        <div className="card show-animation-item">
          <div className="banner">
            <header>
              <div className="title">
                <h1>SAADO</h1>
                <h2>
                  Sistema de Auditoría Automático de Documentación de Obra
                </h2>
              </div>
              <div className="logo">
                <img
                  src="/logo.png"
                  alt="Logo de la Dirección de Licitaciones y Contrataciones del Chaco"
                />
              </div>
            </header>
          </div>
          <form onSubmit={handleSubmit}>
            <h1>Iniciar sesión</h1>
            <div className="fields">
              <Field label="Correo electrónico">
                <Input
                  htmlAttrs={{
                    ...(email && { defaultValue: email }),
                    name: 'email',
                    required: true,
                  }}
                />
              </Field>
              <Field label="Contraseña">
                <Input
                  htmlAttrs={{
                    name: 'password',
                    type: 'password',
                    required: true,
                  }}
                />
              </Field>
            </div>
            <Button
              text="Acceder"
              iconClass="ti ti-arrow-right"
              size="l"
              type="primary"
              submit
              {...{ actionState }}
            />
          </form>
        </div>
      </div>
    </div>
  )
}
