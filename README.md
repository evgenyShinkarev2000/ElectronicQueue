# Электронная очередь

## 1. Цель проета
* Цель проекта - создать web-приложение с функцией электронной очереди.
***
## 2. Требования к продукту
1. 3 вида пользоватетлей: администратор, оператор и клиент.
2. <b><i>Возможность</i></b> добавить отображение состояния очереди на электронное табло.
3. Вход на сайт без повторного ввода данных, регистрация.
4. Уведомление клиентов в личном кабинете об изменении расписания.
5. Настройка доступа к очередям.
6. Возможность предварительной записи.
7. Рассчет примерного времени ожидания.
***
## 3. Логика работы
### 1. Вход и регистрация:
* После успешного входа в систему сервер отправляет web клиенту идентификатор, который позволит
заходить в систему без повторного ввода данных. Через определенное время идентификатор устаревает
и требуется заново войти в систему, используя логин и пароль.
* При регистрации клиенту нужно указать логин, пароль, фамилию, имя. Регистрацию оператора
проводит администратор.
* Форма регистрации оператора содержит все поля клиентской формы, с добавлением поля должность.

### 2. Возможности администратора:
* Создание, изменение и удаление учетных записей операторов и клиентов.
* Добавление шаблонов рассписания и уровней доступа операторам.
* Все функции, доступные оператору.

### 3. Возможности оператора:
* Просмотр свободных и занятых мест в расписании своих очередей.
* Запись клиета в очередь, выдача прав на запись в очередь.
* Вызов следующего клиента, отмена записи клиента.
* Использование шаблона рассписания и уровня доступа, для создания очереди.
* Изменение расписания очереди из-за праздников, больничного и т.д.

### 4. Возможности клиента:
* Поиск необходимой очереди.
* Просмотр свободных и занятых мест в расписании определенной очереди.
* Просмотр всех броней, отмена.
* Запись на ближайшее время или предварительная.
* Просмотр уведомлений о появлении более раннего времени записи, изменении или отмены брони
оператором, выдаче права записи в опреденную очередь.
* Изменение пароля от учетной записи, контактных данных.

### 5. Схема:
* ![alttext](./readme_files/ElectronicQueue.drawio.png)
***
## 4. Технологический стек
* frontend: angular, scss, html, bootstrap.
* backend: asp или express, mongodb + framework для работы с бд.
* Развертывание frontend может быть выполнено на [vercel](vercel.com), 
backend на [microsoft azure](https://portal.azure.com/).
***
## 5. Дизайн
### 1. Основа для дизайна:
* За основу дизайна планируется взять сайт [modeus.org](https://urfu.modeus.org)
![alttext](./readme_files/Дизайн.png)
### 2. Основные компоненты:
* Сверху должна быть шапка с навигацией.
* В центре один из компонентов, сменяемый без перезагрузки страницы при помощи навигации из 
шапки или из сомаго компонента.
* Режимы просмотра расписания очереди: неделя, месяц. 
* Окно администратора:
  + Создание учетной записи оператора или клента.
  + Поиск клиентов и операторов по ФИО, фильтрация по должности и времени записи,
  сортировка по ФИО.
  + Создание шаблонов рассписаний.
  + Редактированиу профилей операторов и клиентов, добавлениу шаблона расписания оператору.
  + Все компоненты окна оператора.
* Окно оператора:
  + Просмотр расписания своей очереди, изменение, вызов клиента, изменение уроня доступа клиента.
  + Создание очереди в соответсвии с шаблоном.
  + Просмотр и поиск очередй, запись клиента, изменение брони клиента, если он был записан этим оператором.
* Окно клиента:
  + Просмотр и поиск очередей, запись, отмена записи.
  + Уведомления.
  + Просмотр и отмена броней.
  + Изменение пароля и контактных данных.

  
