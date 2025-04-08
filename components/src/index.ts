import z from 'zod';

export const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
});


export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

// export const foundryResponseSchema = z.object({
//     executionResult: z.object({
//       type: z.literal('success'),
//       success: z.optional(z.object({
//         returnValue: z.object({
//           type: z.literal('string'),
//           string: z.string(),
//         }),
//       })),
//     }),
//   });


export type signupSchema = z.infer<typeof signupSchema>
export type loginSchema = z.infer<typeof loginSchema>
// export type foundryResponseSchema = z.infer<typeof foundryResponseSchema>

