import { Route, Switch, Redirect } from 'wouter'
import { IsAuthenticated } from '@/app/guards/IsAuthenticated/IsAuthenticated'
import { Admin } from '@/views/Admin/Admin'
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
      <Redirect to="/admin" replace />
    </Route>
  </Switch>
)
