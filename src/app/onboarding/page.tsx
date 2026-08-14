import { Suspense } from "react";
import Onboarding from "./Onbaording";

export default async function Page() {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Onboarding />
        </Suspense>
    );
}