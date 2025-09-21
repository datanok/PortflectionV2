/**
 * Utility functions for testing the resume parser API integration
 */

export interface ResumeParserTestResult {
  success: boolean;
  error?: string;
  data?: any;
  responseTime?: number;
}

/**
 * Test the resume parser API with a sample file
 */
export async function testResumeParserAPI(
  file: File,
  apiUrl: string = "/api/resume/parse"
): Promise<ResumeParserTestResult> {
  const startTime = Date.now();

  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(apiUrl, {
      method: "POST",
      body: formData,
    });

    const responseTime = Date.now() - startTime;

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error:
          errorData.details || errorData.error || `HTTP ${response.status}`,
        responseTime,
      };
    }

    const data = await response.json();

    // Validate the response structure
    if (!data || (!data.data && !data.basics)) {
      return {
        success: false,
        error: "Invalid response format - missing resume data",
        responseTime,
      };
    }

    return {
      success: true,
      data,
      responseTime,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Network error",
      responseTime: Date.now() - startTime,
    };
  }
}

/**
 * Validate resume data structure
 */
export function validateResumeData(data: any): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data) {
    errors.push("No data provided");
    return { valid: false, errors };
  }

  const resumeData = data.data || data;

  if (!resumeData.basics) {
    errors.push("Missing 'basics' section");
  } else {
    if (!resumeData.basics.name) {
      errors.push("Missing name in basics");
    }
    if (!resumeData.basics.email) {
      errors.push("Missing email in basics");
    }
  }

  if (!resumeData.work && !resumeData.experience) {
    errors.push("Missing work/experience section");
  }

  if (!resumeData.education) {
    errors.push("Missing education section");
  }

  if (!resumeData.skills) {
    errors.push("Missing skills section");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Test the resume parser with a mock file
 */
export async function testResumeParserWithMock(): Promise<ResumeParserTestResult> {
  // Create a mock PDF file for testing
  const mockPdfContent =
    "%PDF-1.4\n1 0 obj\n<<\n/Type /Catalog\n/Pages 2 0 R\n>>\nendobj\n2 0 obj\n<<\n/Type /Pages\n/Kids [3 0 R]\n/Count 1\n>>\nendobj\n3 0 obj\n<<\n/Type /Page\n/Parent 2 0 R\n/MediaBox [0 0 612 792]\n/Contents 4 0 R\n>>\nendobj\n4 0 obj\n<<\n/Length 44\n>>\nstream\nBT\n/F1 12 Tf\n72 720 Td\n(John Doe) Tj\nET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \n0000000204 00000 n \ntrailer\n<<\n/Size 5\n/Root 1 0 R\n>>\nstartxref\n297\n%%EOF";

  const mockFile = new File([mockPdfContent], "test-resume.pdf", {
    type: "application/pdf",
  });

  return testResumeParserAPI(mockFile);
}
