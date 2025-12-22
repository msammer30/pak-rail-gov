# Train Schedule Management System

A web application for managing and displaying train schedules for Pakistan Railways.

## Supabase Integration

This project uses Supabase for authentication and database operations. Follow these steps to set up Supabase for this project:

### 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and sign up or log in.
2. Create a new project and note down your project URL and anon key.

### 2. Set Up Database Tables

1. Navigate to the SQL Editor in your Supabase dashboard.
2. Copy and paste the contents of the `supabase_tables.sql` file into the SQL editor.
3. Run the SQL commands to create the necessary tables and functions.

### 3. Configure the Application

1. Open the `supabase.js` file in the project.
2. Replace the placeholder values with your actual Supabase URL and anon key:

```javascript
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';
```

### 4. Default User

A default user is created with the following credentials:
- Username: `admin`
- Password: `p@ssword123`

You can use these credentials to log in to the application.

## Database Schema

### Users Table

| Column     | Type      | Description                  |
|------------|-----------|------------------------------|
| id         | UUID      | Primary key                  |
| username   | TEXT      | Unique username              |
| password   | TEXT      | User password (plain text)   |
| created_at | TIMESTAMP | Timestamp of user creation   |

### Schedules Table

| Column        | Type      | Description                      |
|---------------|-----------|----------------------------------|
| id            | UUID      | Primary key                      |
| route         | TEXT      | Route identifier (e.g., lhr_kc_departure) |
| train_number  | TEXT      | Train number                     |
| train_name    | TEXT      | Name of the train               |
| schedule_time | TEXT      | Scheduled departure/arrival time |
| expected_time | TEXT      | Expected departure/arrival time  |
| status        | TEXT      | Current status of the train      |
| platform      | TEXT      | Platform number                  |
| route_details | TEXT      | Additional route information     |
| created_at    | TIMESTAMP | Timestamp of record creation     |
| updated_at    | TIMESTAMP | Timestamp of last update         |

## Security Considerations

- The current implementation stores passwords in plain text, which is not secure for production use.
- For a production environment, implement proper password hashing using bcrypt or similar.
- Consider implementing JWT-based authentication for better security.
- Set up proper Row Level Security (RLS) policies in Supabase for data protection.

## Project Structure

- `index.html` - Login page
- `master_input.html` - Main data input page
- `display_*.html` - Various display pages for different routes
- `supabase.js` - Supabase client configuration and helper functions
- `login_script.js` - Authentication logic
- `master_script.js` - Main application logic
- `display_*_script.js` - Display page scripts
- `display_style.css` - Styling for display pages
- `supabase_tables.sql` - SQL commands for setting up Supabase tables
