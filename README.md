Project live Link --  https://therightdoctorstask1.netlify.app/people  




Here is a clean and professional `README.md` file tailored for your **Angular 7/8 People Manager SPA** project:

---

````markdown
# 👥 People Manager (Angular 7/8 SPA)

A simple **Single Page Application (SPA)** built using **Angular 7/8** for managing a list of people. This app demonstrates basic CRUD operations with a modular component-based architecture and mock API support.

---

## 🚀 Features

- ✅ **List All People** — View all the people in a structured table.
- ✏️ **Edit Person** — Edit the details of any individual.
- ❌ **Delete Person** — Remove a person from the list.
- 🔄 **Reactive Forms & Routing** — Uses Angular's built-in modules for navigation and forms.
- 🧪 **Mock API Integration** — Data served using Angular Service (can be switched to a real backend or json-server).

---

## 🏗️ Project Setup & Structure

### 🔧 Commands to Run

```bash
# Step 1: Create the app with routing
ng new people-manager --routing

cd people-manager

# Step 2: Generate components
ng generate component components/people-list  
ng generate component components/people-edit  
ng generate component components/people-delete

# Step 3: Generate service
ng generate service services/people
````

### 📁 Folder Structure

```
people-manager/
│
├── src/
│   └── app/
│       ├── components/
│       │   ├── people-list/
│       │   ├── people-edit/
│       │   └── people-delete/
│       ├── services/
│       │   └── people.service.ts
│       └── app-routing.module.ts
│
├── angular.json
├── package.json
└── README.md
```

---

## 🔌 API Setup

You can either:

1. **Use a mocked service** (in-memory objects with RxJS `of()` and `delay()`).
2. **Use `json-server`**:

```bash
npm install -g json-server

# Create a db.json file with person data
json-server --watch db.json
```

Update `people.service.ts` to point to `http://localhost:3000/people`.

---

## 💡 How to Run the App

```bash
npm install
ng serve
```

Navigate to: [http://localhost:4200](http://localhost:4200)

---

## 📸 Screenshots

THE Output images 
![image](https://github.com/user-attachments/assets/96ea1b27-dc4c-4cf1-9049-c66be925b37f)

---

## 🛠️ Built With

* [Angular 7/8](https://angular.io/)
* [RxJS](https://rxjs.dev/)
* [TypeScript](https://www.typescriptlang.org/)
* [Angular CLI](https://cli.angular.io/)
* [json-server (optional)](https://github.com/typicode/json-server)

---

## 🤝 Contributing

Feel free to fork, enhance, and submit pull requests to improve this starter project.

---

## 📜 License

This project is licensed under the MIT License.

---

## 📬 Contact

Ruppa Giridhar
📧 [giriruppa964@gmail.com](mailto:giriruppa964@gmail.com)
📱 +91-89783-04323




