-- Create general_message table for storing a single message
-- This table will only ever contain ONE row

CREATE TABLE IF NOT EXISTS general_message (
    id UUID PRIMARY KEY DEFAULT '00000000-0000-0000-0000-000000000001',
    content TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_general_message_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_general_message_timestamp_trigger
BEFORE UPDATE ON general_message
FOR EACH ROW
EXECUTE FUNCTION update_general_message_timestamp();

-- Enable Row Level Security
ALTER TABLE general_message ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read the message
CREATE POLICY "Allow public read access to general_message" 
ON general_message FOR SELECT 
USING (true);

-- Create policy to allow anyone to insert/update the message
-- Note: In production, you should restrict this to authenticated users only
CREATE POLICY "Allow public upsert access to general_message" 
ON general_message FOR ALL 
USING (true)
WITH CHECK (true);

-- Optional: Insert a default welcome message
-- This will be the initial message shown on the display page
INSERT INTO general_message (id, content) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Welcome to Pakistan Railways')
ON CONFLICT (id) DO NOTHING;

-- Create a constraint to ensure only one row can exist
-- This prevents accidental insertion of multiple rows
CREATE OR REPLACE FUNCTION enforce_single_row_general_message()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM general_message) >= 1 AND TG_OP = 'INSERT' THEN
        RAISE EXCEPTION 'Only one message can exist. Use UPDATE instead.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_single_row_general_message_trigger
BEFORE INSERT ON general_message
FOR EACH ROW
EXECUTE FUNCTION enforce_single_row_general_message();
