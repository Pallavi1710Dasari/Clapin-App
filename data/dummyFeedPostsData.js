// dummyData.js
export const users = [
  {
    id: 'user1',
    name: 'Aishwarya Rai',
    title: 'Actress/Producer',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    id: 'user2',
    name: 'Rajkumar Rao',
    title: 'Actor/Director',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 'user3',
    name: 'Konkona Sen',
    title: 'Director/Filmmaker',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    id: 'user4',
    name: 'Zoya Akhtar',
    title: 'Filmmaker/Producer',
    image: 'https://randomuser.me/api/portraits/women/37.jpg',
  },
  {
    id: 'user5',
    name: 'Anurag Kashyap',
    title: 'Director/Producer',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    id: 'user6',
    name: 'Farhan Akhtar',
    title: 'Actor/Director/Producer',
    image: 'https://randomuser.me/api/portraits/men/62.jpg',
  },
  {
    id: 'user7',
    name: 'Richa Chadha',
    title: 'Actress/Producer',
    image: 'https://randomuser.me/api/portraits/women/22.jpg',
  },
  {
    id: 'user8',
    name: 'Nawazuddin Siddiqui',
    title: 'Actor/Producer',
    image: 'https://randomuser.me/api/portraits/men/55.jpg',
  },
  {
    id: 'user9',
    name: 'Vidya Balan',
    title: 'Actress',
    image: 'https://randomuser.me/api/portraits/women/91.jpg',
  },
  {
    id: 'user10',
    name: 'Pankaj Tripathi',
    title: 'Actor',
    image: 'https://randomuser.me/api/portraits/men/67.jpg',
  }
];

export const jobs = [
  {
    id: 'job1',
    title: 'Assistant Director',
    company: 'Excel Entertainment',
    location: 'Mumbai, India',
    salary: '₹30,000 - ₹45,000 per month',
    employment_type: 'Full-Time',
    text: 'Looking for an experienced assistant director for an upcoming feature film. Must have worked on at least 2 feature films previously.'
  },
  {
    id: 'job2',
    title: 'Camera Operator',
    company: 'Dharma Productions',
    location: 'Mumbai, India',
    salary: '₹5,000 - ₹7,000 per day',
    employment_type: 'Contract',
    text: 'Required camera operator with 5+ years of experience for a feature film shooting in Mumbai and Kashmir.'
  },
  {
    id: 'job3',
    title: 'Script Supervisor',
    company: 'Phantom Films',
    location: 'Delhi, India',
    salary: '₹35,000 - ₹50,000 per month',
    employment_type: 'Full-Time',
    text: 'Seeking script supervisor for a web series. Knowledge of Hindi and English is a must.'
  },
  {
    id: 'job4',
    title: 'Makeup Artist',
    company: 'Red Chillies Entertainment',
    location: 'Hyderabad, India',
    salary: '₹4,000 - ₹6,000 per day',
    employment_type: 'Contract',
    text: 'Looking for a professional makeup artist with experience in period films for an upcoming project.'
  },
  {
    id: 'job5',
    title: 'Production Assistant',
    company: 'Yash Raj Films',
    location: 'Mumbai, India',
    salary: '₹20,000 - ₹25,000 per month',
    employment_type: 'Full-Time',
    text: 'Entry-level position for production assistant. Fresh graduates can apply.'
  }
];

// Sample film-related images for posts
const filmImages = [
  'https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Camera
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Film set
  'https://images.unsplash.com/photo-1518930259200-3e5b29f42096?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Lighting
  'https://images.unsplash.com/photo-1520156557489-31c63271fcd4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Film studio
  'https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Film editing
  'https://images.unsplash.com/photo-1594908900066-3f47337549d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Movie poster
  'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Cinema
];

// Helper function to generate timestamps in the past
const getRandomPastDate = () => {
  const now = new Date();
  // Random number of minutes in the past (0 to 14 days)
  const randomMinutes = Math.floor(Math.random() * 20160); // 14 days * 24 hours * 60 minutes
  const pastDate = new Date(now.getTime() - (randomMinutes * 60000));
  return pastDate.toISOString();
};

// Helper function to get 1-4 random images for a post
const getRandomImages = () => {
  const numImages = Math.floor(Math.random() * 4) + 1; // 1-4 images
  const shuffled = [...filmImages].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numImages);
};

