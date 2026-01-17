# 🔄 Исправление циклических зависимостей

## 🔍 Обнаруженные циклические зависимости

### 1. **chats ↔ profile** (КРИТИЧНО)
```
chats → profile (ProfileService в ChatsService)
profile → chats (API_URL в ProfileService)
```

### 2. **posts ↔ profile** (КРИТИЧНО)
```
posts → profile (ProfileService в PostFeedComponent, PostComponent)
profile → posts (PostFeedComponent в ProfilePageComponent)
```

### 3. **common-ui → chats** (СРЕДНИЙ ПРИОРИТЕТ)
```
common-ui → chats (API_URL в ImgUrlPipe)
```

### 4. **posts → chats** (НИЗКИЙ ПРИОРИТЕТ, но неправильно)
```
posts → chats (относительный путь к constants в PostService)
```

---

## ✅ План исправления

### Шаг 1: Вынести API_URL в @tt/shared

**Проблема:** API_URL используется из chats, но нужен в profile, posts, common-ui

**Решение:** Переместить API_URL в @tt/shared

**Файлы для изменения:**
1. Создать `libs/shared/src/lib/data/constants.ts`
2. Обновить `libs/shared/src/lib/data/index.ts`
3. Обновить импорты в:
   - `libs/profile/src/lib/data/services/profile.service.ts`
   - `libs/posts/src/lib/data/services/post.service.ts`
   - `libs/common-ui/src/lib/pipes/img-url.pipe.ts`
   - `libs/chats/src/lib/data/services/chats.service.ts`
   - `libs/chats/src/lib/data/constants.ts` (удалить или реэкспортировать из shared)

---

### Шаг 2: Разорвать цикл chats ↔ profile

**Проблема:** ChatsService зависит от ProfileService.me

**Решение:** Использовать GlobalStoreService из @tt/shared вместо прямого импорта ProfileService

**Файлы для изменения:**
- `libs/chats/src/lib/data/services/chats.service.ts`
  - Заменить `ProfileService.me` на `GlobalStoreService.me`

---

### Шаг 3: Разорвать цикл posts ↔ profile

**Проблема:** 
- PostFeedComponent использует ProfileService
- ProfilePageComponent использует PostFeedComponent

**Решение:** Использовать GlobalStoreService для данных профиля в компонентах постов

**Файлы для изменения:**
- `libs/posts/src/lib/feature-posts-wall/post-feed/post-feed.component.ts`
- `libs/posts/src/lib/feature-posts-wall/post/post.component.ts`

---

### Шаг 4: Убрать относительные пути

**Проблема:** В PostService используется относительный путь к chats

**Решение:** Использовать алиас `@tt/shared` после вынесения API_URL

**Файлы для изменения:**
- `libs/posts/src/lib/data/services/post.service.ts`

---

## 📋 Детальный план действий

### 1. Создать константу API_URL в shared

```typescript
// libs/shared/src/lib/data/constants.ts
export const API_URL = 'https://icherniakov.ru/yt-course/';
```

### 2. Экспортировать из shared/data

```typescript
// libs/shared/src/lib/data/index.ts
export * from './services/global-store.service';
export * from './interfaces/pageble.interface';
export * from './constants'; // добавить
```

### 3. Обновить все импорты

- `profile.service.ts`: `import {API_URL} from '@tt/shared';`
- `post.service.ts`: `import {API_URL} from '@tt/shared';`
- `img-url.pipe.ts`: `import {API_URL} from '@tt/shared';`
- `chats.service.ts`: `import {API_URL} from '@tt/shared';`

### 4. Обновить ChatsService

```typescript
// Было:
import {ProfileService} from '@tt/profile';
me = inject(ProfileService).me;

// Станет:
import {GlobalStoreService} from '@tt/shared';
me = inject(GlobalStoreService).me;
```

### 5. Обновить PostFeedComponent

```typescript
// Было:
import {ProfileService} from '@tt/profile';
profile = inject(ProfileService).me;

// Станет:
import {GlobalStoreService} from '@tt/shared';
profile = inject(GlobalStoreService).me;
```

### 6. Обновить PostComponent

```typescript
// Было:
import {ProfileService} from '@tt/profile';
profile = inject(ProfileService).me;

// Станет:
import {GlobalStoreService} from '@tt/shared';
profile = inject(GlobalStoreService).me;
```

---

## 🎯 Результат

После исправлений структура зависимостей будет:

```
interfaces (базовая библиотека, нет зависимостей)
    ↑
shared (зависит только от interfaces)
    ↑
common-ui (зависит только от shared/interfaces)
    ↑
auth (зависит только от shared/interfaces)
    ↑
posts (зависит от shared, common-ui, interfaces)
    ↑
profile (зависит от shared, common-ui, interfaces, posts)
    ↑
chats (зависит от shared, common-ui, interfaces, profile)
    ↑
layout (зависит от shared, common-ui, interfaces)
    ↑
app (зависит от всех)
```

**Преимущества:**
- ✅ Нет циклических зависимостей
- ✅ Четкая иерархия зависимостей
- ✅ Легче тестировать и изолировать модули
- ✅ Быстрее компиляция
