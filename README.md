# 🅿️ ParkNow - Vehicle Parking Management System

Welcome to **ParkNow**, a modern and intuitive parking management platform built to simplify the way drivers book parking spaces and help administrators manage operations efficiently.

Whether you're a driver looking for a convenient parking spot or an administrator overseeing the parking facility, ParkNow makes the entire experience seamless and hassle-free.

<img src="public/image.jpeg">

## ✨ What You Can Do

### 🚗 For Drivers
- **Find Available Spots** - View real-time parking availability with an interactive slot map
- **Book in Seconds** - Smart automatic slot recommendation makes booking effortless
- **Manage Your Vehicles** - Register and track multiple vehicles from one account
- **Track Your Spending** - View detailed billing and booking history
- **Share Your Feedback** - Help us improve by submitting service feedback

### 🛡️ For Administrators
- **Monitor Operations** - View key metrics like occupancy rates, revenue, and active sessions
- **Control Parking Slots** - Manage slot availability and set pricing
- **Manage Users** - Oversee driver accounts and admin permissions
- **Track Activity** - Complete audit logs of all system activities for compliance

## 🛠️ Built With Best Practices

**Framework & Tools:**
- **Spring Boot 3.x** - Modern Java framework for fast development
- **Spring Security** - Secure login with encrypted passwords and CSRF protection
- **CSV-based Storage** - No database setup needed, all data stored locally
- **Maven** - Reliable build and project management

**Smart Features Under the Hood:**
- **LIFO Slot Allocation** - Uses a stack-based algorithm to prioritize recently freed parking spots
- **Efficient Sorting** - Quick sort implementation for fast search results across the platform
- **Thread-Safe Operations** - Handles multiple users booking simultaneously without conflicts

## 📂 Project Organization

```
src/main/java/com/example/vehicle_parking_management_system/
├── config/      → Security settings and application configuration
├── model/       → Core data objects (User, Admin, Slot, Booking, etc.)
├── repository/  → Data access layer (reads/writes to CSV files)
├── service/     → Business logic (booking, pricing, validation)
├── util/        → Helper tools (stack structure, sorting, logging)
└── web/         → Web pages and API endpoints
```

## � Quick Start

### What You Need
- **Java 17** or newer
- **Maven** (included in the repository)

### Get It Running (3 Steps)

**1. Clone the repository:**
```bash
git clone https://github.com/your-username/Vehicle-parking-management-system.git
cd Vehicle-parking-management-system
```

**2. Run the application:**
```bash
./mvnw spring-boot:run
```
> On Windows, use: `mvnw.cmd spring-boot:run`

**3. Open in your browser:**
```
http://localhost:8080
```

### 🔓 Try It Out - Test Accounts

Use these credentials to explore the system:

| Role | Email | Username | Password |
|------|-------|----------|----------|
| **Admin** | a@gmail.com | a | a |
| **Driver** | b@gmail.com | b | b |

> **Tip:** Sign up as a new driver to explore the full registration flow!

## 🔒 Security & Privacy

Your data is protected with industry-standard security:
- **Encrypted Passwords** - All passwords are securely hashed using BCrypt
- **Role-Based Access** - Different features for drivers and administrators
- **Session Security** - Automatic logout and secure session management
- **Attack Prevention** - Built-in CSRF protection against malicious requests
- **Public Access** - Home page, parking map, and registration are open for guests to explore

## � How Data Is Stored

All your data is stored locally in simple CSV files - no complex database needed:

- **users.csv** - Driver accounts and passwords
- **admins.csv** - Administrator accounts  
- **slots.csv** - Current parking lot status
- **reservations.csv** - Booking history
- **vehicles.csv** - Registered vehicles
- **feedbacks.csv** - User feedback submissions

This makes ParkNow lightweight, portable, and easy to backup!

## 👥 Contributors

- [@SayuruPabasara](https://github.com/SayuruPabasara)
- [@AdhithyaSS](https://github.com/AdhithyaSS)
- [@Thesvgmlwr](https://github.com/Thesvgmlwr)
- [@AshinsaBowalage](https://github.com/AshinsaBowalage)
- [@Sasika-Dodanwela](https://github.com/Sasika-Dodanwela)
- [@IsuruWeerasinghe3](https://github.com/IsuruWeerasinghe3)

## 🤝 Want to Contribute?

We'd love your help! Here's how to get involved:

1. **Fork** the project on GitHub
2. **Create** a new branch for your feature (`git checkout -b feature/YourBrilliantIdea`)
3. **Make** your changes and commit (`git commit -m 'Add YourBrilliantIdea'`)
4. **Push** to your branch (`git push origin feature/YourBrilliantIdea`)
5. **Open** a Pull Request and describe your changes

That's it! We'll review and merge your contribution.

## 📄 License

This project is licensed under the **Apache License 2.0**. See the license headers in the source code for details.
