import { Hono } from 'hono'
import userRouter from './routes/userRouter'
import functionalRouter from './routes/functionalRouter';

const app = new Hono()

app.route('/api/v1/user', userRouter );

app.route('/api/v1/app', functionalRouter);



export default app
