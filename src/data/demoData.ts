import { CareerRole, JobPosting, StudentProfile, InstitutionAnalytics } from '../types';

export const ALL_AVAILABLE_SKILLS = [
  // Programming & Software
  { name: 'Python', category: 'Programming' },
  { name: 'SQL', category: 'Database' },
  { name: 'Java', category: 'Programming' },
  { name: 'C / C++', category: 'Programming' },
  { name: 'HTML / CSS', category: 'Web' },
  { name: 'JavaScript', category: 'Web' },
  { name: 'React Basics', category: 'Web' },
  { name: 'REST APIs', category: 'Programming' },
  { name: 'Git & GitHub', category: 'Tools' },
  { name: 'Linux Basics', category: 'Tools' },
  { name: 'Data Cleaning & Pandas', category: 'Database' },
  { name: 'Power BI', category: 'Database' },
  { name: 'Excel Advanced', category: 'Database' },
  { name: 'Cloud Fundamentals (AWS/GCP)', category: 'Tools' },
  { name: 'Manual QA & Test Cases', category: 'Software' },
  { name: 'Automated Testing Basics', category: 'Software' },
  { name: 'Computer Hardware & Assembly', category: 'Hardware' },
  { name: 'Computer Networking (TCP/IP, LAN)', category: 'Hardware' },
  { name: 'Operating System Installation & Troubleshooting', category: 'Hardware' },
  { name: 'Cybersecurity Fundamentals', category: 'Tools' },

  // Electrical & Electronics
  { name: 'Electrical House & Industrial Wiring', category: 'Electrical' },
  { name: 'Single & 3-Phase AC/DC Motor Maintenance', category: 'Electrical' },
  { name: 'Transformer Maintenance & Testing', category: 'Electrical' },
  { name: 'Circuit Breakers & Switchgears', category: 'Electrical' },
  { name: 'Multimeter & Oscilloscope Testing', category: 'Electronics' },
  { name: 'PCB Soldering & SMD Rework', category: 'Electronics' },
  { name: 'Microcontroller Programming (Arduino/8051)', category: 'Electronics' },
  { name: 'Sensors & Actuators Interfacing', category: 'Electronics' },
  { name: 'Industrial Safety & Earthing (IS Standards)', category: 'Electrical' },
  { name: 'Solar PV Panel Installation', category: 'Electrical' },
  { name: 'Inverters & UPS Servicing', category: 'Electronics' },

  // Mechanical, Manufacturing & CAD
  { name: 'AutoCAD 2D Drafting', category: 'Mechanical' },
  { name: 'SolidWorks 3D Modeling', category: 'Mechanical' },
  { name: 'Engineering Drawing & GD&T', category: 'Mechanical' },
  { name: 'CNC Lathe Machine Operation', category: 'Mechanical' },
  { name: 'CNC Milling & VMC Programming (G-Code/M-Code)', category: 'Mechanical' },
  { name: 'MIG / TIG / Arc Welding', category: 'Mechanical' },
  { name: 'Pneumatics & Hydraulics Systems', category: 'Mechanical' },
  { name: 'Precision Measurement (Vernier, Micrometer, Height Gauge)', category: 'Mechanical' },
  { name: 'Preventive Machine Maintenance', category: 'Mechanical' },
  { name: 'Fitting & Assembly Tolerances', category: 'Mechanical' },

  // Automation & IoT
  { name: 'PLC Programming (Siemens/Allen-Bradley)', category: 'Automation' },
  { name: 'SCADA Systems Basics', category: 'Automation' },
  { name: 'Industrial Robotics Operation', category: 'Automation' },
  { name: 'IoT Protocols (MQTT, Modbus)', category: 'Automation' },
  { name: 'VFD (Variable Frequency Drive) Parameterization', category: 'Automation' },

  // Soft Skills & Work Culture
  { name: 'Technical English & Documentation', category: 'Soft Skills' },
  { name: '5S Workplace Organization', category: 'Soft Skills' },
  { name: 'Troubleshooting & Analytical Thinking', category: 'Soft Skills' },
  { name: 'Industrial Safety Protocols (OSHA/BIS)', category: 'Soft Skills' },
] as const;

