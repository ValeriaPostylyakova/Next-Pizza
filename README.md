# Next-Pizza

![Next-Pizza](/public/Next-Pizza.png)

## Описание проекта

Интернет-магазин (клон Додо Пиццы), макет проекта взят с канала Archakov Blog.
Проект включает в себя следующие функции:

-   выбор параметров фильтрации
-   просмотр подробной информации о товаре в модальном окне и на отдельной странице
-   поиск товаров
-   добавление товара в корзину
-   выбор параметров товара перед добавлением в корзину
-   удаление товара из корзины
-   увеличение и уменьшение количества товара
-   страница оформления заказа
-   переход на оплату в ЮKassa
-   Регистрация и авторизация по логину и паролю или через социальные сети (GitHub, Google)
-   Страница профиля

## Технологии

### Backend

-   NextJS - фреймворк на JavaScript, использующий React для построения Server Side Render-приложений (SSR) и статически-генерируемых сайтов.
-   Vercel Postgres — бессерверная база данных SQL, разработанная для интеграции с функциями Vercel и вашим фреймворком frontend
-   Prisma - инструмент, позволяющий работать с реляционными (PostgreSQL, MySQL, SQL Server, SQLite) и нереляционной (MongoDB) базами данных с помощью JavaScript или TypeScript без использования SQL
-   Next-auth — библиотека для аутентификации со встроенными провайдерами (Google, Facebook, GitHub и т. д.), JWT, JWE, email/пароль, магическими ссылками и др.
-   Resend — API-интерфейс службы электронной почты, который упрощает отправку электронных писем непосредственно из приложений.

### Frontend

-   NextJS - фреймворк на JavaScript, использующий React для построения Server Side Render-приложений (SSR) и статически-генерируемых сайтов.
-   TypeScript - строго типизированный язык программирования, построенный на JavaScript
-   Zustand - современный инструмент для управления состоянием React-приложений
-   Axios - библиотека для выполнения HTTP-запросов
-   React Hooks - useEffect, useState, useRef, useMemo
-   TailwindCSS - CSS-фреймворк
-   shadcn - библиотека готовых компонентов Tailwind CSS
-   Code Splitting - разделение кода
-   Prettier - инструмент для автоформатирования кода
-   React Hook Form - библиотека для управления состоянием и валидацией форм в React
-   react-insta-stories - библиотека для рендера собственных JSX компонентов в историях
-   react-dadata - React-компонент для подсказов адресов, организаций и банков с помощью DaData.ru

## Установка и запуск

### Инструкция по установке

1. Склонируйте репозиторий

```git
git clone https://github.com/ValeriaPostylyakova/Next-Pizza.git
```

2. Перейдите в директорию проекта

```git
cd Next-Pizza
```

3. Установите пакеты

```git
npm install
```

4. Запустите локальный сервер

```git
npm run dev
```

## Использование

После запуска будет сразу доступен весь функционал приложения.
Для оформления заказа можно воспользоваться **тестовой картой, номер: 5555 5555 5555 4444, срок действия и cvc код любые**.
Рассылка сообщений осуществляется только на мою почту.

## Авторы проекта

-   Archakov Blog - дизайн, макет
-   Valeria Postylyakova - разработчик приложения
