import type { Project, User } from '../types';

export const currentUserMock: User = {
  id: 'usr-student-1',
  name: 'Alex Rivera',
  email: 'alex.rivera@university.edu',
  role: 'student',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  department: 'Computer Science & Software Engineering',
  title: 'Team Leader - Project CyberPulse'
};

export const mentorsListMock: User[] = [
  {
    id: 'usr-mentor-1',
    name: 'Dr. Marcus Vance',
    email: 'm.vance@university.edu',
    role: 'mentor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    department: 'Computer Science & Graphics Lab',
    title: 'Associate Professor & Lab Director'
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
    title: 'Professor & Department Chair'
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
    title: 'GTA VI Real-Time Vulkan Shader & Ray-Tracing Mod Suite',
    category: 'Game Engine & Graphics',
    problemStatement: 'Existing open-world game engines suffer from severe frame stuttering and memory allocation bottlenecks when rendering real-time ray-traced water reflections and global illumination.',
    objectives: 'Construct a custom high-performance Vulkan memory allocator & post-processing shader pipeline capable of maintaining 60+ FPS at 1440p resolution.',
    sdgTag: 'SDG 9: Industry, Innovation & Infrastructure',
    techStack: ['C++', 'DirectX 12', 'Vulkan', 'GLSL Shaders', 'Python Scripting'],
    teamName: 'CyberPulse Tech',
    teamMembers: [
      { id: 'tm-1', name: 'Alex Rivera', email: 'alex.rivera@university.edu', rollNo: 'CS2024-089', roleInTeam: 'Team Leader & Shader Eng' },
      { id: 'tm-2', name: 'Sophia Chen', email: 'sophia.c@uni.edu', rollNo: 'CS2024-092', roleInTeam: 'Systems Architect' },
      { id: 'tm-3', name: 'Liam O\'Connor', email: 'liam.o@uni.edu', rollNo: 'CS2024-104', roleInTeam: 'UI & Benchmarking Lead' }
    ],
    mentorId: 'usr-mentor-1',
    mentorName: 'Dr. Marcus Vance',
    mentorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    status: 'In Review',
    currentStage: 'Review-1',
    progressPercentage: 65,
    githubUrl: 'https://github.com/cyberpulse/gtavi-shader-mod',
    createdAt: '2026-08-15',
    similarityScore: 4, // 4% low similarity score (Unique idea!)
    milestones: [
      { id: 'm-1', title: 'Stage 1: Proposal / Idea Charter', stage: 'Proposal', description: 'Problem statement, system scope, objectives, and tech stack approval.', dueDate: '2026-08-30', weightage: 15, status: 'Graded' },
      { id: 'm-2', title: 'Stage 2: Proposal Approval', stage: 'Approved', description: 'Faculty charter signoff and mentor allocation verification.', dueDate: '2026-09-02', weightage: 10, status: 'Graded' },
      { id: 'm-3', title: 'Stage 3: Review-1 Prototype', stage: 'Review-1', description: 'Working Vulkan pipeline prototype with ray-traced water reflections.', dueDate: '2026-09-12', weightage: 25, status: 'Submitted' },
      { id: 'm-4', title: 'Stage 4: Review-2 Optimization', stage: 'Review-2', description: 'DLSS frame generation hook and GPU VMA allocator integration.', dueDate: '2026-09-28', weightage: 25, status: 'Upcoming' },
      { id: 'm-5', title: 'Stage 5: Final Review & Testing', stage: 'Final Review', description: 'End-to-end benchmark logs, stress test suite, and defense slides.', dueDate: '2026-10-10', weightage: 15, status: 'Upcoming' },
      { id: 'm-6', title: 'Stage 6: Project Completion', stage: 'Completed', description: 'Final project archive upload and degree thesis submission.', dueDate: '2026-10-25', weightage: 10, status: 'Upcoming' }
    ],
    submissions: [
      {
        id: 'sub-1001',
        projectId: 'proj-101',
        milestoneId: 'm-1',
        milestoneTitle: 'Stage 1: Proposal / Idea Charter',
        stage: 'Proposal',
        submittedBy: 'Alex Rivera',
        submittedAt: '2026-08-29 14:30',
        tasksCompleted: 'Drafted SRS document, designed Vulkan memory barrier sequence, defined benchmark KPIs.',
        currentWork: 'Setting up DirectX 12 Agility SDK and Vulkan validation layers.',
        nextPlan: 'Implement initial triangle ray-intersection shader pass.',
        progressPercentage: 20,
        repoUrl: 'https://github.com/cyberpulse/gtavi-shader-mod/releases/tag/v0.1-srs',
        liveDemoUrl: 'https://cyberpulse-demo.vercel.app',
        documentName: 'CyberPulse_SRS_v1.0.pdf',
        notes: 'Attached memory allocation flowcharts for DX12 & Vulkan query pools.',
        status: 'Approved',
        rubricScore: { innovation: 19, implementation: 19, progress: 18, documentation: 20, presentation: 19 },
        totalScore: 95,
        mentorFeedback: 'Outstanding project proposal! Clear mathematical scope and realistic performance targets.',
        aiSummaryFeedback: 'AI Summary: Strong proposal (95/100). Outstanding memory barrier architecture. Approved to advance to Review-1 prototype build.',
        evaluatedAt: '2026-08-31 09:15'
      },
      {
        id: 'sub-1002',
        projectId: 'proj-101',
        milestoneId: 'm-3',
        milestoneTitle: 'Stage 3: Review-1 Prototype',
        stage: 'Review-1',
        submittedBy: 'Alex Rivera',
        submittedAt: '2026-09-11 22:15',
        tasksCompleted: 'Built Vulkan compute shader pipeline for real-time ray-traced water reflections.',
        currentWork: 'Profiling memory fragmentation using AMD RGP (Radeon GPU Profiler).',
        nextPlan: 'Integrate dynamic VMA pool allocators to prevent micro-stuttering.',
        progressPercentage: 65,
        repoUrl: 'https://github.com/cyberpulse/gtavi-shader-mod/commit/8f4a9b2',
        liveDemoUrl: 'https://youtu.be/shader-demo-preview',
        documentName: 'Vulkan_Pipeline_Benchmark.pdf',
        notes: 'Implemented ray-traced water reflections achieving 62 FPS at 1440p resolution.',
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
        message: 'Great progress on Milestone 1 team! Please pay special attention to memory fragmentation during fast camera pans for Review-1.',
        timestamp: '2026-09-01 10:14'
      },
      {
        id: 'msg-2',
        projectId: 'proj-101',
        senderId: 'usr-student-1',
        senderName: 'Alex Rivera',
        senderRole: 'student',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
        message: 'Thank you Dr. Vance! We integrated VMA allocators and uploaded Stage 3 Review-1 for your evaluation.',
        timestamp: '2026-09-11 22:20'
      }
    ],
    kanbanTasks: [
      { id: 'kt-1', title: 'Setup Vulkan Validation Layers', status: 'done', assignee: 'Alex Rivera' },
      { id: 'kt-2', title: 'Write Ray-Tracing Reflection Shader Pass', status: 'done', assignee: 'Sophia Chen' },
      { id: 'kt-3', title: 'Integrate AMD GPU Profiler Hooks', status: 'in_progress', assignee: 'Liam O\'Connor' },
      { id: 'kt-4', title: 'Build UI Telemetry Overlay', status: 'todo', assignee: 'Liam O\'Connor' }
    ],
    meetingLogs: [
      { id: 'ml-1', date: '2026-08-28', topic: 'Initial Charter & Scope Discussion', notes: 'Dr. Vance recommended focusing on Vulkan memory pools before adding DLSS upscaling hooks.', mentorName: 'Dr. Marcus Vance' },
      { id: 'ml-2', date: '2026-09-08', topic: 'Review-1 Milestone Checkpoint', notes: 'Demonstrated 60 FPS water reflections. Advised to profile frame time variance.', mentorName: 'Dr. Marcus Vance' }
    ]
  },
  {
    id: 'proj-102',
    title: 'AI Autonomous Vehicle Traffic & NPC Behavior Simulator',
    category: 'Artificial Intelligence & Robotics',
    problemStatement: 'Current urban traffic simulators fail to simulate non-deterministic pedestrian movements and dynamic congestion caused by emergency vehicles.',
    objectives: 'Train multi-agent PPO reinforcement learning algorithms to reduce gridlock congestion by 35% in dense 3D city environments.',
    sdgTag: 'SDG 11: Sustainable Cities & Communities',
    techStack: ['Python', 'PyTorch', 'ROS2', 'FastAPI', 'React', 'Three.js'],
    teamName: 'UrbanAI Labs',
    teamMembers: [
      { id: 'tm-4', name: 'Marcus Brody', email: 'm.brody@uni.edu', rollNo: 'AI2024-012', roleInTeam: 'Team Leader & ML Dev' },
      { id: 'tm-5', name: 'Elena Gilbert', email: 'e.gilbert@uni.edu', rollNo: 'AI2024-015', roleInTeam: 'Simulation Lead' }
    ],
    mentorId: 'usr-mentor-2',
    mentorName: 'Dr. Elena Rostova',
    mentorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    status: 'Approved',
    currentStage: 'Approved',
    progressPercentage: 45,
    githubUrl: 'https://github.com/urbanai/traffic-reinforcement-sim',
    createdAt: '2026-08-18',
    similarityScore: 8,
    milestones: [
      { id: 'm-201', title: 'Stage 1: Proposal / Idea Charter', stage: 'Proposal', description: 'Synthetic trajectory datasets & reward function design.', dueDate: '2026-09-01', weightage: 15, status: 'Graded' },
      { id: 'm-202', title: 'Stage 2: Proposal Approval', stage: 'Approved', description: 'Faculty charter signoff.', dueDate: '2026-09-05', weightage: 10, status: 'Graded' },
      { id: 'm-203', title: 'Stage 3: Review-1 PPO Model Baseline', stage: 'Review-1', description: 'Train Proximal Policy Optimization models on 4-way intersection grid.', dueDate: '2026-09-20', weightage: 25, status: 'Active' },
      { id: 'm-204', title: 'Stage 4: Review-2 Web Simulator', stage: 'Review-2', description: '3D WebGL dashboard with real-time agent metrics.', dueDate: '2026-10-10', weightage: 25, status: 'Upcoming' },
      { id: 'm-205', title: 'Stage 5: Final Review', stage: 'Final Review', description: 'City congestion benchmark comparisons.', dueDate: '2026-10-20', weightage: 15, status: 'Upcoming' },
      { id: 'm-206', title: 'Stage 6: Completed', stage: 'Completed', description: 'Final project publication.', dueDate: '2026-10-30', weightage: 10, status: 'Upcoming' }
    ],
    submissions: [
      {
        id: 'sub-2001',
        projectId: 'proj-102',
        milestoneId: 'm-201',
        milestoneTitle: 'Stage 1: Proposal / Idea Charter',
        stage: 'Proposal',
        submittedBy: 'Marcus Brody',
        submittedAt: '2026-08-31 18:00',
        tasksCompleted: 'Designed multi-agent reward function and created 4-way synthetic city map.',
        currentWork: 'Configuring multi-GPU PPO training batch scripts.',
        nextPlan: 'Train baseline policy over 1 million simulation steps.',
        progressPercentage: 25,
        repoUrl: 'https://github.com/urbanai/traffic-reinforcement-sim/tree/v0.1',
        notes: 'Includes synthetic city map configuration files.',
        status: 'Approved',
        rubricScore: { innovation: 19, implementation: 18, progress: 18, documentation: 18, presentation: 17 },
        totalScore: 90,
        mentorFeedback: 'Solid reward structure! Make sure to penalize near-miss collisions more severely in multi-agent tests.',
        aiSummaryFeedback: 'AI Summary: Approved proposal (90/100). Strong mathematical foundation for collision reward penalties.',
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
        message: 'Nice job on dataset preparation. Let me know when you start the multi-GPU PPO training run.',
        timestamp: '2026-09-02 11:05'
      }
    ],
    kanbanTasks: [
      { id: 'kt-201', title: 'Prepare Synthetic Trajectory Dataset', status: 'done', assignee: 'Marcus Brody' },
      { id: 'kt-202', title: 'Implement PyTorch PPO Policy Network', status: 'in_progress', assignee: 'Elena Gilbert' }
    ],
    meetingLogs: [
      { id: 'ml-201', date: '2026-08-29', topic: 'Reward Function Design', notes: 'Dr. Rostova suggested adding entropy regularization to prevent early policy convergence.', mentorName: 'Dr. Elena Rostova' }
    ]
  },
  {
    id: 'proj-103',
    title: 'Decentralized Game Asset & License Registry',
    category: 'Blockchain & Security',
    problemStatement: 'Indie 3D model creators lack transparent, tamper-proof mechanisms to verify asset licensing and protect against unauthorized resale.',
    objectives: 'Develop a zero-knowledge smart contract protocol enabling instant proof of asset ownership on Layer 2 Ethereum.',
    sdgTag: 'SDG 9: Industry, Innovation & Infrastructure',
    techStack: ['Solidity', 'Hardhat', 'Next.js', 'Ethers.js', 'IPFS'],
    teamName: 'ChainMod Protocol',
    teamMembers: [
      { id: 'tm-6', name: 'Ethan Vance', email: 'e.vance@uni.edu', rollNo: 'SE2024-044', roleInTeam: 'Team Leader & Smart Contract Dev' },
      { id: 'tm-7', name: 'Zoe Kravitz', email: 'z.kravitz@uni.edu', rollNo: 'SE2024-048', roleInTeam: 'Frontend Architect' }
    ],
    status: 'Submitted',
    currentStage: 'Proposal',
    progressPercentage: 20,
    githubUrl: 'https://github.com/chainmod/license-registry-zk',
    createdAt: '2026-09-05',
    similarityScore: 12,
    milestones: [
      { id: 'm-301', title: 'Stage 1: Proposal / Whitepaper', stage: 'Proposal', description: 'EIP-721 token standards for 3D mod licensing with IPFS storage.', dueDate: '2026-09-18', weightage: 20, status: 'Active' },
      { id: 'm-302', title: 'Stage 2: Proposal Approval', stage: 'Approved', description: 'Mentor assignment & charter signoff.', dueDate: '2026-09-25', weightage: 10, status: 'Upcoming' },
      { id: 'm-303', title: 'Stage 3: Review-1 ZK Module', stage: 'Review-1', description: 'zk-SNARK Verification Module for mesh asset protection.', dueDate: '2026-10-05', weightage: 30, status: 'Upcoming' },
      { id: 'm-304', title: 'Stage 4: Review-2 Portal', stage: 'Review-2', description: 'Web app interface connected to MetaMask and IPFS pinners.', dueDate: '2026-10-20', weightage: 20, status: 'Upcoming' },
      { id: 'm-305', title: 'Stage 5: Final Review', stage: 'Final Review', description: 'Audit security verification.', dueDate: '2026-10-30', weightage: 10, status: 'Upcoming' },
      { id: 'm-306', title: 'Stage 6: Completed', stage: 'Completed', description: 'Mainnet deployment.', dueDate: '2026-11-10', weightage: 10, status: 'Upcoming' }
    ],
    submissions: [],
    messages: [],
    kanbanTasks: [
      { id: 'kt-301', title: 'Write Solidity ERC-721 License Contract', status: 'in_progress', assignee: 'Ethan Vance' }
    ],
    meetingLogs: []
  },
  {
    id: 'proj-104',
    title: 'Neural Audio Synthesizer for Dynamic Open-World Dialogue',
    category: 'Audio Processing & Speech AI',
    problemStatement: 'Dynamic audio synthesis for dynamic game NPCs exhibits unacceptable latency (>35ms), causing immersion breaks.',
    objectives: 'Optimize neural text-to-speech inference down to <15ms latency using SIMD instructions and ONNX runtime quantization.',
    sdgTag: 'SDG 4: Quality Education',
    techStack: ['Python', 'TensorFlow', 'ONNX', 'C++', 'JUCE Audio Framework'],
    teamName: 'AcousticAI',
    teamMembers: [
      { id: 'tm-8', name: 'David Kim', email: 'd.kim@uni.edu', rollNo: 'CS2024-115', roleInTeam: 'Team Leader & DSP Specialist' }
    ],
    mentorId: 'usr-mentor-3',
    mentorName: 'Prof. David Miller',
    mentorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    status: 'Revision Required',
    currentStage: 'Review-1',
    progressPercentage: 30,
    githubUrl: 'https://github.com/acoustic-ai/neural-audio-mod',
    createdAt: '2026-08-20',
    similarityScore: 6,
    milestones: [
      { id: 'm-401', title: 'Stage 1: Proposal / Idea Charter', stage: 'Proposal', description: 'Target <15ms latency audio buffer design.', dueDate: '2026-09-05', weightage: 20, status: 'Graded' },
      { id: 'm-402', title: 'Stage 2: Proposal Approval', stage: 'Approved', description: 'Faculty charter signoff.', dueDate: '2026-09-08', weightage: 10, status: 'Graded' },
      { id: 'm-403', title: 'Stage 3: Review-1 DSP Filter Benchmark', stage: 'Review-1', description: 'Initial DSP filter benchmark and ONNX model quantization.', dueDate: '2026-09-15', weightage: 30, status: 'Submitted' }
    ],
    submissions: [
      {
        id: 'sub-4001',
        projectId: 'proj-104',
        milestoneId: 'm-403',
        milestoneTitle: 'Stage 3: Review-1 DSP Filter Benchmark',
        stage: 'Review-1',
        submittedBy: 'David Kim',
        submittedAt: '2026-09-10 16:20',
        tasksCompleted: 'Built ONNX runtime wrapper in C++ JUCE framework.',
        currentWork: 'Benchmarking audio buffer latency on AVX-512 SIMD processors.',
        nextPlan: 'Apply FP16 model quantization to reduce memory transfer overhead.',
        progressPercentage: 30,
        repoUrl: 'https://github.com/acoustic-ai/neural-audio-mod/tree/v0.1-spec',
        notes: 'Initial benchmark shows 32ms latency. Working to trim down under 15ms.',
        status: 'Revision Required',
        rubricScore: { innovation: 18, implementation: 14, progress: 14, documentation: 15, presentation: 13 },
        totalScore: 74,
        mentorFeedback: 'Latency (32ms) is currently too high for real-time engine injection. Implement SIMD vector intrinsics and resubmit benchmarks.',
        aiSummaryFeedback: 'AI Summary: Revision required (74/100). Critical bottleneck: Audio latency (32ms vs target 15ms). Implement AVX-512 vectorization.',
        evaluatedAt: '2026-09-11 14:10'
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
        message: 'David, check AVX-512 intrinsic optimizers in JUCE. That should trim 15ms off your inference latency.',
        timestamp: '2026-09-11 14:15'
      }
    ],
    kanbanTasks: [
      { id: 'kt-401', title: 'Benchmark ONNX C++ Latency', status: 'done', assignee: 'David Kim' },
      { id: 'kt-402', title: 'Implement AVX-512 Intrinsics', status: 'in_progress', assignee: 'David Kim' }
    ],
    meetingLogs: [
      { id: 'ml-401', date: '2026-09-09', topic: 'SIMD Latency Optimization', notes: 'Prof. Miller suggested testing Intel OneDNN quantization libraries.', mentorName: 'Prof. David Miller' }
    ]
  }
];
