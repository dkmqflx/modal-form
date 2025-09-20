import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요."),
  email: z
    .string()
    .min(1, "이메일을 입력해주세요.")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "올바른 이메일 주소를 입력해주세요."),
  message: z.string().min(1, "메시지를 입력해주세요."),
});

export type FormData = z.infer<typeof formSchema>;
