"use client"

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin, Twitter } from "lucide-react";
import Image from "next/image";

interface Speaker {
  name: string;
  expertise: string[];
  bio: string;
  image: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
  locations?: string[];
  pastEvents?: string[];
}

export default function SpeakerCard({ speaker }: { speaker: Speaker }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
          <Image
            src={speaker.image || "https://pbs.twimg.com/media/FwqGKW6XoAA_-xu?format=jpg&name=large"}
            alt={speaker.name}
            width={128}
            height={128}
            className="object-cover w-full h-full"
          />
        </div>
        <CardTitle className="text-center">{speaker.name}</CardTitle>
        <CardDescription className="text-center">{speaker.expertise.join(", ")}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center mb-4">{speaker.bio}</p>
        {speaker.locations && speaker.locations.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2">
            {speaker.locations.map((location, index) => (
              <span key={index} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-sm">
                {location}
              </span>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-4">
        <div className="flex space-x-4">
          {speaker.linkedin && (
            <Button variant="outline" size="icon" asChild>
              <a href={`https://linkedin.com/in/${speaker.linkedin?.split("/in/")[1]}`} target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>
          )}
          {speaker.twitter && (
            <Button variant="outline" size="icon" asChild>
              <a href={`https://x.com/${speaker.twitter}`} target="_blank" rel="noopener noreferrer">
                <Twitter className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
        <Button variant="default" onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? "Detay Gizle" : "Detay Göster"}
        </Button>
        {showDetails && (
          <div className="text-center mt-2 w-full">
            {speaker.email && <p className="text-gray-700 font-semibold">📧Mail: {speaker.email}</p>}
            {speaker.pastEvents && speaker.pastEvents.length > 0 && (
              <div className="mt-2">
                <p className="font-semibold">Geçmiş Etkinlikleri:</p>
                <ul className="text-sm text-gray-600 list-disc list-inside">
                  {speaker.pastEvents.map((event, index) => (
                    <li key={index}>{event}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
