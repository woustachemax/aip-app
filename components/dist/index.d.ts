import z from 'zod';
export declare const signupSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name?: string | undefined;
}, {
    email: string;
    password: string;
    name?: string | undefined;
}>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const foundryResponseSchema: z.ZodObject<{
    executionResult: z.ZodObject<{
        type: z.ZodLiteral<"success">;
        success: z.ZodOptional<z.ZodObject<{
            returnValue: z.ZodObject<{
                type: z.ZodLiteral<"string">;
                string: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                string: string;
                type: "string";
            }, {
                string: string;
                type: "string";
            }>;
        }, "strip", z.ZodTypeAny, {
            returnValue: {
                string: string;
                type: "string";
            };
        }, {
            returnValue: {
                string: string;
                type: "string";
            };
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: "success";
        success?: {
            returnValue: {
                string: string;
                type: "string";
            };
        } | undefined;
    }, {
        type: "success";
        success?: {
            returnValue: {
                string: string;
                type: "string";
            };
        } | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    executionResult: {
        type: "success";
        success?: {
            returnValue: {
                string: string;
                type: "string";
            };
        } | undefined;
    };
}, {
    executionResult: {
        type: "success";
        success?: {
            returnValue: {
                string: string;
                type: "string";
            };
        } | undefined;
    };
}>;
export declare type signupSchema = z.infer<typeof signupSchema>;
export declare type loginSchema = z.infer<typeof loginSchema>;
export declare type foundryResponseSchema = z.infer<typeof foundryResponseSchema>;
