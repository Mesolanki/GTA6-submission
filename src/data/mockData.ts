import type { Project, User } from '../types';

export const currentUserMock: User = {
  id: 'usr-student-1',
  name: 'Alex Rivera',
  email: 'alex.rivera@university.edu',
  role: 'student',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  department: 'Computer Science & Software Engineering',
  title: 'Team Lead - Project CyberPulse'
};

export const mentorsListMock: User[] = [
  {
    id: 'usr-mentor-1',
    name: 'Dr. Marcus Vance',
    email: 'm.vance@university.edu',
    role: 'mentor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    department: 'Computer Science & Graphics Lab',
    title: 'Associate Professor'
  },
  {
    id: 'usr-mentor-2',
    name: 'Dr. Elena Rostova',
    email: 'e.rostova@university.edu',
    role: 'mentor',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    department: 'Artificial Intelligence & Robotics',
    title: 'Senior Research Scientist'
  },
  {
    id: 'usr-mentor-3',
    name: 'Prof. David Miller',
    email: 'd.miller@university.edu',
    role: 'mentor',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    department: 'Cybersecurity & Distributed Systems',
    title: 'Professor & Lab Director'
  }
];

export const adminMock: User = {
  id: 'usr-admin-1',
  name: 'Prof. Sarah Jenkins',
  email: 's.jenkins@university.edu',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250',
  department: 'Academic Affairs & Project Monitoring',
  title: 'Chief Academic Coordinator'
};

