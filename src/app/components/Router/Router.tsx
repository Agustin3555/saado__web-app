import { Route, Switch, Redirect } from 'wouter'
import { IsAuthenticated } from '@/app/guards/IsAuthenticated/IsAuthenticated'
import { Admin } from '@/features/admin/components/Admin/Admin'
import { Login } from '@/views/Login/Login'

export const Router = () => (
  <Switch>
    <Route path="/login">{<Login />}</Route>
    <Route path="/admin" nest>
      <IsAuthenticated>
        <Admin />
      </IsAuthenticated>
    </Route>
    <Route>
      <Redirect to="/login" replace />
    </Route>
  </Switch>
)