export const posts = [
  {
    id: 'post1',
    userId: 'user1',
    text: 'Excited to announce my new project with Sanjay Leela Bhansali! Stay tuned for more updates. #NewBeginnings #Bollywood',
    likes: 3452,
    comments: 245,
    timestamp: getRandomPastDate(),
    hasJob: false,
    hasImages: true,
    images: getRandomImages(),
  },
  {
    id: 'post2',
    userId: 'user5',
    text: 'Looking for talented screenwriters for an upcoming anthology series. This is a great opportunity for new writers to showcase their talent!',
    likes: 876,
    comments: 143,
    timestamp: getRandomPastDate(),
    hasJob: true,
    jobId: 'job3',
    hasImages: false,
  },
  {
    id: 'post3',
    userId: 'user3',
    text: "Just wrapped up shooting for my latest film. It's been an incredible journey with an amazing team. Can't wait for you all to see it!",
    likes: 1243,
    comments: 89,
    timestamp: getRandomPastDate(),
    hasJob: false,
    hasImages: true,
    images: getRandomImages(),
  },
  {
    id: 'post4',
    userId: 'user2',
    text: "Workshop alert! I'm conducting an acting workshop next month in Mumbai. Limited seats available. DM for details.",
    likes: 567,
    comments: 78,
    timestamp: getRandomPastDate(),
    hasJob: false,
    hasImages: false,
  },
  {
    id: 'post5',
    userId: 'user6',
    text: 'Our production house is hiring for multiple positions. Check out the details below and share with talented professionals in your network.',
    likes: 982,
    comments: 156,
    timestamp: getRandomPastDate(),
    hasJob: true,
    jobId: 'job1',
    hasImages: false,
  },
  {
    id: 'post6',
    userId: 'user4',
    text: 'Just finished watching a brilliant independent film at the Mumbai Film Festival. So inspired by the storytelling and cinematography!',
    likes: 754,
    comments: 62,
    timestamp: getRandomPastDate(),
    hasJob: false,
    hasImages: true,
    images: getRandomImages(),
  },
  {
    id: 'post7',
    userId: 'user8',
    text: 'Honored to be nominated for the Filmfare Awards this year. Grateful for all the love and support from fans!',
    likes: 2765,
    comments: 321,
    timestamp: getRandomPastDate(),
    hasJob: false,
    hasImages: true,
    images: getRandomImages().slice(0, 1), // Just one image
  },
  {
    id: 'post8',
    userId: 'user7',
    text: "We're looking for camera operators for our upcoming feature film shooting in Kashmir. Great opportunity for cinematographers!",
    likes: 432,
    comments: 65,
    timestamp: getRandomPastDate(),
    hasJob: true,
    jobId: 'job2',
    hasImages: false,
  },
  {
    id: 'post9',
    userId: 'user9',
    text: 'Celebrated 15 years in the film industry today. What a journey it has been! Thankful for every role and opportunity.',
    likes: 3211,
    comments: 412,
    timestamp: getRandomPastDate(),
    hasJob: false,
    hasImages: true,
    images: getRandomImages(),
  },
  {
    id: 'post10',
    userId: 'user10',
    text: 'Reading scripts for my next project. So many interesting stories out there! #ActorsLife',
    likes: 1876,
    comments: 134,
    timestamp: getRandomPastDate(),
    hasJob: false,
    hasImages: false,
  },
  {
    id: 'post11',
    userId: 'user4',
    text: 'Our production house is looking for makeup artists for an upcoming period drama. Experience with historical makeup is a plus!',
    likes: 562,
    comments: 87,
    timestamp: getRandomPastDate(),
    hasJob: true,
    jobId: 'job4',
    hasImages: false,
  },
  {
    id: 'post12',
    userId: 'user2',
    text: 'Just had a great script reading session with some talented actors. The energy in the room was incredible!',
    likes: 945,
    comments: 73,
    timestamp: getRandomPastDate(),
    hasJob: false,
    hasImages: true,
    images: getRandomImages().slice(0, 2), // Two images
  },
  {
    id: 'post13',
    userId: 'user10',
    text: 'Attended a masterclass by Martin Scorsese yesterday. Such a learning experience! #Inspired',
    likes: 1432,
    comments: 98,
    timestamp: getRandomPastDate(),
    hasJob: false,
    hasImages: true, 
    images: getRandomImages(),
  },
  {
    id: 'post14',
    userId: 'user3',
    text: 'Looking for production assistants for our new project. Great opportunity for freshers to learn the ropes of filmmaking!',
    likes: 387,
    comments: 56,
    timestamp: getRandomPastDate(),
    hasJob: true,
    jobId: 'job5',
    hasImages: false,
  },
  {
    id: 'post15',
    userId: 'user1',
    text: 'Throwback to my first film set. How time flies! Still remember the butterflies in my stomach before the first shot.',
    likes: 2876,
    comments: 198,
    timestamp: getRandomPastDate(),
    hasJob: false,
    hasImages: true,
    images: getRandomImages().slice(0, 3), // Three images
  }
];

// Function to get complete post data by combining post with user details
export const getEnrichedPosts = () => {
  return posts.map(post => {
    const user = users.find(u => u.id === post.userId);
    let jobData = null;
    
    if (post.hasJob && post.jobId) {
      jobData = jobs.find(j => j.id === post.jobId);
    }
    
    return {
      ...post,
      name: user.name,
      title: user.title,
      image: user.image,
      jobData
    };
  });
};