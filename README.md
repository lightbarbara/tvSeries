# tvSeries

Back-end for managing tv series that you're watching.

## How to run for development

1. Clone this repository
2. Install all dependencies

```bash
npm i
```

3. And then you just have to run

```bash
npm start
```

## Routes

### 1. Sign Up

```bash
POST /sign-up
```

#### Body
```bash
{
    "name": "barbara",
    "email": "barbara@gmail.com",
    "password": "12345"
}
```

### 2. Sign In

```bash
POST /
```

#### Body
```bash
{
    "email": "barbara@gmail.com",
    "password": "12345"
}
```

#### Return
```bash
{
    "token": {token_signIn}
}
```

### 3. Create series

```bash
POST /series
```

#### Body
```bash
{
    "name": "grey's anatomy",
    "platform": "netflix",
    "category": "drama",
    "numberOfEpisodes": 300,
    "numberOfSeasons": 20,
    "finished": false
}
```

### 4. Get all series or by category

```bash
GET /series

GET /series?category=action
```

### 5. Get series by id

```bash
GET /series/:id
```

### 6. Delete series by id

```bash
DELETE /series/:id
```

### 7. Update series by id

```bash
PUT /series/:id
```

#### Body
```bash
{
    "name": "grey's anatomy",
    "platform": "netflix",
    "category": "drama",
    "numberOfEpisodes": 300,
    "numberOfSeasons": 20,
    "finished": false
}
```

### 8. Add series to your profile

```bash
POST /your-series/:id
```

#### Body
```bash
{
    "watchedEpisodes": 20,
    "rating": "boa"
}
```

#### Headers
```bash
config = {
    Authorization: Bearer {token_signIn}
}
```

### 9. Get your series

```bash
GET /your-series
```

#### Headers
```bash
config = {
    Authorization: Bearer {token_signIn}
}
```

### 10. Delete a series from your profile by id

```bash
DELETE /your-series/:id
```

#### Headers
```bash
config = {
    Authorization: Bearer {token_signIn}
}
```

### 11. Update a series from your profile by id

```bash
PUT /your-series/:id
```

#### Body
```bash
{
    "watchedEpisodes": 30,
    "rating": "ruim"
}
```

#### Headers
```bash
config = {
    Authorization: Bearer {token_signIn}
}
```