export const CAREER_ROLES: CareerRole[] = [
  {
    id: 'junior-software-dev',
    title: 'Junior Software Developer',
    category: 'Software & IT',
    shortSummary: 'Develops backend logic, writes clean algorithms, and collaborates on software builds.',
    description: 'Junior Software Developers assist engineering teams in designing, coding, testing, and debugging applications. High demand for graduates with strong core logic, database mastery, and version control understanding.',
    suitableTrades: ['COPA (Computer Operator & Programming Assistant)', 'Information Technology', 'Computer Science'],
    averageSalaryRange: '₹3.2 - 5.5 LPA',
    industryDemand: 'Very High',
    hiringCompanies: ['TCS', 'Infosys BPM', 'Wipro Digital', 'Zoho Corp', 'Tech Mahindra'],
    requiredSkills: [
      { name: 'Python', requiredLevel: 'Advanced', weight: 5, category: 'Core', description: 'Core OOP, functions, data structures, and script automation' },
      { name: 'SQL', requiredLevel: 'Advanced', weight: 4, category: 'Core', description: 'Relational schema design, complex joins, indexing, and CRUD queries' },
      { name: 'Git & GitHub', requiredLevel: 'Intermediate', weight: 4, category: 'Core', description: 'Branch management, pull requests, resolving merge conflicts' },
      { name: 'REST APIs', requiredLevel: 'Intermediate', weight: 4, category: 'Core', description: 'Building and consuming JSON RESTful endpoints (FastAPI/Express)' },
      { name: 'Linux Basics', requiredLevel: 'Intermediate', weight: 3, category: 'Secondary', description: 'CLI commands, file permissions, shell scripting' },
      { name: 'Cloud Fundamentals (AWS/GCP)', requiredLevel: 'Beginner', weight: 2, category: 'Emerging', description: 'Basic compute hosting, S3 storage, deployment awareness' }
    ],
    recommendedCertifications: ['Python Institute PCEP/PCAP', 'Oracle Database SQL Certified', 'GitHub Foundations', 'NPTEL Programming in Python']
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    category: 'Software & IT',
    shortSummary: 'Transforms raw business data into actionable visual insights and automated reports.',
    description: 'Data Analysts inspect, clean, transform, and model data to discover useful patterns, inform conclusions, and support corporate decision-making using SQL, Power BI, and Python.',
    suitableTrades: ['COPA', 'Information Technology', 'Mathematics/Vocational Science'],
    averageSalaryRange: '₹3.5 - 6.0 LPA',
    industryDemand: 'Very High',
    hiringCompanies: ['Mu Sigma', 'Cognizant', 'Flipkart Analytics', 'KPMG Global Services', 'Genpact'],
    requiredSkills: [
      { name: 'SQL', requiredLevel: 'Advanced', weight: 5, category: 'Core', description: 'Window functions, aggregations, subqueries, query optimization' },
      { name: 'Power BI', requiredLevel: 'Intermediate', weight: 5, category: 'Core', description: 'DAX formulas, interactive KPI dashboards, automated report refreshes' },
      { name: 'Excel Advanced', requiredLevel: 'Advanced', weight: 4, category: 'Core', description: 'VLOOKUP/XLOOKUP, Pivot Tables, Power Query, Macros' },
      { name: 'Data Cleaning & Pandas', requiredLevel: 'Intermediate', weight: 4, category: 'Core', description: 'Handling missing values, data shaping, exploratory data analysis' },
      { name: 'Python', requiredLevel: 'Intermediate', weight: 3, category: 'Secondary', description: 'Data extraction, Matplotlib/Seaborn charting' },
      { name: 'Technical English & Documentation', requiredLevel: 'Intermediate', weight: 3, category: 'Secondary', description: 'Presenting data insights clearly to stakeholders' }
    ],
    recommendedCertifications: ['Microsoft Power BI Data Analyst (PL-300)', 'Google Data Analytics Professional Certificate', 'NPTEL Data Analytics with Python']
  },
  {
    id: 'web-developer',
    title: 'Web Developer (Frontend / Full Stack)',
    category: 'Software & IT',
    shortSummary: 'Builds responsive user interfaces and interactive web applications.',
    description: 'Web Developers construct accessible, fast-loading, mobile-first web pages and interface components using modern HTML, CSS, JavaScript, and framework libraries.',
    suitableTrades: ['COPA', 'Information Technology', 'Desktop Publishing'],
    averageSalaryRange: '₹3.0 - 5.0 LPA',
    industryDemand: 'High',
    hiringCompanies: ['Freshworks', 'Swiggy Tech', 'Publicis Sapient', 'LTI Mindtree', 'Startups Hub'],
    requiredSkills: [
      { name: 'HTML / CSS', requiredLevel: 'Advanced', weight: 5, category: 'Core', description: 'Semantic markup, Flexbox, CSS Grid, responsive design principles' },
      { name: 'JavaScript', requiredLevel: 'Intermediate', weight: 5, category: 'Core', description: 'ES6+ syntax, DOM manipulation, asynchronous Fetch/Promises' },
      { name: 'React Basics', requiredLevel: 'Intermediate', weight: 4, category: 'Core', description: 'Component state, props, hooks, and routing' },
      { name: 'Git & GitHub', requiredLevel: 'Intermediate', weight: 3, category: 'Secondary', description: 'Version tracking, commit workflow, hosting on GitHub Pages/Vercel' },
      { name: 'REST APIs', requiredLevel: 'Intermediate', weight: 3, category: 'Secondary', description: 'Integrating backend APIs and rendering live JSON data' }
    ],
    recommendedCertifications: ['freeCodeCamp Responsive Web Design', 'Meta Front-End Developer Certificate', 'Bharat Skills IT & Web Certificate']
  },
  {
    id: 'electrical-maintenance-tech',
    title: 'Electrical Maintenance Technician',
    category: 'Electrical & Power',
    shortSummary: 'Maintains plant power systems, industrial switchgears, motors, and transformer safety.',
    description: 'Ensures uninterrupted electrical supply across industrial plants and commercial infrastructures by performing predictive and corrective maintenance on motors, transformers, and distribution panels.',
    suitableTrades: ['Electrician', 'Wireman', 'Electroplater'],
    averageSalaryRange: '₹2.8 - 4.5 LPA',
    industryDemand: 'Very High',
    hiringCompanies: ['L&T Construction', 'Schneider Electric', 'Tata Power', 'ABB India', 'BHEL'],
    requiredSkills: [
      { name: 'Electrical House & Industrial Wiring', requiredLevel: 'Advanced', weight: 5, category: 'Core', description: 'Conduit routing, 3-phase load calculation, terminal crimping' },
      { name: 'Single & 3-Phase AC/DC Motor Maintenance', requiredLevel: 'Advanced', weight: 5, category: 'Core', description: 'Star-Delta starters, winding testing, insulation resistance (Megger)' },
      { name: 'Circuit Breakers & Switchgears', requiredLevel: 'Intermediate', weight: 4, category: 'Core', description: 'MCB, MCCB, ACB testing, relay coordination and busbar maintenance' },
      { name: 'Transformer Maintenance & Testing', requiredLevel: 'Intermediate', weight: 3, category: 'Secondary', description: 'Oil BDV testing, Buchholz relay checks, silica gel inspection' },
      { name: 'Industrial Safety & Earthing (IS Standards)', requiredLevel: 'Advanced', weight: 5, category: 'Core', description: 'Pipe/Plate earthing measurement, lockout-tagout (LOTO) protocols' }
    ],
    recommendedCertifications: ['State Electrical Wireman License Class-B', 'National Council for Vocational Training (NCVT) Certified', 'Schneider Electric Safety Cert']
  },
  {
    id: 'industrial-automation-tech',
    title: 'Industrial Automation & PLC Technician',
    category: 'Automation & IoT',
    shortSummary: 'Programs and debugs programmable logic controllers (PLCs), sensors, and SCADA lines.',
    description: 'Bridges electrical hardware and automation software in smart factories (Industry 4.0), programming PLC ladder logic, setting up sensor networks, and maintaining automated assembly lines.',
    suitableTrades: ['Instrument Mechanic', 'Electrician', 'Electronics Mechanic', 'Mechatronics'],
    averageSalaryRange: '₹3.5 - 5.8 LPA',
    industryDemand: 'Very High',
    hiringCompanies: ['Siemens India', 'Rockwell Automation', 'BOSCH Rexroth', 'Fanuc India', 'Titan Automation'],
    requiredSkills: [
      { name: 'PLC Programming (Siemens/Allen-Bradley)', requiredLevel: 'Intermediate', weight: 5, category: 'Core', description: 'Ladder logic (LD), timers, counters, math blocks, troubleshooting faults' },
      { name: 'Sensors & Actuators Interfacing', requiredLevel: 'Advanced', weight: 5, category: 'Core', description: 'Proximity, optical, thermocouple, pneumatic cylinders, solenoid valves' },
      { name: 'VFD (Variable Frequency Drive) Parameterization', requiredLevel: 'Intermediate', weight: 4, category: 'Core', description: 'Speed tuning, 4-20mA analog control, ramp-up/ramp-down profiles' },
      { name: 'SCADA Systems Basics', requiredLevel: 'Beginner', weight: 3, category: 'Emerging', description: 'HMI screen creation, tag binding, alarm logs' },
      { name: 'Pneumatics & Hydraulics Systems', requiredLevel: 'Intermediate', weight: 3, category: 'Secondary', description: 'Directional control valves, pressure regulators, air preparation units' }
    ],
    recommendedCertifications: ['Siemens S7-1200 Automation Certified', 'NPTEL Industrial Automation & Control', 'BOSCH Mechatronics Certificate']
  },
  {
    id: 'cnc-operator',
    title: 'CNC Machine Operator & Programmer',
    category: 'Manufacturing & Mechanical',
    shortSummary: 'Sets up, operates, and codes G/M codes for precision CNC Lathes and VMC Milling centres.',
    description: 'High-precision manufacturing role manufacturing aerospace, automotive, and heavy industrial components to exact engineering tolerances within microns.',
    suitableTrades: ['Machinist', 'Turner', 'Tool & Die Maker', 'Fitter'],
    averageSalaryRange: '₹2.8 - 4.8 LPA',
    industryDemand: 'High',
    hiringCompanies: ['Bharat Forge', 'Godrej & Boyce', 'Hero MotoCorp', 'Mahindra Manufacturing', 'Dynamatic Tech'],
    requiredSkills: [
      { name: 'CNC Lathe Machine Operation', requiredLevel: 'Advanced', weight: 5, category: 'Core', description: 'Workpiece clamping, offset setting, tool touch-off, dry runs' },
      { name: 'CNC Milling & VMC Programming (G-Code/M-Code)', requiredLevel: 'Intermediate', weight: 5, category: 'Core', description: 'Canned cycles (G81, G84, G71), polar coordinate programming' },
      { name: 'Precision Measurement (Vernier, Micrometer, Height Gauge)', requiredLevel: 'Advanced', weight: 5, category: 'Core', description: 'Measurement to 0.01mm/0.001mm, bore dial gauge verification' },
      { name: 'Engineering Drawing & GD&T', requiredLevel: 'Intermediate', weight: 4, category: 'Core', description: 'Reading concentricity, parallelism, surface roughness symbols (Ra)' },
      { name: '5S Workplace Organization', requiredLevel: 'Intermediate', weight: 3, category: 'Secondary', description: 'Tool room hygiene, coolant monitoring, preventive maintenance' }
    ],
    recommendedCertifications: ['Fanuc CNC Operator Certification', 'NCVT Certified Machinist', 'DGT Advanced Vocational Training (AVTS)']
  },
  {
    id: 'mechanical-cad-draughtsman',
    title: 'Mechanical CAD Draughtsman',
    category: 'Manufacturing & Mechanical',
    shortSummary: 'Generates detailed 2D/3D component drawings and bill-of-materials for production.',
    description: 'Transforms engineering design sketches into accurate 2D manufacturing blueprints and 3D CAD models following ISO/BIS standards for machine shops and fabrication plants.',
    suitableTrades: ['Draughtsman Mechanical', 'Fitter', 'Machinist'],
    averageSalaryRange: '₹2.8 - 4.5 LPA',
    industryDemand: 'High',
    hiringCompanies: ['L&T Technology Services', 'Tata Technologies', 'Thermax Ltd', 'Kirloskar Brothers', 'Jindal Steel'],
    requiredSkills: [
      { name: 'AutoCAD 2D Drafting', requiredLevel: 'Advanced', weight: 5, category: 'Core', description: 'Orthographic projections, sectional views, dimension styles, BOM tables' },
      { name: 'SolidWorks 3D Modeling', requiredLevel: 'Intermediate', weight: 4, category: 'Core', description: 'Part modeling, sheet metal design, assembly mating, exploded views' },
      { name: 'Engineering Drawing & GD&T', requiredLevel: 'Advanced', weight: 5, category: 'Core', description: 'Limits, fits, tolerance calculations, surface finish annotation' },
      { name: 'Fitting & Assembly Tolerances', requiredLevel: 'Intermediate', weight: 3, category: 'Secondary', description: 'Hole-basis and shaft-basis transition/interference fits' }
    ],
    recommendedCertifications: ['Autodesk Certified Professional: AutoCAD', 'Certified SOLIDWORKS Associate (CSWA)', 'NPTEL Engineering Drawing']
  },
  {
    id: 'network-hardware-tech',
    title: 'Network & IT Support Technician',
    category: 'Software & IT',
    shortSummary: 'Configures office networks, manages IP subnetting, server racks, and client hardware.',
    description: 'Deploys, monitors, and repairs computer hardware, structured CAT-6 cabling, routers, switches, Wi-Fi access points, and assists staff with OS and software diagnostics.',
    suitableTrades: ['Information Technology', 'COPA', 'Electronics Mechanic'],
    averageSalaryRange: '₹2.8 - 4.5 LPA',
    industryDemand: 'High',
    hiringCompanies: ['Airtel Business', 'Jio Fiber Enterprise', 'HCL Tech Support', 'Wipro Infrastructure', 'Amazon CS Ops'],
    requiredSkills: [
      { name: 'Computer Networking (TCP/IP, LAN)', requiredLevel: 'Advanced', weight: 5, category: 'Core', description: 'IPv4/IPv6, subnetting, DHCP, DNS, VLANs, RJ-45 crimping & patch panels' },
      { name: 'Operating System Installation & Troubleshooting', requiredLevel: 'Advanced', weight: 5, category: 'Core', description: 'Windows 11/Server, Ubuntu desktop, dual boot, BIOS/UEFI setup' },
      { name: 'Computer Hardware & Assembly', requiredLevel: 'Advanced', weight: 4, category: 'Core', description: 'Motherboards, RAM diagnostics, SMPS testing, thermal paste replacement' },
      { name: 'Linux Basics', requiredLevel: 'Intermediate', weight: 3, category: 'Secondary', description: 'SSH access, systemctl services, network interface config (ip/netplan)' },
      { name: 'Cybersecurity Fundamentals', requiredLevel: 'Beginner', weight: 2, category: 'Emerging', description: 'Firewall rules, password policies, phishing defense' }
    ],
    recommendedCertifications: ['CompTIA Network+ / A+', 'Cisco CCNA (Certified Network Associate)', 'Bharat Skills Network Tech']
  },
  {
    id: 'electronics-hardware-tech',
    title: 'Electronics Hardware & PCB Technician',
    category: 'Electronics & Hardware',
    shortSummary: 'Assembles, solders SMD components, tests circuit boards, and repairs consumer electronics.',
    description: 'Specializes in printed circuit board (PCB) assembly, surface-mount device (SMD) soldering under microscopes, reading schematic diagrams, and bench testing with oscilloscopes.',
    suitableTrades: ['Electronics Mechanic', 'Instrument Mechanic', 'COPA'],
    averageSalaryRange: '₹2.7 - 4.2 LPA',
    industryDemand: 'High',
    hiringCompanies: ['Foxconn India', 'Dixon Technologies', 'Havells India', 'Bharat Electronics Limited (BEL)', 'Optiemus Infracom'],
    requiredSkills: [
      { name: 'PCB Soldering & SMD Rework', requiredLevel: 'Advanced', weight: 5, category: 'Core', description: 'Micro-soldering, hot air rework station, solder wick, desoldering pump' },
      { name: 'Multimeter & Oscilloscope Testing', requiredLevel: 'Advanced', weight: 5, category: 'Core', description: 'Signal waveform analysis, voltage drop debugging, frequency check' },
      { name: 'Microcontroller Programming (Arduino/8051)', requiredLevel: 'Intermediate', weight: 3, category: 'Secondary', description: 'Firmware flashing, UART serial monitor debugging' },
      { name: 'Sensors & Actuators Interfacing', requiredLevel: 'Intermediate', weight: 3, category: 'Secondary', description: 'Analog-to-digital reading, relay drivers' },
      { name: 'Inverters & UPS Servicing', requiredLevel: 'Intermediate', weight: 3, category: 'Secondary', description: 'MOSFET testing, battery charging circuitry repair' }
    ],
    recommendedCertifications: ['IPC-A-610 Soldering Specialist', 'NCVT Certified Electronics Mechanic', 'Skill India ESDM Certificate']
  },
  {
    id: 'qa-tester',
    title: 'QA & Software Test Associate',
    category: 'Software & IT',
    shortSummary: 'Executes software test plans, logs Jira bugs, and verifies web/mobile usability.',
    description: 'Ensures digital applications are bug-free and meet quality criteria by designing rigorous test cases, executing regression suites, and writing automated script validations.',
    suitableTrades: ['COPA', 'Information Technology'],
    averageSalaryRange: '₹3.0 - 4.8 LPA',
    industryDemand: 'High',
    hiringCompanies: ['Capgemini', 'Mphasis', 'Tata Elxsi', 'Persistent Systems', 'Zensar'],
    requiredSkills: [
      { name: 'Manual QA & Test Cases', requiredLevel: 'Advanced', weight: 5, category: 'Core', description: 'Boundary value analysis, equivalence partitioning, bug reporting' },
      { name: 'SQL', requiredLevel: 'Intermediate', weight: 4, category: 'Core', description: 'Database verification, data integrity testing via select queries' },
      { name: 'HTML / CSS', requiredLevel: 'Intermediate', weight: 3, category: 'Secondary', description: 'Browser DevTools inspection, element selector targeting' },
      { name: 'Automated Testing Basics', requiredLevel: 'Beginner', weight: 3, category: 'Emerging', description: 'Selenium / Cypress script basics and API testing in Postman' },
      { name: 'Technical English & Documentation', requiredLevel: 'Intermediate', weight: 4, category: 'Core', description: 'Precise bug steps to reproduce, user acceptance test documentation' }
    ],
    recommendedCertifications: ['ISTQB Foundation Level Certified Tester', 'Coursera Software Testing Specialization']
  }
];

