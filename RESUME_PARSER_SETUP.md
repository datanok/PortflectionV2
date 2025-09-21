# Resume Parser Integration Setup

This guide explains how to configure the resume parser integration with your hosted API.

## Environment Variables

Add these environment variables to your `.env.local` file:

```env
# Resume Parser API Configuration
RESUME_PARSER_URL="https://web-production-ffa48.up.railway.app"
RESUME_API_KEY="NtRyIv-T0HwNIipoQYqGtmI_8jai6rgbyb8GCvvc2Og"
```

## API Integration Details

The resume parser integration has been updated to:

1. **Use your hosted API**: Points to `https://web-production-ffa48.up.railway.app`
2. **Include authentication**: Uses Bearer token authentication with your API key
3. **Improved error handling**: Better error messages and logging
4. **Response validation**: Ensures the API response is valid JSON

## How It Works

1. User uploads a resume file (PDF, DOC, DOCX) through the import resume page
2. The file is sent to your hosted resume parser API with authentication
3. The API parses the resume and returns structured JSON data
4. The parsed data is mapped to portfolio components using the existing mapper
5. A unique slug is automatically generated to avoid conflicts (using timestamp)
6. A draft portfolio is created and the user is redirected to the editor
7. Success notification is shown to the user

## Testing the Integration

To test the integration:

1. Set the environment variables in your `.env.local` file
2. Start your development server: `npm run dev`
3. Navigate to `/dashboard/import-resume`
4. Upload a resume file and test the parsing

## Error Handling

The integration includes comprehensive error handling for:

- Missing API key configuration
- Network errors
- Invalid API responses
- File upload errors
- Authentication failures

## API Response Format

The resume parser API should return JSON in this format:

```json
{
  "data": {
    "basics": {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "location": "City, Country",
      "summary": "Professional summary..."
    },
    "work": [
      {
        "company": "Company Name",
        "position": "Job Title",
        "startDate": "2020-01",
        "endDate": "2023-12",
        "summary": "Job description..."
      }
    ],
    "education": [
      {
        "institution": "University Name",
        "area": "Computer Science",
        "studyType": "Bachelor",
        "startDate": "2016-09",
        "endDate": "2020-06"
      }
    ],
    "skills": [
      {
        "name": "JavaScript",
        "level": "Expert"
      }
    ],
    "projects": [
      {
        "name": "Project Name",
        "description": "Project description...",
        "url": "https://project-url.com"
      }
    ]
  }
}
```

## Troubleshooting

### Common Issues

1. **"Resume parser API key not configured"**

   - Ensure `RESUME_API_KEY` is set in your environment variables

2. **"Failed to parse resume"**

   - Check that your API is running and accessible
   - Verify the API key is correct
   - Check the API logs for detailed error messages

3. **"Invalid response from resume parser"**

   - The API returned non-JSON data
   - Check your API implementation

4. **"This slug is already taken"** (FIXED)
   - This error has been resolved with automatic unique slug generation
   - Slugs now include timestamps to ensure uniqueness
   - No manual slug entry required

### Recent Fixes

- **Automatic Unique Slug Generation**: Resume imports now automatically generate unique slugs using timestamps to prevent conflicts
- **Better Error Handling**: Improved error messages and user feedback
- **Success Notifications**: Users now see toast notifications when portfolios are created successfully

### Debug Mode

To enable debug logging, add this to your environment:

```env
NODE_ENV=development
```

This will log detailed error information to the console.
