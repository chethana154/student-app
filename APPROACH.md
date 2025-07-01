
---

```md
# 📌 Approach & Methodology

---

## ✅ Understanding the Task

We were asked to create a secure student management dashboard where:
- Admin users can view all student records
- Students can only access their own profiles
- Role-based access should be enforced in both backend and frontend

We assumed:
- A user has one role at a time
- Admin role can be selected during registration (for demo purposes)
- The frontend should distinguish the UI experience based on role

---

## 🧠 Design & Architecture

### Frontend

- Angular 17 with standalone components for a lightweight structure
- Role-based rendering using `*ngIf` and locally stored JWT payload
- Dashboard dynamically renders either a user profile or student table
- Clean separation of services, models, and presentation logic

### Backend

- Node.js + Express
- MongoDB with Mongoose
- Modular controller and middleware layers
- `protect` middleware for token verification and user context injection

---

## 🧰 Technology Choices

- **Angular**: Component-driven architecture, clear bindings, and CLI support
- **Bootstrap**: Rapidly built clean UI with minimal custom CSS
- **Express**: Fast routing and middleware support
- **MongoDB**: Flexible document schema for quick prototyping
- **JWT**: Stateless token-based authentication

---

## 🔒 Security Strategy

- Passwords are hashed using `bcrypt` before saving
- JWT token includes role and ID in payload (verified in middleware)
- Role checks prevent unauthorized data access in `/profile`
- Environment variables (`.env`) isolate secrets and configs
- Admin-only views are hidden from students both in UI and logic

---

## ⚡ Performance Considerations

- Stateless auth avoids server session overhead
- Mongo queries are simple and efficient (`findById`, `find({ role })`)
- Angular uses reactive patterns and minimal re-rendering
- Dashboard layout is optimized for quick rendering and conditional logic

---

## 🧩 Challenges Faced

| Challenge                            | Solution                                         |
|-------------------------------------|--------------------------------------------------|
| Role-based UI rendering             | Parsed role from token and stored in localStorage |
| JWT decoding in frontend            | Used `atob()` and type interfaces               |
| Secure API routing                  | Middleware to guard `/profile` and restrict roles |
| HTML table formatting               | Converted list layout to responsive Bootstrap table |

---

## ⏭️ Improvements for Future

- Add route guards for admin-specific components
- Use refresh tokens and token expiration handling
- Admin role assignment via backend only
- Add student search/filter and pagination for scalability
- Create test coverage and CI/CD workflow

---