export const DEMO_STUDENTS: StudentProfile[] = [
  {
    id: 'demo-student-1',
    name: 'Arjun Kumar',
    email: 'arjun.kumar.iti@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&q=80',
    age: 20,
    location: 'Bengaluru, Karnataka',
    education: 'ITI Certificate (2-Year)',
    itiTrade: 'COPA (Computer Operator & Programming Assistant)',
    institutionName: 'Govt. Model ITI Peenya, Bengaluru',
    graduationYear: 2024,
    skills: [
      { name: 'Python', level: 'Intermediate', category: 'Programming', verified: true },
      { name: 'SQL', level: 'Intermediate', category: 'Database', verified: true },
      { name: 'HTML / CSS', level: 'Advanced', category: 'Web', verified: true },
      { name: 'JavaScript', level: 'Beginner', category: 'Web', verified: false },
      { name: 'Excel Advanced', level: 'Intermediate', category: 'Database', verified: true },
      { name: 'Operating System Installation & Troubleshooting', level: 'Advanced', category: 'Hardware', verified: true }
    ],
    certifications: [
      'NCVT National Trade Certificate (COPA)',
      'NPTEL Introduction to Python Programming (Elite)',
      'Bharat Skills Basic Computing & IT'
    ],
    interests: ['Software Development', 'Data Analytics', 'Web Development', 'Open Source Tools'],
    targetRole: 'Junior Software Developer',
    preferredIndustry: 'IT & Software Services',
    locationPreference: 'Bengaluru / Hyderabad / Remote',
    workModePreference: 'Hybrid',
    salaryExpectation: '₹3.5 - 4.5 LPA',
    experienceLevel: 'Entry-Level',
    completedRoadmapTaskIds: ['task-py-1', 'task-sql-1'],
    resumeText: 'Arjun Kumar | ITI COPA Graduate | Peenya Govt ITI | Proficient in Python scripting, SQL database querying, HTML/CSS frontend page styling. Built college student attendance tracker CLI project and e-library web portal. Certified by NPTEL and NCVT.',
    resumeFileName: 'Arjun_Kumar_Resume_COPA.pdf',
    createdAt: '2026-01-10T10:00:00Z',
    lastUpdated: '2026-08-20T14:30:00Z'
  },
  {
    id: 'demo-student-2',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
    age: 21,
    location: 'Pune, Maharashtra',
    education: 'ITI Certificate (2-Year)',
    itiTrade: 'Electronics Mechanic',
    institutionName: 'Industrial Training Institute, Aundh Pune',
    graduationYear: 2024,
    skills: [
      { name: 'PCB Soldering & SMD Rework', level: 'Advanced', category: 'Electronics', verified: true },
      { name: 'Multimeter & Oscilloscope Testing', level: 'Advanced', category: 'Electronics', verified: true },
      { name: 'Microcontroller Programming (Arduino/8051)', level: 'Intermediate', category: 'Electronics', verified: true },
      { name: 'Sensors & Actuators Interfacing', level: 'Intermediate', category: 'Electronics', verified: false },
      { name: 'Inverters & UPS Servicing', level: 'Beginner', category: 'Electronics', verified: false }
    ],
    certifications: [
      'NCVT Trade Certificate in Electronics',
      'Skill India Embedded IoT Hands-on Badge'
    ],
    interests: ['Automation & IoT', 'Hardware Design', 'Electronics Hardware & PCB'],
    targetRole: 'Electronics Hardware & PCB Technician',
    preferredIndustry: 'Automotive & Electronics Manufacturing',
    locationPreference: 'Pune / Mumbai',
    workModePreference: 'On-site',
    salaryExpectation: '₹3.0 - 4.2 LPA',
    experienceLevel: 'Entry-Level',
    completedRoadmapTaskIds: ['task-pcb-1'],
    resumeText: 'Priya Sharma | Electronics Mechanic ITI | Skilled in SMD micro-soldering, oscilloscope signal debugging, and Arduino IoT sensor projects. NCVT gold medalist at regional skills competition.',
    resumeFileName: 'Priya_Sharma_Electronics_Resume.pdf',
    createdAt: '2026-01-15T09:00:00Z',
    lastUpdated: '2026-08-18T11:20:00Z'
  },
  {
    id: 'demo-student-3',
    name: 'Rahul Verma',
    email: 'rahul.verma@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    age: 22,
    location: 'Chennai, Tamil Nadu',
    education: 'ITI Certificate (2-Year)',
    itiTrade: 'Electrician',
    institutionName: 'Govt Industrial Training Institute, Guindy Chennai',
    graduationYear: 2023,
    skills: [
      { name: 'Electrical House & Industrial Wiring', level: 'Advanced', category: 'Electrical', verified: true },
      { name: 'Single & 3-Phase AC/DC Motor Maintenance', level: 'Advanced', category: 'Electrical', verified: true },
      { name: 'Industrial Safety & Earthing (IS Standards)', level: 'Advanced', category: 'Electrical', verified: true },
      { name: 'Circuit Breakers & Switchgears', level: 'Intermediate', category: 'Electrical', verified: true },
      { name: 'Solar PV Panel Installation', level: 'Intermediate', category: 'Electrical', verified: true },
      { name: 'PLC Programming (Siemens/Allen-Bradley)', level: 'Beginner', category: 'Automation', verified: false }
    ],
    certifications: [
      'TN State Electrical Wireman License Class-B',
      'NCVT Electrician Trade Certificate',
      'Schneider Electric Low Voltage Safety'
    ],
    interests: ['Electrical Maintenance', 'Renewable Solar Energy', 'Industrial Automation'],
    targetRole: 'Electrical Maintenance Technician',
    preferredIndustry: 'Power, Infrastructure & Heavy Industries',
    locationPreference: 'Chennai / Coimbatore / Bengaluru',
    workModePreference: 'On-site',
    salaryExpectation: '₹3.2 - 4.8 LPA',
    experienceLevel: 'Apprenticeship Completed',
    completedRoadmapTaskIds: ['task-elec-1', 'task-elec-2'],
    resumeText: 'Rahul Verma | Licensed Electrician | 1-Year National Apprenticeship at TANGEDCO substation. Hands-on expertise in 3-phase motor overhaul, star-delta panel wiring, earth pit testing, and solar grid tie systems.',
    resumeFileName: 'Rahul_Verma_Electrician_Resume.pdf',
    createdAt: '2026-02-01T08:30:00Z',
    lastUpdated: '2026-08-25T16:00:00Z'
  },
  {
    id: 'demo-student-4',
    name: 'Sneha Patil',
    email: 'sneha.patil@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    age: 20,
    location: 'Hyderabad, Telangana',
    education: 'ITI Certificate (2-Year)',
    itiTrade: 'Information Technology',
    institutionName: 'Govt ITI Mallepally, Hyderabad',
    graduationYear: 2024,
    skills: [
      { name: 'SQL', level: 'Intermediate', category: 'Database', verified: true },
      { name: 'Excel Advanced', level: 'Advanced', category: 'Database', verified: true },
      { name: 'Python', level: 'Intermediate', category: 'Programming', verified: true },
      { name: 'Power BI', level: 'Beginner', category: 'Database', verified: false },
      { name: 'Data Cleaning & Pandas', level: 'Beginner', category: 'Database', verified: false }
    ],
    certifications: [
      'NCVT National Trade Certificate (IT)',
      'Coursera Google Data Analytics Badge: Ask Questions & Clean Data'
    ],
    interests: ['Data Analytics', 'Business Intelligence', 'SQL Querying'],
    targetRole: 'Data Analyst',
    preferredIndustry: 'Fintech & Analytics Services',
    locationPreference: 'Hyderabad / Bengaluru / Remote',
    workModePreference: 'Hybrid',
    salaryExpectation: '₹3.8 - 5.0 LPA',
    experienceLevel: 'Entry-Level',
    completedRoadmapTaskIds: [],
    resumeText: 'Sneha Patil | ITI IT Graduate | Passionate data enthusiast with solid SQL queries, relational joins, and advanced Excel formulas (Pivot, XLOOKUP). Learning Power BI dashboard creation.',
    resumeFileName: 'Sneha_Patil_Data_Resume.pdf',
    createdAt: '2026-02-10T12:00:00Z',
    lastUpdated: '2026-08-22T09:15:00Z'
  },
  {
    id: 'demo-student-5',
    name: 'Vikram Singh',
    email: 'vikram.singh@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
    age: 23,
    location: 'Faridabad, Haryana',
    education: 'ITI Certificate (2-Year)',
    itiTrade: 'Machinist',
    institutionName: 'Govt ITI NH-4 Faridabad',
    graduationYear: 2023,
    skills: [
      { name: 'CNC Lathe Machine Operation', level: 'Advanced', category: 'Mechanical', verified: true },
      { name: 'Precision Measurement (Vernier, Micrometer, Height Gauge)', level: 'Advanced', category: 'Mechanical', verified: true },
      { name: 'Engineering Drawing & GD&T', level: 'Intermediate', category: 'Mechanical', verified: true },
      { name: 'CNC Milling & VMC Programming (G-Code/M-Code)', level: 'Beginner', category: 'Mechanical', verified: false },
      { name: '5S Workplace Organization', level: 'Intermediate', category: 'Soft Skills', verified: true }
    ],
    certifications: [
      'NCVT Certified Machinist',
      'Fanuc CNC Turning Certification'
    ],
    interests: ['Manufacturing & Mechanical', 'CNC Programming', 'Aerospace Machining'],
    targetRole: 'CNC Machine Operator & Programmer',
    preferredIndustry: 'Automotive & Precision Engineering',
    locationPreference: 'Delhi NCR / Manesar / Noida',
    workModePreference: 'On-site',
    salaryExpectation: '₹3.0 - 4.5 LPA',
    experienceLevel: '1-2 Years',
    completedRoadmapTaskIds: ['task-cnc-1'],
    resumeText: 'Vikram Singh | CNC Operator & Machinist | 18 months experience operating Fanuc Oi-TF 2-axis CNC turning centers in tier-1 automotive supplier. Zero dimensional rejection record over 5000 parts.',
    resumeFileName: 'Vikram_Singh_CNC_Resume.pdf',
    createdAt: '2026-02-14T15:00:00Z',
    lastUpdated: '2026-08-21T18:40:00Z'
  },
  {
    id: 'demo-student-6',
    name: 'Anita Das',
    email: 'anita.das@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
    age: 20,
    location: 'Kolkata, West Bengal',
    education: 'ITI Certificate (2-Year)',
    itiTrade: 'COPA',
    institutionName: 'Govt ITI Gariahat Kolkata',
    graduationYear: 2024,
    skills: [
      { name: 'HTML / CSS', level: 'Advanced', category: 'Web', verified: true },
      { name: 'JavaScript', level: 'Intermediate', category: 'Web', verified: true },
      { name: 'Git & GitHub', level: 'Beginner', category: 'Tools', verified: false },
      { name: 'React Basics', level: 'Beginner', category: 'Web', verified: false },
      { name: 'AutoCAD 2D Drafting', level: 'Beginner', category: 'Mechanical', verified: false }
    ],
    certifications: [
      'NCVT COPA Certified',
      'freeCodeCamp Responsive Web Design Certification'
    ],
    interests: ['Web Development', 'UI Design', 'Frontend Engineering'],
    targetRole: 'Web Developer (Frontend / Full Stack)',
    preferredIndustry: 'Digital Agencies & SaaS Startups',
    locationPreference: 'Kolkata / Bengaluru / Remote',
    workModePreference: 'Remote',
    salaryExpectation: '₹3.2 - 4.8 LPA',
    experienceLevel: 'Entry-Level',
    completedRoadmapTaskIds: [],
    resumeText: 'Anita Das | Frontend Web Developer | Hands-on project portfolio featuring responsive landing pages and interactive calculator apps using HTML5, modern CSS3 animations, and vanilla JavaScript.',
    resumeFileName: 'Anita_Das_Web_Resume.pdf',
    createdAt: '2026-02-20T10:00:00Z',
    lastUpdated: '2026-08-26T14:10:00Z'
  },
  {
    id: 'demo-student-7',
    name: 'Karthik Raja',
    email: 'karthik.raja@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80',
    age: 21,
    location: 'Coimbatore, Tamil Nadu',
    education: 'ITI Certificate (2-Year)',
    itiTrade: 'Instrument Mechanic',
    institutionName: 'Govt ITI Coimbatore',
    graduationYear: 2024,
    skills: [
      { name: 'Sensors & Actuators Interfacing', level: 'Advanced', category: 'Automation', verified: true },
      { name: 'PLC Programming (Siemens/Allen-Bradley)', level: 'Intermediate', category: 'Automation', verified: true },
      { name: 'Pneumatics & Hydraulics Systems', level: 'Intermediate', category: 'Mechanical', verified: true },
      { name: 'Multimeter & Oscilloscope Testing', level: 'Advanced', category: 'Electronics', verified: true },
      { name: 'SCADA Systems Basics', level: 'Beginner', category: 'Automation', verified: false },
      { name: 'VFD (Variable Frequency Drive) Parameterization', level: 'Beginner', category: 'Automation', verified: false }
    ],
    certifications: [
      'NCVT Trade Certificate in Instrument Mechanics',
      'Siemens Mechatronics Certified Associate'
    ],
    interests: ['Automation & IoT', 'Industrial Robotics', 'Smart Factories'],
    targetRole: 'Industrial Automation & PLC Technician',
    preferredIndustry: 'Automotive & Industrial Automation',
    locationPreference: 'Coimbatore / Chennai / Bengaluru',
    workModePreference: 'On-site',
    salaryExpectation: '₹3.6 - 5.2 LPA',
    experienceLevel: 'Entry-Level',
    completedRoadmapTaskIds: ['task-auto-1'],
    resumeText: 'Karthik Raja | Automation & Instrument Tech | Proficient in Siemens S7-1200 ladder logic, analog sensor calibration, electro-pneumatic valve manifolds, and closed-loop PID control loops.',
    resumeFileName: 'Karthik_Raja_Automation_Resume.pdf',
    createdAt: '2026-02-22T11:00:00Z',
    lastUpdated: '2026-08-27T10:00:00Z'
  },
  {
    id: 'demo-student-8',
    name: 'Manoj Patel',
    email: 'manoj.patel@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=256&q=80',
    age: 22,
    location: 'Ahmedabad, Gujarat',
    education: 'ITI Certificate (2-Year)',
    itiTrade: 'Draughtsman Mechanical',
    institutionName: 'Govt ITI Kubernagar, Ahmedabad',
    graduationYear: 2023,
    skills: [
      { name: 'AutoCAD 2D Drafting', level: 'Advanced', category: 'Mechanical', verified: true },
      { name: 'Engineering Drawing & GD&T', level: 'Advanced', category: 'Mechanical', verified: true },
      { name: 'SolidWorks 3D Modeling', level: 'Intermediate', category: 'Mechanical', verified: true },
      { name: 'Precision Measurement (Vernier, Micrometer, Height Gauge)', level: 'Intermediate', category: 'Mechanical', verified: true },
      { name: 'Fitting & Assembly Tolerances', level: 'Intermediate', category: 'Mechanical', verified: false }
    ],
    certifications: [
      'Autodesk Certified Professional: AutoCAD for Mechanical',
      'NCVT Draughtsman Mechanical Trade Certificate'
    ],
    interests: ['Manufacturing & Mechanical', '3D CAD Modeling', 'Heavy Machinery Design'],
    targetRole: 'Mechanical CAD Draughtsman',
    preferredIndustry: 'Heavy Engineering & Industrial Equipment',
    locationPreference: 'Ahmedabad / Vadodara / Surat',
    workModePreference: 'Hybrid',
    salaryExpectation: '₹3.2 - 4.6 LPA',
    experienceLevel: '1-2 Years',
    completedRoadmapTaskIds: ['task-cad-1'],
    resumeText: 'Manoj Patel | CAD Draughtsman | 1 year apprentice at industrial pump manufacturer. Created over 120 production drawings in AutoCAD and 3D exploded assemblies in SolidWorks with accurate bill of materials.',
    resumeFileName: 'Manoj_Patel_CAD_Resume.pdf',
    createdAt: '2026-02-25T14:00:00Z',
    lastUpdated: '2026-08-27T17:00:00Z'
  }
];

