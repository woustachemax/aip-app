import { Hono } from 'hono'
import { verify } from 'hono/jwt';
//import { foundryResponseSchema } from '@woustachemax/aip-app-common';

export const functionalRouter = new Hono<{
  Bindings: {
      DATABASE_URL: string,
      JWT_SECRET: string,
  }
}>();

functionalRouter.use('*/', async (c, next)=>{
  const header =  c.req.header("authorization") || "";
  const response = await verify( header, c.env.JWT_SECRET);

  if(response.id){
    next();
  }
  else{
    c.status(403)
    return c.json("Unauthorised")
  }})

functionalRouter.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default functionalRouter
