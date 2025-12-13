# Supabase Setup Instructions

## Стъпка 1: Създаване на таблиците

1. Отвори Supabase Dashboard: https://supabase.com/dashboard
2. Избери твоя проект
3. Отиди на **SQL Editor** (в лявото меню)
4. Копирай и изпълни целия SQL код от файла `supabase-schema.sql`
5. Натисни **Run** или **Execute**

Това ще създаде две таблици:
- `exhibitions` - основна информация за изложбите
- `exhibition_images` - снимките за всяка изложба (със свързване към изложбата)

## Стъпка 2: Импортиране на данни

### Стъпка 2.1: Добавяне на изложби

1. Отиди на **SQL Editor**
2. Използвай следния пример за INSERT на изложба:

```sql
-- Първо добавяме изложбата и запазваме ID-то
INSERT INTO exhibitions (title, subtitle, text, main_image, author, date, position, slug)
VALUES
  (
    'Ренесанс',
    '',
    'Проектът "Ренесанс" представя синтез между живопис и керамика, дело на шестима утвърдени български творци - Валентин Ангелов, Васил Стоев, Георги Миленов, Гергана Лалова, Евгения Георгиева и Михаил Лалов.',
    'https://res.cloudinary.com/your-cloud/image/upload/v1/renaissance-main.jpg',
    'Валентин Ангелов, Васил Стоев, Георги Миленов, Гергана Лалова, Евгения Георгиева, Михаил Лалов',
    '24-30 ноември 2024',
    0,
    'renesans'
  )
RETURNING id;
```

3. Запиши ID-то, което се върне (ще ти трябва за следващата стъпка)

### Стъпка 2.2: Добавяне на снимки за изложбата

След като имаш ID на изложбата, добави снимките:

```sql
-- Замени 'exhibition-id-here' с реалното ID от предишната стъпка
INSERT INTO exhibition_images (exhibition_id, image_url, image_order)
VALUES
  ('exhibition-id-here', 'https://res.cloudinary.com/your-cloud/image/upload/v1/renaissance-1.jpg', 1),
  ('exhibition-id-here', 'https://res.cloudinary.com/your-cloud/image/upload/v1/renaissance-2.jpg', 2),
  ('exhibition-id-here', 'https://res.cloudinary.com/your-cloud/image/upload/v1/renaissance-3.jpg', 3),
  ('exhibition-id-here', 'https://res.cloudinary.com/your-cloud/image/upload/v1/renaissance-4.jpg', 4),
  ('exhibition-id-here', 'https://res.cloudinary.com/your-cloud/image/upload/v1/renaissance-5.jpg', 5);
```

**Алтернативен начин (всичко в една заявка):**

```sql
WITH new_exhibition AS (
  INSERT INTO exhibitions (title, subtitle, text, main_image, author, date, position, slug)
  VALUES
    (
      'Ренесанс',
      '',
      'Проектът "Ренесанс" представя синтез между живопис и керамика...',
      'https://res.cloudinary.com/your-cloud/image/upload/v1/renaissance-main.jpg',
      'Валентин Ангелов, Васил Стоев, Георги Миленов, Гергана Лалова, Евгения Георгиева, Михаил Лалов',
      '24-30 ноември 2024',
      0,
      'renesans'
    )
  RETURNING id
)
INSERT INTO exhibition_images (exhibition_id, image_url, image_order)
SELECT id, image_url, image_order
FROM new_exhibition
CROSS JOIN (VALUES
  ('https://res.cloudinary.com/your-cloud/image/upload/v1/renaissance-1.jpg', 1),
  ('https://res.cloudinary.com/your-cloud/image/upload/v1/renaissance-2.jpg', 2),
  ('https://res.cloudinary.com/your-cloud/image/upload/v1/renaissance-3.jpg', 3),
  ('https://res.cloudinary.com/your-cloud/image/upload/v1/renaissance-4.jpg', 4),
  ('https://res.cloudinary.com/your-cloud/image/upload/v1/renaissance-5.jpg', 5)
) AS images(image_url, image_order);
```

**Забележки:**

- `image_order` определя реда на показване на снимките (1, 2, 3, ...)
- Можеш да добавиш произволен брой снимки за всяка изложба
- Slug трябва да се генерира в приложението преди INSERT. Можеш да използваш същата функция `generateSlug()` от кода.

## Стъпка 3: Проверка

След импортиране, провери дали данните са добавени правилно:

```sql
-- Проверка на изложбите
SELECT * FROM exhibitions ORDER BY position;

-- Проверка на снимките за конкретна изложба
SELECT e.title, ei.image_url, ei.image_order
FROM exhibitions e
LEFT JOIN exhibition_images ei ON e.id = ei.exhibition_id
WHERE e.slug = 'renesans'
ORDER BY ei.image_order;
```

## Важни бележки:

- **Структура на таблиците:**
  - `exhibitions` - съдържа основната информация за изложбата
  - `exhibition_images` - съдържа снимките, свързани с изложбата чрез `exhibition_id`
  
- **Slug** трябва да се генерира в приложението преди INSERT
- **Position 0** = настояща изложба (показва се най-отгоре)
- **Position > 0** = минали изложби (сортират се в низходящ ред)
- **image_order** в `exhibition_images` определя реда на показване на снимките
- Можеш да добавиш произволен брой снимки за всяка изложба (не само 5)
- Таблиците са настроени с публичен достъп за четене (SELECT)
- За писане/редактиране е нужна автентикация
- При изтриване на изложба, всички свързани снимки се изтриват автоматично (CASCADE)

## Следващи стъпки:

След като таблицата е създадена и данните са импортирани, трябва да обновя кода, за да чете от Supabase вместо от CSV файл.
