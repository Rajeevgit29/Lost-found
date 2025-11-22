import { Item, Testimonial, Feature } from './types';
import { Search, ShieldCheck, MapPin, Zap, Clock, Users } from 'lucide-react';
import React from 'react';

export const MOCK_ITEMS: Item[] = [
  {
    id: '1',
    title: 'MacBook Pro M3',
    category: 'electronics',
    status: 'found',
    location: 'Engineering Hall 301',
    timeAgo: '2h ago',
    image: 'https://picsum.photos/400/300?random=1'
  },
  {
    id: '2',
    title: 'AirPods Pro Case',
    category: 'electronics',
    status: 'found',
    location: 'Student Library',
    timeAgo: '5h ago',
    image: 'https://picsum.photos/400/300?random=2'
  },
  {
    id: '3',
    title: 'Toyota Car Keys',
    category: 'keys',
    status: 'lost',
    location: 'Parking Lot B',
    timeAgo: '1d ago',
    image: 'https://picsum.photos/400/300?random=3'
  },
  {
    id: '4',
    title: 'Calculus Textbook',
    category: 'books',
    status: 'lost',
    location: 'Science Center',
    timeAgo: '2d ago',
    image: 'https://picsum.photos/400/300?random=4'
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    text: "Found my MacBook in under 30 minutes. The AI matching is absolutely unreal.",
    name: "Sarah K.",
    role: "Design Student",
    avatar: "https://picsum.photos/100/100?random=10"
  },
  {
    id: '2',
    text: "I thought my wallet was gone forever. Someone reported it instantly. Lifesaver.",
    name: "Mike T.",
    role: "Engineering",
    avatar: "https://picsum.photos/100/100?random=11"
  },
  {
    id: '3',
    text: "This is what the future of campus utility looks like. Smooth, fast, and beautiful.",
    name: "Alex R.",
    role: "CS Major",
    avatar: "https://picsum.photos/100/100?random=12"
  },
  {
    id: '4',
    text: "Best thing to happen to our campus. The map feature is super helpful.",
    name: "Emma L.",
    role: "Biology",
    avatar: "https://picsum.photos/100/100?random=13"
  }
];

export const FEATURES: Feature[] = [
  {
    id: '1',
    title: 'AI Visual Matching',
    description: 'Upload a photo. Our AI scans the database for visual matches in real-time.',
    icon: <Search className="w-6 h-6" />
  },
  {
    id: '2',
    title: 'Secure Verification',
    description: 'Only verified owners can claim high-value items using our proof-of-ownership protocol.',
    icon: <ShieldCheck className="w-6 h-6" />
  },
  {
    id: '3',
    title: 'Live Geolocation',
    description: 'Pinpoint item locations on an interactive 3D campus map.',
    icon: <MapPin className="w-6 h-6" />
  },
  {
    id: '4',
    title: 'Instant Alerts',
    description: 'Get push notifications the moment a matching item is reported.',
    icon: <Zap className="w-6 h-6" />
  }
];
