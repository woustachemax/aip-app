import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import bcrypt, { hash } from 'bcryptjs';
import { sign } from 'hono/jwt';

export const userRouter  = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    }
}>();

userRouter.post('/signup', async (c) => {

    // console.log("DATABASE_URL:", c.env?.DATABASE_URL || "Not Found"); 
    // console.log("JWT_SECRET:", c.env?.JWT_SECRET || "Not Found");

    // if (!c.env?.DATABASE_URL) {
    //     console.error("DATABASE_URL is missing from environment variables");
    //     return c.json({ error: "DATABASE_URL is not set. Check Wrangler config." }, 500);
    // }


    const prisma = new PrismaClient({

        datasourceUrl: c.env?.DATABASE_URL
    }).$extends(withAccelerate());
    const signupBody = await c.req.json()

    try{
        const existingUser = await prisma.user.findUnique({
            where: { email: signupBody.email }
        });

        if (existingUser) {
            return c.json({ error: "Email is already taken" }, 400);
        }
        const hashedPassword = await bcrypt.hash(signupBody.password, 10)
        const newUser = await prisma.user.create({
            data:{
                email: signupBody.email,
                password: hashedPassword,
                name: signupBody.name,
            }
        })
        const jwt = await sign({id: newUser.id}, c.env.JWT_SECRET);
        return c.json({jwt}), c.json("User created succesfully.")    

    }
    catch(e){
        console.error("Error creating user:", e);
        c.status(411)
        return c.json("Please verify that your username and password are entered correctly.")    
    }

})

userRouter.post("/login", async (c)=>{

    const prisma = new PrismaClient({

        datasourceUrl: c.env?.DATABASE_URL
    }).$extends(withAccelerate());
    const login = await c.req.json()

    try{
        const userExists = await prisma.user.findUnique({
            where:{
                email: login.email,
            }})

        if(!userExists){
            c.status(411);
            return c.json("No such user Exists")
        }    
        const debunkedPassword = await bcrypt.compare(login.password,userExists.password )

        if(!debunkedPassword){
            c.status(411)
            return c.json("An error occurred while logging in. Please try again.")        
        }

        const token = await sign({id: userExists.id}, c.env.JWT_SECRET);
        c.status(200)
        return c.json({ token }) , c.json("verified")


    }
    catch(e){
        c.status(403)
        return c.json("An error occurred while logging in. Please try again.")
    }
})

export default userRouter
