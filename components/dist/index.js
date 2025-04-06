"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.foundryResponseSchema = exports.loginSchema = exports.signupSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
    name: zod_1.default.string().optional()
});
exports.loginSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
});
exports.foundryResponseSchema = zod_1.default.object({
    executionResult: zod_1.default.object({
        type: zod_1.default.literal('success'),
        success: zod_1.default.optional(zod_1.default.object({
            returnValue: zod_1.default.object({
                type: zod_1.default.literal('string'),
                string: zod_1.default.string(),
            }),
        })),
    }),
});
