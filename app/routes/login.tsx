import { useState } from "react"
import type { Route } from "./+types/login";
import { useFetcher } from "react-router";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  console.log({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  await new Promise((resolve) => setTimeout(resolve, 3000));

  return { ok: true };
}

export default function Login({actionData}: Route.ComponentProps){
  console.log(actionData);

  const fetcher = useFetcher();
  const busy = fetcher.state !== "idle";

  const [formData, setFormData] = useState({
    email: "henri.okayama@gmail.com",
    password: "123456789",
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Dados do formulario", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px" }}>
      <h2>Login</h2>
      <fetcher.Form method="POST" onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="email" style={{ display: "block", marginBottom: "5px" }}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px"
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="password" style={{ display: "block", marginBottom: "5px" }}>
            Senha:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px"
            }}
          />
        </div>

        <button
          disabled={busy}
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Entrar
        </button>
      </fetcher.Form>
    </div>
  );
}
