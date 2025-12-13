# Настройка на Supabase Auth за админ панела

## Стъпка 1: Създаване на админ потребител в Supabase

### Вариант А: Чрез Supabase Dashboard (препоръчително)

1. Отиди в Supabase Dashboard → твоя проект
2. Отиди на **Authentication** → **Users** (в лявото меню)
3. Кликни на **Add user** → **Create new user**
4. Попълни:
   - **Email**: твоят имейл адрес (например: `admin@example.com`)
   - **Password**: твоята парола (минимум 6 символа)
   - **Auto Confirm User**: активирай това, за да може веднага да влезеш
5. Кликни **Create user**

### Вариант Б: Чрез SQL (алтернативен начин)

1. Отиди на **SQL Editor** в Supabase
2. Изпълни следната заявка (замени имейла и паролата):

```sql
-- Създаване на админ потребител
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@example.com',  -- Замени с твоя имейл
  crypt('твоята-парола', gen_salt('bf')),  -- Замени с твоята парола
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Създаване на identity за потребителя
INSERT INTO auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at
)
SELECT
  gen_random_uuid(),
  id,
  jsonb_build_object('sub', id::text, 'email', email),
  'email',
  NOW(),
  NOW(),
  NOW()
FROM auth.users
WHERE email = 'admin@example.com';  -- Замени с твоя имейл
```

**Забележка:** SQL методът е по-сложен. Препоръчвам да използваш Dashboard метода.

## Стъпка 2: Проверка

1. Отиди на `/admin/login`
2. Влез с имейла и паролата, които създаде
3. Трябва да успееш да влезеш в админ панела

## Стъпка 3: Управление на потребители

### Добавяне на нови админи:

1. Отиди на **Authentication** → **Users**
2. Кликни **Add user** → **Create new user**
3. Попълни данните и създай потребителя

### Преглед на всички потребители:

- Отиди на **Authentication** → **Users**
- Там ще видиш списък с всички регистрирани потребители

### Редактиране на потребител:

- В списъка с потребители, кликни на потребителя
- Можеш да променяш имейла, паролата и други настройки

## Важни бележки:

- **Всички потребители** в Supabase Auth могат да влязат в админ панела
- Ако искаш да ограничиш достъпа само до определени потребители, трябва да добавиш допълнителна проверка в кода
- Можеш да създадеш **роли** (roles) в Supabase и да проверяваш ролята на потребителя
- Паролите се съхраняват криптирани в Supabase
- Можеш да активираш **двуфакторна автентикация (2FA)** за по-голяма сигурност

## Допълнителна сигурност (опционално):

### Ограничаване на достъпа до определени имейли:

Можеш да обновиш `app/lib/auth.ts` да проверява дали имейлът е в списък с разрешени админи:

```typescript
const ALLOWED_ADMIN_EMAILS = ["admin@example.com", "another-admin@example.com"];

export async function isAuthenticated(): Promise<boolean> {
  try {
    const supabase = await getSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !user.email) return false;

    // Проверка дали имейлът е в списъка с разрешени админи
    return ALLOWED_ADMIN_EMAILS.includes(user.email);
  } catch (error) {
    return false;
  }
}
```

## Проблеми и решения:

### "Invalid login credentials"

- Провери дали имейлът и паролата са правилни
- Провери дали потребителят е създаден правилно в Supabase

### "User not found"

- Увери се, че потребителят е създаден в Supabase Auth
- Провери дали имейлът е потвърден (ако изисква потвърждение)

### Сесията не се запазва

- Провери дали cookies са разрешени в браузъра
- Увери се, че `.env.local` съдържа правилните Supabase credentials
