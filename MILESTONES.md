# Project Milestones & Roadmap

This document tracks the progress of the Chat Application, detailing implemented features and remaining tasks for a complete MVP (Minimum Viable Product).

## 🟢 Backend (.NET 8 Web API)

### Infrastructure & Setup
- [x] **Project Initialization**: .NET 8 Web API project structure created.
- [x] **Database Configuration**: SQLite database configured with Entity Framework Core.
- [x] **Swagger/OpenAPI**: Configured for API documentation (`AddSwaggerDocAndApplicationInfo`).
- [x] **Extensions**: Service collection extensions for cleaner `Program.cs`.

### Authentication & Identity
- [x] **Identity Setup**: `AddIdentityServices` configured with password policies.
- [x] **JWT Implementation**: Token generation and validation (`JwtTokenService`, `AddAuthenticationAndTokenValidation`).
- [x] **Auth Controller**: Endpoints for Register, Login, User management.
- [x] **Entities**: `AppUser`, `AppRole`, `UserRole` created.

### Data Layer (Repositories)
- [x] **Generic Repository**: Base repository pattern implemented.
- [x] **Message Repository**: Logic for:
    - [x] Fetching message threads between users.
    - [x] Getting paged messages (Inbox/Outbox).
    - [x] Managing Groups and Connections (ready for SignalR).

### Real-time Communication (SignalR)
- [ ] **SignalR Configuration**: Add `AddSignalR()` to services and `MapHub` to endpoints.
- [ ] **Message Hub**: Create `MessageHub` inheriting from `Hub`.
    - [ ] OnConnected/OnDisconnected logic (tracking online users).
    - [ ] `SendMessage` method (persisting to DB via `MessageRepository` and broadcasting).
    - [ ] Group management (joining chat groups).
- [ ] **Presence Hub**: (Optional) Dedicated hub for tracking user online/offline status live.

### API Endpoints (REST)
- [ ] **Message Controller**: (Optional/Hybrid) REST endpoints to fetch initial message history/threads if not done purely via SignalR.
- [ ] **Users Controller**: Endpoint to list available users/contacts to chat with.

---

## 🔵 Frontend (React Native + Expo)

### Infrastructure
- [x] **Project Setup**: Expo Router with TypeScript.
- [x] **Navigation**: Tab-based navigation (Chats, Contacts, Profile) and Stack navigation for Chat details.

### Authentication UI
- [x] **Screens**:
    - [x] Registration
    - [x] Login / OTP Verify (UI exists, need to confirm API integration).
    - [x] Profile Management.

### Chat UI
- [x] **Layout**: `Chat` screen with `SafeAreaView` and `KeyboardAvoidingView`.
- [x] **Components**:
    - [x] `ChatHeader`: Displays user info and back button.
    - [x] `ChatPanel`: Lists messages (currently using dummy data).
    - [x] `SendMessage`: Input field for composing messages.

### Logic & Integration (To Do)
- [ ] **SignalR Client**:
    - [ ] Install `@microsoft/signalr`.
    - [ ] Create a `SignalRService` or Context to manage the Hub connection.
- [ ] **State Management**:
    - [ ] Store for holding active chat messages and threads.
    - [ ] Store for Online Users list.
- [ ] **API Integration**:
    - [ ] Connect Auth screens to Backend `AuthController`.
    - [ ] Fetch Contacts/Users list from Backend.
- [ ] **Real-time Wiring**:
    - [ ] Wire `SendMessage` component to invoke Hub method.
    - [ ] Wire `ChatPanel` to render real messages from the store.
    - [ ] Listen for `ReceiveMessage` events to update UI instantly.
