# Biyubi Clinic Growth Monitoring App (Node.js API)

A simple **Node.js API** that integrates with **WhatsApp** to send notifications for **Growth Monitoring** of children aged 0-2 years old, based on **WHO Z Score** guidelines. This API uses the **whatsapp-web.js** library and **Socket.io** for real-time communication and scheduling notifications.

---

## 📦 Tech Stack

- **Node.js** for backend development
- **npm** for dependency management
- **whatsapp-web.js** for WhatsApp API integration
- **Socket.io** for real-time communication

---

## 🔧 Features

- 📱 **WhatsApp Integration**: Send automated WhatsApp messages to parents or healthcare professionals.
- 📅 **Growth Monitoring Notifications**: Send reminders for growth checkups and immunization schedules.
- 🕒 **Real-time Communication**: Use **Socket.io** for real-time updates and notifications.
  
---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (latest version recommended)
- **npm** (for package management)

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/izzatarramsyah/nodejs-biyubi-clinic-wa-server
    cd biyubi-clinic-growth-monitoring-node-api
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Configure WhatsApp Web**: Make sure you have a WhatsApp Web instance running and configure the necessary connection settings in the application.

4. **Run the application**:
    ```bash
    npm start
    ```

5. **Access the API**: The API should now be available at `http://localhost:3000`.

---