export const DEMO_JOBS: JobPosting[] = [
  {
    id: 'job-1',
    title: 'Junior Python & Backend Developer',
    company: 'Apex Technologies India (Sample Partner)',
    location: 'Bengaluru, Karnataka',
    city: 'Bengaluru',
    state: 'Karnataka',
    type: 'Full-time',
    workMode: 'Hybrid',
    experienceRequired: '0 - 1 Year (ITI COPA / Diploma)',
    salary: '₹3.6 - 4.8 LPA',
    postedDaysAgo: 2,
    openings: 4,
    description: 'Seeking energetic junior developers to assist in writing backend REST microservices, database queries in PostgreSQL/MySQL, and writing automation tests for cloud products.',
    targetRole: 'Junior Software Developer',
    industry: 'Software & IT',
    requiredSkills: [
      { name: 'Python', requiredLevel: 'Intermediate' },
      { name: 'SQL', requiredLevel: 'Intermediate' },
      { name: 'Git & GitHub', requiredLevel: 'Intermediate' },
      { name: 'REST APIs', requiredLevel: 'Beginner' }
    ],
    preferredCertifications: ['Python Certified Associate (PCAP)', 'NCVT COPA'],
    isDemoVerified: true,
    applicationDeadline: 'In 14 days'
  },
  {
    id: 'job-2',
    title: 'Associate Data & BI Analyst',
    company: 'FinSight Analytics Labs (Sample Partner)',
    location: 'Hyderabad, Telangana',
    city: 'Hyderabad',
    state: 'Telangana',
    type: 'Full-time',
    workMode: 'Remote',
    experienceRequired: 'Freshers / 0 - 2 Years',
    salary: '₹4.0 - 5.5 LPA',
    postedDaysAgo: 1,
    openings: 3,
    description: 'Work alongside senior business intelligence consultants to clean dataset extracts, build weekly KPI charts in Power BI, and write automated SQL aggregation jobs.',
    targetRole: 'Data Analyst',
    industry: 'Software & IT',
    requiredSkills: [
      { name: 'SQL', requiredLevel: 'Advanced' },
      { name: 'Power BI', requiredLevel: 'Intermediate' },
      { name: 'Excel Advanced', requiredLevel: 'Advanced' },
      { name: 'Data Cleaning & Pandas', requiredLevel: 'Beginner' }
    ],
    preferredCertifications: ['Microsoft Power BI (PL-300)', 'Google Data Analytics'],
    isDemoVerified: true,
    applicationDeadline: 'In 21 days'
  },
  {
    id: 'job-3',
    title: 'Junior Web & UI Developer',
    company: 'PixelCraft Digital Media (Sample Partner)',
    location: 'Pune, Maharashtra',
    city: 'Pune',
    state: 'Maharashtra',
    type: 'Full-time',
    workMode: 'Hybrid',
    experienceRequired: '0 - 1 Year',
    salary: '₹3.2 - 4.5 LPA',
    postedDaysAgo: 3,
    openings: 2,
    description: 'Build fast, responsive web pages and landing screens for e-commerce clients. Work with modern CSS frameworks, vanilla JavaScript, and integrate REST API endpoints.',
    targetRole: 'Web Developer (Frontend / Full Stack)',
    industry: 'Software & IT',
    requiredSkills: [
      { name: 'HTML / CSS', requiredLevel: 'Advanced' },
      { name: 'JavaScript', requiredLevel: 'Intermediate' },
      { name: 'Git & GitHub', requiredLevel: 'Beginner' },
      { name: 'REST APIs', requiredLevel: 'Beginner' }
    ],
    preferredCertifications: ['freeCodeCamp Web Responsive', 'NCVT COPA'],
    isDemoVerified: true,
    applicationDeadline: 'In 10 days'
  },
  {
    id: 'job-4',
    title: 'Industrial Electrical Technician',
    company: 'Voltech Engineering Services (Sample Partner)',
    location: 'Chennai, Tamil Nadu',
    city: 'Chennai',
    state: 'Tamil Nadu',
    type: 'Full-time',
    workMode: 'On-site',
    experienceRequired: 'ITI Electrician Passed (Freshers Welcome)',
    salary: '₹2.8 - 3.8 LPA + Shift Allowance',
    postedDaysAgo: 4,
    openings: 8,
    description: 'Responsible for plant electrical maintenance, 3-phase motor inspection, testing ACB/MCCB breakers, and executing weekly earth resistance measurement tests.',
    targetRole: 'Electrical Maintenance Technician',
    industry: 'Electrical & Power',
    requiredSkills: [
      { name: 'Electrical House & Industrial Wiring', requiredLevel: 'Advanced' },
      { name: 'Single & 3-Phase AC/DC Motor Maintenance', requiredLevel: 'Intermediate' },
      { name: 'Circuit Breakers & Switchgears', requiredLevel: 'Intermediate' },
      { name: 'Industrial Safety & Earthing (IS Standards)', requiredLevel: 'Advanced' }
    ],
    preferredCertifications: ['State Wireman License Class-B', 'NCVT Electrician'],
    isDemoVerified: true,
    applicationDeadline: 'In 7 days'
  },
  {
    id: 'job-5',
    title: 'Junior Automation & PLC Engineer Trainee',
    company: 'RoboTech Automation Systems (Sample Partner)',
    location: 'Coimbatore, Tamil Nadu',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    type: 'Apprenticeship',
    workMode: 'On-site',
    experienceRequired: 'ITI Instrument / Electronics / Electrician',
    salary: '₹3.4 - 4.6 LPA',
    postedDaysAgo: 2,
    openings: 5,
    description: 'Assisting project leads in commissioning Siemens S7 PLC panels, testing pneumatic actuators and optical sensors on robotic packaging conveyors.',
    targetRole: 'Industrial Automation & PLC Technician',
    industry: 'Automation & IoT',
    requiredSkills: [
      { name: 'PLC Programming (Siemens/Allen-Bradley)', requiredLevel: 'Intermediate' },
      { name: 'Sensors & Actuators Interfacing', requiredLevel: 'Intermediate' },
      { name: 'Pneumatics & Hydraulics Systems', requiredLevel: 'Beginner' },
      { name: 'Multimeter & Oscilloscope Testing', requiredLevel: 'Intermediate' }
    ],
    preferredCertifications: ['Siemens Automation Certificate', 'NCVT Instrument Mechanic'],
    isDemoVerified: true,
    applicationDeadline: 'In 18 days'
  },
  {
    id: 'job-6',
    title: 'CNC Turning & VMC Operator',
    company: 'Precision Components India Ltd (Sample Partner)',
    location: 'Manesar, Haryana',
    city: 'Manesar',
    state: 'Haryana',
    type: 'Full-time',
    workMode: 'On-site',
    experienceRequired: 'ITI Machinist / Turner (0-2 Yrs)',
    salary: '₹3.0 - 4.2 LPA + Overtime',
    postedDaysAgo: 5,
    openings: 6,
    description: 'Operating 2-axis and 3-axis CNC turning machines, setting cutting tool offsets, inspecting finished aerospace pins using Vernier calipers and micrometers.',
    targetRole: 'CNC Machine Operator & Programmer',
    industry: 'Manufacturing & Mechanical',
    requiredSkills: [
      { name: 'CNC Lathe Machine Operation', requiredLevel: 'Advanced' },
      { name: 'Precision Measurement (Vernier, Micrometer, Height Gauge)', requiredLevel: 'Advanced' },
      { name: 'Engineering Drawing & GD&T', requiredLevel: 'Intermediate' },
      { name: '5S Workplace Organization', requiredLevel: 'Intermediate' }
    ],
    preferredCertifications: ['NCVT Machinist Certificate', 'Fanuc CNC Turning'],
    isDemoVerified: true,
    applicationDeadline: 'In 12 days'
  },
  {
    id: 'job-7',
    title: 'Mechanical Draughtsman (AutoCAD / SolidWorks)',
    company: 'EquipDesign Engineering (Sample Partner)',
    location: 'Ahmedabad, Gujarat',
    city: 'Ahmedabad',
    state: 'Gujarat',
    type: 'Full-time',
    workMode: 'Hybrid',
    experienceRequired: 'ITI Draughtsman Mechanical (0-1 Yr)',
    salary: '₹3.0 - 4.4 LPA',
    postedDaysAgo: 6,
    openings: 3,
    description: 'Prepare accurate 2D manufacturing drawings, update 3D assembly models in SolidWorks, and compile bill-of-materials for heavy boiler and vessel fabrication.',
    targetRole: 'Mechanical CAD Draughtsman',
    industry: 'Manufacturing & Mechanical',
    requiredSkills: [
      { name: 'AutoCAD 2D Drafting', requiredLevel: 'Advanced' },
      { name: 'SolidWorks 3D Modeling', requiredLevel: 'Intermediate' },
      { name: 'Engineering Drawing & GD&T', requiredLevel: 'Intermediate' }
    ],
    preferredCertifications: ['Autodesk Certified AutoCAD', 'NCVT Draughtsman'],
    isDemoVerified: true,
    applicationDeadline: 'In 15 days'
  },
  {
    id: 'job-8',
    title: 'SMD Soldering & PCB Assembly Technician',
    company: 'Cirtronics Embedded Solutions (Sample Partner)',
    location: 'Pune, Maharashtra',
    city: 'Pune',
    state: 'Maharashtra',
    type: 'Full-time',
    workMode: 'On-site',
    experienceRequired: 'ITI Electronics Mechanic (Freshers)',
    salary: '₹2.7 - 3.8 LPA',
    postedDaysAgo: 1,
    openings: 10,
    description: 'Hands-on SMD soldering of 0603/0805 components under microscope, circuit continuity checks, programming bootloaders onto microcontrollers, and QA inspection.',
    targetRole: 'Electronics Hardware & PCB Technician',
    industry: 'Electronics & Hardware',
    requiredSkills: [
      { name: 'PCB Soldering & SMD Rework', requiredLevel: 'Advanced' },
      { name: 'Multimeter & Oscilloscope Testing', requiredLevel: 'Advanced' },
      { name: 'Microcontroller Programming (Arduino/8051)', requiredLevel: 'Beginner' }
    ],
    preferredCertifications: ['IPC Soldering Certification', 'NCVT Electronics'],
    isDemoVerified: true,
    applicationDeadline: 'In 9 days'
  },
  {
    id: 'job-9',
    title: 'Junior QA Test Associate (Web & APIs)',
    company: 'CloudAssure Quality Labs (Sample Partner)',
    location: 'Noida, Uttar Pradesh',
    city: 'Noida',
    state: 'Uttar Pradesh',
    type: 'Full-time',
    workMode: 'Hybrid',
    experienceRequired: '0 - 1 Year (ITI COPA / IT)',
    salary: '₹3.2 - 4.6 LPA',
    postedDaysAgo: 3,
    openings: 4,
    description: 'Write manual test scripts, verify database tables via SQL queries, log tickets in Jira, and conduct cross-browser compatibility tests for fintech web portals.',
    targetRole: 'QA & Software Test Associate',
    industry: 'Software & IT',
    requiredSkills: [
      { name: 'Manual QA & Test Cases', requiredLevel: 'Advanced' },
      { name: 'SQL', requiredLevel: 'Intermediate' },
      { name: 'HTML / CSS', requiredLevel: 'Intermediate' },
      { name: 'Technical English & Documentation', requiredLevel: 'Intermediate' }
    ],
    preferredCertifications: ['ISTQB Foundation', 'NCVT COPA'],
    isDemoVerified: true,
    applicationDeadline: 'In 16 days'
  },
  {
    id: 'job-10',
    title: 'Network Operations & Desktop Support Associate',
    company: 'NetSphere Enterprise IT (Sample Partner)',
    location: 'Bengaluru, Karnataka',
    city: 'Bengaluru',
    state: 'Karnataka',
    type: 'Full-time',
    workMode: 'On-site',
    experienceRequired: 'ITI IT / COPA Passed',
    salary: '₹3.0 - 4.2 LPA',
    postedDaysAgo: 4,
    openings: 5,
    description: 'Configure corporate Wi-Fi and VLANs, terminate RJ45 structured cabling in server racks, install Windows 11/Linux images, and troubleshoot hardware issues.',
    targetRole: 'Network & IT Support Technician',
    industry: 'Software & IT',
    requiredSkills: [
      { name: 'Computer Networking (TCP/IP, LAN)', requiredLevel: 'Advanced' },
      { name: 'Operating System Installation & Troubleshooting', requiredLevel: 'Advanced' },
      { name: 'Computer Hardware & Assembly', requiredLevel: 'Intermediate' },
      { name: 'Linux Basics', requiredLevel: 'Beginner' }
    ],
    preferredCertifications: ['CompTIA Network+', 'Cisco CCNA Associate'],
    isDemoVerified: true,
    applicationDeadline: 'In 20 days'
  },
  {
    id: 'job-11',
    title: 'Python Automation & Scripting Trainee',
    company: 'InfraFlow Technologies (Sample Partner)',
    location: 'Hyderabad, Telangana',
    city: 'Hyderabad',
    state: 'Telangana',
    type: 'Apprenticeship',
    workMode: 'Hybrid',
    experienceRequired: 'Fresh ITI Graduates',
    salary: '₹3.2 - 4.2 LPA',
    postedDaysAgo: 7,
    openings: 3,
    description: 'Develop Python scripts for file parsing, automated database extraction, and system status notification webhooks. Great mentorship program for ITI talent.',
    targetRole: 'Junior Software Developer',
    industry: 'Software & IT',
    requiredSkills: [
      { name: 'Python', requiredLevel: 'Intermediate' },
      { name: 'SQL', requiredLevel: 'Intermediate' },
      { name: 'Linux Basics', requiredLevel: 'Beginner' }
    ],
    preferredCertifications: ['Python PCEP', 'NCVT COPA'],
    isDemoVerified: true,
    applicationDeadline: 'In 11 days'
  },
  {
    id: 'job-12',
    title: 'Solar Power Plant Maintenance Technician',
    company: 'SunGrid Renewable Power (Sample Partner)',
    location: 'Ahmedabad, Gujarat',
    city: 'Ahmedabad',
    state: 'Gujarat',
    type: 'Full-time',
    workMode: 'On-site',
    experienceRequired: 'ITI Electrician (0-2 Yrs)',
    salary: '₹3.0 - 4.5 LPA',
    postedDaysAgo: 5,
    openings: 7,
    description: 'Perform string inverter inspection, DC combiner box maintenance, solar string IV-curve measurement, and substation switchyard safety checks.',
    targetRole: 'Electrical Maintenance Technician',
    industry: 'Electrical & Power',
    requiredSkills: [
      { name: 'Solar PV Panel Installation', requiredLevel: 'Intermediate' },
      { name: 'Electrical House & Industrial Wiring', requiredLevel: 'Advanced' },
      { name: 'Industrial Safety & Earthing (IS Standards)', requiredLevel: 'Advanced' },
      { name: 'Single & 3-Phase AC/DC Motor Maintenance', requiredLevel: 'Intermediate' }
    ],
    preferredCertifications: ['Suryamitra Skill Certification', 'Wireman License'],
    isDemoVerified: true,
    applicationDeadline: 'In 13 days'
  }
];

