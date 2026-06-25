import { Route, Switch, Redirect } from 'wouter'
import { IsAuthenticated } from '@/app/guards/IsAuthenticated/IsAuthenticated'
import { Admin } from '@/features/admin/components/Admin/Admin'

export const Router = () => (
  <Switch>
    <Route path="/">{/* <Home /> */}</Route>
    <Route path="/login">{/* <Login /> */}</Route>
    <Route path="/admin" nest>
      <IsAuthenticated>
        <Admin />
      </IsAuthenticated>
    </Route>
    <Route>
      <Redirect to="/" />
    </Route>
  </Switch>
)
