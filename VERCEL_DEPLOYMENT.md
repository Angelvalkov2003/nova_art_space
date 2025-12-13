# Vercel Deployment Checklist

## Environment Variables в Vercel

Увери се, че всички следните environment variables са добавени в Vercel Dashboard:

1. Отиди на Vercel Dashboard → твоя проект → Settings → Environment Variables

2. Добави следните променливи:

### За Supabase:

```
NEXT_PUBLIC_SUPABASE_URL=https://hbkdnojymiiandxljpdc.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=твоят-publishable-key
SUPABASE_SERVICE_ROLE_KEY=твоят-service-role-key
```

### За Cloudinary:

```
CLOUDINARY_URL=cloudinary://378787693512958:-JJNR_HMqG7-sLiw92dq0c2fvOg@dx3ynnumm
```

### За админ автентикация (ако все още използваш):

```
ADMIN_NAME=твоето-име (опционално, ако не използваш Supabase Auth)
ADMIN_PASSWORD=твоята-парола (опционално, ако не използваш Supabase Auth)
```

## Важно:

1. **Environment Variables трябва да са добавени за всички среди:**

   - Production
   - Preview
   - Development

2. **След добавяне на нови environment variables:**

   - Трябва да направиш нов deployment
   - Vercel автоматично ще рестартира с новите променливи

3. **Проверка:**
   - След deployment, провери дали данните се показват правилно
   - Ако не, провери логовете в Vercel Dashboard → Deployments → [твоят deployment] → Functions

## Проблеми и решения:

### Проблем: Данните не се обновяват

**Решение:** Добавих `export const dynamic = 'force-dynamic'` в страниците, за да се генерират динамично всеки път.

### Проблем: Грешки при заявки към Supabase

**Решение:** Провери дали environment variables са правилно добавени в Vercel.

### Проблем: Снимките не се качват

**Решение:** Провери дали `CLOUDINARY_URL` е добавен в Vercel.

## Как да добавиш Environment Variables в Vercel:

1. Отиди на: https://vercel.com/dashboard
2. Избери проекта си
3. Settings → Environment Variables
4. Добави всяка променлива:
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: твоят URL
   - Environment: Production, Preview, Development (избери всички)
5. Кликни "Save"
6. Направи нов deployment

## След добавяне на променливи:

1. Отиди на Deployments
2. Кликни на трите точки (...) на последния deployment
3. Избери "Redeploy"
4. Избери "Use existing Build Cache" = OFF (за да се уверя, че всичко е обновено)