export const LEARNING_RESOURCES = [
  {
    id: 'res-py-1',
    title: 'Python for Beginners & Automation',
    provider: 'NPTEL / IIT Madras & Swayam',
    skillTarget: 'Python',
    type: 'Course',
    durationWeeks: 4,
    level: 'Beginner',
    isFree: true,
    link: 'https://swayam.gov.in/nptel'
  },
  {
    id: 'res-sql-1',
    title: 'Relational Database Design & SQL Mastery',
    provider: 'Bharat Skills (DGT Govt. of India)',
    skillTarget: 'SQL',
    type: 'Course',
    durationWeeks: 3,
    level: 'Intermediate',
    isFree: true,
    link: 'https://bharatskills.gov.in'
  },
  {
    id: 'res-pbi-1',
    title: 'Microsoft Power BI Complete Dashboarding',
    provider: 'Microsoft Learn / Coursera',
    skillTarget: 'Power BI',
    type: 'Course',
    durationWeeks: 3,
    level: 'Intermediate',
    isFree: true,
    link: 'https://learn.microsoft.com/en-us/power-bi/'
  },
  {
    id: 'res-git-1',
    title: 'Version Control with Git & GitHub',
    provider: 'GitHub Skills Lab & FreeCodeCamp',
    skillTarget: 'Git & GitHub',
    type: 'Project',
    durationWeeks: 1,
    level: 'Beginner',
    isFree: true,
    link: 'https://skills.github.com'
  },
  {
    id: 'res-plc-1',
    title: 'Industrial PLC Programming with Ladder Logic',
    provider: 'Siemens SITRAIN & NPTEL',
    skillTarget: 'PLC Programming (Siemens/Allen-Bradley)',
    type: 'Course',
    durationWeeks: 4,
    level: 'Intermediate',
    isFree: true,
    link: 'https://www.sitrain-learning.siemens.com'
  },
  {
    id: 'res-cad-1',
    title: 'AutoCAD 2D Mechanical Blueprint Drafting',
    provider: 'Autodesk Design Academy',
    skillTarget: 'AutoCAD 2D Drafting',
    type: 'Course',
    durationWeeks: 2,
    level: 'Intermediate',
    isFree: true,
    link: 'https://academy.autodesk.com'
  }
];

