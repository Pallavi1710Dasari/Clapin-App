
export const myJobs = [
    {
      job_id: "j001",
      title: "React Native Developer",
      description: "We are looking for an experienced React Native developer to join our team and help us build innovative mobile applications. The ideal candidate will have experience with React Native, JavaScript, and mobile app development.",
      location: "Bangalore, India",
      skills: ["React Native", "JavaScript", "Redux"],
      employment_type: "Full-Time",
      job_type: "onsite",
      salary_min: 1200000,
      salary_max: 1800000,
      created_at: "2025-03-15T10:30:00Z",
      updated_at: "2025-03-15T10:30:00Z",
      expires_at: "2025-05-15",
      job_status: "active",
      openings_count: 2,
      applicants_count: 3,
      company: "My Company",
      companyLogo: "https://ui-avatars.com/api/?name=My+Company&background=0D8ABC&color=fff"
    },
    {
      job_id: "j002",
      title: "UI/UX Designer",
      description: "Looking for a creative UI/UX designer with mobile app experience to join our growing team. You will work closely with developers and product managers to create stunning user interfaces.",
      location: "Remote",
      skills: ["Figma", "UI Design", "Mobile Design"],
      employment_type: "Contract",
      job_type: "remote",
      salary_min: 900000,
      salary_max: 1400000,
      created_at: "2025-03-10T14:20:00Z",
      updated_at: "2025-03-10T14:20:00Z",
      expires_at: "2025-05-10",
      job_status: "active",
      openings_count: 1,
      applicants_count: 5,
      company: "My Company",
      companyLogo: "https://ui-avatars.com/api/?name=My+Company&background=0D8ABC&color=fff"
    }
  ];
  
  // Available jobs for the user to apply to
  export const availableJobs = [
    {
      id: 'j101',
      company: 'Netflix',
      companyLogo: 'https://logo.clearbit.com/netflix.com',
      title: 'Senior React Native Developer',
      location: 'Bangalore, India',
      employmentType: 'Full-Time',
      postedDate: '2 days ago',
      applicants: 34,
      isEasyApply: true,
      description: "Netflix is looking for a talented React Native developer to join our mobile team. You'll be working on exciting projects and contributing to our mobile streaming platform.",
      requirements: [
        "5+ years of experience with React Native development",
        "Strong knowledge of JavaScript/TypeScript",
        "Experience with Redux and state management",
        "Familiarity with native build tools",
        "Experience with API integration",
        "Bachelor's degree in Computer Science or related field"
      ]
    },
    {
      id: 'j102',
      company: 'Amazon',
      companyLogo: 'https://logo.clearbit.com/amazon.com',
      title: 'UI/UX Designer',
      location: 'Remote, India',
      employmentType: 'Contract',
      postedDate: '1 week ago',
      applicants: 78,
      isEasyApply: true,
      description: "Amazon is seeking a UI/UX Designer to create engaging user experiences for our e-commerce platform. You'll work with a global team to design intuitive interfaces.",
      requirements: [
        "3+ years of UI/UX design experience",
        "Proficiency in design tools (Figma, Sketch, Adobe XD)",
        "Experience designing for mobile and web platforms",
        "Strong portfolio showcasing your design process",
        "Excellent communication skills"
      ]
    },
    {
      id: 'j103',
      company: 'Google',
      companyLogo: 'https://logo.clearbit.com/google.com',
      title: 'Frontend Developer',
      location: 'Hyderabad, India',
      employmentType: 'Full-Time',
      postedDate: '3 days ago',
      applicants: 112,
      isEasyApply: false,
      description: "Google is looking for a Frontend Developer to join our team. You'll be responsible for building user interfaces for our various products and services.",
      requirements: [
        "4+ years of frontend development experience",
        "Expertise in JavaScript, HTML, and CSS",
        "Experience with modern frameworks (React, Angular, Vue)",
        "Knowledge of responsive design principles",
        "Experience with performance optimization"
      ]
    },
    {
      id: 'j104',
      company: 'Microsoft',
      companyLogo: 'https://logo.clearbit.com/microsoft.com',
      title: 'Software Engineer',
      location: 'Bengaluru, India',
      employmentType: 'Full-Time',
      postedDate: 'Just now',
      applicants: 12,
      isEasyApply: true,
      description: "Microsoft is seeking a Software Engineer to join our product development team. You'll be working on cutting-edge technology and contributing to our cloud-based solutions.",
      requirements: [
        "3+ years of experience in software development",
        "Strong knowledge of object-oriented programming",
        "Experience with cloud technologies (Azure preferred)",
        "Excellent problem-solving skills",
        "Bachelor's degree in Computer Science or related field"
      ]
    },
    {
      id: 'j105',
      company: 'Uber',
      companyLogo: 'https://logo.clearbit.com/uber.com',
      title: 'Mobile Engineer',
      location: 'Pune, India',
      employmentType: 'Full-Time',
      postedDate: '4 days ago',
      applicants: 63,
      isEasyApply: true,
      description: "Uber is looking for a Mobile Engineer to join our team. You'll be working on our ride-sharing application, focusing on performance and user experience.",
      requirements: [
        "3+ years of mobile application development",
        "Experience with React Native or native platforms (iOS/Android)",
        "Knowledge of RESTful APIs and data integration",
        "Understanding of UI/UX design principles",
        "Strong problem-solving abilities"
      ]
    }
  ];
  
  // Job applications for jobs the user has posted
  export const jobApplications = [
    {
      id: 'a1',
      applicant_id: 'u1',
      job_id: 'j001',
      name: 'John Doe',
      profilePic: 'https://randomuser.me/api/portraits/men/32.jpg',
      title: 'Senior Developer',
      experience: '8 years',
      education: 'B.Tech Computer Science',
      applied_at: '2025-03-20T11:30:00Z',
      updated_at: '2025-03-22T09:45:00Z',
      appliedDate: '2 days ago',
      application_status: 'shortlisted',
      shortlist_reason: 'Strong technical skills and relevant experience'
    },
    {
      id: 'a2',
      applicant_id: 'u2',
      job_id: 'j001',
      name: 'Jane Smith',
      profilePic: 'https://randomuser.me/api/portraits/women/44.jpg',
      title: 'Frontend Engineer',
      experience: '5 years',
      education: 'M.S. in Computer Science',
      applied_at: '2025-03-21T14:15:00Z',
      updated_at: '2025-03-21T14:15:00Z',
      appliedDate: '3 days ago',
      application_status: 'applied'
    },
    {
      id: 'a3',
      applicant_id: 'u3',
      job_id: 'j001',
      name: 'Michael Johnson',
      profilePic: 'https://randomuser.me/api/portraits/men/67.jpg',
      title: 'Mobile Developer',
      experience: '3 years',
      education: 'B.S. in Software Engineering',
      applied_at: '2025-03-19T16:20:00Z',
      updated_at: '2025-03-22T10:30:00Z',
      appliedDate: '1 week ago',
      application_status: 'rejected',
      rejection_reason: 'Not enough experience with React Native'
    },
    {
      id: 'a4',
      applicant_id: 'u4',
      job_id: 'j002',
      name: 'Sarah Williams',
      profilePic: 'https://randomuser.me/api/portraits/women/63.jpg',
      title: 'UI/UX Designer',
      experience: '4 years',
      education: 'Masters in Design',
      applied_at: '2025-03-20T09:15:00Z',
      updated_at: '2025-03-20T09:15:00Z',
      appliedDate: '5 days ago',
      application_status: 'applied'
    },
    {
      id: 'a5',
      applicant_id: 'u5',
      job_id: 'j001',
      name: 'Robert Garcia',
      profilePic: 'https://randomuser.me/api/portraits/men/45.jpg',
      title: 'Software Engineer',
      experience: '7 years',
      education: 'B.E. in Information Technology',
      applied_at: '2025-03-23T11:45:00Z',
      updated_at: '2025-03-24T13:30:00Z',
      appliedDate: '1 day ago',
      application_status: 'selected',
      selection_reason: 'Excellent experience and cultural fit'
    }
  ];
  
  // For each application, extended resume details
  export const resumeDetails = {
    'u1': {
      experience: [
        {
          id: 'exp1',
          company: 'Tech Solutions Inc.',
          title: 'Senior Developer',
          duration: 'Jan 2020 - Present',
          description: 'Leading mobile application development team, focusing on React Native applications.'
        },
        {
          id: 'exp2',
          company: 'Mobile Innovations',
          title: 'Frontend Developer',
          duration: 'Mar 2017 - Dec 2019',
          description: 'Developed responsive web applications and hybrid mobile apps.'
        }
      ],
      education: [
        {
          id: 'edu1',
          institution: 'University of Technology',
          degree: 'M.S. in Computer Science',
          year: '2015 - 2017'
        },
        {
          id: 'edu2',
          institution: 'State University',
          degree: 'B.S. in Software Engineering',
          year: '2011 - 2015'
        }
      ],
      skills: ['JavaScript', 'React Native', 'React', 'TypeScript', 'Redux', 'Node.js', 'GraphQL', 'UI/UX']
    },
    // Add more resume details for other applicants as needed
  };
  
  // Jobs the user has applied to
  export const appliedJobs = [
    {
      id: 'aj1',
      company: 'Microsoft',
      companyLogo: 'https://logo.clearbit.com/microsoft.com',
      title: 'React Native Developer',
      location: 'Remote',
      appliedDate: '3 days ago',
      status: 'Applied',
      statusColor: '#2196F3'
    },
    {
      id: 'aj2',
      company: 'Google',
      companyLogo: 'https://logo.clearbit.com/google.com',
      title: 'Frontend Engineer',
      location: 'Bangalore, India',
      appliedDate: '1 week ago',
      status: 'Shortlisted',
      statusColor: '#FF9800'
    },
    {
      id: 'aj3',
      company: 'Amazon',
      companyLogo: 'https://logo.clearbit.com/amazon.com',
      title: 'Mobile App Developer',
      location: 'Hyderabad, India',
      appliedDate: '2 weeks ago',
      status: 'Rejected',
      statusColor: '#F44336'
    }
  ];