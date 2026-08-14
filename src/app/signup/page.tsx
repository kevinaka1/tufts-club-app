import { Suspense } from "react";
import SignUp from "./SignUp";

export default async function Page() {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SignUp />
        </Suspense>
    );
}