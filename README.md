# Car Rental Angular Project

## Overview
This Angular project is a car rental management system with separate interfaces for customers and administrators. The application allows customers to browse cars, make bookings, and provide feedback, while administrators can manage the car inventory and process booking requests.

## Features

### Customer Features
- User Registration and Login
- Browse available cars
  
<!-- Image removed as per request. No photo will be added here. -->



- View booking status
- Submit feedback
- Manage user profile

### Admin Features
- Admin Dashboard
- Car Management (Add, Update, Delete)
- Search car functionality
- Process booking requests (Accept/Reject)
- Update car information
- Delete car listings

## Project Structure

```
car-rental-app/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── car-management/
│   │   │   │   ├── login/
│   │   │   │   └── booking-management/
│   │   │   ├── customer/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── registration/
│   │   │   │   ├── login/
│   │   │   │   ├── booking/
│   │   │   │   └── feedback/
│   │   │   └── shared/
│   │   │       ├── header/
│   │   │       ├── footer/
│   │   │       └── car-card/
│   │   ├── models/
│   │   │   ├── user.model.ts
│   │   │   ├── car.model.ts
│   │   │   ├── booking.model.ts
│   │   │   └── feedback.model.ts
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── car.service.ts
│   │   │   ├── booking.service.ts
│   │   │   └── feedback.service.ts
│   │   ├── guards/
│   │   │   ├── auth.guard.ts
│   │   │   └── admin.guard.ts
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.module.ts
│   │   └── app-routing.module.ts
│   ├── assets/
│   ├── environments/
│   │   ├── environment.ts
│   │   └── environment.prod.ts
│   ├── index.html
│   └── styles.scss
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

### Prerequisites
- Node.js (v16+)
- Angular CLI (v15+)
- npm or yarn

### Setup Instructions
1. Clone the repository
   ```
   git clone https://github.com/yourusername/car-rental-angular.git
   ```

2. Navigate to the project directory
   ```
   cd car-rental-angular
   ```

3. Install dependencies
   ```
   npm install
   ```

4. Run the development server
   ```
   ng serve
   ```

5. Open your browser and navigate to `http://localhost:4200`

## User Flow

### Customer Journey
1. Register a new account or login
2. Browse available cars on the dashboard
3. Select a car and make a booking
4. View booking status on customer dashboard
5. Provide feedback after using the service
6. Logout

### Admin Journey
1. Login to admin portal
2. View all cars and bookings in the admin dashboard
3. Add, update, or delete cars from inventory
4. Accept or reject booking requests
5. Logout

## Development Guidelines

### Coding Standards
- Follow Angular style guide
- Use TypeScript interfaces for models
- Implement proper component structure
- Utilize Angular services for data management
- Implement guards for route protection

### Testing
- Write unit tests for components and services
- Implement end-to-end tests for critical user flows

## Deployment
1. Build production-ready files
   ```
   ng build --prod
   ```

2. Deploy the contents of the `dist/` folder to your hosting provider

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License
This project is licensed under the MIT License