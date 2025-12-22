-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create schedules table
CREATE TABLE schedules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    route TEXT NOT NULL,
    train_number TEXT NOT NULL,
    train_name TEXT NOT NULL,
    schedule_time TEXT NOT NULL,
    expected_time TEXT,
    status TEXT,
    platform TEXT,
    route_details TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content TEXT NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create videos table
CREATE TABLE videos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    filename TEXT NOT NULL,
    public_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on route for faster queries
CREATE INDEX idx_schedules_route ON schedules(route);

-- Insert default admin user
INSERT INTO users (username, password) 
VALUES ('admin', 'p@ssword123');

-- Create Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read schedules
CREATE POLICY "Allow anonymous read access to schedules" 
ON schedules FOR SELECT USING (true);

-- Create policy to allow authenticated users to insert/update/delete schedules
CREATE POLICY "Allow authenticated users to manage schedules" 
ON schedules FOR ALL 
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Create policy to allow users to read their own user info
CREATE POLICY "Allow users to read their own user info" 
ON users FOR SELECT 
USING (auth.uid() = id);

-- Create function to handle user authentication
CREATE OR REPLACE FUNCTION authenticate_user(p_username TEXT, p_password TEXT)
RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER
AS $$
DECLARE
    user_record RECORD;
    result JSONB;
BEGIN
    -- Find user with matching username and password
    SELECT * INTO user_record
    FROM users
    WHERE username = p_username AND password = p_password;
    
    -- If user found, return success with user info
    IF FOUND THEN
        result := jsonb_build_object(
            'success', true,
            'user', jsonb_build_object(
                'id', user_record.id,
                'username', user_record.username
            )
        );
    ELSE
        result := jsonb_build_object(
            'success', false,
            'message', 'Invalid username or password'
        );
    END IF;
    
    RETURN result;
END;
$$; 