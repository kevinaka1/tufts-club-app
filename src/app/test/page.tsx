"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ClubsPage() {
    const [clubs, setClubs] = useState<any[]>([]);

    useEffect(() => {
        const fetchClubs = async () => {
            const { data, error } = await supabase
                .from("clubs")
                .select("*");

            if (error) {
                console.error(error);
                return;
            }

            setClubs(data || []);
        };

        fetchClubs();
    }, []);

    return (
        <div>
            <h1>Clubs</h1>

            {clubs.map((club) => (
                <div key={club.id}>
                    <h3>{club.name}</h3>
                    <p>{club.description}</p>
                </div>
            ))}
        </div>
    );
}