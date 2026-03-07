export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  location: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Kamura helped me find my first longevity clinic in Dubai. The directory is incredibly well-curated and saved me hours of research.",
    name: "Sarah M.",
    role: "Wellness Enthusiast",
    location: "Dubai",
  },
  {
    id: "t2",
    quote:
      "The guides are exactly what I needed — honest, detailed, and written by people who actually visit these places.",
    name: "James R.",
    role: "Biohacking Community Member",
    location: "Abu Dhabi",
  },
  {
    id: "t3",
    quote:
      "I discovered three new studios through Kamura that I now visit weekly. It's become my go-to resource for wellness in the UAE.",
    name: "Priya K.",
    role: "Yoga Practitioner",
    location: "Dubai Marina",
  },
  {
    id: "t4",
    quote:
      "As someone new to Dubai, Kamura made it easy to find quality wellness centers without the trial and error. Truly a hidden gem.",
    name: "Michael T.",
    role: "Expat & Health Optimizer",
    location: "JLT, Dubai",
  },
  {
    id: "t5",
    quote:
      "The comparison guides helped me choose between clinics with confidence. No other platform covers wellness in the UAE like this.",
    name: "Fatima A.",
    role: "Longevity Advocate",
    location: "Dubai",
  },
  {
    id: "t6",
    quote:
      "From cryotherapy to sound healing, Kamura introduced me to modalities I didn't even know existed. My wellness routine has completely transformed.",
    name: "David L.",
    role: "Fitness Enthusiast",
    location: "Palm Jumeirah",
  },
];
