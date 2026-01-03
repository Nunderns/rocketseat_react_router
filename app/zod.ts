import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.coerce.string().min(6),
});

const value = {
  email: "henri.okayama@gmail.com",
  password: "123456789",
};

const validated = schema.safeParse(value);

console.log(JSON.stringify(validated, null, 2));
