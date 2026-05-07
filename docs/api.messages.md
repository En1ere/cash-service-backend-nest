# API: Messages Module

Базовый путь: `/api/v1/messages`.

**Форматы:**
- Успех: `{ success: true, data: T }`
- Ошибка: `{ success: false, code: string, message: string, data: null }`
- Auth: `Headers: uuid: <user-uuid>`

## DTO

### CreateMessageDto
```typescript
interface CreateMessageDto {
  content: string;
  author: UserEntity;
  addressee: UserEntity;
}
```

### UpdateMessageDto
```typescript
interface UpdateMessageDto {
  content: string;
}
```

### ForwardMessagesDto
```typescript
interface ForwardMessagesDto {
  messagesIds: number[];
  addressee: UserEntity;
}
```

### MessageDto
```typescript
interface MessageDto {
  id: number;
  content: string;
  author: UserEntity;
  forwarded: boolean;
  createAt: Date;
  readAt?: Date;
  updatedAt: Date;
  deletedAt?: Date;
  addressee: UserEntity;
}
```

## Эндпоинты

### POST /messages/send-message
**Headers:** `uuid: string`  
**Auth:** Да  
**Вход:** `CreateMessageDto`  
**Ответ:** `boolean`

### GET /messages/my-messages
**Headers:** `uuid: string`  
**Auth:** Да  
**Ответ:** `MessageDto[]`

### GET /messages/messages-for-me
**Headers:** `uuid: string`  
**Auth:** Да  
**Ответ:** `MessageDto[]`

### PUT /messages/update-message/:id
**Параметры:** `id: number`  
**Auth:** Да  
**Вход:** `UpdateMessageDto`  
**Ответ:** `MessageEntity | null`

### DELETE /messages/delete/:id
**Параметры:** `id: number`  
**Auth:** Да  
**Ответ:** `number` (affected)

### POST /messages/forward-message
**Headers:** `uuid: string`  
**Auth:** Да  
**Вход:** `ForwardMessagesDto`  
**Ответ:** `MessageDto[]`

### DELETE /messages/delete-messages
**Auth:** Да  
**Вход:** `{ ids: number[] }`  
**Ответ:** `number` (affected)