export const INSTITUTION_ANALYTICS_DATA: InstitutionAnalytics = {
  totalStudents: 486,
  averageReadiness: 64.8,
  topSkillGaps: [
    { skill: 'Git & GitHub (Version Control)', count: 218, percentage: 44.8, trade: 'COPA & IT' },
    { skill: 'Power BI / Dashboarding', count: 184, percentage: 37.8, trade: 'COPA & IT' },
    { skill: 'PLC Ladder Logic Programming', count: 142, percentage: 29.2, trade: 'Electrician & Instrument' },
    { skill: 'CNC G/M Code Simulation', count: 119, percentage: 24.4, trade: 'Machinist & Turner' },
    { skill: 'Industrial Safety & Earthing (IS 3043)', count: 96, percentage: 19.7, trade: 'Electrician & Wireman' },
    { skill: 'Cloud Fundamentals (AWS/GCP)', count: 91, percentage: 18.7, trade: 'COPA & IT' }
  ],
  desiredRolesDistribution: [
    { role: 'Junior Software Developer', count: 142, percentage: 29.2 },
    { role: 'Electrical Maintenance Technician', count: 115, percentage: 23.6 },
    { role: 'Data Analyst', count: 84, percentage: 17.2 },
    { role: 'CNC Operator & Programmer', count: 62, percentage: 12.8 },
    { role: 'Industrial Automation & PLC Tech', count: 48, percentage: 9.9 },
    { role: 'Electronics Hardware & PCB Tech', count: 35, percentage: 7.3 }
  ],
  readinessDistribution: [
    { category: 'Job Ready (80 - 100%)', count: 112, percentage: 23.0, color: '#10b981' },
    { category: 'Industry Aligned (65 - 79%)', count: 218, percentage: 44.9, color: '#3b82f6' },
    { category: 'Developing Competency (50 - 64%)', count: 114, percentage: 23.5, color: '#f59e0b' },
    { category: 'Needs Foundation (< 50%)', count: 42, percentage: 8.6, color: '#ef4444' }
  ],
  trainingPriorities: [
    {
      skill: 'Git & GitHub Collaboration Workflows',
      priority: 'Critical',
      affectedStudents: 218,
      recommendedAction: 'Schedule a 2-week hands-on lab workshop linking student projects to public GitHub repositories.',
      targetTrades: ['COPA', 'Information Technology']
    },
    {
      skill: 'Industrial PLC Ladder Logic Simulation',
      priority: 'Critical',
      affectedStudents: 142,
      recommendedAction: 'Provision open-source PLC software simulators in ITI electrical labs before semester exams.',
      targetTrades: ['Electrician', 'Instrument Mechanic', 'Electronics']
    },
    {
      skill: 'Power BI & Automated Reporting',
      priority: 'High',
      affectedStudents: 184,
      recommendedAction: 'Integrate Microsoft Power BI Desktop modules into the existing COPA vocational database syllabus.',
      targetTrades: ['COPA', 'Information Technology']
    },
    {
      skill: 'CNC G-Code / M-Code Virtual Simulation',
      priority: 'High',
      affectedStudents: 119,
      recommendedAction: 'Conduct CNC Dry-Run programming sessions using CNCez or SwanSoft simulators.',
      targetTrades: ['Machinist', 'Turner', 'Tool & Die']
    },
    {
      skill: 'Technical English & Interview Documentation',
      priority: 'Medium',
      affectedStudents: 240,
      recommendedAction: 'Conduct weekly mock technical interview panels and resume formatting clinics.',
      targetTrades: ['All ITI Trades']
    }
  ],
  tradePerformance: [
    { trade: 'COPA (Comp. Operator)', students: 168, avgReadiness: 68.2, topRole: 'Junior Software Developer', topGap: 'Git & GitHub', placementReadyPercentage: 32 },
    { trade: 'Electrician', students: 134, avgReadiness: 66.5, topRole: 'Electrical Maintenance Tech', topGap: 'PLC Automation', placementReadyPercentage: 28 },
    { trade: 'Electronics Mechanic', students: 64, avgReadiness: 63.1, topRole: 'Electronics Hardware Tech', topGap: 'Microcontroller UART', placementReadyPercentage: 22 },
    { trade: 'Machinist & Turner', students: 72, avgReadiness: 61.4, topRole: 'CNC Machine Operator', topGap: 'VMC Canned Cycles', placementReadyPercentage: 20 },
    { trade: 'Draughtsman Mechanical', students: 48, avgReadiness: 64.9, topRole: 'Mechanical CAD Draughtsman', topGap: 'SolidWorks 3D Mates', placementReadyPercentage: 25 }
  ],
  monthlyReadinessTrend: [
    { month: 'Oct 2025', averageScore: 48.2, industryInterviews: 12, skillsMastered: 140 },
    { month: 'Nov 2025', averageScore: 52.4, industryInterviews: 18, skillsMastered: 210 },
    { month: 'Dec 2025', averageScore: 56.1, industryInterviews: 24, skillsMastered: 320 },
    { month: 'Jan 2026', averageScore: 59.8, industryInterviews: 38, skillsMastered: 460 },
    { month: 'Feb 2026', averageScore: 62.5, industryInterviews: 52, skillsMastered: 610 },
    { month: 'Mar 2026', averageScore: 64.8, industryInterviews: 74, skillsMastered: 780 }
  ]
};