export const initialProjectsMock: Project[] = [
  {
    id: 'proj-101',
    title: 'GTA VI Real-Time Shader & Ray-Tracing Mod Suite',
    category: 'Game Engine & Graphics',
    description: 'A custom Vulkan & DirectX 12 post-processing engine designed for open-world games. Features custom global illumination, dynamic rain reflections, and neural upscaling mod support.',
    techStack: ['C++', 'DirectX 12', 'Vulkan', 'GLSL Shaders', 'Python Scripting'],
    teamName: 'CyberPulse Tech',
    teamMembers: [
      { id: 'tm-1', name: 'Alex Rivera', email: 'alex.r@uni.edu', rollNo: 'CS2024-089', roleInTeam: 'Team Lead & Shader Engineer' },
      { id: 'tm-2', name: 'Sophia Chen', email: 'sophia.c@uni.edu', rollNo: 'CS2024-092', roleInTeam: 'Systems Architect' },
      { id: 'tm-3', name: 'Liam O\'Connor', email: 'liam.o@uni.edu', rollNo: 'CS2024-104', roleInTeam: 'UI & Benchmarking Specialist' }
    ],
    mentorId: 'usr-mentor-1',
    mentorName: 'Dr. Marcus Vance',
    mentorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    status: 'In Review',
    progressPercentage: 65,
    githubUrl: 'https://github.com/cyberpulse/gtavi-shader-mod',
    createdAt: '2026-08-15',
    milestones: [
      { id: 'm-1', title: 'Project Charter & SRS', description: 'Submission of system requirements specification and rendering pipeline diagram.', dueDate: '2026-08-30', weightage: 15, status: 'Graded' },
      { id: 'm-2', title: 'Core Vulkan Pipeline & Shader Demo', description: 'Working render pipeline prototype with ray-traced water reflections.', dueDate: '2026-09-10', weightage: 35, status: 'Submitted' },
      { id: 'm-3', title: 'Optimization & Neural Upscaling Integration', description: 'DLSS/FSR frame generation hook and benchmark telemetry dashboard.', dueDate: '2026-09-28', weightage: 25, status: 'Active' },
      { id: 'm-4', title: 'Final Code Audit & Defense Presentation', description: 'Complete source submission with comprehensive test suite and video demo.', dueDate: '2026-10-15', weightage: 25, status: 'Upcoming' }
    ],
    submissions: [
      {
        id: 'sub-1001',
        projectId: 'proj-101',
        milestoneId: 'm-1',
        milestoneTitle: 'Project Charter & SRS',
        submittedBy: 'Alex Rivera',
        submittedAt: '2026-08-29 14:30',
        repoUrl: 'https://github.com/cyberpulse/gtavi-shader-mod/releases/tag/v0.1-srs',
        liveDemoUrl: 'https://cyberpulse-demo.verce.app',
        documentName: 'CyberPulse_SRS_v1.0.pdf',
        notes: 'Attached detailed GPU architecture analysis and memory allocation flowcharts for DX12 & Vulkan.',
        status: 'Approved',
        rubricScore: { codeQuality: 23, documentation: 24, innovation: 25, presentation: 23 },
        totalScore: 95,
        mentorFeedback: 'Outstanding requirement document! Excellent memory barrier diagram and realistic performance goals.',
        evaluatedAt: '2026-08-31 09:15'
      },
      {
        id: 'sub-1002',
        projectId: 'proj-101',
        milestoneId: 'm-2',
        milestoneTitle: 'Core Vulkan Pipeline & Shader Demo',
        submittedBy: 'Alex Rivera',
        submittedAt: '2026-09-09 22:15',
        repoUrl: 'https://github.com/cyberpulse/gtavi-shader-mod/commit/8f4a9b2',
        liveDemoUrl: 'https://youtu.be/shader-demo-preview',
        documentName: 'Vulkan_Pipeline_Benchmark.pdf',
        notes: 'Implemented ray-traced water reflections hitting 60 FPS at 1440p resolution. Included video demonstration.',
        status: 'Pending Review'
      }
    ],
    messages: [
      {
        id: 'msg-1',
        projectId: 'proj-101',
        senderId: 'usr-mentor-1',
        senderName: 'Dr. Marcus Vance',
        senderRole: 'mentor',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
        message: 'Great progress on milestone 1 team! Please pay special attention to memory fragmentation when using ray tracing query pools for Milestone 2.',
        timestamp: '2026-09-01 10:14'
      },
      {
        id: 'msg-2',
        projectId: 'proj-101',
        senderId: 'usr-student-1',
        senderName: 'Alex Rivera',
        senderRole: 'student',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
        message: 'Thank you Dr. Vance! We used dynamic VMA allocators to prevent frame stutters during fast vehicle camera pans. We just uploaded Milestone 2 for your review!',
        timestamp: '2026-09-09 22:20'
      }
    ]
  },
  {
    id: 'proj-102',
    title: 'AI Autonomous Vehicle Traffic & NPC Behavior Simulator',
    category: 'Artificial Intelligence & Robotics',
    description: 'Deep reinforcement learning framework designed to simulate hyper-realistic pedestrian flow and traffic density in dense urban open-world environments.',
    techStack: ['Python', 'PyTorch', 'ROS2', 'FastAPI', 'React', 'Three.js'],
    teamName: 'UrbanAI Labs',
    teamMembers: [
      { id: 'tm-4', name: 'Marcus Brody', email: 'm.brody@uni.edu', rollNo: 'AI2024-012', roleInTeam: 'ML Researcher' },
      { id: 'tm-5', name: 'Elena Gilbert', email: 'e.gilbert@uni.edu', rollNo: 'AI2024-015', roleInTeam: 'Simulation Lead' }
    ],
    mentorId: 'usr-mentor-2',
    mentorName: 'Dr. Elena Rostova',
    mentorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    status: 'Approved',
    progressPercentage: 40,
    githubUrl: 'https://github.com/urbanai/traffic-reinforcement-sim',
    createdAt: '2026-08-18',
    milestones: [
      { id: 'm-201', title: 'Problem Definition & Dataset Setup', description: 'Synthetic trajectory datasets & reward function design.', dueDate: '2026-09-01', weightage: 20, status: 'Graded' },
      { id: 'm-202', title: 'PPO Agent Training & Baseline Model', description: 'Train Proximal Policy Optimization models on 4-way intersection grid.', dueDate: '2026-09-20', weightage: 40, status: 'Active' },
      { id: 'm-203', title: 'Web Simulator & Final Evaluation', description: '3D WebGL dashboard with real-time agent metrics.', dueDate: '2026-10-10', weightage: 40, status: 'Upcoming' }
    ],
    submissions: [
      {
        id: 'sub-2001',
        projectId: 'proj-102',
        milestoneId: 'm-201',
        milestoneTitle: 'Problem Definition & Dataset Setup',
        submittedBy: 'Marcus Brody',
        submittedAt: '2026-08-31 18:00',
        repoUrl: 'https://github.com/urbanai/traffic-reinforcement-sim/tree/v0.1',
        notes: 'Includes synthetic city map configuration files and multi-agent training environment wrappers.',
        status: 'Approved',
        rubricScore: { codeQuality: 22, documentation: 23, innovation: 24, presentation: 21 },
        totalScore: 90,
        mentorFeedback: 'Solid reward structure! Make sure to penalize near-miss collisions more severely in multi-agent tests.',
        evaluatedAt: '2026-09-02 11:00'
      }
    ],
    messages: [
      {
        id: 'msg-3',
        projectId: 'proj-102',
        senderId: 'usr-mentor-2',
        senderName: 'Dr. Elena Rostova',
        senderRole: 'mentor',
        senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
        message: 'Nice job on dataset preparation. Let me know when you run the multi-GPU PPO training batch.',
        timestamp: '2026-09-02 11:05'
      }
    ]
  },
  {
    id: 'proj-103',
    title: 'Decentralized Game Modding & Asset License Registry',
    category: 'Blockchain & Security',
    description: 'Smart contract system built on Ethereum Layer 2 to protect indie 3D modelers and mod creators through verifiable zero-knowledge proof ownership tags.',
    techStack: ['Solidity', 'Hardhat', 'Next.js', 'Ethers.js', 'IPFS'],
    teamName: 'ChainMod Protocol',
    teamMembers: [
      { id: 'tm-6', name: 'Ethan Vance', email: 'e.vance@uni.edu', rollNo: 'SE2024-044', roleInTeam: 'Smart Contract Dev' },
      { id: 'tm-7', name: 'Zoe Kravitz', email: 'z.kravitz@uni.edu', rollNo: 'SE2024-048', roleInTeam: 'Frontend Lead' }
    ],
    status: 'Submitted',
    progressPercentage: 20,
    githubUrl: 'https://github.com/chainmod/license-registry-zk',
    createdAt: '2026-09-05',
    milestones: [
      { id: 'm-301', title: 'Architecture Whitepaper & Smart Contracts', description: 'EIP-721 token standards for 3D mod licensing with IPFS storage.', dueDate: '2026-09-18', weightage: 30, status: 'Active' },
      { id: 'm-302', title: 'zk-SNARK Verification Module', description: 'Zero knowledge proof of asset ownership without exposing raw mesh files.', dueDate: '2026-10-05', weightage: 40, status: 'Upcoming' },
      { id: 'm-303', title: 'Mainnet Testnet Deployment & UI Portal', description: 'Live web app interface connected to MetaMask and IPFS pinners.', dueDate: '2026-10-25', weightage: 30, status: 'Upcoming' }
    ],
    submissions: [],
    messages: []
  },
  {
    id: 'proj-104',
    title: 'Neural Audio Synthesizer for Dynamic Open-World Dialogue',
    category: 'Audio Processing & Speech AI',
    description: 'Real-time neural text-to-speech voice modulation tool that generates contextual emotional echo and environmental reverb for game NPCs on the fly.',
    techStack: ['Python', 'TensorFlow', 'ONNX', 'C++', 'JUCE Audio Framework'],
    teamName: 'AcousticAI',
    teamMembers: [
      { id: 'tm-8', name: 'David Kim', email: 'd.kim@uni.edu', rollNo: 'CS2024-115', roleInTeam: 'DSP & Audio Specialist' }
    ],
    mentorId: 'usr-mentor-3',
    mentorName: 'Prof. David Miller',
    mentorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    status: 'Needs Revision',
    progressPercentage: 30,
    githubUrl: 'https://github.com/acoustic-ai/neural-audio-mod',
    createdAt: '2026-08-20',
    milestones: [
      { id: 'm-401', title: 'Audio Pipeline Specification & Latency Benchmark', description: 'Target <15ms latency audio buffer design for realtime streaming.', dueDate: '2026-09-05', weightage: 25, status: 'Submitted' }
    ],
    submissions: [
      {
        id: 'sub-4001',
        projectId: 'proj-104',
        milestoneId: 'm-401',
        milestoneTitle: 'Audio Pipeline Specification & Latency Benchmark',
        submittedBy: 'David Kim',
        submittedAt: '2026-09-04 16:20',
        repoUrl: 'https://github.com/acoustic-ai/neural-audio-mod/tree/v0.1-spec',
        notes: 'Initial DSP filter benchmark shows 35ms latency. Working on ONNX runtime quantization to drop under 15ms.',
        status: 'Needs Revision',
        rubricScore: { codeQuality: 18, documentation: 19, innovation: 22, presentation: 15 },
        totalScore: 74,
        mentorFeedback: 'Latency is currently too high for realtime engine injection. Please implement SIMD vector instructions and submit revised benchmark results.',
        evaluatedAt: '2026-09-06 14:10'
      }
    ],
    messages: [
      {
        id: 'msg-4',
        projectId: 'proj-104',
        senderId: 'usr-mentor-3',
        senderName: 'Prof. David Miller',
        senderRole: 'mentor',
        senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
        message: 'David, check AVX-512 intrinsic optimizers in JUCE. That should easily trim 20ms off your inference latency.',
        timestamp: '2026-09-06 14:15'
      }
    ]
  }
];
