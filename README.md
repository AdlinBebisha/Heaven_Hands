# HeavenHands

**HeavenHands** is a full-stack web application designed to connect donors, volunteers, and orphanages/NGOs. The platform enables:

* **Donors** to donate items, food, and money
* **Orphanages** to request essential supplies and claim available donations
* **Volunteers** to pick up and deliver donations

This repository contains both the Spring Boot backend and the React frontend.

---

## 📦 Repository Structure

```
/heavenhands
├── backend                  # Spring Boot API server
│   ├── src/main/java/...    # Java source code
│   ├── src/main/resources  
│   ├── pom.xml              # Maven config
├── frontend                 # React application
│   ├── src                  # React components & pages
│   ├── public
│   ├── package.json         # npm config
├── README.md                # This file
└── .gitignore
```

---

## ⚙️ Technology Stack

* **Backend:** Java, Spring Boot, Spring Data JPA, Hibernate, MySQL/PostgreSQL
* **Frontend:** React, React Router, Tailwind CSS, Framer Motion
* **Authentication:** Spring Security (BCrypt password hashing)
* **Email Notifications:** JavaMailSender
* **Build & Run:** Maven, npm/yarn

---

## 🚀 Prerequisites

1. **Java 17+** (JDK)
2. **Maven 3.6+**
3. **Node.js 14+** & **npm** or **yarn**
4. **MySQL** or **PostgreSQL** database

---

## 🔧 Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-org/heavenhands.git
cd heavenhands
```

### 2. Configure the backend

1. Navigate to `/backend`
2. Copy `application.properties.example` to `application.properties`
3. Set your database credentials and mail sender properties:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/heavenhands
   spring.datasource.username=db_user
   spring.datasource.password=db_pass

   spring.mail.host=smtp.gmail.com
   spring.mail.port=587
   spring.mail.username=your-email@gmail.com
   spring.mail.password=your-email-password
   ```
4. Build and run:

   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

### 3. Configure the frontend

1. Navigate to `/frontend`
2. Install dependencies:

   ```bash
   npm install   # or yarn install
   ```
3. Start development server:

   ```bash
   npm start     # or yarn start
   ```
4. The React app will run on `http://localhost:3000`

---

## 📑 API Endpoints

### Authentication

* `POST /api/auth/login` & `POST /api/users/signup`
* `POST /api/reset/forgot-password`, `POST /api/reset/reset-password`

### Donor APIs

* **Item Donations:**

  * `POST /api/item-donations/submit`
  * `GET  /api/item-donations/available`
  * `POST /api/item-donations/{id}/claim`
* **Food Donations:**

  * `POST /api/food-donations/submit`
  * `GET  /api/food-donations/available`
  * `POST /api/food-donations/{id}/claim`
* **Money Donations:**

  * `POST /api/money-donations/submit`
  * `GET  /api/money-donations/available`
  * `POST /api/money-donations/{id}/claim`

### Orphanage APIs

* **Requests:**

  * `POST /api/item-requests`
  * `POST /api/food-requests`
  * `POST /api/money-requests`
  * `GET  /api/requests/available`
  * `POST /api/requests/{type}/{id}/notify`
* **Donations Available:**

  * `GET  /api/item-donations/available`
  * `GET  /api/food-donations/available`
  * `GET  /api/money-donations/available`

### Volunteer APIs

* **Tasks:**

  * `GET  /api/tasks/available`
  * `POST /api/tasks/{type}/{id}/claim`
  * `GET  /api/tasks/claimed?volunteerEmail=...`
  * `PUT  /api/tasks/{type}/{id}/status`

---

## 🌐 Frontend Routes

| Route                       | Component                |
| --------------------------- | ------------------------ |
| `/login`                    | LoginPage                |
| `/signup`                   | SignupPage               |
| `/forgot-password`          | ForgotPasswordPage       |
| `/reset-password?token=...` | ResetPasswordPage        |
| `/donor-dashboard`          | DonorDashboardHome       |
| `/donate-items`             | DonateItemsPage          |
| `/donate-food`              | DonateFoodPage           |
| `/donate-money`             | DonateMoneyPage          |
| `/requested-donation`       | RequestedDonationPage    |
| `/orphanage-dashboard`      | OrphanageDashboardHome   |
| `/available-donation`       | AvailableDonationPage    |
| `/claim-item`               | ClaimItemsPage           |
| `/claim-food`               | RequestFoodDonationPage  |
| `/claim-money`              | RequestMoneyDonationPage |
| `/volunteer-dashboard`      | VolunteerDashboard       |
| `/available-tasks`          | AvailableTasksPage       |
| `/claimed-task`             | ClaimedTasksPage         |

---

## 📝 Environment Variables

| Key                      | Description                                        |
| ------------------------ | -------------------------------------------------- |
| `REACT_APP_API_BASE_URL` | Base URL for backend API (`http://localhost:8080`) |

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m "feat: add ..."`)
4. Push to your branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

