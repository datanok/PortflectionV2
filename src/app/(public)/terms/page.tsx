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
import { ArrowLeft, ExternalLink } from "lucide-react";

export const metadata = {
  title: 'Terms and Conditions',
  description: 'Terms and conditions for using our services',
}

export default function TermsAndConditions() {
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
            <span className="text-sm text-muted-foreground">Legal / Terms and Conditions</span>
          </div>
          
          {/* Header */}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-50 dark:to-gray-400">
              Terms and Conditions
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Last updated: May 20, 2025
            </p>
          </div>
          
          <Separator className="my-6" />
          
          {/* Introduction Card - Kept as a standalone card */}
          <Card className="transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">Introduction</CardTitle>
              <CardDescription>
                Agreement to our Terms
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm md:text-base">
              <p>
                These Terms and Conditions (&quot;Terms&quot;) govern your access to and use of our website, products, and services. Please read these Terms carefully before using our services.
              </p>
              <p>
                By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of the Terms, you may not access our services.
              </p>
            </CardContent>
          </Card>
          
          {/* Main Content in Accordion */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="use-of-services" className="border border-gray-200 rounded-lg mb-4 transition-shadow duration-300">
              <AccordionTrigger className="px-6 py-4">
                <div className="text-left">
                  <h3 className="text-lg md:text-xl font-medium">Use of Our Services</h3>
                  <p className="text-sm text-muted-foreground">How you can use our platform</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 space-y-4 text-sm md:text-base">
                <p>
                  You agree to use our services only for purposes that are permitted by these Terms and any applicable law, regulation, or generally accepted practices or guidelines in the relevant jurisdictions.
                </p>
                <p>
                  You may not access or use the services for any illegal purpose. You are solely responsible for all of your activity in connection with the services.
                </p>
                
                <h3 className="text-lg font-medium pt-2">User Accounts</h3>
                <p>
                  When you create an account with us, you must provide accurate, complete, and current information at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
                </p>
                <p>
                  You are responsible for safeguarding the password you use to access our services and for any activities or actions under your password. We encourage you to use strong passwords and to keep them secure.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="intellectual-property" className="border border-gray-200 dark:border-gray-800 rounded-lg mb-4 shadow-sm hover:shadow-md transition-shadow duration-300">
              <AccordionTrigger className="px-6 py-4">
                <div className="text-left">
                  <h3 className="text-lg md:text-xl font-medium">Intellectual Property</h3>
                  <p className="text-sm text-muted-foreground">Rights to content and materials</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 space-y-4 text-sm md:text-base">
                <p>
                  The service and all of its contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by us, our licensors, or other providers of such material and are protected by copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                </p>
                <p>
                  These Terms permit you to use the website for your personal, non-commercial use only. You must not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our website.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="user-content" className="border border-gray-200 dark:border-gray-800 rounded-lg mb-4 shadow-sm hover:shadow-md transition-shadow duration-300">
              <AccordionTrigger className="px-6 py-4">
                <div className="text-left">
                  <h3 className="text-lg md:text-xl font-medium">User Content</h3>
                  <p className="text-sm text-muted-foreground">Content you submit to our services</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 space-y-4 text-sm md:text-base">
                <p>
                  Our services may allow you to post, link, store, share, and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the content that you post to the service, including its legality, reliability, and appropriateness.
                </p>
                <p>
                  By posting content to the service, you grant us the right to use, modify, publicly perform, publicly display, reproduce, and distribute such content on and through the service. You retain any and all of your rights to any content you submit, post, or display on or through the service and you are responsible for protecting those rights.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="termination" className="border border-gray-200 dark:border-gray-800 rounded-lg mb-4 shadow-sm hover:shadow-md transition-shadow duration-300">
              <AccordionTrigger className="px-6 py-4">
                <div className="text-left">
                  <h3 className="text-lg md:text-xl font-medium">Termination</h3>
                  <p className="text-sm text-muted-foreground">When and how we may terminate your access</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 space-y-4 text-sm md:text-base">
                <p>
                  We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
                <p>
                  Upon termination, your right to use the service will immediately cease. If you wish to terminate your account, you may simply discontinue using the service, or contact us to request account deletion.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="liability" className="border border-gray-200 dark:border-gray-800 rounded-lg mb-4 shadow-sm hover:shadow-md transition-shadow duration-300">
              <AccordionTrigger className="px-6 py-4">
                <div className="text-left">
                  <h3 className="text-lg md:text-xl font-medium">Limitation of Liability</h3>
                  <p className="text-sm text-muted-foreground">Limits on our responsibility</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-sm md:text-base">
                <p>
                  In no event shall we, our directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="governing-law" className="border border-gray-200 dark:border-gray-800 rounded-lg mb-4 shadow-sm hover:shadow-md transition-shadow duration-300">
              <AccordionTrigger className="px-6 py-4">
                <div className="text-left">
                  <h3 className="text-lg md:text-xl font-medium">Governing Law</h3>
                  <p className="text-sm text-muted-foreground">Legal jurisdiction</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-sm md:text-base">
                <p>
                  These Terms shall be governed and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="changes" className="border border-gray-200 dark:border-gray-800 rounded-lg mb-4 shadow-sm hover:shadow-md transition-shadow duration-300">
              <AccordionTrigger className="px-6 py-4">
                <div className="text-left">
                  <h3 className="text-lg md:text-xl font-medium">Changes to These Terms</h3>
                  <p className="text-sm text-muted-foreground">Updates to our terms</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-sm md:text-base">
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the service.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          {/* Contact Card */}
          {/* <Card className="border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow duration-300 bg-gray-50 dark:bg-gray-900">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">Contact Us</CardTitle>
              <CardDescription>
                How to reach us with questions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm md:text-base">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                <p className="mb-4">
                  If you have any questions about these Terms, please contact us at:
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
                      <span>legal@yourcompany.com</span>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card> */}
          
         
        </div>
      </div>
    </div>
  );
}