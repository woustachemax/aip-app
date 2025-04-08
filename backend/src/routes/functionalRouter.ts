import { Hono } from 'hono';
import { verify } from 'hono/jwt';
import { Client, createClient } from '@osdk/client';
import { createConfidentialOauthClient } from '@osdk/oauth';
import { generateLearningPath } from '@aip-app/sdk';
import { z } from 'zod';
import { cors } from 'hono/cors';

const foundryResponseSchema = z.object({
  executionResult: z.object({
    type: z.union([z.literal('success'), z.literal('error')]),
    success: z.optional(
      z.object({
        returnValue: z.object({
          type: z.literal('string'),
          string: z.string(),
        }),
      })
    ),
    error: z.optional(
      z.object({
        message: z.string(),
        code: z.string().optional(),
      })
    ),
  }),
});

export type foundryResponseSchema = z.infer<typeof foundryResponseSchema>;

type Bindings = {
  DATABASE_URL: string;
  JWT_SECRET: string;
  FOUNDRY_URL: string;
  FOUNDRY_ONTOLOGY_RID: string;
  FOUNDRY_CLIENT_ID: string;
  FOUNDRY_CLIENT_SECRET: string;
};

type Variables = {
  userId?: string;
};

interface JWTPayload {
  id: any;
  [key: string]: any;
}

export const functionalRouter = new Hono<{ Bindings: Bindings; Variables: Variables }>();

functionalRouter.use('*', cors());

functionalRouter.use('/*', async (c, next) => {
  const header = c.req.header('authorization') || '';
  const token = header.split(' ')[1];
  if (!token) {
    c.status(401);
    return c.json({ message: 'Unauthorized: Missing token' });
  }
  try {
    const payload = await verify(token, c.env.JWT_SECRET) as JWTPayload;
    c.set('userId', payload.id as string);
    await next();
  } catch (error) {
    console.error('JWT Verification Error:', error);
    c.status(403);
    return c.json({ message: 'Unauthorized: Invalid token' });
  }
});

functionalRouter.get('/', (c) => {
  return c.text('Functional API is online!');
});

functionalRouter.post('/generate-learning-path', async (c) => {
  try {
    const { goal } = await c.req.json();
    const userId = c.get('userId');
    console.log('User ID making the request:', userId);
    if (!goal) {
      c.status(400);
      return c.json({ error: 'Missing learning goal' });
    }
    const auth = createConfidentialOauthClient(
      c.env.FOUNDRY_CLIENT_ID,
      c.env.FOUNDRY_CLIENT_SECRET,
      c.env.FOUNDRY_URL,
      ['api:connectivity-execute']
    );
    const client: Client = createClient(
      c.env.FOUNDRY_URL,
      c.env.FOUNDRY_ONTOLOGY_RID,
      auth
    );
    const foundryResult = await client(generateLearningPath).executeFunction({ goal });
    const parsedResult = foundryResponseSchema.safeParse(foundryResult);
    if (parsedResult.success) {
      if (parsedResult.data.executionResult.type === 'success') {
        if (parsedResult.data.executionResult.success?.returnValue?.string) {
          return c.json({ learningPath: parsedResult.data.executionResult.success.returnValue.string });
        } else {
          console.error('Unexpected Successful Foundry Response (No Return Value):', parsedResult.data);
          c.status(500);
          return c.json({ error: 'Unexpected successful response (no learning path)' });
        }
      } else if (parsedResult.data.executionResult.type === 'error' && parsedResult.data.executionResult.error) {
        console.error('Foundry Function Error:', parsedResult.data.executionResult.error);
        c.status(500);
        return c.json({ error: 'Foundry error', details: parsedResult.data.executionResult.error.message });
      } else {
        console.error('Unexpected Foundry Response Structure:', parsedResult.data);
        c.status(500);
        return c.json({ error: 'Unexpected response structure from Foundry' });
      }
    } else {
      console.error('Foundry Response Validation Error:', parsedResult.error);
      c.status(500);
      return c.json({ error: 'Invalid Foundry response', details: parsedResult.error.issues });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    c.status(500);
    return c.json({ error: 'Internal server error' });
  }
});

export default functionalRouter;