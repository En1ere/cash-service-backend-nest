# API: Auth Module

Базовый путь: `/api/v1/auth`.

**Форматы:**
- Успех: `{ success: true, data: T }`
- Ошибка: `{ success: false, code: string, message: string, data: null }`

## DTO

### SignUpDto
```typescript
interface SignUpDto {
  name: string;
  login: string;
  email: string;
  password: string;
}
```

### SignInDto
```typescript
interface SignInDto {
  identifier: string;  // login или email
  password: string;
}
```

### RefreshTokenDto
```typescript
interface RefreshTokenDto {
  token: string;  // refreshToken
}
```

### SignResponseDto
```typescript
interface SignResponseDto {
  accessToken: string;
  refreshToken: string;
}
```

## Эндпоинты

### POST /auth/sign-up
**Вход:** `SignUpDto`  
**Ответ:** `SignResponseDto`

### POST /auth/sign-in
**Вход:** `SignInDto`  
**Ответ:** `SignResponseDto`

### POST /auth/refresh-token
**Вход:** `RefreshTokenDto`  
**Ответ:** `SignResponseDto`