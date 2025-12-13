# Как да намериш Supabase Service Role Key

## Стъпка по стъпка:

### 1. Влез в Supabase Dashboard

- Отиди на https://supabase.com/dashboard
- Влез в акаунта си

### 2. Избери проекта си

- Кликни на проекта, в който работиш (в случая твоя проект)

### 3. Отиди на Settings

- В лявото меню намери и кликни на **Settings** (или **Настройки**)
- Или директно отиди на: `https://supabase.com/dashboard/project/[твоят-project-id]/settings/api`

### 4. Отиди на API секцията

- В Settings менюто, кликни на **API** (или използвай таба "API")

### 5. Намери Service Role Key

- В API страницата ще видиш няколко ключа:
  - **Project API keys** секция
  - Там ще видиш:
    - `anon` `public` - това е твоят `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` (вече го имаш)
    - `service_role` `secret` - това е твоят `SUPABASE_SERVICE_ROLE_KEY` (трябва да го копираш)

### 6. Копирай Service Role Key

- Намери реда с `service_role` и `secret`
- Кликни на иконата за копиране (или "Reveal" ако е скрит)
- Копирай целия ключ

### 7. Добави го в .env.local

- Отвори `.env.local` файла в проекта
- Добави реда:

```
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (тук е твоят ключ)
```

## Важно предупреждение:

⚠️ **Service Role Key е СЕКРЕТЕН ключ!**

- **НИКОГА** не го споделяй публично
- **НИКОГА** не го комитирай в git
- **НИКОГА** не го използвай в client-side код (браузър)
- Използвай го **САМО** в server-side код (API routes, server components)

Този ключ дава пълен достъп до базата данни и заобикаля всички Row Level Security политики!

## Визуална помощ:

В Supabase Dashboard ще видиш нещо като:

```
Project API keys
┌─────────────────────────────────────────────────┐
│ anon / public                                    │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...         │ ← Това е твоят NEXT_PUBLIC ключ
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ service_role / secret                           │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...         │ ← Това е твоят SERVICE_ROLE ключ
└─────────────────────────────────────────────────┘
```

## Алтернативен начин:

Ако не можеш да намериш ключа:

1. Отиди на: `https://supabase.com/dashboard/project/[твоят-project-id]/settings/api`
2. Замени `[твоят-project-id]` с ID-то на твоя проект (можеш да го видиш в URL-а на dashboard-а)

## Проверка:

След като добавиш ключа в `.env.local`:

1. Рестартирай dev сървъра (`npm run dev`)
2. Опитай да създадеш изложба в админ панела
3. Ако работи - готово! ✅
