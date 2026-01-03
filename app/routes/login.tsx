import { useFetcher, redirect } from "react-router";
import type { Route } from "./+types/login";
import { z } from "zod";
import { useForm, getFormProps, getInputProps } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";

const schema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha mínima de 6 caracteres"),
});

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  console.log({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  return redirect("/loaders");
}

export default function Login() {
  const fetcher = useFetcher();

  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
    shouldValidate: "onBlur",
  });

  const busy = fetcher.state !== "idle";

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", padding: 20 }}>
      <h2>Login</h2>

      <fetcher.Form {...getFormProps(form)} method="post">
        <div style={{ marginBottom: 15 }}>
          <label>Email</label>
          <input
            {...getInputProps(fields.email, { type: "email" })}
            defaultValue="henri.okayama@gmail.com"
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          {fields.email.errors && (
            <p style={{ color: "red" }}>{fields.email.errors}</p>
          )}
        </div>

        <div style={{ marginBottom: 15 }}>
          <label>Senha</label>
          <input
            {...getInputProps(fields.password, { type: "password" })}
            defaultValue="123456789"
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          {fields.password.errors && (
            <p style={{ color: "red" }}>{fields.password.errors}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={busy}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: busy ? "#999" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: busy ? "not-allowed" : "pointer",
          }}
        >
          {busy ? "Entrando..." : "Entrar"}
        </button>
      </fetcher.Form>
    </div>
  );
}
