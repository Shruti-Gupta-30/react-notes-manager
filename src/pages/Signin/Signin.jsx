import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary";
import { Link } from "react-router-dom";
import s from "./style.module.css";
import { Input } from "components/Input/Input";
import { AuthLayout } from "Layouts/AuthLayout/AuthLayout";
import { useState } from "react";

export function Signin() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const submit = (e) => {
		e.preventDefault();
	};

	const form = (
		<div className={s.formContainer}>
			<h2 className={s.title}>
				Sign in <br />
				to access your team notes
			</h2>
			<form onSubmit={submit} className={s.formGroup}>
				<Input placeholder={"Email"} onTextChange={setEmail} />
				<Input
					placeholder={"Password"}
					type="password"
					onTextChange={setPassword}
				/>
				<ButtonPrimary type="submit" className={s.button}>
					Sign in!
				</ButtonPrimary>
				<span>
					Don't have an account yet? <Link to={"/signup"}>Signup</Link>
				</span>
			</form>
		</div>
	);
	return <AuthLayout>{form}</AuthLayout>;
}
