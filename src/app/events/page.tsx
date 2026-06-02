import { Suspense } from "react";
import EventsPage from "./EventsPage";

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EventsPage />
        </Suspense>
    );
}