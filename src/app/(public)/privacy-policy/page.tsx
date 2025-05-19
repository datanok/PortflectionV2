import Link from 'next/link';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Shield } from "lucide-react";

export const metadata = {
  title: 'Privacy Policy',
  description: 'Our privacy policy and how we handle your data',
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 md:py-16 lg:px-8 max-w-4xl">
        <div className="flex flex-col space-y-8 pb-16">
          {/* Breadcrumb and back button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Button variant="ghost" size="sm" className="flex items-center w-fit" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <span className="text-sm text-muted-foreground">Legal / Privacy Policy</span>
          </div>
          
          {/* Header */}
          <div className="space-y-2 text-center">
            <div className="flex justify-center mb-4">
              <Shield className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-50 dark:to-gray-400">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Last updated: May 20, 2025
            </p>
          </div>
          
          <Separator className="my-6" />
          
          {/* Introduction Card - Kept as a standalone card */}
          <Card className="border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">Introduction</CardTitle>
              <CardDescription>
                What this policy covers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm md:text-base">
              <p>
                This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from our website.
              </p>
              <p>
                We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data and tell you about your privacy rights.
              </p>
            </CardContent>
          </Card>
          
          {/* Main Content in Accordion */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="information-we-collect" className="border border-gray-200 dark:border-gray-800 rounded-lg mb-4 shadow-sm hover:shadow-md transition-shadow duration-300">
              <AccordionTrigger className="px-6 py-4">
                <div className="text-left">
                  <h3 className="text-lg md:text-xl font-medium">Information We Collect</h3>
                  <p className="text-sm text-muted-foreground">Types of data we gather from you</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 space-y-4 text-sm md:text-base">
                <div className="rounded-lg bg-gray-50 dark:bg-gray-800/50 p-4 border border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg font-medium mb-2">Personal Information</h3>
                  <p className="mb-2">
                    When you visit the site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.
                  </p>
                  <p>
                    Additionally, as you browse the site, we collect information about the individual web pages that you view, what websites or search terms referred you to the site, and information about how you interact with the site.
                  </p>
                </div>
                
                <div className="rounded-lg bg-gray-50 dark:bg-gray-800/50 p-4 border border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg font-medium mb-2">Account Information</h3>
                  <p>
                    If you create an account, we may collect your name, email address, username, password, profile information, and any other information you provide during the registration process.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="how-we-use" className="border border-gray-200 dark:border-gray-800 rounded-lg mb-4 shadow-sm hover:shadow-md transition-shadow duration-300">
              <AccordionTrigger className="px-6 py-4">
                <div className="text-left">
                  <h3 className="text-lg md:text-xl font-medium">How We Use Your Information</h3>
                  <p className="text-sm text-muted-foreground">Purposes for which we use your data</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 space-y-4 text-sm md:text-base">
                <p>
                  We use the information we collect to:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <li className="flex items-center p-2 rounded-md bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                    <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                    Provide, operate, and maintain our website
                  </li>
                  <li className="flex items-center p-2 rounded-md bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                    <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                    Improve and personalize your experience
                  </li>
                  <li className="flex items-center p-2 rounded-md bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                    <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                    Understand and analyze how you use our website
                  </li>
                  <li className="flex items-center p-2 rounded-md bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                    <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                    Develop new products, services, features
                  </li>
                  <li className="flex items-center p-2 rounded-md bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                    <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                    Communicate with you directly or via partners
                  </li>
                  <li className="flex items-center p-2 rounded-md bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                    <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                    Send emails for service & support
                  </li>
                  <li className="flex items-center p-2 rounded-md bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                    <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                    Prevent fraud
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="sharing" className="border border-gray-200 dark:border-gray-800 rounded-lg mb-4 shadow-sm hover:shadow-md transition-shadow duration-300">
              <AccordionTrigger className="px-6 py-4">
                <div className="text-left">
                  <h3 className="text-lg md:text-xl font-medium">Sharing Your Information</h3>
                  <p className="text-sm text-muted-foreground">When and how we share your data with third parties</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 space-y-4 text-sm md:text-base">
                <p>
                  We share your Personal Information with third parties to help us use your Personal Information, as described above. For example, we use Google Analytics to help us understand how our customers use the site.
                </p>
                <p>
                  We may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="your-rights" className="border border-gray-200 dark:border-gray-800 rounded-lg mb-4 shadow-sm hover:shadow-md transition-shadow duration-300">
              <AccordionTrigger className="px-6 py-4">
                <div className="text-left">
                  <h3 className="text-lg md:text-xl font-medium">Your Rights</h3>
                  <p className="text-sm text-muted-foreground">Control over your information</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 space-y-4 text-sm md:text-base">
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <p className="mb-2">
                    If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us.
                  </p>
                  <p>
                    Additionally, if you are a European resident, we note that we are processing your information in order to fulfill contracts we might have with you, or otherwise to pursue our legitimate business interests listed above. Please note that your information will be transferred outside of Europe, including to Canada and the United States.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="data-retention" className="border border-gray-200 dark:border-gray-800 rounded-lg mb-4 shadow-sm hover:shadow-md transition-shadow duration-300">
              <AccordionTrigger className="px-6 py-4">
                <div className="text-left">
                  <h3 className="text-lg md:text-xl font-medium">Data Retention</h3>
                  <p className="text-sm text-muted-foreground">How long we keep your information</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-sm md:text-base">
                <p>
                  When you place an order through the site, we will maintain your Order Information for our records unless and until you ask us to delete this information.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="changes" className="border border-gray-200 dark:border-gray-800 rounded-lg mb-4 shadow-sm hover:shadow-md transition-shadow duration-300">
              <AccordionTrigger className="px-6 py-4">
                <div className="text-left">
                  <h3 className="text-lg md:text-xl font-medium">Changes to This Privacy Policy</h3>
                  <p className="text-sm text-muted-foreground">Updates to our policy</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-sm md:text-base">
                <p>
                  We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new privacy policy on this page.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          {/* Contact Card */}
          {/* <Card className="border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow duration-300 bg-gray-50 dark:bg-gray-900">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">Contact Us</CardTitle>
              <CardDescription>
                How to reach us with questions about privacy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm md:text-base">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                <p className="mb-4">
                  For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <p className="font-medium">Your Company Name</p>
                    <p>123 Street Address</p>
                    <p>City, State/Province, ZIP/Postal Code</p>
                    <p>Country</p>
                  </div>
                  <div className="md:text-right">
                    <Button variant="outline" size="sm" className="inline-flex items-center gap-2 mt-2">
                      <span>privacy@yourcompany.com</span>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
           */}
   
        </div>
      </div>
    </div>
  );
}