// lib/portfolio-data-mock.ts
import { PortfolioData } from "@/components/PortfolioProvider";

export async function getUserPortfolioDataMock(username: string): Promise<PortfolioData & { portfolioType: string } | null> {
  await new Promise(resolve => setTimeout(resolve, 100));
  const userPortfolioTypes: Record<string, string> = {
    'janedeveloper': 'developer',
    'alexdesigner': 'designer',
    'taylorcontent': 'content-creator',
    'jordanconsultant': 'business-consultant'
  };
  if (!userPortfolioTypes[username]) {
    return null;
  }
  const portfolioType = userPortfolioTypes[username];
  const portfolioData: Record<string, PortfolioData> = {
    'developer': {
      personalInfo: {
        name: 'Jane Developer',
        title: 'Full Stack Developer',
        bio: 'Building beautiful, functional web applications with modern technologies.',
        // ...rest of your mock data
      },
      // ...rest of your mock data structure
    },
    // ...other types
  };
  return { ...portfolioData[portfolioType], portfolioType };
}
