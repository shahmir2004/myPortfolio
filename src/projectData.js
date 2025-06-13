// src/projectData.js

// IF YOU ARE IMPORTING IMAGES (Recommended):
// import staffFlowScreenshot from './assets/images/staff-flow-screenshot.png';
// import secureMnistScreenshot from './assets/images/secure-mnist-screenshot.png';
// import fypDbScreenshot from './assets/images/fyp-db-screenshot.png';
// import k8sNetSimScreenshot from './assets/images/k8s-netsim-screenshot.png';
// import portfolioScreenshot from './assets/images/portfolio-screenshot.png';

export const projects = [
  {
    id: 1,
    title: "Staff-Flow AI",
    shortDescription: "AI-powered system for optimizing team schedules and balancing workloads.",
    description: "Staff-Flow is an AI-powered employee shift and workload management system. It's designed to optimize team scheduling, intelligently track employee availability, and dynamically balance workloads using predictive algorithms. The goal is to enhance operational efficiency and boost employee satisfaction through fair work distribution and proactive schedule adjustments. Key features include automated shift generation based on historical data and predicted demand, a real-time availability dashboard for managers, and AI-driven suggestions for workload balancing. My role was as the Lead Developer, where I designed and implemented the core AI scheduling algorithms using Python, developed the responsive frontend interface with React, and built the backend RESTful APIs using Node.js and Express.",
    imageUrl: "https://via.placeholder.com/800x450/FFA07A/000000?text=Staff-Flow+AI+App", // Replace with actual image or import variable
    challenges: "A primary challenge was designing a flexible AI model that could adapt to diverse business rules and employee preferences for scheduling. This required extensive iteration on feature engineering and algorithm tuning. Another hurdle was ensuring real-time data synchronization between the frontend and backend for availability tracking, which was solved using WebSockets.",
    learnings: "Gained deep experience in applying machine learning to real-world optimization problems, particularly in scheduling. Mastered full-stack development with React and Node.js, and significantly improved skills in API design, database management (e.g., MongoDB for flexibility), and deploying scalable applications on cloud platforms like Vercel.",
    tags: ["AI/ML", "Python", "React", "Node.js", "Scheduling", "Optimization", "Web App"],
    liveUrl: "https://v0-staff-flowmain-2i.vercel.app/",
    codeUrl: null, // Add if available
    role: "Lead Developer & AI Engineer"
  },
  {
    id: 2,
    title: "Secure MNIST ZTA",
    shortDescription: "Flask web app for MNIST digit classification, secured with Zero Trust Architecture.",
    description: "This Python Flask-based web application classifies handwritten digits from the MNIST dataset. The core focus of the project was to secure the system using Zero Trust Architecture (ZTA) principles. This involved implementing strict identity verification for all API requests using JWTs, establishing microsegmentation by containerizing different services (e.g., web frontend, API, ML model inference), and enforcing minimal trust boundaries with network policies to prevent unauthorized access and potential lateral movement. I was responsible for developing the Flask backend, integrating the pre-trained MNIST model, and architecting and implementing the ZTA security layers, including setting up an API gateway for policy enforcement.",
    imageUrl: "https://via.placeholder.com/800x450/ADD8E6/000000?text=Secure+MNIST+App", // Replace
    challenges: "Integrating various ZTA components (identity provider, policy enforcement points) seamlessly without significantly impacting performance was complex. Ensuring that microservices could communicate securely yet efficiently required careful network policy design within a Dockerized environment.",
    learnings: "Developed a strong understanding of Zero Trust principles and their practical implementation. Gained hands-on experience with containerization (Docker), API security best practices, and building secure-by-design applications using Python and Flask. Also learned about threat modeling for web applications.",
    tags: ["Python", "Flask", "AI/ML", "Cybersecurity", "Zero Trust", "MNIST", "Docker", "API Security"],
    liveUrl: null,
    codeUrl: "https://github.com/shahmir2004/ZTarchitecture",
    role: "Developer & Security Implementer"
  },
  {
    id: 3,
    title: "FYP Management DB",
    shortDescription: "Database system to streamline the management of Final Year Projects for students and faculty.",
    description: "I designed and implemented a relational database system to manage the complete lifecycle of Final Year Projects (FYPs). The system facilitates project proposal submissions, automates aspects of supervisor allocation based on expertise tags, enables progress tracking via milestones with notifications, and manages final report submissions and grading. The backend was built using PostgreSQL for its robust relational features and data integrity constraints. The application logic and a simple web interface were developed using Python with the Django framework, leveraging its ORM for database interactions. Key focuses were on efficient database schema design (achieving 3NF normalization), writing optimized SQL queries embedded within Django's ORM for complex reporting, and ensuring data consistency across various modules.",
    imageUrl: "https://via.placeholder.com/800x450/90EE90/000000?text=FYP+Database+System", // Replace
    challenges: "Ensuring data integrity and handling concurrent access during peak periods (like proposal deadlines) were significant challenges. Designing a flexible schema that could accommodate various project types and departmental requirements also required careful planning and several iterations.",
    learnings: "This project provided significant practical experience in advanced PostgreSQL features, database administration tasks (like backup and recovery strategies), and mastering the Django ORM for complex data manipulations. Also improved skills in requirements gathering and translating business logic into effective database designs.",
    tags: ["Database Design", "PostgreSQL", "Python", "Django", "SQL", "Data Management", "Project Management", "ORM"],
    liveUrl: null,
    codeUrl: "http://github.com/shahmir2004/FYP-management",
    role: "Database Developer & Backend Engineer"
  },
  {
    id: 4,
    title: "K8s NetSim GUI",
    shortDescription: "A GUI project simulating network commands (ping, tracert, load balancing) in a Kubernetes context.",
    description: "This project provides a Graphical User Interface (GUI) to simulate essential network diagnostic commands like 'ping' (ICMP echo requests/replies) and 'tracert' (tracing packet routes), and visually demonstrates round-robin load balancing concepts as they might apply within a conceptual Kubernetes cluster with multiple pods serving an application. The primary goal was to create an educational tool to help visualize and understand network flows, packet routing decisions, and service discovery behaviors within an orchestrated system. My role involved designing the core simulation logic for the network commands, including mock packet generation and response handling, and developing the interactive GUI using Python with the CustomTkinter library for a modern look and feel. The simulation accounted for simplified network latency and node failures.",
    imageUrl: "https://via.placeholder.com/800x450/FFB6C1/000000?text=K8s+Network+Simulator", // Replace
    challenges: "Accurately simulating network behavior, even simplified, in a repeatable way was challenging. Creating an intuitive GUI that clearly represented the complex interactions within a simulated Kubernetes network also required careful UI/UX consideration and several design iterations with CustomTkinter.",
    learnings: "Significantly deepened my understanding of TCP/IP networking fundamentals, Kubernetes networking concepts (Services, Endpoints, Ingress - conceptually), and GUI development with Python. Gained experience in event-driven programming and designing interactive simulations.",
    tags: ["Kubernetes", "Networking", "Simulation", "Python", "CustomTkinter", "GUI", "DevOps Tools", "Visualization"],
    liveUrl: null,
    codeUrl: "https://github.com/shahmir2004/kubernetesnetsim",
    role: "Developer & Simulator Designer"
  },
  {
    id: 5,
    title: "My Portfolio Site",
    shortDescription: "This interactive portfolio, built with React, Framer Motion, and 3D elements via React Three Fiber.",
    description: "This very website serves as a live demonstration of my frontend web development capabilities. It has been built from the ground up using a modern technology stack: React for its component-based architecture and efficient UI rendering, React Router for seamless single-page application navigation, and Framer Motion for sophisticated page transitions and engaging micro-animations. A distinctive feature is the interactive 3D elements, such as the homepage blob and project title previews, created using React Three Fiber and its helper library Drei. This showcases my ability to integrate advanced graphics and interactive experiences into web applications. The entire project emphasizes responsive design for optimal viewing across all devices, performance optimization, and creating a fun, laid-back yet professional user experience. Development involved detailed component design, state management strategies, crafting custom animations, and deploying the site to a live environment. It remains a dynamic project that I continuously update as I explore and master new web technologies!",
    imageUrl: "https://via.placeholder.com/800x450/D3D3D3/000000?text=My+Portfolio+Site", // REPLACE with a real screenshot of YOUR portfolio
    challenges: "Integrating and optimizing the performance of multiple WebGL canvases (for 3D project previews and the homepage blob) while ensuring smooth page transitions was a key challenge. Version compatibility between R3F libraries also required careful management and debugging. Achieving a consistent and polished 'fun and laid-back' aesthetic across all interactive elements also took considerable iteration.",
    learnings: "Deepened understanding of React Three Fiber & Drei for 3D web graphics, Framer Motion for complex UI animations, and advanced React component patterns. Gained significant experience in performance optimization techniques for graphically intensive web applications and the importance of meticulous version management in complex frontend projects.",
    tags: ["React", "Framer Motion", "React Three Fiber", "JavaScript", "HTML5", "CSS3", "Responsive Design", "UI/UX", "Vite", "3D Web"],
    liveUrl: "[YOUR_PORTFOLIO_LIVE_URL_HERE]",
    codeUrl: "https://github.com/shahmir2004/[YOUR_ACTUAL_PORTFOLIO_REPO_NAME]",
    role: "Solo Developer & Designer"
  }
];