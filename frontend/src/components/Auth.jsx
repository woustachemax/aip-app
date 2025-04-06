import { useState } from "react";
import { Link } from "react-router-dom";
import { SignupSchema } from "@woustachemax/aip-app-common";

export const Auth = ({type}) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: ""
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = SignupSchema.safeParse(inputs);

    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
      console.log("Valid data:", result.data);
    }
  };

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
      <form
          className="text-slate-800 justify-center w-full max-w-md"
          onSubmit={handleSubmit}
        >
          <div className="font-extrabold text-3xl mb-2 text-center">
            {type === "login" ? "Welcome Back" : "Create an Account"}
          </div>
          <div className="text-gray-500 mb-4 text-center">
            {type === "login" ? "Don't have an account?" : "Already have an account?"}
            <Link
              className="pl-2 underline text-gray-400"
              to={type === "login" ? "/signup" : "/login"}
            >
              {type === "login" ? "Sign Up" : "Login"}
            </Link>
          </div>

          {type !== "login" && (
            <Label
              label="Name"
              placeholder="Alex"
              value={inputs.name}
              error={errors.name}
              onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
            />
          )}

          <Label
            label="Email"
            placeholder="alex@palantir.com"
            value={inputs.email}
            error={errors.email}
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          />

          <Label
            label="Password"
            placeholder="Enter your password"
            type="password"
            value={inputs.password}
            error={errors.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          />

          <button
            type="submit"
            className="mt-4 w-full bg-slate-800 text-white p-2 rounded-lg hover:bg-slate-700"
          >
            {type === "login" ? "Log In" : "Sign Up"}
          </button>
        </form>

      </div>
    </div>
  );
};

const Label = ({ label, placeholder, type = "text", value, onChange, error }) => {
  const id = label.toLowerCase();
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-slate-800"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`bg-gray-50 border ${
          error ? "border-red-500" : "border-gray-300"
        } text-slate-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
        block w-full p-2.5`}
        required
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
