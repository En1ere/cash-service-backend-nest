# API: Users Module

Базовый путь: `/api/v1/users`.

**Форматы:**
- Успех: `{ success: true, data: T }`
- Ошибка: `{ success: false, code: string, message: string, data: null }`
- Auth: `Authorization: Bearer <token>`

## DTO

### UserFullDto
```typescript
interface UserFullDto {
  login: string;
  name: string;
  email: string;
  uuid: string;
  lastName?: string;
  patronymic?: string;
  avatar?: string;
  gender?: EUserGender;
  dateOfBirth?: Date;
  createdAt: Date;
}
```

## Эндпоинты

### GET /users/me
**Auth:** Да  
**Ответ:** `UserFullDto | null`

### GET /users
**Auth:** Нет  
**Ответ:** `UserFullDto[]` (активные)

### GET /users/all
**Auth:** Нет  
**Ответ:** `UserFullDto[]` (все, incl. deleted)

### GET /users/:uuid
**Параметры:** `uuid: string`  
**Ответ:** `UserFullDto`

### DELETE /users/delete/:uuid
**Параметры:** `uuid: string`  
**Ответ:** `UserEntity` (soft delete)

### DELETE /users/hardDelete/:uuid
**Параметры:** `uuid: string`  
**Ответ:** `{ deleted: number, success: boolean }`