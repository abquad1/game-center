import LoginForm from "@/components/admin/login";
import { Suspense } from "react";
6;
function Login() {
  return (
    <div>
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}

export default Login;
