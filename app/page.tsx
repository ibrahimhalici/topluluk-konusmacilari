
"use client"
import SpeakerCard from "@/components/SpeakerCard"
import { get } from "http"
import { useEffect, useState } from "react";
import { Select, MenuItem, FormControl, InputLabel, Box, Typography } from '@mui/material';

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

async function getSpeakers(): Promise<Speaker[]> {
  try {
    const response = await fetch("https://raw.githubusercontent.com/semihkislar/community-speakers/refs/heads/main/speakers.json");
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return data.speakers;
  } catch (error) {
    console.error("Error fetching data:", error);
    // Return default speakers in case of an error
    return [];
  }
}

function getDefaultSpeakers(): Promise<Speaker[]> {
  return Promise.resolve([
    {
      "name": "İbrahim Halıcı",
      "expertise": [
        "Java","Spring Boot","Go"
      ],
      "bio": "Co-Founder @Beytek, Developer @Cisco",
      "image": "https://www.beytek.org/wp-content/uploads/2024/01/ibrahim.jpeg",
      
      "linkedin": "linkedin.com/in/ibrahimhalici",
      "twitter": "@imbrahimhlc",
      "locations": [
        "İstanbul"
      ],
      "pastEvents": [
        "Yazılım Test Metodları ve Spring Boot Uygulama Testi", "Java Mutasyon Testi: PIT Framework Nedir, Nasıl Çalışır?"
      ],
      "liveEvents": [
        {
          "name": "",
          "link": ""
        },
        {
          "name": "",
          "link": ""
        }
      ],
      "presentations": [
        {
          "name": "",
          "link": ""
        },
        {
          "name": "",
          "link": ""
        }
      ]
    },
    {
      "name": "Mirza Şahin",
      "expertise": [
        "React",
        "NextJS",
        "ThreeJS"
      ],
      "bio": "Co-Founder @Beytek, Software & Creative Developer",
      "image": "https://www.beytek.org/wp-content/uploads/2024/06/mirza.jpeg",
      "email": "hi@mirzasahin.com",
      "linkedin": "linkedin.com/in/mirzasahin",
      "twitter": "@mirzasahinn",
      "locations": [
        "İstanbul"
      ],
      "pastEvents": [
    
      ],
      "liveEvents": [
        {
          "name": "",
          "link": ""
        },
        {
          "name": "",
          "link": ""
        }
      ],
      "presentations": [
        {
          "name": "",
          "link": ""
        },
        {
          "name": "",
          "link": ""
        }
      ]
    },
    {
      "name": "Melih Ekinci",
      "expertise": [
        "Typescript",
        "Javascript",
        "AWS"
      ],
      "bio": "Software Developer @Retter",
      "image": "https://www.beytek.org/wp-content/uploads/2024/01/melih.jpeg",
      "email": "mmlhekinci@gmail.com",
      "linkedin": "https://www.linkedin.com/in/melihekinci/",
      "locations": [
        "İstanbul"
      ],
      "pastEvents": [
        
      ],
      "liveEvents": [
        {
          "name": "",
          "link": ""
        },
        {
          "name": "",
          "link": ""
        }
      ],
      "presentations": [
        {
          "name": "",
          "link": ""
        },
        {
          "name": "",
          "link": ""
        }
      ]
    }])}

    

    const SpeakerDropdown: React.FC = () => {
      const [speakers, setSpeakers] = useState<Speaker[]>([]);
      const [filteredSpeakers, setFilteredSpeakers] = useState<Speaker[]>([]);
      const [selectedLocation, setSelectedLocation] = useState<string>('');
      const [locations, setLocations] = useState<string[]>([]);
      const [selectedExpertise, setSelectedExpertise] = useState<string>('');
      const [expertises, setExpertises] = useState<string[]>([]);
    
      useEffect(() => {
        async function fetchSpeakers() {
          const speakers = (await getDefaultSpeakers()).concat(await getSpeakers());
          setSpeakers(speakers);
          
          const allLocations = speakers
            .flatMap(speaker => speaker.locations || [])
            .filter((value, index, self) => self.indexOf(value) === index).sort();;
          
          setLocations(allLocations);

          const allExpertise = speakers
          .flatMap(speaker => speaker.expertise || [])
          .filter((value, index, self) => self.indexOf(value) === index).sort();;
        
        setExpertises(allExpertise);
        }
    
        fetchSpeakers();
      }, []);
    
      useEffect(() => {
        setFilteredSpeakers(
          speakers.filter(speaker => {
            const locationMatch = !selectedLocation || (speaker.locations?.includes(selectedLocation) ?? false);
            const expertiseMatch = !selectedExpertise || speaker.expertise.includes(selectedExpertise);
            return locationMatch && expertiseMatch;
          })
        );
      }, [selectedLocation, selectedExpertise, speakers]);
    
      return (

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100vh',
            padding: 2
          }}
        >
        <h1 className="text-3xl font-bold text-center mb-8">Topluluk Konuşmacıları</h1>  


        
          <Box   sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: '100%',
            maxWidth: 1200,
            gap: 3  // Increase the gap between columns
          }}
          >
          <Typography variant="body1" sx={{ marginBottom: 3 }}>
    Hoşgeldiniz! Aşağıdaki açılır menüleri kullanarak konuşmacıları konumlarına ve uzmanlık alanlarına göre filtreleyebilirsiniz.
  </Typography></Box>          <Box   sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: '100%',
            maxWidth: 1200,
            gap: 3  // Increase the gap between columns
          }}
          >
          <FormControl variant="standard" sx={{ minWidth: 200, marginBottom: 4 }}>
            <InputLabel id="location-select-label">Konum seç</InputLabel>
            <Select
              labelId="location-select-label"
              value={selectedLocation}
              onChange={e => setSelectedLocation(e.target.value as string)}
              label="Select Location"
            >
              <MenuItem value="">
                <em>Tümü</em>
              </MenuItem>
              {locations.map(location => (
                <MenuItem key={location} value={location}>
                  {location}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="standard" sx={{ minWidth: 200, marginBottom: 4 }}>
            <InputLabel id="location-select-label">Uzmanlık seç</InputLabel>
            <Select
              labelId="expertise-select-label"
              value={selectedExpertise}
              onChange={e => setSelectedExpertise(e.target.value as string)}
              label="Select Expertise"
            >
              <MenuItem value="">
                <em>Tümü</em>
              </MenuItem>
              {expertises.map(expertise => (
                <MenuItem key={expertise} value={expertise}>
                  {expertise}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          </Box>
    
          <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            width: '100%',
            maxWidth: 1200,
            gap: 3  // Increase the gap between columns
          }}
          >
            
            {filteredSpeakers.map(speaker => (
              
              <SpeakerCard key={speaker.name} speaker={speaker} />
            ))}
          </Box>
        </Box>
        
      );
    };

export default SpeakerDropdown;