# SETUP

### Frontend

### `cd frontend && npm install &&  npm run start`

### Backend

### `cd backend && npm install && npm run start`

# System Design Documents

    Architecture Diagram: Please see the `coding_quiz_architecture.drawio.png`

# Component Descriptions

### Frontend

    Technology: ReactJS hosted on AWS S3

    Purpose: Serves the user interface for the application.

    Role: Provides users with a seamless experience to join quiz rooms, interact with questions, and view results in real-time.

    Integration: Communicates with the backend through REST APIs and WebSocket connections to synchronize data and real-time updates.

    Cloudfront Integration: Ensures content delivery is fast and secure by serving the React application through AWS Cloudfront, which caches assets closer to end-users.

### Backend

AWS S3

    Purpose: Simple Storage Service for hosting and storing data.

    Role:

    Hosts the static ReactJS application files.

    Stores application and infrastructure logs for debugging and monitoring.

    Serves as a scalable and durable storage solution for application-related assets (e.g., images or quiz-related data).


Cloudfront

    Purpose: Content Delivery Network (CDN) for global distribution.

    Role:

    Accelerates delivery of the ReactJS frontend by caching assets at edge locations closer to end-users.

    Reduces latency and improves load times for the application interface.

    Secures data transmission by enabling HTTPS connections.


AWS VPC (Virtual Private Cloud)

    Purpose: Provides a logically isolated network for the application’s resources.

    Role:

    Secures backend servers and databases from unauthorized access by defining private and public subnets.

    Ensures internal communication within the application remains protected.

    Facilitates secure communication between EC2 instances, databases, and other AWS services.


Internet Gateways

    Purpose: Enable VPC internet access using internet gateways

    Role: Allows communication between your VPC and the internet

Application Load Balancer

    Purpose: Handle incoming traffic

    Role: Distribute incoming traffic evenly across multiple backend servers, ensuring high availability and reliability of the application. This also helps in handling larger user loads efficiently

NAT Gateways:

    Purpose: Enable EC2 using internet gateways

    Role: Allow instances in a private subnet can connect to services outside your VPC but external services cannot initiate a connection with those instances


Technology: Node.js with Express hosted on AWS EC2

    Purpose: Acts as the central server for handling application logic and orchestrating communication between components.

    Role:

    Handles user authentication and room management (e.g., creating and joining rooms).

    Facilitates quiz operations, such as distributing questions and collecting answers.

    Manages API endpoints for interacting with the DynamoDB database and user data.

    Socket.io Integration: Manages real-time communication between users via WebSockets, ensuring quizzes operate synchronously across all participants in a room.


Database

    Technology: AWS DynamoDB

    DynamoDB:

    Purpose: A NoSQL database designed to handle unstructured and scalable data.

    Role: Stores dynamic application data such as room details, active quizzes, and participant scores.

CloudWatch

    Purpose: Centralized monitoring and logging solution.

    Role:

    Collects and monitors logs from EC2, DynamoDB, and S3.

    Provides real-time metrics about the application’s performance and availability.

    Alerts the development and operations team to anomalies or infrastructure issues.

Socket.io

    Purpose: Enables real-time communication between users and the backend.

    Role:

    Handles bi-directional WebSocket connections.

    Synchronizes quiz states across participants (e.g., showing the same question to all users in a room simultaneously).

    Manages live user events like room joining, quiz answering, and score updates.

Flow Summary

    Frontend: Delivers the user interface via Cloudfront and S3.

    Backend: Hosted on EC2, processes user requests, quiz operations, and interacts with the database.

    Database: DynamoDB handles dynamic data information.

    VPC: Secures and segregates resources into public/private zones.

    Cloudfront: Distributes frontend content globally with low latency.

    CloudWatch: Monitors and logs application performance.

    Socket.io: Ensures real-time, synchronized quiz functionality.

    Application Load Balancer: Distribute incoming traffic evenly across multiple backend servers

# Data Flow

User Participation:

    A user joins a quiz room via the frontend application, which sends a request to the backend through REST APIs or Socket.io events.

    The backend validates the user’s session and assigns them to the specified room.

Quiz Initialization:

    When the quiz starts, the backend retrieves questions from the DynamoDB database and broadcasts them to all participants in the room using Socket.io.

    The frontend updates in real-time to display the current question to each user.

Answer Submission:

    Users submit their answers through the frontend, which sends the data to the backend via WebSocket.

    The backend validates the answers and stores them in DynamoDB, associating them with the respective user and room.

Score Calculation:

    After each question or at the end of the quiz, the backend calculates scores based on the correctness and timing of answers.

    Scores are updated in DynamoDB for dynamic data storage and historical tracking, respectively.

Leaderboard Updates:

    The backend retrieves the latest scores from DynamoDB and computes the leaderboard.

    The updated leaderboard is broadcast to all participants in the room via Socket.io, ensuring real-time synchronization.

    The frontend displays the leaderboard instantly to users.

# Technology Justification

    ReactJS: Selected for its ability to build a dynamic and responsive user interface, with a large ecosystem and developer support.

    Node.js with Express: Chosen for its non-blocking, event-driven architecture, making it ideal for real-time applications and handling WebSocket connections.

    Socket.io: Enables real-time, low-latency communication between clients and the server, essential for quiz synchronization.

    AWS DynamoDB: Provides high availability and scalability for storing real-time and unstructured data like quiz states and participant scores.

    AWS S3 and Cloudfront: Combines secure and scalable static asset hosting with global content delivery for enhanced performance.

    AWS VPC: Ensures security and isolation of infrastructure resources to meet compliance and protect data.

    CloudWatch: Facilitates comprehensive monitoring and debugging, reducing downtime and improving system reliability.


